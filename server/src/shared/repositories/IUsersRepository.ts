import IUser from "../entities/interfaces/IUser";
import { IBaseRepository } from "./IBaseRepository";

interface IUsersRepository extends IBaseRepository<IUser> {
  getByEmail(email: string): Promise<IUser | null>;
}

export default IUsersRepository;
