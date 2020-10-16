import { SessionController } from "./SessionController";

import { signUseCase, signUpUseCase } from "../useCases";
import { SignUpController } from "./SignUpController";

const sessionController = new SessionController(signUseCase);
const signUpController = new SignUpController(signUpUseCase);

export { sessionController, signUpController };
