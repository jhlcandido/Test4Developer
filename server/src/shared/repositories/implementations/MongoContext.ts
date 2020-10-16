import { MongoClient } from "mongodb";
import { Connection, createConnection } from "mongoose";

export class MongoContext {
  public conn: Connection;

  constructor() {
    this.conn = createConnection(
      "mongodb+srv://jhlcandido:az3eenfv9av8pyf1@cluster0.kwqn9.mongodb.net/test4developer?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
      }
    );
  }

  static async getInstance() {
    try {
      const _instance = await MongoClient.connect(
        "mongodb+srv://jhlcandido:az3eenfv9av8pyf1@cluster0.kwqn9.mongodb.net/test4developer?retryWrites=true&w=majority",
        { useNewUrlParser: true }
      );

      return _instance;
    } catch (error) {
      throw error;
    }
  }
}
