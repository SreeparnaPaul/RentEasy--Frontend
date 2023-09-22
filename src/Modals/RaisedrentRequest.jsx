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
import { labelStyle, formatTimestampWithAMPM } from "../Utils/Common";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { SweetAlert } from "../Utils/SweetAlert";

const RaisedrentRequest = (props) => {
  const [open, setOpen] = React.useState(props.openModal);
  const [loader, setLoader] = React.useState(false);
  const [requests, setRequests] = React.useState();
  const userData = JSON.parse(localStorage.getItem("userData"));

  const handleClose = () => {
    props.onClick();
    setOpen(false);
  };
  const [expanded, setExpanded] = React.useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };
  React.useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoader(true);

    let apiUrl = `${process.env.REACT_APP_RENTAL}/rent/getRequests?role=${userData?.role}&userId=${userData?._id}`;

    if (userData?.role === "Landlord") {
      apiUrl += `&propertyId=${props?.propertyId}`;
    }

    try {
      const response = await axios.get(apiUrl);
      console.log("Backend response:", response);
      setRequests(response?.data?.requests);
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoader(false);
    }
  };
  const load = <LoadingButton loader={loader} />;

  const approveAgreement = async (requestId, landlordSignature) => {
    try {
      setLoader(true);
      const headers = {
        "Content-Type": "application/json",
      };
      const data = {
        requestId,
        landlordSignature,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_RENTAL}/rent/approveAgreement`,
        data,
        { headers }
      );
      console.log("Backend response:", response.data);

      setLoader(false);
      SweetAlert(
        "Success",
        "Agreement approved for payment successfully",
        "success"
      );

      handleClose();
    } catch (error) {
      console.error("Error:", error);
      setLoader(false);
      SweetAlert("Failed!", error.message, "error");
    }
  };

  const makePayment = async (
    propertyId,
    landlordId,
    tenantId,
    rentalDetailsId
  ) => {
    try {
      setLoader(true);
      const headers = {
        "Content-Type": "application/json",
      };
      const data = {
        propertyId,
        landlordId,
        tenantId,
        rentalDetailsId,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_RENTAL}/payment/makePayment`,
        data,
        { headers }
      );
      console.log("Backend response:", response.data);

      setLoader(false);
      SweetAlert(
        "Success",
        "Payment completed and agreement signed successfully",
        "success"
      );

      handleClose();
    } catch (error) {
      console.error("Error:", error);
      setLoader(false);
      SweetAlert("Failed!", error.message, "error");
    }
  };

  const requestCompo =
    requests?.length === 0 ? (
      <Card sx={{ display: "flex", justifyContent: "center", margin: "5px" }}>
        <h5>
          {userData?.role === "Landlord"
            ? "No Incoming Rent Requests"
            : "No Raised Rent Requests"}
        </h5>
      </Card>
    ) : (
      requests &&
      requests?.map((requestDetails, index) => (
        <Typography
          id="modal-modal-description"
          sx={{ mt: 2 }}
          key={requestDetails?._id}
        >
          <Accordion
            sx={{ textAlign: "left" }}
            expanded={expanded === index}
            onChange={handleChange(index)}
            variant="outlined"
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              {requestDetails?.status === "AgreementSigned" ? (
                <Typography
                  sx={{
                    width: "50%",
                    flexShrink: 0,
                  }}
                >
                  <Chip
                    sx={{ backgroundColor: "green", color: "white" }}
                    label="Rented"
                  />{" "}
                  Request Id : {requestDetails?.requestId}{" "}
                </Typography>
              ) : (
                <Typography sx={{ width: "50%", flexShrink: 0 }}>
                  Request Id : {requestDetails?.requestId}{" "}
                </Typography>
              )}
            </AccordionSummary>
            <AccordionDetails>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={labelStyle} color="text.secondary" gutterBottom>
                  Request Rent Date :{" "}
                </Typography>

                <Typography sx={labelStyle} color="text.secondary" gutterBottom>
                  {" "}
                  <b>
                    {formatTimestampWithAMPM(
                      requestDetails?.requestForRentDate
                    )}{" "}
                  </b>
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
                  Rent Start Date :{" "}
                </Typography>

                <Typography sx={labelStyle} color="text.secondary" gutterBottom>
                  {" "}
                  <b>{requestDetails?.rentStartDay}</b>
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
                  Rent End Date :{" "}
                </Typography>

                <Typography sx={labelStyle} color="text.secondary" gutterBottom>
                  {" "}
                  <b>{requestDetails?.rentEndDay}</b>
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
                  Status :{" "}
                </Typography>

                <Typography sx={labelStyle} color="text.secondary" gutterBottom>
                  {" "}
                  <b>{requestDetails?.status}</b>
                </Typography>
              </Box>
              {userData?.role === "Landlord" ? (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      sx={labelStyle}
                      color="text.secondary"
                      gutterBottom
                    >
                      Tenant Name :{" "}
                    </Typography>

                    <Typography
                      sx={labelStyle}
                      color="text.secondary"
                      gutterBottom
                    >
                      {" "}
                      <b>{requestDetails?.tenant?.name}</b>
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      sx={labelStyle}
                      color="text.secondary"
                      gutterBottom
                    >
                      Tenant Email :{" "}
                    </Typography>

                    <Typography
                      sx={labelStyle}
                      color="text.secondary"
                      gutterBottom
                    >
                      {" "}
                      <b>{requestDetails?.tenant?.email}</b>
                    </Typography>
                  </Box>
                </>
              ) : (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      sx={labelStyle}
                      color="text.secondary"
                      gutterBottom
                    >
                      Property Name :{" "}
                    </Typography>

                    <Typography
                      sx={labelStyle}
                      color="text.secondary"
                      gutterBottom
                    >
                      {" "}
                      <b>{requestDetails?.property?.name}</b>
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      sx={labelStyle}
                      color="text.secondary"
                      gutterBottom
                    >
                      Landlord Email :{" "}
                    </Typography>

                    <Typography
                      sx={labelStyle}
                      color="text.secondary"
                      gutterBottom
                    >
                      {" "}
                      <b>{requestDetails?.landlord?.email}</b>
                    </Typography>
                  </Box>
                </>
              )}
              {userData?.role === "Landlord" &&
              requestDetails?.status === "RequestedForRent" ? (
                <Box sx={{ display: "flex" }}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "green",
                      borderRadius: "20px",
                      marginRight: "5px",
                      marginTop: "5px",
                    }}
                    onClick={() =>
                      approveAgreement(
                        requestDetails?.requestId,
                        userData?.name
                      )
                    }
                  >
                    Approve
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      backgroundColor: "red",
                      color: "white",
                      borderRadius: "20px",
                      marginRight: "5px",
                      marginTop: "5px",
                    }}
                  >
                    Decline
                  </Button>
                </Box>
              ) : null}
              {requestDetails?.status === "ApprovedForPayment" ? (
                userData?.role === "Landlord" ? (
                  <Typography color="#3566AE" gutterBottom>
                    {" "}
                    <b>** Waiting for Tenant's Payment **</b>
                  </Typography>
                ) : (
                  <Box
                    sx={{
                      marginTop: "5px",
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={() =>
                        makePayment(
                          requestDetails?.property?._id,
                          requestDetails?.landlord?._id,
                          requestDetails?.tenant?._id,
                          requestDetails?._id
                        )
                      }
                    >
                      Make Payment
                    </Button>
                    <Typography
                      color="red"
                      sx={{ marginTop: "5px" }}
                      gutterBottom
                    >
                      {" "}
                      <b>
                        **Please pay within 5 days, otherwise your request will
                        cancel automatically**
                      </b>
                    </Typography>
                  </Box>
                )
              ) : null}
            </AccordionDetails>
          </Accordion>
        </Typography>
      ))
    );

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
              <b>
                {userData?.role === "Landlord"
                  ? "Incoming Rent Requests"
                  : "Raised Rent Requests"}
              </b>
            </Typography>
            {loader ? load : requestCompo}
          </Box>
        </div>
      </Modal>
    </div>
  );
};

export default RaisedrentRequest;
