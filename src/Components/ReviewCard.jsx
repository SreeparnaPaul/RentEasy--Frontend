import { Card, Box, CardContent, Avatar, Typography } from "@mui/material";
import React from "react";
import StarRateIcon from "@mui/icons-material/StarRate";

const ReviewCard = () => {
  return (
    <div>
      <Box>
        <Card variant="outlined" sx={{ boxShadow: "10px 10px 10px #e0dcdc" }}>
          <CardContent>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ width: "10%", height: "100%" }}>
                <Avatar sx={{ backgroundColor: "#3566AE" }} />
              </Box>
              <Box sx={{ textAlign: "left" }}>
                <Typography
                  sx={{ marginLeft: 1.5 }}
                  color="text.dark"
                  variant="h5"
                >
                  <b>Neha Roy</b>
                </Typography>
                <Box sx={{ display: "flex" }}>
                  <Typography
                    sx={{ marginLeft: 1.5 }}
                    color="text.secondary"
                    variant="h5"
                  >
                    <StarRateIcon sx={{ color: "gold" }} />
                    <StarRateIcon sx={{ color: "gold" }} />
                    <StarRateIcon sx={{ color: "gold" }} />
                    <StarRateIcon sx={{ color: "gold" }} />
                    <StarRateIcon sx={{ color: "gold" }} />
                  </Typography>
                  <Typography sx={{ marginLeft: 1.5 }} color="text.secondary">
                    {" "}
                    2 months ago
                  </Typography>
                </Box>
                <Typography sx={{ marginLeft: 1.5 }} color="text.dark">
                  <b>Verified Tenant</b>
                </Typography>
                <Typography sx={{ marginLeft: 1.5 }} color="text.secondary">
                  In publishing and graphic design, Lorem ipsum is a placeholder
                  text commonly used to demonstrate the visual form of a
                  document or a typeface without relying on meaningful content.
                  Lorem ipsum may be used as a placeholder before final copy is
                  available.
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default ReviewCard;
