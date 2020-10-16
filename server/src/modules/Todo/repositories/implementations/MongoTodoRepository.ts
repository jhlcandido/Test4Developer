import { Document, Model, Schema } from "mongoose";
import { MongoContext } from "../../../../shared/repositories/implementations/MongoContext";
import ITodo from "../../entities/interfaces/ITodo";
import ITodosRepository from "../ITodosRepository";

interface ITodoSchema extends Document {
  name: string;
  completed: boolean;
  file_url: string;
}

const TodoSchema = new Schema({
  name: { type: String, required: [true, "campo nome é obrigatório"] },
  completed: { type: Boolean, default: false },
  file_url: { type: String },
});

export class MongoTodoRepository
  extends MongoContext
  implements ITodosRepository {
  public id = "Todos";
  public model: Model<ITodoSchema>;

  constructor() {
    super();

    this.model = this.conn.model<ITodoSchema>("ModelName", TodoSchema, this.id);
  }

  async getByEmail(email: string): Promise<ITodo | null> {
    const _result = await this.model.findOne({ email });

    return _result;
  }
  async getAll(): Promise<ITodo[]> {
    const _todos = await this.model.find({}).exec();

    return _todos;
  }
  async save(data: ITodo): Promise<ITodo> {
    const _doc = await this.model.create<ITodo>(data);

    return _doc;
  }
  bulkSave(data: ITodo[]): Promise<ITodo[]> {
    throw new Error("Method not implemented.");
  }
  async update(data: ITodo): Promise<ITodo> {
    const _result = await this.model.updateOne({ _id: data._id }, data);

    return _result;
  }
  async delete(id: string): Promise<boolean> {
    const _result = await this.model.deleteOne({ _id: id });

    return !!_result.deletedCount;
  }
}
