import React from "react";
import { Stack, Box, Typography } from "@mui/material";

const CouponCard = ({ coupon }) => {
  // text(title + description) ,icon image , backgroundColor (body+footer),

  const bgColor = colorCode(coupon?.color);

  return (
    <>
      <Box
        key={coupon?.id}
        bgcolor={bgColor?.body}
        width={"400px"}
        borderRadius={"10px"}
        boxShadow={"5px 5px 5px #e0dcdc"}
        style={{ cursor: "pointer" }}
      >
        <Box padding={"10px"}>
          <Stack direction="row" spacing={2}>
            <Box paddingTop={"10px"}>
              <img height="50px" src={coupon?.logo} />
            </Box>
            <Stack direction="column" spacing={1}>
              <Typography
                variant="h2"
                component="h2"
                fontSize={"15px"}
                fontWeight={"bold"}
                textAlign={"left"}
              >
                {coupon?.title}
              </Typography>
              <Typography
                variant="h6"
                component="h6"
                fontSize={"12px"}
                textAlign={"left"}
              >
                {coupon?.description}
              </Typography>
              {/* <Box>Book a home with Nestaway and get 1 month FREE Stay</Box> */}
            </Stack>
          </Stack>
        </Box>

        <Box bgcolor={bgColor?.footer} width={"400px"} height={"5px"}></Box>
      </Box>
    </>
  );
};

export default CouponCard;

const colorCode = (color) => {
  let body = "";

  let footer = "";

  switch (color) {
    case "lightBlue": {
      body = "rgb(253,223,229)";
      footer = "rgb(164,182,234)";
      break;
    }

    case "lightPink": {
      body = "rgb(240,236,247)";
      footer = "rgb(41, 17, 134)";
      break;
    }

    case "brown": {
      body = "rgb(254, 246, 240)";
      footer = "rgb(149, 71, 40)";
      break;
    }

    case "pink": {
      body = "rgb(247,222,228)";
      footer = "rgb(253,154,149)";
      break;
    }

    case "blue": {
      body = "rgb(166,184,232)";
      footer = "rgb(15,34,164)";
      break;
    }
  }

  return { body, footer };
};
