import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import { modalStyle } from "../Utils/Common";
import { LoadingButton } from "../Utils/LoadingButton";
import { SweetAlert } from "../Utils/SweetAlert";
const TermsModal = (props) => {
  const [open, setOpen] = React.useState(props.openModal);
  const [loader, setLoader] = useState(false);

  const handleClose = () => {
    props.onClick();
    setOpen(false);
  };
  const [agreed, setAgreed] = useState(false);

  const handleCheckboxChange = () => {
    setAgreed(!agreed);
  };

  const handleSubmit = (event) => {
    setLoader(true);
    event.preventDefault();
    SweetAlert(
      "Success",
      "You are agreed to the terms and conditions",
      "success"
    );
    props.onAgree();
    setLoader(false);
    // handleClose();
    console.log("Form submitted successfully!");
  };
  return (
    <div>
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      > */}
      <div>
        {/* <LoadingButton loader={loader} /> */}
        {/* <Box sx={modalStyle}> */}
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ color: "red" }}
        >
          Terms & Conditions **
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          1. This property is for residential use only.
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          2. Pets like only dogs and cats are allowed and should not create any
          disturbance to the community area and neighberhoods.
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          3. Any damage to the property by tenant should be instantly informed
          to the landlord and repair cost will be adjustable by both parties.
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {" "}
          4. Tenant will be responsible for any loss of his/her personal
          belongings.
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {" "}
          5. Monthly payment should be done within 1-15th of every month and
          incase of any emergency please inform the landlord within that time.
          Consideration will depend upon landlord.
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControlLabel
            required
            control={
              <Checkbox
                checked={agreed}
                onChange={handleCheckboxChange}
                name="agreed"
              />
            }
            label="I agree to all of the above terms and conditions"
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="submit"
              variant="outlined"
              sx={{ borderRadius: "20px", color: "#3566AE", height: "30px" }}
            >
              Agree
            </Button>
          </Box>
        </form>
        {/* </Box> */}
      </div>
      {/* </Modal> */}
    </div>
  );
};

export default TermsModal;
