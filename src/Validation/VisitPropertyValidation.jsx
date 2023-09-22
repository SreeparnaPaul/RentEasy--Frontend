import * as Yup from "yup";

export const initialValues = {
  visitDate: "",
  visitTime: "",
};
export const validation = Yup.object({
  visitDate: Yup.date().required("Visit date is required"),
  visitTime: Yup.string().required(" Visit time is required"),
});
