import React, { useState } from "react";
import { Formik, Form } from "formik";
import axios from "axios";
import { initialValues, validation } from "../Validation/SignRequestValidation";
import {
  Modal,
  Box,
  Typography,
  Button,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import TextFieldCompo from "../Components/formFields/TextFieldCompo";
import DateCompo from "../Components/formFields/DateCompo";
import { LoadingButton } from "../Utils/LoadingButton";
import { SweetAlert } from "../Utils/SweetAlert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TermsModal from "./TermsModal";
const RentalAgreement = (props) => {
  const [open, setOpen] = React.useState(props.openModal);
  const [loader, setLoader] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [expanded, setExpanded] = React.useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1000,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const handleClose = () => {
    props.onClick();
    setOpen(false);
  };

  const handleSubmit = async (values) => {
    console.log(values, "abc");

    try {
      const dataToSend = {
        ...values,
        propertyCode: props?.propertyCode,
        tenantEmail: userData?.email,
      };
      console.log(dataToSend, "abcsdfg");

      const isValid = await validation.isValid(dataToSend);

      if (isValid) {
        setLoader(true);

        const headers = {
          "Content-Type": "application/json",
        };

        const response = await axios.post(
          `${process.env.REACT_APP_RENTAL}/rent/requestSignAgreement`,
          dataToSend,
          { headers }
        );
        console.log("Backend response:", response.data);

        setLoader(false);
        SweetAlert(
          "Success",
          "Requested for agreement successfully",
          "success"
        );

        handleClose();
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
    <div>
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
              Request to Rent Property
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Formik
                initialValues={initialValues}
                validationSchema={validation}
                onSubmit={handleSubmit}
              >
                {(formik) => (
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Accordion
                          sx={{ textAlign: "left" }}
                          expanded={expanded === "panel1"}
                          onChange={handleChange("panel1")}
                          variant="outlined"
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                          >
                            Landlord Details
                          </AccordionSummary>
                          <AccordionDetails>
                            <TextFieldCompo
                              label="Landlord's Address*"
                              type="text"
                              name="landlordAddress"
                            />
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={6} md={6} lg={6}>
                                <TextFieldCompo
                                  label="City*"
                                  type="text"
                                  name="lCity"
                                />
                              </Grid>
                              <Grid item xs={12} sm={6} md={6} lg={6}>
                                <TextFieldCompo
                                  label="State*"
                                  type="text"
                                  name="lState"
                                />
                              </Grid>
                            </Grid>
                          </AccordionDetails>
                        </Accordion>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Accordion
                          sx={{ textAlign: "left" }}
                          expanded={expanded === "panel2"}
                          onChange={handleChange("panel2")}
                          variant="outlined"
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                          >
                            Tenant Details
                          </AccordionSummary>
                          <AccordionDetails>
                            <TextFieldCompo
                              label="Tenant's Address*"
                              type="text"
                              name="tenantAddress"
                            />
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={6} md={6} lg={6}>
                                <TextFieldCompo
                                  label="City*"
                                  type="text"
                                  name="tCity"
                                />
                              </Grid>
                              <Grid item xs={12} sm={6} md={6} lg={6}>
                                <TextFieldCompo
                                  label="State*"
                                  type="text"
                                  name="tState"
                                />
                              </Grid>
                            </Grid>
                          </AccordionDetails>
                        </Accordion>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        <TextFieldCompo
                          label="Rental Property Address*"
                          type="text"
                          name="propertyAddress"
                        />
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6} md={6} lg={6}>
                            <TextFieldCompo
                              label="City*"
                              type="text"
                              name="rCity"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={6} lg={6}>
                            <TextFieldCompo
                              label="State*"
                              type="text"
                              name="rState"
                            />
                          </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6} md={6} lg={6}>
                            <TextFieldCompo
                              label="Pincode*"
                              type="number"
                              name="pincode"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={6} lg={6}>
                            <TextFieldCompo
                              label="Monthly Rent*"
                              type="number"
                              name="rentAmount"
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        <DateCompo
                          label="Rent Start Date*"
                          type="date"
                          name="rentStartDay"
                        />

                        <DateCompo
                          label="Rent End Date*"
                          type="date"
                          name="rentEndDay"
                        />
                      </Grid>
                    </Grid>
                    <TermsModal />
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        <TextFieldCompo
                          label="Tenant Signature*"
                          type="text"
                          name="tenantSignature"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        <TextFieldCompo
                          label="Landlord Signature*"
                          type="text"
                          name="landlordSignature"
                        />
                      </Grid>
                    </Grid>
                    <div
                      style={{
                        margin: "10px",
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Button
                        style={{
                          color: "white",
                          backgroundColor: "#3566AE",
                          borderRadius: "20px",
                          marginRight: "5px",
                          width: "180px",
                          height: "30px",
                        }}
                        type="submit"
                        onClick={() => {
                          const formValues = formik.values;
                          handleSubmit(formValues);
                        }}
                      >
                        Request to Sign
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </Typography>
          </Box>
        </div>
      </Modal>
    </div>
  );
};

export default RentalAgreement;
