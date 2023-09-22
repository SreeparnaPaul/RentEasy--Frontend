import * as Yup from "yup";
export const initialValues = {
  name: "",
  rating: 0,
  description: "",
  
};

export const validation = Yup.object({
  name: Yup.string().required("Name is required"),
  rating: Yup.number()
  .required("Rating is required"),
  description: Yup.string().required("Description is required"),
});
