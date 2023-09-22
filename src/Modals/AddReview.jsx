import React, { useState } from "react";
import { Modal, Box, Typography, Button, Rating } from "@mui/material";
import { modalStyle } from "../Utils/Common";
import TextFieldCompo from "../Components/formFields/TextFieldCompo";
import TextareaCompo from "../Components/formFields/TextareaCompo";
import { Formik, Form } from "formik";
import { initialValues, validation } from "../Validation/ReviewValidation";
import axios from "axios";
import { SweetAlert } from "../Utils/SweetAlert";
import { LoadingButton } from "../Utils/LoadingButton";
const Addreviews = (props) => {
  const [open, setOpen] = React.useState(props.openModal);
  const [loader, setLoader] = useState(false);
  const [value, setValue] = useState(0);

  const handleClose = () => {
    props.onClick();
    setOpen(false);
  };
  const handleSubmit = async (values) => {};
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
            Add Reviews
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Formik
              initialValues={initialValues}
              validationSchema={validation}
              onSubmit={() => {}}
            >
              {(formik) => (
                <Form>
                  <Typography component="legend">Rating</Typography>
                  <Rating
                    name="rating"
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  />

                  <TextFieldCompo label="Name*" type="text" name="name" />

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

export default Addreviews;
