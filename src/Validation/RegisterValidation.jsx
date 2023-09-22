import * as Yup from "yup";

export const initialValues = {
  name: "",
  email: "",
  password: "",
  phoneNumber: "",
  presentAddress: "",
  permanentAddress: "",
  role: "",
  area: "",
};
export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Enter a valid email id")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone Number is required"),
  role: Yup.string().required("Role is required"),
  area: Yup.string().test(
    "broker-area",
    "Area is required for brokers",
    function (value) {
      if (this.parent.role === "Broker") {
        return !!value;
      }
      return true;
    }
  ),
});
