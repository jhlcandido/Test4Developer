import React from "react";
import { useField, FieldAttributes } from "formik";

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pt from "date-fns/locale/pt-BR";
registerLocale("pt-BR", pt);

const InputDate: React.FC<FieldAttributes<any>> = ({
  placeholder,
  label,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);

  console.log("field", { field, meta, helpers });

  return (
    <div className="w-100">
      {label && <label htmlFor={props.name}>{label}</label>}
      <DatePicker
        name={props.name}
        className={`form-control w-100 ${
          meta.touched && meta.error ? "is-invalid" : ""
        }`}
        locale="pt-BR"
        dateFormat="dd/MM/yyyy"
        autoComplete="off"
        selected={meta.value}
        placeholderText={placeholder}
        onBlur={field.onBlur}
        onChange={(date, e) => {
          helpers.setValue(date);
          field.onChange(e);
        }}
      />
    </div>
  );
};

export default InputDate;
