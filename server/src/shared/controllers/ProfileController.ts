import { Request, Response } from "express";
import { StorageProvider } from "../providers/implementations/StorageProvider";
import { EditProfileUseCase } from "../useCases/EditProfileUseCase";

export class ProfileController {
  constructor(
    private editProfileUseCase: EditProfileUseCase,
    private fileStorage: StorageProvider
  ) {}

  async put(req: Request, res: Response) {
    try {
      var _user = { ...req.body, _id: req._id };

      if (req.file && req.file.filename) {
        const [, extension] = req.file.mimetype.split("/");
        const _file = `${req.file.path}.${extension}`;

        const _url = await this.fileStorage.uploadFile({
          filename: req.file.path,
          extension,
        });
        _user.image = _url;
      }

      const _response = await this.editProfileUseCase.execute(_user);

      res.status(200).json(_response);
    } catch (error) {
      res.status(400).json(error);
    }
  }
}
