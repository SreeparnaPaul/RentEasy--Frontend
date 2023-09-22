import React, { useState } from "react";
import {
  Box,
  Card,
  Typography,
  CardContent,
  Grid,
  Button,
} from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import CottageIcon from "@mui/icons-material/Cottage";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SignRequest from "../../Modals/SignRequest";
import TermsModal from "../../Modals/TermsModal";
import { useNavigate } from "react-router-dom";
import RaisedrentRequest from "../../Modals/RaisedrentRequest";
import { SweetAlert } from "../../Utils/SweetAlert";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ViewMap from "../../Modals/ViewMap";
import ContactOwnerModal from "../../Modals/ContactOwnerModal";
import RentalAgreement from "../../Modals/RentalAgreement";
import VisitProperty from "../../Modals/VisitProperty";
import VisitRequests from "../../Modals/VisitRequests";
import GiveFeedback from "../../Modals/GiveFeedback";

export const ImageCard = ({ propertyDetails, requestSent }) => {
  const navigate = useNavigate();
  const [openRequestSign, setOpenRequestSign] = useState(false);
  const [openIncomingRequests, setOpenIncomingRequests] = useState(false);
  const [openMapView, setOpenMapView] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [openOwnerModal, setOpenOwnerModal] = useState(false);
  const [openVisitModal, setOpenVisitModal] = useState(false);
  const [openVisitRequestModal, setOpenVisitRequestModal] = useState(false);

  const images = [
    "https://img-v2.gtsstatic.net/reno/imagereader.aspx?imageurl=https%3A%2F%2Fsir.azureedge.net%2F1289i215%2Fp9pfmzcxrw2jm2y6dv1514hwk5i215&option=N&h=472&permitphotoenlargement=false",
    "https://www.trulia.com/pictures/thumbs_4/zillowstatic/fp/ec964c6cd8def6521ff510709b1ab123-full.jpg",
    "https://images1.forrent.com/i2/4lC69_gwOI94rWwG4YSj2w6Pz9K0GEaeBQESlWNMrmw/117/image.jpg",
  ];
  const token = JSON.parse(localStorage.getItem("token"));

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          margin: "20px",
          width: "1000px",
        }}
      >
        <CardContent
          sx={{
            textAlign: "left",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="h5" gutterBottom>
              <b>₹ {propertyDetails?.rentAmount} per month</b>
            </Typography>
            <Typography variant="body1">
              Location: {propertyDetails?.propertyAddress}
            </Typography>
          </Box>
          {openOwnerModal && (
            <ContactOwnerModal
              openModal={true}
              email={propertyDetails?.landlordEmail}
              onClick={() => setOpenOwnerModal(false)}
            />
          )}
          <Button
            variant="outlined"
            sx={{
              borderRadius: "20px",
              marginRight: "5px",
              marginTop: "5px",
            }}
            onClick={() => {
              if (token) {
                setOpenOwnerModal(true);
              } else {
                navigate("/login");
              }
            }}
          >
            Contact Owner
          </Button>
        </CardContent>

        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Carousel
            showArrows={true}
            showThumbs={false}
            autoPlay={true}
            sx={{ margin: "0 auto" }}
          >
            {images?.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt="House"
                  style={{
                    objectFit: "contain",
                    maxHeight: "100%",
                    maxWidth: "100%",
                  }}
                />
              </div>
            ))}
          </Carousel>
          <Box>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <CardContent
                sx={{
                  textAlign: "left",
                  backgroundColor: "#efeded",
                  height: "30px",
                  width: "440px",
                  marginLeft: "15px",
                }}
              >
                <Typography color="text.secondary" gutterBottom>
                  <CottageIcon
                    fontSize="medium"
                    style={{ marginRight: "10px", marginTop: "5px" }}
                  />
                  Property Code : {propertyDetails?.propertyCode}
                </Typography>
              </CardContent>
            </Box>
            <Grid
              container
              spacing={{ xs: 4, md: 2 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
              sx={{ marginTop: "15px", paddingTop: "10px" }}
            >
              <Grid item xs={6} sm={6} md={6}>
                <Feature
                  label={"Carpet Area"}
                  value={propertyDetails?.carpetArea}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <Feature
                  label={"Property Type"}
                  value={propertyDetails?.propertyType}
                />
              </Grid>{" "}
              <Grid item xs={6} sm={6} md={6}>
                <Feature
                  label={"Status"}
                  value={
                    propertyDetails?.isAvailable ? "Immediately" : "Occupied"
                  }
                />
              </Grid>{" "}
              <Grid item xs={6} sm={6} md={6}>
                <Feature
                  label={"Furnished Status"}
                  value={propertyDetails?.furnishing}
                />
              </Grid>{" "}
            </Grid>
            {openMapView && (
              <ViewMap openModal={true} onClick={() => setOpenMapView(false)} />
            )}
            <Box
              sx={{ display: "flex", cursor: "pointer" }}
              onClick={() => setOpenMapView(true)}
            >
              <h3
                style={{
                  color: "#3566AE",
                  textAlign: "left",
                  marginLeft: "20px",
                }}
              >
                See location on Map{}
                <LocationOnIcon sx={{ marginLeft: "10px", color: "red" }} />
              </h3>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            marginBottom: "20px",
            marginLeft: "10px",
          }}
        >
          {openVisitModal && (
            <VisitProperty
              openModal={true}
              propertyCode={propertyDetails?.propertyCode}
              propertyId={propertyDetails?._id}
              onClick={() => setOpenVisitModal(false)}
            />
          )}
          {openVisitRequestModal && (
            <VisitRequests
              openModal={true}
              propertyCode={propertyDetails?.propertyCode}
              propertyId={propertyDetails?._id}
              onClick={() => setOpenVisitRequestModal(false)}
            />
          )}
          {userData?.role === "Landlord" ? (
            <Button
              variant="outlined"
              sx={{
                color: "#3566AE",
                borderRadius: "20px",
                marginRight: "5px",
                marginTop: "5px",
              }}
              onClick={() => {
                if (token) {
                  setOpenVisitRequestModal(true);
                } else {
                  navigate("/login");
                }
              }}
            >
              Visit Requests
            </Button>
          ) : (
            <Button
              variant="outlined"
              sx={{
                color: "#3566AE",
                borderRadius: "20px",
                marginRight: "5px",
                marginTop: "5px",
              }}
              onClick={() => {
                if (token) {
                  setOpenVisitModal(true);
                } else {
                  navigate("/login");
                }
              }}
            >
              Visit Property
            </Button>
          )}
          {openRequestSign && (
            <RentalAgreement
              openModal={true}
              propertyCode={propertyDetails?.propertyCode}
              landlordEmail={propertyDetails?.landlordEmail}
              onClick={() => {
                setOpenRequestSign(false);
              }}
            />
          )}
          {openIncomingRequests && (
            <RaisedrentRequest
              openModal={true}
              propertyId={propertyDetails?._id}
              onClick={() => setOpenIncomingRequests(false)}
            />
          )}
          {userData?.role === "Landlord" ? (
            <Button
              variant="contained"
              sx={{
                color: "white",
                backgroundColor: "#3566AE",
                borderRadius: "20px",
                marginRight: "5px",
                marginTop: "5px",
              }}
              onClick={(e) => {
                e.preventDefault();
                if (userData?.email === propertyDetails?.landlordEmail)
                  setOpenIncomingRequests(true);
                else
                  SweetAlert(
                    "Oops!",
                    "This Property don't belong to you",
                    "error"
                  );
              }}
            >
              Incoming Rent Requests
            </Button>
          ) : requestSent ? (
            <Button
              variant="contained"
              sx={{
                color: "white",
                backgroundColor: "#3566AE",
                borderRadius: "20px",
                marginRight: "5px",
                marginTop: "5px",
              }}
              onClick={(e) => {
                e.preventDefault();

                SweetAlert(
                  "Warning!",
                  "You can request again once the owner approve or reject the request",
                  "warning"
                );
              }}
            >
              Already Requested
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{
                color: "white",
                backgroundColor: "#3566AE",
                borderRadius: "20px",
                marginRight: "5px",
                marginTop: "5px",
              }}
              onClick={() => {
                if (token) {
                  if (userData?.isKycApproved) {
                    if (propertyDetails?.isAvailable) {
                      setOpenRequestSign(true);
                    } else {
                      SweetAlert(
                        "Oops!",
                        "This Property is currently not available for rent",
                        "error"
                      );
                    }
                  } else {
                    SweetAlert("Warning!", "Please verify KYC", "warning");
                    navigate("/kycVerification");
                  }
                } else {
                  SweetAlert("Warning!", "Please login first", "warning");
                  navigate("/login");
                }
              }}
            >
              Request to Sign Agreement
            </Button>
          )}

          {/* {userData?.role === "Tenant" && isVisited ? (
            <Button
              variant="outlined"
              sx={{
                color: "#3566AE",
                borderRadius: "20px",
                marginRight: "5px",
                marginTop: "5px",
              }}
              onClick={() => setOpenFeedback(true)}
            >
              Give Feedback
            </Button>
          ) : userData?.role === "Landlord" ? (
            <Button
              variant="outlined"
              sx={{
                color: "#3566AE",
                borderRadius: "20px",
                marginRight: "5px",
                marginTop: "5px",
              }}
            >
              Received Feedbacks
            </Button>
          ) : null} */}
        </Box>
      </Card>
    </Box>
  );
};
const Feature = ({ label, value }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography color="text.secondary" gutterBottom>
        {label}
      </Typography>
      <Typography variant="h6" gutterBottom>
        <b>{value}</b>
      </Typography>
    </Box>
  );
};
