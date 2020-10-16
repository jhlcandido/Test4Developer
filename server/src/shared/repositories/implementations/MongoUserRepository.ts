import IUser from "../../entities/interfaces/IUser";
import IUsersRepository from "../IUsersRepository";

export class MongoUserRepository implements IUsersRepository {
  getByEmail(email: string): Promise<IUser | null> {
    throw new Error("Method not implemented.");
  }
  getAll(): Promise<IUser[]> {
    throw new Error("Method not implemented.");
  }
  save(data: IUser): Promise<IUser> {
    throw new Error("Method not implemented.");
  }
  bulkSave(data: IUser[]): Promise<IUser[]> {
    throw new Error("Method not implemented.");
  }
  update(data: IUser): Promise<IUser> {
    throw new Error("Method not implemented.");
  }
  delete(data: IUser): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
