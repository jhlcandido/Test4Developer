import { Request, Response } from "express";
import ITodosRepository from "../repositories/ITodosRepository";

export class TodoController {
  constructor(private todosRepository: ITodosRepository) {}

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

      if (req.file && req.file.filename) _todo.file_url = req.file.path;

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
