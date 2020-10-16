import jwt from "jsonwebtoken";

import IUser from "../entities/interfaces/IUser";
import IUsersRepository from "../repositories/IUsersRepository";
import ISession from "../entities/interfaces/ISession";

export class SignUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(user: IUser): Promise<ISession> {
    const _findedUser = await this.usersRepository.getByEmail(user.email);

    let token;
    let message;
    let _user: IUser | null = null;
    let first_access = true;

    const authorized = !!_findedUser && user.password === _findedUser.password;

    if (!_findedUser) message = "email inválido";
    else if (!authorized) message = "password inválido";

    if (authorized && !message) {
      _user = _findedUser!;
      token = jwt.sign(
        {
          id: _findedUser?.id,
        },
        process.env.APP_SECRET || "teste",
        { expiresIn: "72h" }
      );
    }

    return {
      authorized,
      token,
      user: _user,
      message,
      first_access,
    };
  }
}
