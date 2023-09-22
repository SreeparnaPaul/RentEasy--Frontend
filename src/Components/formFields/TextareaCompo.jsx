import React from "react";
import { ErrorMessage, useField } from "formik";
import { TextField } from "@mui/material";
const TextareaCompo = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div>
      <TextField
        sx={{ m: 1, width: "90%" }}
        id="standard-multiline-static"
        label={label}
        multiline
        rows={4}
        variant="standard"
        {...field}
        {...props}
      />

      <ErrorMessage
        component="div"
        className="error"
        name={field.name}
        style={{ color: "red" }}
      />
    </div>
  );
};

export default TextareaCompo;
