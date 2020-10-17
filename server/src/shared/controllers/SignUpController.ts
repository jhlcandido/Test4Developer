import { Request, Response } from "express";
import { SignUpUseCase } from "../useCases/SignUpUseCase";

export class SignUpController {
  constructor(private signUpUseCase: SignUpUseCase) {}

  async post(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // if (!email)
      //   return res.status(401).json({ message: "preencha o campo email" });
      // if (!password)
      //   return res.status(401).json({ message: "preencha o campo password" });

      const _response = await this.signUpUseCase.execute(req.body);

      res.status(201).json(_response);
    } catch (error) {
      res.status(400).json(error);
    }
  }
}
