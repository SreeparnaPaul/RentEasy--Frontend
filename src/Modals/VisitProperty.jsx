import React from "react";
import { Modal, Button, Typography, Box } from "@mui/material";
import { LoadingButton } from "../Utils/LoadingButton";
import { Formik, Form } from "formik";
import { modalStyle } from "../Utils/Common";
import {
  initialValues,
  validation,
} from "../Validation/VisitPropertyValidation";
import DateCompo from "../Components/formFields/DateCompo";
import TextFieldCompo from "../Components/formFields/TextFieldCompo";
import { VisitorsList } from "./VisitRequests";
import axios from "axios";
import { SweetAlert } from "../Utils/SweetAlert";
const VisitProperty = (props) => {
  const [open, setOpen] = React.useState(props.openModal);
  const [loader, setLoader] = React.useState(false);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [openForm, setOpenForm] = React.useState(false);

  const handleClose = () => {
    props.onClick();
    setOpen(false);
  };
  const handleSubmit = async (values) => {
    try {
      setLoader(true);
      const headers = {
        "Content-Type": "application/json",
      };
      const data = {
        ...values,
        propertyCode: props?.propertyCode,
        tenantEmail: userData?.email,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_RENTAL}/visitProperty/requestVisit`,
        data,
        { headers }
      );
      console.log("Backend response:", response.data);

      setLoader(false);
      SweetAlert(
        "Success",
        "Physically visit property request send successfully",
        "success"
      );

      setOpenForm(false);
    } catch (error) {
      console.error("Error:", error);
      setLoader(false);
      SweetAlert("Failed!", error.message, "error");
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div>
        <LoadingButton loader={loader} />
        <Box sx={modalStyle}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Visit Property Physically
            </Typography>
            <Button variant="outlined" onClick={() => setOpenForm(true)}>
              Schedule
            </Button>
          </Box>
          {openForm ? (
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Formik
                initialValues={initialValues}
                validationSchema={validation}
                onSubmit={() => {}}
              >
                {(formik) => (
                  <Form>
                    <DateCompo
                      label="Select Visit Date"
                      type="date"
                      name="visitDate"
                    />
                    <TextFieldCompo
                      label="Visit Time"
                      type="string"
                      name="visitTime"
                    />
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
                        Visit
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </Typography>
          ) : null}
          <VisitorsList propertyId={props?.propertyId} />
        </Box>
      </div>
    </Modal>
  );
};

export default VisitProperty;
