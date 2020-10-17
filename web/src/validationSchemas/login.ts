import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Informe um e-mail válido")
    .required("Preencha o campo e-mail"),
  password: Yup.string().required("Preencha o campo senha"),
});
