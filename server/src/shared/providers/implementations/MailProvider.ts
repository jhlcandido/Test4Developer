import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { IMailMessage } from "../../entities/interfaces/IMailMessage";
import { IMailProvider } from "../IMailProvider";

export class MailProvider implements IMailProvider {
  transport: Mail;

  constructor() {
    this.transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "7454c6a002b892",
        pass: "c14ec1cc7d8ce3",
      },
    });
  }

  async sendMail(message: IMailMessage): Promise<any> {
    new Promise((resolve, reject) => {
      this.transport.sendMail(message, (err, info) => {
        if (err) reject(err);

        resolve(info);
      });
    });
  }
}
