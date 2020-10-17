import { SessionController } from "./SessionController";

import { signUseCase, signUpUseCase, editProfileUseCase } from "../useCases";
import { SignUpController } from "./SignUpController";
import { ProfileController } from "./ProfileController";

const sessionController = new SessionController(signUseCase);
const signUpController = new SignUpController(signUpUseCase);
const profileController = new ProfileController(editProfileUseCase);

export { sessionController, signUpController, profileController };
