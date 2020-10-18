import { ErrorMessage, Form, Formik, FormikHelpers } from "formik";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import CustomField from "../../components/CustomField";
import { IUser } from "../../interfaces/IUser";
import { api } from "../../services/api";
import { ReactComponent as IcEyeOpened } from "../../assets/images/ic_eye_opened.svg";
import { ReactComponent as IcEyeClosed } from "../../assets/images/ic_eye_closed.svg";

import { Container, IcProfile } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { profileValidationSchema } from "../../validationSchemas/profile";
import { setSession } from "../../redux/reducers/session/action";
import { getProperty } from "../../utils/object";

const Profile: React.FC = () => {
  const dispach = useDispatch();
  const refFile = useRef<HTMLInputElement>(null);
  const user = useSelector<RootState, IUser>((state) => state.session.user!);
  const [show_password, setShowPassword] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [preview, setPreview] = useState("");

  function handleOnSubmit(data: IUser, actions: FormikHelpers<any>) {
    setIsBusy(true);
    var formData = new FormData();

    for (var i in data) {
      var _value = getProperty<IUser, any>(data, i);

      if (i !== "image" && !!_value) formData.append(i, _value);
    }

    if (!!refFile.current?.files && !!refFile.current.files[0]) {
      formData.append("image", refFile.current.files[0]);
    }

    api
      .put<IUser>("/users/me", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((r) => {
        setIsBusy(false);

        toast.success("Perfil atualizado com sucesso!");

        actions.setValues({
          ...r.data,
          password: "",
          password_confirmation: "",
        });

        if (r.data._id)
          dispach(
            setSession({
              user: r.data,
            })
          );
      })
      .catch((e) => {
        setIsBusy(false);
      });
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    var reader = new FileReader();

    if (!e.target.files) return;

    const file = e.target.files[0];
    reader.onloadend = function () {
      if (reader.result) {
        console.log("onloadend", reader.result.toString().slice(0, 20));
        setPreview(reader.result.toString());
      }
      // preview.src = reader.result;
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
    }
  }

  function handleChangeImage() {
    refFile?.current?.click();
  }

  return (
    <Container className="container pt-5">
      <div
        className="row"
        style={{
          height: "calc(100vh - 48px)",
        }}
      >
        <div className="col-12 d-flex flex-column flex-grow-1">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item text-danger" aria-current="page">
                /Dados Pessoais
              </li>
            </ol>
          </nav>

          <input
            ref={refFile}
            onChange={(e) => handleImageChange(e)}
            id="image"
            name="image"
            type="file"
            className="d-none"
            accept=".jpg,.jpeg,.png"
          />

          <div className="d-inline-flex align-self-start flex-column align-items-center mt-5">
            <div className="photo">
              {preview || user.image ? (
                <div
                  className="preview"
                  style={{
                    backgroundImage: `url(${
                      preview || user.image?.toString()
                    })`,
                  }}
                />
              ) : (
                <IcProfile />
              )}
            </div>
            <button
              className="btn btn-md btn-link text-dark"
              onClick={handleChangeImage}
            >
              alterar foto
            </button>
          </div>

          <Formik
            initialValues={{
              name: user.name,
              email: user.email,
              password: "",
              password_confirmation: "",
            }}
            validationSchema={profileValidationSchema}
            onSubmit={(values, actions) => handleOnSubmit(values, actions)}
          >
            <Form>
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

              {/* {message && (
                <div className="invalid-feedback d-block text-center">
                  {message}
                </div>
              )} */}

              <button
                className="btn btn-md btn-primary mt-4 pr-5 pl-5"
                style={{ width: "270px" }}
                type="submit"
              >
                {!isBusy ? (
                  "Editar"
                ) : (
                  <div
                    className="spinner-border spinner-border-sm text-light"
                    role="status"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                )}
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </Container>
  );
};

export default Profile;
