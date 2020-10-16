import { ISessionState, SessionTypes } from "./types";

export const setSession = (session: ISessionState) => ({
  type: "SET_SESSION" as SessionTypes,
  payload: session,
});

export const logout = () => ({
  type: "LOGOUT" as SessionTypes,
});
