import { session } from "./session";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  session,
});

export type RootState = ReturnType<typeof rootReducer>;
