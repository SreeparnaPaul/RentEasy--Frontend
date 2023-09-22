import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Chip from "@mui/material/Chip";
import React from "react";
import { useNavigate } from "react-router-dom";

function Back() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1); // This is equivalent to history.goBack()
  };
  return (
    <div style={{ display: "flex", justifyContent: "flex-start" }}>
      <Chip
        icon={
          <ArrowBackIosIcon
            color="primary"
            fontSize="large"
            style={{ cursor: "pointer" }}
          />
        }
        onClick={() => handleGoBack()}
        style={{ padding: 20, marginBottom: 10 }}
        label="Back"
      />
    </div>
  );
}

export default Back;
