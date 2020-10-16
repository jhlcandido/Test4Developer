import { ErrorMessage, Form, Formik, FormikHelpers } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { ReactComponent as IcEyeOpened } from "../../assets/images/ic_eye_opened.svg";
import { ReactComponent as IcEyeClosed } from "../../assets/images/ic_eye_closed.svg";

import CustomField from "../../components/CustomField";
import { IUser } from "../../interfaces/IUser";
import { api } from "../../services/api";
import { Container, Logo } from "./styles";
import { signupValidationSchema } from "../../validationSchemas/signup";

interface ILoginValidate {
  email?: string;
  password?: string;
  name?: string;
  message?: string;
  securityCode?: string;
}

const NewAccount: React.FC = () => {
  const history = useHistory();
  const [validation, setValidation] = useState<ILoginValidate>({});

  const [isMember, setIsMember] = useState(true);
  const [isBusy, setIsBusy] = useState(false);
  const [show_password, setShowPassword] = useState(false);

  async function handleOnSubmit(data: IUser, actions: FormikHelpers<any>) {
    return api
      .post<{ user: IUser; message: string }>(`/signup`, data)
      .then((response) => {
        if (response.data.message) {
          setValidation({ message: response.data.message });
          return;
        }

        toast.success("Cadastro realizado com sucesso!");
        actions.resetForm();
        history.push("/");
      })
      .catch((error) => {
        console.log("error", error.response.data);
        if (error.response.data) {
          const _message = error.response.data.message;
          setValidation({ ...validation, message: _message });
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
              initialValues={{
                name: "",
                email: "",
                password: "",
                password_confirmation: "",
              }}
              validationSchema={signupValidationSchema}
              onSubmit={(values, actions) => handleOnSubmit(values, actions)}
            >
              <Form className="mt-5">
                <CustomField type="text" name="name" placeholder="Nome" />
                <ErrorMessage
                  component="div"
                  className="invalid-feedback d-block"
                  name="name"
                />

                <div className="mt-3">
                  <CustomField type="text" name="email" placeholder="E-mail" />
                </div>
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
                      style={{
                        backgroundColor: "#fafafb",
                        borderTopRightRadius: 15,
                        borderBottomRightRadius: 15,
                        borderColor: "#f1f1f5",
                      }}
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

                <div className="input-group mt-3">
                  <CustomField
                    name="password_confirmation"
                    style={{ borderRight: "none" }}
                    type={show_password ? "text" : "password"}
                    placeholder="Confirmar Senha"
                  />
                  <div className="input-group-append">
                    <span
                      className="input-group-text"
                      style={{
                        backgroundColor: "#fafafb",
                        borderTopRightRadius: 15,
                        borderBottomRightRadius: 15,
                        borderColor: "#f1f1f5",
                      }}
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
                  name="password_confirmation"
                />

                {validation.message && (
                  <div className="invalid-feedback d-block text-center">
                    {validation.message}
                  </div>
                )}

                <button className="btn btn-primary w-100 mt-3" type="submit">
                  {!isBusy ? (
                    "CADASTRAR"
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
                  to="/"
                  className="text-dark text-center mt-3"
                >
                  Eu já possuo cadastro
                </Link>
              </Form>
            </Formik>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default NewAccount;
