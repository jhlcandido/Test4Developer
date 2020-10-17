import { Connection, createConnection } from "mongoose";

export class MongoContext {
  public id: string;
  public conn: Connection;

  constructor() {
    const MONGO_DB_HOST = process.env.MONGO_DB_HOST;
    const MONGO_DB_NAME = process.env.MONGO_DB_NAME;
    const MONGO_DB_USER = process.env.MONGO_DB_USER;
    const MONGO_DB_PASS = process.env.MONGO_DB_PASS;
    const MONGO_DB_PORT = process.env.MONGO_DB_PORT;

    this.id = "";
    let uri = "";

    if (!MONGO_DB_PORT) {
      uri = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASS}@${MONGO_DB_HOST}/${MONGO_DB_NAME}?retryWrites=true&w=majority`;
    } else if (MONGO_DB_PASS) {
      uri = `mongodb://${MONGO_DB_USER}:${MONGO_DB_PASS}@${MONGO_DB_HOST}:${MONGO_DB_PORT}/?authSource=admin`;
    } else {
      uri = `mongodb://${MONGO_DB_HOST}:${MONGO_DB_PORT}/${MONGO_DB_NAME}`;
    }

    console.log(uri);

    this.conn = createConnection(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}
