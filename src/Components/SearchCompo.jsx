import React from "react";
import { tickIcon } from "../Utils/Common";
import rentDashboard from "../Images/rent.jpg";
import { TextField, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
const SearchCompo = () => {
  const navigate = useNavigate();
  const [address, setAddress] = React.useState();
  const [error, setError] = React.useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!address?.trim()) {
      setError("Please enter a location");
    } else {
      navigate("/listProperty", {
        replace: true,
        state: { address },
      });
    }
  };
  return (
    <div className="wrapper">
      <div className="searchCompo">
        <div>
          <h1 style={{ fontSize: "60px" }}>
            Rent the smart way with RentEasy!
          </h1>
          <div
            style={{
              display: "inline-flex",
              justifyContent: "space-around",
              fontSize: "30px",
            }}
          >
            <div>
              {tickIcon}
              Great homes
            </div>
            <div>
              {tickIcon}
              Reliable services
            </div>
            <div>
              {tickIcon}
              Affordable prices
            </div>
          </div>
          <div style={{ display: "flex", margin: "30px", padding: "20px" }}>
            <TextField
              fullWidth
              sx={{ borderColor: error ? "#f44336" : "#3566AE" }}
              id="outlined"
              label={error ? "Error: " + error : "Enter Location"}
              variant="outlined"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                setError("");
              }}
              placeholder="Enter Location"
              error={!!error}
            />
            <Button
              type="submit"
              style={{
                backgroundColor: "#3566AE",
                color: "white",
                width: "150px",
              }}
              onClick={handleSearch}
            >
              <SearchIcon /> Search
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "20px",
              padding: "10px",
            }}
          >
            <Stack direction="row" spacing={1}>
              <Chip
                icon={<HomeWorkIcon color="primary" />}
                label="Do you own a property? List here"
              />
              <Chip
                icon={<LocationOnIcon color="danger" />}
                label="Rent homes at great prices"
                variant="outlined"
              />
            </Stack>
          </div>
        </div>
        <img src={rentDashboard} alt="icon" height="500px" />
      </div>
    </div>
  );
};

export default SearchCompo;
