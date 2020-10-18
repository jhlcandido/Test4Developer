import * as Yup from "yup";

export const TodoValidationSchema = Yup.object({
  name: Yup.string()
    .required("Informe uma descrição para a tarefa"),
  deadline: Yup.date().nullable()
});
