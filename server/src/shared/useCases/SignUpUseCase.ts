import jwt from "jsonwebtoken";

import IUser from "../entities/interfaces/IUser";
import IUsersRepository from "../repositories/IUsersRepository";
import ISession from "../entities/interfaces/ISession";
import { IMailProvider } from "../providers/IMailProvider";
import { MailUtils } from "../utils/mail";

export class SignUpUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider
  ) {}

  async execute(user: IUser): Promise<{ user?: IUser; message?: string }> {
    const _user_exists = await this.usersRepository.getByEmail(user.email);

    if (_user_exists) return { message: "este e-mail já foi cadastrado." };

    const _user = await this.usersRepository.save({
      ...user,
      active: true,
      is_member: false,
    });

    await this.mailProvider.sendMail({
      subject: "Bem vindo ao Ecofreelas",
      to: user.email,
      html: MailUtils.wellcomeMail(user),
      text: MailUtils.wellcomeMail(user),
    });

    return { user: _user };
  }
}
