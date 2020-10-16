import { Document, Model, Schema } from "mongoose";
import IUser from "../../entities/interfaces/IUser";
import IUsersRepository from "../IUsersRepository";
import { MongoContext } from "./MongoContext";

const UserSchema = new Schema<IUser>({
  name: { type: String, required: [true, "campo obrigatório"] },
  email: { type: String, required: [true, "campo obrigatório"], unique: true },
  password: { type: String, required: [true, "campo obrigatório"] },
}); 

export class MongoUserRepository
  extends MongoContext
  implements IUsersRepository {
  public id = "Users";
  public model: Model<Document>;

  constructor() {
    super();

    this.model = this.conn.model("ModelName", UserSchema, this.id);
  }

  async getByEmail(email: string): Promise<IUser | null> {
    const _result = await this.model.collection.findOne<IUser>({ email });

    return _result;
  }
  getAll(): Promise<IUser[]> {
    throw new Error("Method not implemented.");
  }
  async save(data: IUser): Promise<IUser> {
    const _doc = await this.model.create<IUser>(data);

    return { ...data, id: _doc.id };
  }
  bulkSave(data: IUser[]): Promise<IUser[]> {
    throw new Error("Method not implemented.");
  }
  update(data: IUser): Promise<IUser> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
