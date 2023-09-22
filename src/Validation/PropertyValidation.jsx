import * as Yup from "yup";
export const initialValues = {
  landlordEmail: "",
  name: "",
  landmark: "",
  propertyAddress: "",
  rentAmount: "",
  agreementDuration: "",
  description: "",
  isAvailable: "",
};

export const validation = Yup.object({
  landlordEmail: Yup.string()
    .email("Enter a valid email id")
    .required("Email is required"),
  name: Yup.string().required("Property name is required"),
  propertyAddress: Yup.string().required("Property address is required"),
  rentAmount: Yup.number().required("Rent amount is required"),
  securityDeposit: Yup.number().required("Security Deposit is required"),
  agreementDuration: Yup.string().required("Agreement duration is required"),
  carpetArea: Yup.string().required("Carpet Area is required"),
  furnishing: Yup.string().required("Furnishing Status is required"),
  propertyType: Yup.string().required("Property Type is required"),
  description: Yup.string().required("Description is required"),
  isAvailable: Yup.boolean().required(
    "Please select the property is available or not"
  ),
});
