import { IMailMessage } from "../entities/interfaces/IMailMessage";

export interface IMailProvider {
  sendMail(message: IMailMessage): Promise<any>;
}
