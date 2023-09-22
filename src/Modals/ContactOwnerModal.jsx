import React from "react";
import { Modal, Box, Typography, CardContent } from "@mui/material";
import { modalStyle, labelStyle } from "../Utils/Common";
import axios from "axios";
import { LoadingButton } from "../Utils/LoadingButton";
const ContactOwnerModal = (props) => {
  const [open, setOpen] = React.useState(props.openModal);
  const [loading, setLoading] = React.useState(false);
  const [owner, setOwner] = React.useState();
  const handleClose = () => {
    props.onClick();
    setOpen(false);
  };
  React.useEffect(() => {
    fetchOwner();
  }, []);

  const fetchOwner = async () => {
    setLoading(true);

    const response = await axios.get(
      `${process.env.REACT_APP_RENTAL}/user/getUser/${props?.email}`
    );

    console.log("Backend response:", response);
    setOwner(response?.data?.userFromDB);
    setLoading(false);
  };
  const load = <LoadingButton loader={loading} />;

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Contact Owner
          </Typography>
          {loading ? (
            load
          ) : (
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={labelStyle} color="text.secondary" gutterBottom>
                  Owner Name :{" "}
                </Typography>

                <Typography sx={labelStyle} color="text.secondary" gutterBottom>
                  {" "}
                  <b>{owner?.name}</b>
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={labelStyle} color="text.secondary" gutterBottom>
                  Owner Email :{" "}
                </Typography>

                <Typography sx={labelStyle} color="text.secondary" gutterBottom>
                  {" "}
                  <b>{owner?.email}</b>
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={labelStyle} color="text.secondary" gutterBottom>
                  Phone Number :{" "}
                </Typography>

                <Typography sx={labelStyle} color="text.secondary" gutterBottom>
                  {" "}
                  <b> +91 {owner?.phoneNumber}</b>
                </Typography>
              </Box>
              <Typography color="#3566AE" gutterBottom>
                **Kindly contact owner for any other details.**
              </Typography>
            </CardContent>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ContactOwnerModal;
