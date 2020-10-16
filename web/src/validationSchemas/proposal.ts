import * as Yup from "yup";

export const proposalValidationSchema = Yup.object({
  value: Yup.number()
    .min(1, "Informe um valor maior que 0")
    .required("Preencha o valor"),
  deadline: Yup.date().required("Selecione um prazo de entrega"),
  description: Yup.string().required("Preencha a mensagem"),
});
