import IUser from "../entities/interfaces/IUser";

export class MailUtils {
  static wellcomeMail(user: IUser) {
    return `${user.name} Bem vindo ao Test4developer`;
  }
}
