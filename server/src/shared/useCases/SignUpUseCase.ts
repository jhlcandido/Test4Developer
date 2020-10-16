import jwt from "jsonwebtoken";
import crypto from "crypto";

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

    user.password = crypto
      .createHash("sha256")
      .update(user.password!)
      .digest("base64");

    const _user = await this.usersRepository.save(user);

    await this.mailProvider.sendMail({
      subject: "Bem vindo ao Ecofreelas",
      to: user.email,
      html: MailUtils.wellcomeMail(user),
      text: MailUtils.wellcomeMail(user),
    });

    return { user: _user };
  }
}
