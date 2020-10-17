import { SignUpUseCase } from "./SignUpUseCase";
import { SignUseCase } from "./SignUseCase";

import { MailProvider } from "../providers/implementations/MailProvider";
import { MongoUserRepository } from "../repositories/implementations/MongoUserRepository";
import { EditProfileUseCase } from "./EditProfileUseCase";

/** Repositories */
const usersRepository = new MongoUserRepository();

/** Providers */
const mailProvider = new MailProvider();

/** UseCases */
const signUseCase = new SignUseCase(usersRepository);
const signUpUseCase = new SignUpUseCase(usersRepository, mailProvider);
const editProfileUseCase = new EditProfileUseCase(
  usersRepository,
  mailProvider
);

export { signUseCase, signUpUseCase, editProfileUseCase };
