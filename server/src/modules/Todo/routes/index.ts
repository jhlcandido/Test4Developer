import express from "express";
import multer from "multer";
import session from "../../../shared/middleware/session";
import { todoController } from "../controllers";
var upload = multer({ dest: "uploads/" });
var router = express.Router();

router.use(session);

router.get("/", (req, res) => todoController.get(req, res));

router.post("/", upload.single("file"), (req, res) =>
  todoController.post(req, res)
);

router.put("/", (req, res) => todoController.put(req, res));

router.delete("/:id", (req, res) => todoController.delete(req, res));

export { router };
