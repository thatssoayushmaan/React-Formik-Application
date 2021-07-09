import React from "react";
import { Field, ErrorMessage } from "formik";

export default function Input({ label, name, type }) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Field id={name} name={name} type={type} />
      <ErrorMessage name={name}>
        {(props) => {
          return <div>{props}</div>;
        }}
      </ErrorMessage>
    </div>
  );
}
