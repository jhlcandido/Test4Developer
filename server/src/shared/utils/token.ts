import jwt from "jsonwebtoken";
import { promisify } from "util";
import { IToken } from "../entities/interfaces/IToken";

export async function validateToken(token: string): Promise<IToken> {
  const secret = process.env.APP_SECRET || "";

  const decoded: any = await promisify(jwt.verify)(token, secret);

  return { id: decoded.id, valid: !!decoded.id };
}
