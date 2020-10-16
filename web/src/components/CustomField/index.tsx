import React from "react";
import { useField, Field, FieldAttributes } from "formik";

// import { Container } from './styles';

const CustomField: React.FC<FieldAttributes<any>> = ({
  label,
  className,
  ...props
}) => {
  const [, meta] = useField(props);

  return (
    <>
      {label && <label htmlFor={props.name}>{label}</label>}
      <Field
        className={`form-control ${
          meta.touched && meta.error ? "is-invalid" : ""
        } ${className}`}
        {...props}
      />
    </>
  );
};

export default CustomField;
