import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import { ChipComponent } from "./ChipComponent";

const BedroomLabel = ["Studio/1 Rk/1 bhk", "2 bhk", "3 bhk", "4 bhk+"];
const BudgetLabel = ["Below 5k", "5k-10k", "10-15k", "15-30k", "Above 30k"];
// const BudgetLabel = [{
//   label:"Below 5k",
//   min:0,
//   max:5000
// },{
//   label:"5k -10k",
//   min:5001,
//   max:10000
// },
// {
//   label:"10k -20k",
//   min:10001,
//   max:20000
// },{
//   label:"20k-50k",
//   min:20001,
//   max:50000
// }
// ];

const furnishLabel = ["Semi-furnished", "Fully-furnished", "Unfurnished"];

const nestedCard = (
  <React.Fragment>
    <Box sx={{ minWidth: 150 }}>
      <Card variant="outlined">
        <CardContent style={{ textAlign: "left" }}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            <h4>Property Type</h4>
            <ChipComponent label={BedroomLabel} />
          </Typography>
          <hr />{" "}
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            <h4>Budget</h4>
            <ChipComponent label={BudgetLabel} />
          </Typography>
          <hr />{" "}
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            <h4>Furnishing</h4>
            <ChipComponent label={furnishLabel} />
          </Typography>
          <hr />
        </CardContent>
      </Card>
    </Box>
  </React.Fragment>
);
const card = (
  <React.Fragment>
    <CardContent style={{ textAlign: "left" }}>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        <TextField
          fullWidth
          id="input-with-icon-textfield"
          label="Enter Location"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
      </Typography>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        <h4>Filters</h4>
        {nestedCard}
      </Typography>
    </CardContent>
  </React.Fragment>
);

const FilterCard = () => {
  return (
    <div style={{ width: "30%", height: "100%", marginTop: "10px" }}>
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined">{card}</Card>
      </Box>
    </div>
  );
};

export default FilterCard;
