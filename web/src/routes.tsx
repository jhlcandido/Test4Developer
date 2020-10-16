import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";

import PublicLayout from "./layouts/PublicLayout";
import Login from "./pages/Login";
import { RootState } from "./redux/reducers";
import PrivateLayout from "./layouts/PrivateLayout";
import NewAccount from "./pages/NewAccount";
import { IUser } from "./interfaces/IUser";
import Todos from "./pages/Todos";
import Profile from "./pages/Profile";

export default function AppRouter() {
  const logged_in = useSelector<RootState>((state) => state.session.logged_in);
  const first_access = useSelector<RootState, boolean>(
    (state) => state.session.first_access!
  );
  const user = useSelector<RootState, IUser | null>(
    (state) => state.session.user!
  );

  const _loggedIn = logged_in && user && user.name;

  console.log("AppRouter", {
    _loggedIn,
    loggedIn: logged_in,
    user,
    first_access,
  });

  return (
    <>
      {!_loggedIn && (
        <PublicLayout>
          <Router>
            <Switch>
              <Route exact path="/">
                <Login />
              </Route>
              <Route path="/cadastro">
                <NewAccount />
              </Route>
              <Route path="*">
                <Redirect to="/" />
              </Route>
            </Switch>
          </Router>
        </PublicLayout>
      )}

      {_loggedIn && (
        <Router>
          <Switch>
            <PrivateLayout>
              <Route exact path="/">
                <Todos />
              </Route>
              <Route exact path="/dados-pessoais">
                <Profile />
              </Route>
            </PrivateLayout>
          </Switch>
        </Router>
      )}
    </>
  );
}
