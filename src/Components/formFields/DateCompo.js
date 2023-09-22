import React from "react";
import { ErrorMessage, useField } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import { TextField } from "@mui/material"; // Import the TextField component

const DateCompo = ({ label, ...props }) => {
  const [field, meta] = useField(props);


  return (
    <div style={{ marginTop: "10px" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <TextField
          sx={{ m: 1, width: "90%" }}
          id="standard-basic"
          label={label}
          variant="standard"
          {...field}
          {...props}
          InputLabelProps={{ shrink: true }} 
        />
      </div>
      <ErrorMessage
        component="div"
        className="error"
        name={field.name}
        style={{ color: "red" }}
      />
    </div>
  );
};

export default DateCompo;
