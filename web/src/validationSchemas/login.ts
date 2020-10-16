import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Informe um e-mail válido")
    .required("Preencha o campo e-mail"),
  password: Yup.string()
    .min(4, "A senha deve ser maior que 6 caracteres")
    .required("Preencha o campo senha"),
});
