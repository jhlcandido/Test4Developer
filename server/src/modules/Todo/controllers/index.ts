import { StorageProvider } from "../../../shared/providers/implementations/StorageProvider";
import { MongoTodoRepository } from "../repositories/implementations/MongoTodoRepository";
import { TodoController } from "./TodoController";

const mongoTodoRepository = new MongoTodoRepository();
const storage = new StorageProvider();
const todoController = new TodoController(mongoTodoRepository, storage);

export { todoController };
