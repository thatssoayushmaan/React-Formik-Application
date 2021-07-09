import React from "react";
import Input from "./Input";
export default function FormControl(props) {
  const { control, ...items } = props;
  switch (control) {
    case control:
      return <Input {...items} />;
    default:
      return;
  }
}
