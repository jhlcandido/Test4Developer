import { Document, Model, Schema, SchemaType, SchemaTypes } from "mongoose";
import { MongoContext } from "../../../../shared/repositories/implementations/MongoContext";
import ITodo from "../../entities/interfaces/ITodo";
import ITodosRepository from "../ITodosRepository";

interface ITodoDTO extends Omit<ITodo, "_id" | "author">, Document {
  author: any;
}

const TodoSchema = new Schema<ITodoDTO>({
  name: { type: String, required: [true, "campo nome é obrigatório"] },
  completed: { type: Boolean, default: false },
  file_url: { type: String },
  deadline: { type: Date, default: null },
  created: { type: Date, required: true, default: new Date() },
  author: {
    ref: "Users",
    type: SchemaTypes.ObjectId,
    required: [true, "campo author é obrigatôrio"],
  },
});

export class MongoTodoRepository
  extends MongoContext
  implements ITodosRepository {
  public id = "Todos";
  public model: Model<ITodoDTO>;

  constructor() {
    super();

    this.model = this.conn.model<ITodoDTO>(this.id, TodoSchema);
  }

  async getById(_id: string): Promise<ITodo | null> {
    const _result = await this.model.findById(_id);

    return _result;
  }

  async getAll(): Promise<ITodo[]> {
    const _todos = await this.model.find({}).populate("author");

    return _todos;
  }

  async getAllByUserId(_id: string): Promise<ITodo[]> {
    const _todos = await this.model.find({ author: _id }).populate("author");

    return _todos;
  }

  async save(data: ITodo): Promise<ITodo> {
    const _doc = await this.model.create<ITodo>(data);

    return _doc;
  }
  bulkSave(data: ITodo[]): Promise<ITodo[]> {
    throw new Error("Method not implemented.");
  }
  async update(data: ITodo): Promise<ITodo | null> {
    const _result = await this.model.findByIdAndUpdate(data._id, data, {
      new: true,
    });

    return _result;
  }
  async delete(id: string): Promise<boolean> {
    const _result = await this.model.deleteOne({ _id: id });

    return !!_result.deletedCount;
  }
}
