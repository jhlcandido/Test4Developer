import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { Formik, Form, ErrorMessage } from "formik";

import { api } from "../../services/api";
import { errorsToValidateObj } from "../../utils/api";
import InputDate from "../InputDate";
import { TodoValidationSchema } from "../../validationSchemas/todo";
import CustomField from "../../components/CustomField";
import ITodo from "../../interfaces/ITodo";
import { PhotoConatiner, Preview } from "./styles";
import { getProperty } from "../../utils/object";

interface ITodoModalProps {
  close(): void;
  success(): void;
  todo: ITodo;
}

interface ITodoModalValidation {
  name?: string;
  category_id?: string;
  deadline?: string;
  localization?: string;
  description?: string;
}

const TodoModal: React.FC<ITodoModalProps> = ({ close, success, todo }) => {
  const [preview, setPreview] = useState("");
  const refFile = useRef<HTMLInputElement>(null);

  function handleOnSubmit(data: any, setErrors: any) {
    const _data = {
      ...data,
      created: new Date(),
    };

    var formData = new FormData();

    for (var i in _data) {
      var _value = getProperty<ITodo, any>(data, i);

      if (i !== "file" && !!_value) formData.append(i, _value);
    }

    if (!!refFile.current?.files && !!refFile.current.files[0]) {
      formData.append("file", refFile.current.files[0]);
    }
    formData.append("_id", todo._id!);

    api
      .put<ITodo>("todos", formData)
      .then((response) => {
        toast.success("Todo editado com sucesso!");
        success();
        close();
      })
      .catch((e) => {
        if (e.response) {
          var _response = e.response.data;
          const _validation = errorsToValidateObj<ITodoModalValidation>(
            _response
          );
          if (_validation) setErrors(_validation);
        }
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
    <>
      <div className="modal fade show d-block" tabIndex={-1} role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content" style={{ borderRadius: "10px" }}>
            <div className="modal-header">
              <h5 className="modal-title">Editar da tarefa</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={close}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <input
                ref={refFile}
                onChange={(e) => handleImageChange(e)}
                id="image"
                name="image"
                type="file"
                className="d-none"
                accept=".jpg,.jpeg,.png"
              />

              <div className="d-flex flex-column align-items-center">
                <PhotoConatiner className="photo">
                  {(!!preview || !!todo.file_url) && (
                    <Preview
                      className="preview"
                      style={{
                        backgroundImage: `url(${preview || todo.file_url})`,
                      }}
                    />
                  )}
                </PhotoConatiner>
                <button
                  className="btn btn-md btn-link text-dark"
                  onClick={handleChangeImage}
                >
                  Selecionar imagem
                </button>
              </div>

              <Formik
                initialValues={{
                  name: todo.name,
                  deadline: todo.deadline ? new Date(todo.deadline) : null,
                }}
                validationSchema={TodoValidationSchema}
                onSubmit={(values, { setErrors }) =>
                  handleOnSubmit(values, setErrors)
                }
              >
                <Form>
                  <div className="form-group">
                    <CustomField
                      label="Titulo"
                      id="name"
                      name="name"
                      placeholder="Escreva aqui sua tarefa?"
                      aria-describedby="name"
                    />
                    <ErrorMessage
                      component="div"
                      className="invalid-feedback d-block"
                      name="name"
                    />
                  </div>

                  <div className="form-group mb-5">
                    <InputDate
                      label="Prazo de entrega"
                      name="deadline"
                      placeholder="Qual o prazo para realizar a tarefa?"
                      aria-describedby="deadline"
                    />
                    <ErrorMessage
                      component="div"
                      className="invalid-feedback d-block"
                      name="deadline"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-md btn-primary pr-5 pl-5"
                  >
                    Editar tarefa
                  </button>
                  <button
                    type="button"
                    className="btn btn-md btn-muted pr-5 pl-5"
                    onClick={close}
                  >
                    Cancelar
                  </button>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" onClick={() => close()}></div>
    </>
  );
};

export default TodoModal;
