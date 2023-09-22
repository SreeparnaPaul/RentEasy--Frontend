import { Box } from "@mui/material";
import React from "react";
import Navbar from "../Components/common/Navbar";
import { DetailsCard } from "../Components/cardPropertyDetails/DetailsCard";
import { ImageCard } from "../Components/cardPropertyDetails/ImageCard";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { LoadingButton } from "../Utils/LoadingButton";

const ShowPropertyDetails = () => {
  const location = useLocation();
  const propertyCode = location?.state;
  const [loading, setLoading] = React.useState(false);
  const [propertyDetails, setPropertyDetails] = React.useState();
  const [requestSent, setRequestSent] = React.useState();
  const token = JSON.parse(localStorage.getItem("token"));
  const userData = JSON.parse(localStorage.getItem("userData"));

  React.useEffect(() => {
    fetchPropertyDetails();
  }, []);

  const fetchPropertyDetails = async () => {
    setLoading(true);

    let apiUrl = `${process.env.REACT_APP_RENTAL}/property/getProperty?propertyCode=${propertyCode}`;

    if (token) {
      apiUrl += `&tenant=${userData?._id}`;
    }

    const response = await axios.get(apiUrl);

    console.log("Backend response:", response);
    setPropertyDetails(response?.data?.propertyFromDB);
    setRequestSent(response?.data?.isRequestSent);
    setLoading(false);
  };
  const load = <LoadingButton loader={loading} />;

  return (
    <div>
      <Navbar />
      {loading ? (
        load
      ) : (
        <Box>
          <ImageCard
            propertyDetails={propertyDetails}
            requestSent={requestSent}
          />
          <DetailsCard propertyDetails={propertyDetails} />
        </Box>
      )}
    </div>
  );
};
export default ShowPropertyDetails;
