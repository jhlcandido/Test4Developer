import { SignUpUseCase } from "./SignUpUseCase";
import { SignUseCase } from "./SignUseCase";

import { MailProvider } from "../providers/implementations/MailProvider";
import { MongoUserRepository } from "../repositories/implementations/MongoUserRepository";

/** Repositories */
const usersRepository = new MongoUserRepository();

/** Providers */
const mailProvider = new MailProvider();

/** UseCases */
const signUseCase = new SignUseCase(usersRepository);
const signUpUseCase = new SignUpUseCase(usersRepository, mailProvider);

export { signUseCase, signUpUseCase };
