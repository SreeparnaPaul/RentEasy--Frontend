import * as Yup from "yup";

export const initialValues = {
  consent: "",
  note: "",
};
export const validation = Yup.object({
  consent: Yup.string().required("Please select any option"),
  note: Yup.string().required("Note is required"),
});
