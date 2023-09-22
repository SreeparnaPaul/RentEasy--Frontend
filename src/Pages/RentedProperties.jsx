import React from "react";
import Navbar from "../Components/common/Navbar";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { LoadingButton } from "../Utils/LoadingButton";
import { formatTimestampWithAMPM, labelStyle } from "../Utils/Common";
import {
  Card,
  Box,
  Typography,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Stack,
} from "@mui/material";
import ContactOwnerModal from "../Modals/ContactOwnerModal";
const RentedProperties = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [rentalDetails, setRentalDetails] = React.useState();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [openOwnerModal, setOpenOwnerModal] = React.useState(false);

  React.useEffect(() => {
    fetchRentedPropertyList();
  }, []);

  const fetchRentedPropertyList = async () => {
    setLoading(true);

    const response = await axios.get(
      `${process.env.REACT_APP_RENTAL}/rent/getRentedProperties?userId=${userData?._id}`
    );

    console.log("Backend response:", response);
    setRentalDetails(response?.data);
    setLoading(false);
  };

  const load = <LoadingButton loader={loading} />;

  const rentalProperties =
    rentalDetails?.length === 0 ? (
      <Card sx={{ display: "flex", justifyContent: "center", margin: "5px" }}>
        <h5>No Rented Properties</h5>
      </Card>
    ) : (
      rentalDetails &&
      rentalDetails?.map((details) => (
        <Box key={details?._id} sx={{ display: "flex", height: "280px" }}>
          <Card
            sx={{
              display: "flex",
              justifyContent: "space-between",
              margin: "20px",
              width: "60%",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <CardMedia
                component="img"
                sx={{ width: 350 }}
                image="https://nestaway-houses-assets.nestaway.com/uploads/webp/thumb_large_650783f5-b1f7-4e18-9bb4-0780b3448a4e.webp"
                alt="Live from space album cover"
              />

              <div
                style={{ textAlign: "left", padding: "10px", margin: "5px" }}
              >
                <Typography component="div" variant="h5">
                  ₹ {details?.property?.securityDeposit} Deposit
                </Typography>
                <Typography component="div" variant="h6">
                  Rent Amount : ₹ {details?.property?.rentAmount} per month
                </Typography>
                <Typography component="div" variant="h6">
                  {details?.property?.name}
                </Typography>
                <Typography component="div" variant="h6">
                  Carpet Area :{details?.property?.carpetArea}
                </Typography>
                <Typography component="div" variant="h6">
                  Location : {details?.property?.propertyAddress}
                </Typography>

                <Typography component="div" variant="h6">
                  Owner : {details?.landlord?.name}
                </Typography>
              </div>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Box sx={{ textAlign: "right" }}>
                    <Stack direction="row" spacing={1}>
                      <Chip variant="outlined" label="Instant Deposit Refund" />
                      <Chip variant="filled" label="Managed By RentEasy" />
                    </Stack>
                    {openOwnerModal && (
                      <ContactOwnerModal
                        openModal={true}
                        email={details?.landlord?.email}
                        onClick={() => setOpenOwnerModal(false)}
                      />
                    )}
                    <Button
                      variant="outlined"
                      sx={{
                        borderRadius: "20px",
                        marginRight: "5px",
                        marginTop: "15px",
                      }}
                      onClick={() => setOpenOwnerModal(true)}
                    >
                      Contact Owner
                    </Button>
                    <h5> Property Code : {details?.property?.propertyCode}</h5>
                  </Box>
                </div>
              </CardContent>
            </Box>
          </Card>
          <Card variant="outlined" sx={{ width: "35%", height: "260px" }}>
            <CardContent style={{ textAlign: "left", height: "250px" }}>
              <h4>Rented Property Details</h4>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={labelStyle} color="text.secondary" gutterBottom>
                  Request Id :{" "}
                </Typography>

                <Typography sx={labelStyle} color="text.secondary" gutterBottom>
                  {" "}
                  <b>{details?.requestId} </b>
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
                  Request Rent Date :{" "}
                </Typography>

                <Typography sx={labelStyle} color="text.secondary" gutterBottom>
                  {" "}
                  <b>{formatTimestampWithAMPM(details?.requestForRentDate)} </b>
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
                  Request Accepting Date :{" "}
                </Typography>

                <Typography sx={labelStyle} color="text.secondary" gutterBottom>
                  {" "}
                  <b>
                    {formatTimestampWithAMPM(
                      details?.requestAcceptingDateByLandlord
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
                  <b>{details?.rentStartDay} </b>
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
                  <b>{details?.rentEndDay}</b>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
      ))
    );
  return (
    <div>
      <Navbar />
      <h4 style={{ textAlign: "left", margin: "20px" }}>
        My Rented Properties
      </h4>
      {loading ? load : rentalProperties}
    </div>
  );
};

export default RentedProperties;
