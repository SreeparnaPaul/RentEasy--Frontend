import * as Yup from "yup";

const rentStartDateValidation = (value) => {
  const today = new Date();
  if (value <= today) {
    return Yup.string().min(
      today.toLocaleDateString(),
      "Rent start date must be after today's date"
    );
  }
  return Yup.string();
};

const rentEndDateValidation = (value, allValues) => {
  if (value <= allValues.rentStartDay) {
    return Yup.string().min(
      allValues.rentStartDay,
      "Rent end date must be after the start date"
    );
  }
  return Yup.string();
};

export const initialValues = {
  tenantEmail: "",
  tenantSignature: "",
  rentStartDay: "",
  rentEndDay: "",
};

export const validation = Yup.object({
  tenantEmail: Yup.string()
    .email("Enter a valid email id")
    .required("Tenant Email is required"),
  tenantSignature: Yup.string().required("Tenant Signature is required"),
  rentStartDay: Yup.date()
    .required("Select the Rent start day")
    .test(
      "rentStartDate",
      "Rent start date must be after today's date",
      rentStartDateValidation
    ),
  rentEndDay: Yup.date()
    .required("Select the Rent end day")
    .test(
      "rentEndDate",
      "Rent end date must be after the start date",
      rentEndDateValidation
    ),
});
