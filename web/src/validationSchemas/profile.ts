import * as Yup from "yup";

export const profileValidationSchema = Yup.object({
  email: Yup.string()
    .email("Informe um e-mail válido")
    .required("Preencha o campo e-mail"),
  password: Yup.string().min(4, "A senha deve ter no minimo 4 caracteres"),
  password_confirmation: Yup.string().oneOf(
    [Yup.ref("password")],
    "A senha não é identica"
  ),
  name: Yup.string().required("Preencha o campo nome"),
  image: Yup.mixed(),
});
