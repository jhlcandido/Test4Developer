import { IUser } from "../../../interfaces/IUser";

export type SessionTypes = "SET_SESSION" | "LOGOUT";

export interface ISessionState {
  token?: string;
  user?: IUser | null;
  logged_in?: boolean;
  first_access?: boolean;
  has_notifications?: boolean;
}
