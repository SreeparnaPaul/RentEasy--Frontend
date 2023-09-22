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
import { LoadingButton } from "../Utils/LoadingButton";
import { labelStyle, formatTimestampWithAMPM } from "../Utils/Common";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { SweetAlert } from "../Utils/SweetAlert";
import { modalStyle } from "../Utils/Common";
import GiveFeedback from "./GiveFeedback";

const VisitRequests = (props) => {
  const [open, setOpen] = React.useState(props.openModal);
  const [loader, setLoader] = React.useState(false);

  const handleClose = () => {
    props.onClick();
    setOpen(false);
  };

  const load = <LoadingButton loader={loader} />;
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
              <b>Visit Requests</b>
            </Typography>
            {loader ? load : <VisitorsList propertyId={props?.propertyId} />}
          </Box>
        </div>
      </Modal>
    </div>
  );
};

export default VisitRequests;
export const VisitorsList = (props) => {
  const [expanded, setExpanded] = React.useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };
  const [loader, setLoader] = React.useState(false);
  const [requests, setRequests] = React.useState();
  const userData = JSON.parse(localStorage.getItem("userData"));
  React.useEffect(() => {
    fetchVisitRequests();
  }, []);

  const fetchVisitRequests = async () => {
    setLoader(true);

    let apiUrl = `${process.env.REACT_APP_RENTAL}/visitProperty/getVisitedProperties?role=${userData?.role}&userId=${userData?._id}&propertyId=${props?.propertyId}`;
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

  const approveVisit = async (visitId) => {
    try {
      setLoader(true);
      const headers = {
        "Content-Type": "application/json",
      };
      const data = {
        visitId,
      };
      const response = await axios.put(
        `${process.env.REACT_APP_RENTAL}/visitProperty/approveVisit`,
        data,
        { headers }
      );
      console.log("Backend response:", response.data);

      setLoader(false);
      SweetAlert("Success", "Physical visit approved  successfully", "success");

      fetchVisitRequests();
    } catch (error) {
      console.error("Error:", error);
      setLoader(false);
      SweetAlert("Failed!", error.message, "error");
    }
  };

  const declineVisit = async (visitId) => {
    try {
      setLoader(true);
      const headers = {
        "Content-Type": "application/json",
      };
      const data = {
        visitId,
      };
      const response = await axios.put(
        `${process.env.REACT_APP_RENTAL}/visitProperty/declineVisit`,
        data,
        { headers }
      );
      console.log("Backend response:", response.data);

      setLoader(false);
      SweetAlert("Success", "Physical visit declined  successfully", "success");

      fetchVisitRequests();
    } catch (error) {
      console.error("Error:", error);
      setLoader(false);
      SweetAlert("Failed!", error.message, "error");
    }
  };

  const callVisit = async (visitId, isVisited) => {
    try {
      setLoader(true);
      const headers = {
        "Content-Type": "application/json",
      };
      const data = {
        visitId,
        isVisited,
      };
      const response = await axios.put(
        `${process.env.REACT_APP_RENTAL}/visitProperty/callVisit`,
        data,
        { headers }
      );
      console.log("Backend response:", response.data);

      setLoader(false);
      SweetAlert(
        "Success",
        "Physical visit completed  successfully",
        "success"
      );

      fetchVisitRequests();
    } catch (error) {
      console.error("Error:", error);
      setLoader(false);
      SweetAlert("Failed!", error.message, "error");
    }
  };
  return requests?.length === 0 ? (
    <Card sx={{ display: "flex", justifyContent: "center", margin: "5px" }}>
      <h5>No visit requests</h5>
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
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
            variant="outlined"
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              {requestDetails?.status === "Approved" ||
              requestDetails?.status === "Visited" ? (
                <Typography
                  sx={{
                    width: "60%",
                    flexShrink: 0,
                  }}
                >
                  <Chip
                    sx={{ backgroundColor: "green", color: "white" }}
                    label={
                      requestDetails?.status === "Approved"
                        ? "Visit Approved"
                        : requestDetails?.status === "Visited"
                        ? "Visited"
                        : null
                    }
                  />{" "}
                  Visit Id :{requestDetails?.visitId}
                </Typography>
              ) : (
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  Visit Id :{requestDetails?.visitId}
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
                  Physical Visit Request Date :{" "}
                </Typography>

                <Typography sx={labelStyle} color="text.secondary" gutterBottom>
                  {" "}
                  <b>{formatTimestampWithAMPM(requestDetails?.visitDate)}</b>
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
                  Physical Visit Request Time :{" "}
                </Typography>

                <Typography sx={labelStyle} color="text.secondary" gutterBottom>
                  {" "}
                  <b> {requestDetails?.visitTime}</b>
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
                  Teanant's Name :{" "}
                </Typography>

                <Typography sx={labelStyle} color="text.secondary" gutterBottom>
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
                <Typography sx={labelStyle} color="text.secondary" gutterBottom>
                  Tenant's Contact :{" "}
                </Typography>

                <Typography sx={labelStyle} color="text.secondary" gutterBottom>
                  {" "}
                  <b>+91 {requestDetails?.tenant?.phoneNumber}</b>
                </Typography>
              </Box>
              {userData?.role === "Landlord" &&
              requestDetails?.status === "Requested" ? (
                <Box sx={{ display: "flex" }}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "green",
                      borderRadius: "20px",
                      marginRight: "5px",
                      marginTop: "5px",
                    }}
                    onClick={() => approveVisit(requestDetails?.visitId)}
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
                    onClick={() => declineVisit(requestDetails?.visitId)}
                  >
                    Decline
                  </Button>
                </Box>
              ) : null}
              {userData?.role === "Landlord" &&
              requestDetails?.isApproveForVisit &&
              requestDetails?.status === "Approved" ? (
                <Box sx={{ display: "flex" }}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "green",
                      borderRadius: "20px",
                      marginRight: "5px",
                      marginTop: "5px",
                    }}
                    onClick={() => callVisit(requestDetails?.visitId, true)}
                  >
                    Visited
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
                    onClick={() => callVisit(requestDetails?.visitId, false)}
                  >
                    Not Visited
                  </Button>
                </Box>
              ) : null}
              {/* {userData?.role === "Tenant" &&
              requestDetails?.status === "Visited" ? (
                <GiveFeedback visitProperty={requestDetails} />
              ) : null} */}
            </AccordionDetails>
          </Accordion>
        </Typography>
      ))
  );
};
