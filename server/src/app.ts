let path = ".env";
if (process.env.NODE_ENV === "test") {
  path = ".test.env";
} else if (process.env.NODE_ENV === "dev") {
  path = ".dev.env";
}

require("dotenv").config({
  path,
});

// console.log(`env: ${path}`);

import http from "http";
import express, { Express, Request, Response } from "express";
import { router } from "./shared/routes";

import cors from "cors";
import morgan from "morgan";

class AppController {
  express: Express;
  server: http.Server;

  constructor() {
    this.express = express();
    this.server = http.createServer(this.express);

    this.middlewares();
    this.routes();
    this.loadModules();
    this.defaultRoutes();
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(cors());
    this.express.use(morgan("dev"));
  }

  routes() {
    this.express.get("/", (req, res) => {
      res.status(200).json({ message: "ok" });
    });
    this.express.use(router);
  }

  loadModules() {}

  defaultRoutes() {
    this.express.use(function (req: Request, res: Response) {
      res.status(404).json({ message: "not found" });
    });
  }
}

export default new AppController().server;
