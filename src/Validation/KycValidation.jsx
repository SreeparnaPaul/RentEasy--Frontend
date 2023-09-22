import * as Yup from "yup";

export const initialValues = {
  aadharNumber: "",
  panNumber: ""
};

export const validation = Yup.object({
  aadharNumber: Yup.string()
    .matches(/^\d{12}$/, "Aadhar number must be 12 digits")
    .required("Aadhar Number is required"),
  panNumber: Yup.string()
    .matches(
      /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/,
      "Enter a valid PAN number"
    )
    .required("Pan number is required"),
});
