import IUser from "./IUser";

interface ISession {
  authorized: boolean;
  user?: IUser | null;
  token?: string;
  message?: string;
  first_access?: boolean;
}

export default ISession;
