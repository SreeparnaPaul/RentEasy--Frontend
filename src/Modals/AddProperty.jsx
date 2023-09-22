import React, { useState } from "react";
import { Modal, Box, Typography, Grid, Button } from "@mui/material";
import { modalStyle } from "../Utils/Common";
import TextFieldCompo from "../Components/formFields/TextFieldCompo";
import TextareaCompo from "../Components/formFields/TextareaCompo";
import { Formik, Form } from "formik";
import { initialValues, validation } from "../Validation/PropertyValidation";
import axios from "axios";
import { SweetAlert } from "../Utils/SweetAlert";
import Radio from "../Components/formFields/Radio";
import { LoadingButton } from "../Utils/LoadingButton";
const AddProperty = (props) => {
  const [open, setOpen] = React.useState(props.openModal);
  const [loader, setLoader] = useState(false);
  const email = JSON.parse(localStorage.getItem("userData"))?.email;

  const handleClose = () => {
    props.onClick();
    setOpen(false);
  };
  const handleSubmit = async (values) => {
    try {
      const dataToSend = { ...values, landlordEmail: email };

      const isValid = await validation.isValid(dataToSend);

      if (isValid) {
        setLoader(true);

        const headers = {
          "Content-Type": "application/json",
        };

        const response = await axios.post(
          `${process.env.REACT_APP_RENTAL}/property/addProperty`,
          dataToSend,
          { headers }
        );
        console.log("Backend response:", response.data);

        setLoader(false);
        SweetAlert("Success", "Property added successfully", "success");

        handleClose();
        // props.setFetchProperty(true);
      } else {
        console.log("Form validation not satisfied, API call not made.");
      }
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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Property
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Formik
              initialValues={initialValues}
              validationSchema={validation}
              onSubmit={() => {}}
            >
              {(formik) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextFieldCompo
                        label="Property Name*"
                        type="text"
                        name="name"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextFieldCompo
                        label="Landmark"
                        type="text"
                        name="landmark"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextFieldCompo
                        label="Security Deposit*"
                        type="number"
                        name="securityDeposit"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextFieldCompo
                        label="Carpet Area*"
                        type="text"
                        name="carpetArea"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextFieldCompo
                        label="Furnishing Status*"
                        type="text"
                        name="furnishing"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextFieldCompo
                        label="Rent Amount*"
                        type="number"
                        name="rentAmount"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextFieldCompo
                        label="Agreement Duration*"
                        type="text"
                        name="agreementDuration"
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <TextFieldCompo
                      label="Property Type*"
                      type="text"
                      name="propertyType"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Radio
                      label="Property Available?*"
                      type="radio"
                      name="isAvailable"
                      option1="Yes"
                      option2="No"
                    />
                  </Grid>
                  <TextFieldCompo
                    label="Property Address*"
                    type="text"
                    name="propertyAddress"
                  />
                  <TextareaCompo
                    label="Description*"
                    type="text"
                    name="description"
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
                      Add
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Typography>
        </Box>
      </div>
    </Modal>
  );
};

export default AddProperty;
