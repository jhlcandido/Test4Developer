import { SessionTypes, ISessionState } from "./types";

const initialState: ISessionState = {
  token: "",
  user: null,
  logged_in: false,
  first_access: true,
};

export function session(state: any = initialState, action: any): ISessionState {
  const type: SessionTypes = action.type;
  switch (type) {
    case "SET_SESSION":
      return Object.assign({}, state, action.payload);
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
}
