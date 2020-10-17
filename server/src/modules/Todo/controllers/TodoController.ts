import { Request, Response } from "express";
import { IStorageProvider } from "../../../shared/providers/IStorageProvider";
import ITodosRepository from "../repositories/ITodosRepository";

export class TodoController {
  constructor(
    private todosRepository: ITodosRepository,
    private fileStorage: IStorageProvider
  ) {}

  async get(req: Request, res: Response) {
    try {
      const _response = await this.todosRepository.getAll();

      res.status(200).json(_response);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  async post(req: Request, res: Response) {
    try {
      const _todo = { ...req.body };

      if (req.file && req.file.filename) {
        const [, extension] = req.file.mimetype.split("/");
        const _file = `${req.file.path}.${extension}`;

        const _url = await this.fileStorage.uploadFile({
          filename: _file,
          extension,
        });
        _todo.file_url = _url;
      }

      const _response = await this.todosRepository.save(_todo);

      res.status(200).json(_response);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  async put(req: Request, res: Response) {
    try {
      const _response = await this.todosRepository.update(req.body);

      res.status(200).json(_response);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const _response = await this.todosRepository.delete(id);

      res.status(200).json(_response);
    } catch (error) {
      res.status(400).json(error);
    }
  }
}
