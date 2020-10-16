import { IUser } from "./IUser";

export interface ISession {
  token: string;
  user: IUser | null;
  authorized: boolean;
}
