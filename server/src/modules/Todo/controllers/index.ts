import { MongoTodoRepository } from "../repositories/implementations/MongoTodoRepository";
import { TodoController } from "./TodoController";

const mongoTodoRepository = new MongoTodoRepository();
const todoController = new TodoController(mongoTodoRepository);

export { todoController };
