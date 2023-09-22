import React from "react";
import {
  Modal,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Card,
  Chip,
} from "@mui/material";
import { modalStyle } from "../Utils/Common";
import { LoadingButton } from "../Utils/LoadingButton";
import SelectCompo from "../Components/formFields/SelectCompo";
import TextareaCompo from "../Components/formFields/TextareaCompo";
import { Formik, Form } from "formik";
import {
  initialValues,
  validation,
} from "../Validation/FeedbackFormValidation";
import axios from "axios";
import { SweetAlert } from "../Utils/SweetAlert";
const GiveFeedback = (props) => {
  const [loader, setLoader] = React.useState(false);

  const userData = JSON.parse(localStorage.getItem("userData"));
  const [openFeedbackForm, setOpenFeedbackForm] = React.useState(false);

  const load = <LoadingButton loader={loader} />;

  const handleSubmit = async (values) => {
    try {
      setLoader(true);
      const headers = {
        "Content-Type": "application/json",
      };
      const data = {
        ...values,
        property: props?.visitProperty?.property?._id,
        landlord: props?.visitProperty?.landlord?._id,
        tenant: props?.visitProperty?.tenant?._id,
        visitProperty: props?.visitProperty?._id,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_RENTAL}/feedback/createFeedback`,
        data,
        { headers }
      );
      console.log("Backend response:", response.data);

      setLoader(false);
      SweetAlert("Success", "feedback given successfully", "success");

      setOpenFeedbackForm(false);
    } catch (error) {
      console.error("Error:", error);
      setLoader(false);
      SweetAlert("Failed!", error.message, "error");
    }
  };
  const feedbackForm = openFeedbackForm ? (
    <Formik
      initialValues={initialValues}
      validationSchema={validation}
      onSubmit={() => {}}
    >
      {(formik) => (
        <Form>
          <SelectCompo
            label="Provided property details are correct or not?*"
            type="text"
            name="consent"
            option1="All details are correct"
            option2="Some details are correct"
            option3="Nothing is correct"
          />

          <TextareaCompo label="Note*" type="text" name="note" />
          <div
            style={{
              margin: "10px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              type="submit"
              onClick={() => {
                const formValues = formik.values;
                handleSubmit(formValues);
              }}
            >
              Submit
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  ) : null;

  return (
    <div>
      <div>
        <LoadingButton loader={loader} />
        <Button variant="outlined" onClick={() => setOpenFeedbackForm(true)}>
          <b>Give Feedback</b>
        </Button>
        {loader ? load : feedbackForm}
      </div>
    </div>
  );
};

export default GiveFeedback;
