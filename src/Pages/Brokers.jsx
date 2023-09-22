import React from "react";
import Navbar from "../Components/common/Navbar";
import { Grid } from "@mui/material";
import BrokerCard from "../Components/BrokerCard";
import axios from "axios";
import { LoadingButton } from "../Utils/LoadingButton";
const Brokers = () => {
  const [brokerData, setBrokerData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    fetchBrokerDetails();
  }, []);

  const fetchBrokerDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_RENTAL}/user/getUsers?role=Broker`
      );
      console.log("Backend response:", response);
      setBrokerData(response?.data?.userFromDB || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching broker data:", error);
    }
  };
  const load = <LoadingButton loader={loading} />;

  return (
    <div>
      <Navbar />
      <h2>Brokers of RentEasy</h2>
      {loading ? (
        load
      ) : (
        <div style={{ marginTop: "15px", paddingTop: "10px" }}>
          <Grid container spacing={2}>
            {brokerData &&
              brokerData?.map((broker) => (
                <Grid key={broker?._id} item xs={12} sm={6} md={6} lg={6}>
                  <BrokerCard brokerDetails={broker} />
                </Grid>
              ))}
          </Grid>
        </div>
      )}
    </div>
  );
};

export default Brokers;
