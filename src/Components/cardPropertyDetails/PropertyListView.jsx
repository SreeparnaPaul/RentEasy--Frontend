import React, { useState } from "react";
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
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { LoadingButton } from "../../Utils/LoadingButton";
import CheckCircle from "@mui/icons-material/CheckCircle";
import VerifyBrokers from "../../Modals/VerifyBrokers";
const PropertyListView = () => {
  return (
    <div style={{ width: "70%", marginTop: "10px" }}>
      <h4 style={{ margin: "20px", textAlign: "left" }}>
        Apartments & Houses for Rent in Kolkata
      </h4>
      <PropertyCard />
    </div>
  );
};

export default PropertyListView;

const PropertyCard = () => {
  const [loading, setLoading] = React.useState(false);
  const [propertyDetails, setPropertyDetails] = React.useState();
  const location = useLocation();
  const searchAddress = location?.state?.address;
  const landlordEmail = location?.state?.landlordEmail;
  const [openVerifyBrokers, setOpenVerifyBrokers] = useState(false);

  React.useEffect(() => {
    fetchPropertyList();
  }, []);
  console.log({ searchAddress, landlordEmail });
  const fetchPropertyList = async () => {
    setLoading(true);
    let apiUrl = `${process.env.REACT_APP_RENTAL}/property/getProperties`;

    if (searchAddress) {
      apiUrl += `?propertyAddress=${searchAddress}`;
    }
    if (landlordEmail) {
      apiUrl += `?landlordEmail=${landlordEmail}&role=Landlord`;
    }
    const response = await axios.get(apiUrl);

    console.log("Backend response:", response);
    setPropertyDetails(response?.data);
    setLoading(false);
  };

  const load = <LoadingButton loader={loading} />;
  return loading
    ? load
    : propertyDetails &&
        propertyDetails?.map((details) => (
          <Box key={details?._id}>
            <Card
              sx={{
                display: "flex",
                justifyContent: "space-between",
                margin: "20px",
                height: "150px",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Link to="/showProperty" state={details?.propertyCode}>
                  <CardMedia
                    component="img"
                    sx={{ width: 250 }}
                    image="https://nestaway-houses-assets.nestaway.com/uploads/webp/thumb_large_650783f5-b1f7-4e18-9bb4-0780b3448a4e.webp"
                    alt="Live from space album cover"
                  />
                </Link>
                <div
                  style={{ textAlign: "left", padding: "10px", margin: "5px" }}
                >
                  <Typography component="div" variant="h5">
                    ₹ {details?.securityDeposit} Deposit
                  </Typography>

                  <Typography component="div" variant="h6">
                    {details?.name}
                  </Typography>
                  <Typography component="div" variant="h6">
                    Location : {details?.propertyAddress}
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
                        <Chip
                          variant="outlined"
                          label="Instant Deposit Refund"
                        />
                        <Chip variant="filled" label="Managed By RentEasy" />
                      </Stack>
                      <h5> Property Code : {details?.propertyCode}</h5>
                      <Box>
                        {openVerifyBrokers && (
                          <VerifyBrokers
                            openModal={true}
                            onClick={() => setOpenVerifyBrokers(false)}
                          />
                        )}

                        <Button
                          variant="outlined"
                          onClick={() => setOpenVerifyBrokers(true)}
                        >
                          <CheckCircle
                            color="success"
                            sx={{ marginRight: "5px" }}
                          />
                          Verified By Brokers
                        </Button>
                      </Box>
                    </Box>
                  </div>
                </CardContent>
                <Box
                  sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                ></Box>
              </Box>
            </Card>
          </Box>
        ));
};
