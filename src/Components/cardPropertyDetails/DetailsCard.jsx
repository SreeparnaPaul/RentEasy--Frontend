import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useState } from "react";
import { labelStyle } from "../../Utils/Common";
import { useNavigate } from "react-router-dom";
export const DetailsCard = ({ propertyDetails }) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: "5px",
      }}
    >
      <Card
        variant="outlined"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          margin: "20px",
          width: "1000px",
        }}
      >
        <CardContent style={{ textAlign: "left" }}>
          <h2>More Details</h2>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={labelStyle} color="text.secondary" gutterBottom>
              Rental Value :{" "}
            </Typography>

            <Typography sx={labelStyle} color="text.secondary" gutterBottom>
              {" "}
              <b>₹ {propertyDetails?.rentAmount} </b>
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
              Security Deposit :{" "}
            </Typography>

            <Typography sx={labelStyle} color="text.secondary" gutterBottom>
              {" "}
              <b>₹ {propertyDetails?.securityDeposit}</b>
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
              Address :{" "}
            </Typography>

            <Typography sx={labelStyle} color="text.secondary" gutterBottom>
              {" "}
              <b> {propertyDetails?.propertyAddress}</b>
            </Typography>
          </Box>
          {propertyDetails?.landmark ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={labelStyle} color="text.secondary" gutterBottom>
                Landmarks :{" "}
              </Typography>

              <Typography sx={labelStyle} color="text.secondary" gutterBottom>
                {" "}
                <b> {propertyDetails?.landmark}</b>
              </Typography>
            </Box>
          ) : null}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={labelStyle} color="text.secondary" gutterBottom>
              Furnishing :{" "}
            </Typography>

            <Typography sx={labelStyle} color="text.secondary" gutterBottom>
              {" "}
              <b> {propertyDetails?.furnishing}</b>
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
              Community Features :{" "}
            </Typography>

            <Typography sx={labelStyle} color="text.secondary" gutterBottom>
              {" "}
              <b> Gym, ClubHouse within 1 km</b>
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
              Parking Lot :{" "}
            </Typography>

            <Typography sx={labelStyle} color="text.secondary" gutterBottom>
              {" "}
              <b>Street parking ,garage parking will cost extra charge</b>
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
              Security Features:{" "}
            </Typography>

            <Typography sx={labelStyle} color="text.secondary" gutterBottom>
              {" "}
              <b>
                Fire alarm and CCTV camera's are present in the compound area
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
              Neighbourhood Facilities :{" "}
            </Typography>

            <Typography sx={labelStyle} color="text.secondary" gutterBottom>
              {" "}
              <b>
                Parks available by walking distance, School and Health Clinic
                are also available within 5 km
              </b>
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography sx={labelStyle} color="text.secondary" gutterBottom>
              Description :{" "}
            </Typography>

            <Typography sx={labelStyle} color="text.secondary" gutterBottom>
              {" "}
              <b> {propertyDetails?.description}</b>
            </Typography>
          </Box>

          
        </CardContent>
      </Card>
    </Box>
  );
};
