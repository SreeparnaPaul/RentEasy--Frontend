import React, { useState } from "react";
import { Formik, Form } from "formik";
import axios from "axios";
import { initialValues, validation } from "../Validation/SignRequestValidation";
import { Modal, Box, Typography, Button } from "@mui/material";
import { modalStyle } from "../Utils/Common";
import TextFieldCompo from "../Components/formFields/TextFieldCompo";
import DateCompo from "../Components/formFields/DateCompo";
import { LoadingButton } from "../Utils/LoadingButton";
import { SweetAlert } from "../Utils/SweetAlert";

const SignRequest = (props) => {
  const [open, setOpen] = React.useState(props.openModal);
  const [loader, setLoader] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData"));

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
                    {/* <TextFieldCompo
                      label="Property Address*"
                      type="text"
                      name="propertyAddress"
                    />

                    <TextFieldCompo
                      label="Tenant Email*"
                      type="email"
                      name="tenantEmail"
                    /> */}

                    <TextFieldCompo
                      label="Tenant Signature*"
                      type="text"
                      name="tenantSignature"
                    />

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

export default SignRequest;
