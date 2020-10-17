import { Request, Response } from "express";
import { EditProfileUseCase } from "../useCases/EditProfileUseCase";

export class ProfileController {
  constructor(private editProfileUseCase: EditProfileUseCase) { }

  async put(req: Request, res: Response) {
    try {
      if (!req.body._id)
        return res.status(400).json({ message: "campo _id não informado" });

      const _response = await this.editProfileUseCase.execute(req.body);

      res.status(200).json(_response);
    } catch (error) {
      res.status(400).json(error);
    }
  }
}
