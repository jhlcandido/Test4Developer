import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { IUser } from "../../interfaces/IUser";
import { RootState } from "../../redux/reducers";
import { logout } from "../../redux/reducers/session/action";

import { Container, Nav, Logo } from "./styles";

const PrivateLayout: React.FC = ({ children }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector<RootState, IUser>((state) => state.session.user!);

  const [menuMobileVisible, setMenuMobileVisible] = useState<boolean>(false); 
  const menu = [
    {
      title: "Dados Pessoais",
      to: "/dados-pessoais",
    },
    {
      title: "TodoList",
      to: "/",
    },
  ];

  function handleLogout() {
    dispatch(logout());
    history.push("/");
  }

  useEffect(() => {
    console.log("history", { history });
  }, [history]);

  return (
    <div className="d-flex align-items-start vh-100">
      <Nav className="navbar navbar-expand-md navbar-light bg-dark vh-100">
        <div className="background" />
        <button
          id="logout"
          className="btn btn-md btn-link text-white"
          onClick={handleLogout}
        >
          Sair
        </button>
        <div className="d-flex flex-column vh-100 align-items-start">
          <div
            className={`collapse navbar-collapse d-lg-flex ${
              menuMobileVisible ? "d-block" : ""
            }`}
            id="navbarNav"
          >
            <ul
              className="navbar-nav flex-fill d-flex flex-column vh-100"
              style={{ width: "300px" }}
            >
              <li className={`nav-item pt-4 pl-3 pr-3 pb-5 mb-4`}>
                <Link className={`nav-link text-white`} to="/meu-perfil">
                  <div className="d-flex align-items-center">
                    {!user.image && <Logo />}
                    {!!user.image && (
                      <div
                        className="nav-bar-user-photo"
                        style={{ backgroundImage: `url(${user.image})` }}
                      />
                    )}
                    <div className="ml-3">
                      <h5 className="m-0">{user.name}</h5>
                      <span>{user.email}</span>
                    </div>
                  </div>
                </Link>
              </li>
              {menu.map((item, i) => (
                <li
                  key={`menu_${i}`}
                  className={`nav-item pl-3 pr-3 ${
                    item.to === history.location.pathname ? "active" : ""
                  }`}
                >
                  <Link className={`nav-link text-white`} to={item.to}>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Nav>
      <Container
        className="flex-fill"
        onClick={() => setMenuMobileVisible(false)}
      >
        {children}
      </Container>
    </div>
  );
};

export default PrivateLayout;
