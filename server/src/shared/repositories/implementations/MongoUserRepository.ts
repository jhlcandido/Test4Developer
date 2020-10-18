import { Document, Model, Schema } from "mongoose";
import IUser from "../../entities/interfaces/IUser";
import { CustomError } from "../../ErrorHelpers/CustomError";
import IUsersRepository from "../IUsersRepository";
import { MongoContext } from "./MongoContext";

interface IUserDTO extends Omit<IUser, "_id">, Document {}

const UserSchema = new Schema<IUserDTO>({
  name: { type: String, required: [true, "campo obrigatório"] },
  email: {
    type: String,
    required: [true, "campo obrigatório"],
    unique: [true, "e-mail em uso"],
  },
  password: {
    type: String,
    required: [true, "campo obrigatório"],
    minlength: 4,
  },
  image: {
    type: String,
  },
});

export class MongoUserRepository
  extends MongoContext
  implements IUsersRepository {
  public id = "Users";
  public model: Model<IUserDTO>;

  constructor() {
    super();

    this.model = this.conn.model(this.id, UserSchema);
  }

  async getById(_id: string): Promise<IUser | null> {
    try {
      const _result = await this.model.findById(_id);

      return _result?.toObject();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getByEmail(email: string): Promise<IUser | null> {
    try {
      const _result = await this.model.findOne({ email });

      return _result;
    } catch (error) {
      return null;
    }
  }

  getAll(): Promise<IUser[]> {
    throw new Error("Method not implemented.");
  }
  async save(data: IUser): Promise<IUser> {
    const _doc = await this.model.create<IUser>(data);

    return _doc;
  }
  bulkSave(data: IUser[]): Promise<IUser[]> {
    throw new Error("Method not implemented.");
  }
  async update(data: IUser): Promise<IUser | null> {
    try {
      const _user = await this.model.findByIdAndUpdate(data._id, data, {
        new: true,
      });

      return _user;
    } catch (error) {
      if (error.code === 11000 && error.keyPattern.email) {
        throw new CustomError({ email: "E- mail já esta sendo utilizado" });
      }
      throw error;
    }
  }
  delete(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
