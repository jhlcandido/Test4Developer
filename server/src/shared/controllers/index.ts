import { SessionController } from "./SessionController";

import { signUseCase, signUpUseCase, editProfileUseCase } from "../useCases";
import { SignUpController } from "./SignUpController";
import { ProfileController } from "./ProfileController";
import { StorageProvider } from "../providers/implementations/StorageProvider";

const storageProvider = new StorageProvider();

const sessionController = new SessionController(signUseCase);
const signUpController = new SignUpController(signUpUseCase);
const profileController = new ProfileController(
  editProfileUseCase,
  storageProvider
);

export { sessionController, signUpController, profileController };
