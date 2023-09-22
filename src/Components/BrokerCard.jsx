import React from "react";
import { Box, Card, CardContent, Typography, Avatar } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";

const BrokerCard = ({ brokerDetails }) => {
  return (
    <div>
      <Box sx={{ marginLeft: "20px", marginRight: "20px", padding: "10px" }}>
        <Card>
          <CardContent>
            {" "}
            <Box sx={{ display: "flex" }}>
              <Box sx={{ width: "6%", height: "100%" }}>
                <Avatar sx={{ backgroundColor: "#3566AE" }} fontSize="small" />
              </Box>
              <Box
                sx={{
                  textAlign: "left",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <Typography sx={{ marginLeft: 1.5 }} color="text.dark">
                  Name : <b>{brokerDetails?.name}</b>
                </Typography>
                <Typography sx={{ marginLeft: 1.5 }} color="text.dark">
                  {" "}
                  Email : <b>{brokerDetails?.email}</b>
                </Typography>

                <Typography sx={{ marginLeft: 1.5 }} color="text.dark">
                  Area : <b>{brokerDetails?.area}</b>
                </Typography>
                <Typography sx={{ marginLeft: 1.5 }} color="text.dark">
                  Phone Number <b>+91 {brokerDetails?.phoneNumber}</b>
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                paddingRight: "30px",
              }}
            >
              {brokerDetails?.isKycApproved ? (
                <>
                  <CheckCircleIcon
                    color="success"
                    sx={{ marginRight: "5px" }}
                  />{" "}
                  KYC Verified
                </>
              ) : (
                <>
                  <PendingIcon color="warning" sx={{ marginRight: "5px" }} />
                  KYC Pending
                </>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default BrokerCard;
