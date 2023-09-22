import * as Yup from "yup";
export const initialValues = {
  email: "",
  role: "",
  password: "",
};
export const validation = Yup.object({
  email: Yup.string()
    .email("Enter a valid email id")
    .required("Email is required"),
  role: Yup.string().required("Role is required"),
  password: Yup.string().required("Password is required"),
});
