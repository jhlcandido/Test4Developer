import jwt from "jsonwebtoken";
import crypto from "crypto";

import IUser from "../entities/interfaces/IUser";
import IUsersRepository from "../repositories/IUsersRepository";
import ISession from "../entities/interfaces/ISession";
import { IMailProvider } from "../providers/IMailProvider";
import { MailUtils } from "../utils/mail";

export class EditProfileUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider
  ) {}

  async execute(user: IUser): Promise<IUser | null | { message: string }> {
    const _user_exists = await this.usersRepository.getById(user._id!);

    if (!_user_exists) return { message: "usuário não encontrado." };

    // realiza o merge do usuario salvo no banco com o novos valores informados
    let _user: IUser | null = { ..._user_exists, ...user };

    // valida se a senha foi alterada para criptografar a nova senha
    if (user.password) {
      _user.password = crypto
        .createHash("sha256")
        .update(user.password!)
        .digest("base64");
    }

    _user = await this.usersRepository.update(_user);

    if (user.password) {
      this.mailProvider.sendMail({
        subject: "Senha alterada",
        to: user.email,
        html: MailUtils.passwordChangedMail(user),
        text: MailUtils.passwordChangedMail(user),
      });
    }

    return _user;
  }
}
