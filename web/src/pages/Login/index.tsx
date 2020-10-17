import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { ISession } from "../../interfaces/ISession";
import { setSession } from "../../redux/reducers/session/action";
import { api } from "../../services/api";
import { ReactComponent as IcEyeOpened } from "../../assets/images/ic_eye_opened.svg";
import { ReactComponent as IcEyeClosed } from "../../assets/images/ic_eye_closed.svg";
import { Formik, Form, ErrorMessage } from "formik";

import { Container, Logo } from "./styles";
import { loginValidationSchema } from "../../validationSchemas/login";
import CustomField from "../../components/CustomField";

const Login: React.FC = () => {
  const dispach = useDispatch();
  const [isBusy, setIsBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [show_password, setShowPassword] = useState(false);

  function handleOnSubmit(values: { email: string; password: string }) {
    setIsBusy(true);

    const { email, password } = values;

    api
      .post<ISession>(`/authorize`, { email, password })
      .then((response) => {
        setIsBusy(false);

        dispach(
          setSession({
            ...response.data,
            logged_in: true,
          })
        );
      })
      .catch((error) => {
        setIsBusy(false);

        // console.log("error", error.response);
        if (error.response.data) {
          const _message = error.response.data.message;
          setMessage(_message);
        }
      });
  }

  return (
    <div className="container-fluid">
      <div className="row vh-100 text-right">
        <div
          className="col-7 d-flex align-items-center justify-content-center"
          style={{ paddingBottom: "66px" }}
        >
          <Logo width="202" />
        </div>
        <div
          className="col-5 bg-white col-auto d-flex flex-column justify-content-center"
          style={{ paddingBottom: "66px" }}
        >
          <Container className="p-5 w-100">
            <h4 className="text-center mt-2">Faça seu login</h4>

            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={loginValidationSchema}
              onSubmit={(values, { setSubmitting }) => handleOnSubmit(values)}
            >
              <Form className="mt-5">
                <CustomField
                  type="text"
                  name="email"
                  placeholder="Seu e-mail"
                />
                <ErrorMessage
                  component="div"
                  className="invalid-feedback d-block"
                  name="email"
                />

                <div className="input-group mt-3">
                  <CustomField
                    name="password"
                    style={{ borderRight: "none" }}
                    type={show_password ? "text" : "password"}
                    placeholder="Senha"
                  />
                  <div className="input-group-append">
                    <span
                      className="input-group-text"
                      // style={{
                      //   backgroundColor: "#fafafb",
                      //   borderTopRightRadius: 15,
                      //   borderBottomRightRadius: 15,
                      //   borderColor: "#f1f1f5",
                      // }}
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {!show_password && <IcEyeOpened />}
                      {show_password && <IcEyeClosed />}
                    </span>
                  </div>
                </div>
                <ErrorMessage
                  component="div"
                  className="invalid-feedback d-block"
                  name="password"
                />

                {message && (
                  <div className="invalid-feedback d-block text-center">
                    {message}
                  </div>
                )}

                <button className="btn btn-primary w-100 mt-3" type="submit">
                  {!isBusy ? (
                    "ENTRAR"
                  ) : (
                    <div
                      className="spinner-border spinner-border-sm text-light"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  )}
                </button>

                <Link
                  id="btn-new-account"
                  to="/cadastro"
                  className="text-dark text-center mt-3"
                >
                  Não possuo cadastro
                </Link>
              </Form>
            </Formik>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Login;
