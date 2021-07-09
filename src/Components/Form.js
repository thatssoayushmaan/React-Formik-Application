import React from "react";
import { Form } from "formik";
import FormControl from "./FormControl";
export default function () {
  return (
    <div>
      <Form>
        <FormControl control="input" type="text" name="userId" label="userId" />
        <FormControl control="input" type="text" name="title" label="title" />
        <FormControl control="input" type="text" name="body" label="body" />
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
}
