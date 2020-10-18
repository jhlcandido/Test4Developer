import { IBaseRepository } from "../../../shared/repositories/IBaseRepository";
import ITodo from "../entities/interfaces/ITodo";

interface ITodosRepository extends IBaseRepository<ITodo> {
    getAllByUserId(_id: string): Promise<ITodo[]>
}

export default ITodosRepository;
