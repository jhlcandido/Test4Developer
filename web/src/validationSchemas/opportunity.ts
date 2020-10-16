import * as Yup from "yup";

export const opportunityValidationSchema = Yup.object({
  title: Yup.string().required("Preencha o titulo"),
  category_id: Yup.number().required("Selecione uma categoria"),
  deadline: Yup.date().required("Selecione um prazo de entrega"),
  localization: Yup.string().required("Preencha a localização"),
  description: Yup.string().required("Preencha a descrição"),
});
