import jwt from "jsonwebtoken";
import { promisify } from "util";
import { Request, Response, NextFunction } from "express";

export default async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token not provider" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const secret = process.env.APP_SECRET || "";

    const decoded: any = await promisify(jwt.verify)(token, secret);

    req._id = decoded?.id;

    return next();
  } catch (err) {
    return res
      .status(401)
      .json({ error: "Token invalid", message: err.message });
  }
};
