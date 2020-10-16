import { IBaseRepository } from "../../../shared/repositories/IBaseRepository";
import ITodo from "../entities/interfaces/ITodo";

interface ITodosRepository extends IBaseRepository<ITodo> {}

export default ITodosRepository;
