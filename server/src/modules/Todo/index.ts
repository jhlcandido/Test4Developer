import { Express } from "express";
import { Server } from "http";
import { router } from "./routes";

export class Todo {
  constructor(private express: Express, private server: Server) {
    this.routes();
  }

  routes() {
    this.express.use("/todos", router);
  }
}
