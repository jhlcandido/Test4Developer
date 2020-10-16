import { Request, Response } from "express";
import { SignUseCase } from "../useCases/SignUseCase";

export class SessionController {
  constructor(private signUseCase: SignUseCase) {}

  async post(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email)
        return res.status(401).json({ message: "preencha o campo email" });
      if (!password)
        return res.status(401).json({ message: "preencha o campo password" });

      const _response = await this.signUseCase.execute(req.body);

      if (!_response.authorized)
        return res.status(401).json({ message: _response.message });
      else if (_response.message)
        return res.status(401).json({ message: _response.message });

      res.status(200).json(_response);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
