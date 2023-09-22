import React from "react";
import { ErrorMessage, useField } from "formik";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const Radio = ({ label, option1, option2, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, width: "90%" }}>
        <InputLabel id="demo-simple-select-standard-label">{label}</InputLabel>

        <Select
          sx={{ textAlign: "left" }}
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          name="isAvailable"
          label={label}
          {...field}
          {...props}
        >
          <MenuItem value={true}>{option1}</MenuItem>
          <MenuItem value={false}>{option2}</MenuItem>
        </Select>
      </FormControl>
      <ErrorMessage
        component="div"
        className="error"
        name={field.name}
        style={{ color: "red" }}
      />
    </div>
  );
};

export default Radio;
