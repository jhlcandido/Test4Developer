import IUser from "../entities/interfaces/IUser";

export class MailUtils {
  static wellcomeMail(user: IUser) {
    return `${user.name} Bem vindo ao Test4developer`;
  }

  static passwordChangedMail(user: IUser) {
    return `${user.name} sua senha foi alterada`;
  }
}
