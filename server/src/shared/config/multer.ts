import multer from "multer";
import path from "path";
import crypto from "crypto";
import fs from "fs";

export const tmp_path = path.resolve(
  __dirname,
  "..",
  "..",
  "..",
  "tmp",
  "uploads"
);

if (!fs.existsSync(tmp_path)) fs.mkdirSync(tmp_path, { recursive: true });

const multerConfig: multer.Options = {
  dest: tmp_path,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      console.log("destination", { file });
      cb(null, tmp_path);
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(15, (err, hash) => {
        if (err) cb(err, "");

        const [, extension] = file.mimetype.split("/");
        const fileName = `${hash.toString("hex")}.${extension}`;

        cb(null, fileName);
      });
    },
  }),
  limits: {
    files: 1,
    fileSize: 20 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ["image/jpeg", "image/png"];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type."));
    }
  },
};

export default multerConfig;
