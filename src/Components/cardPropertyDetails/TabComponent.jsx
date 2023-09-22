import React from "react";
import { Tab, Tabs, Box } from "@mui/material";
const TabComponent = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Bed" />
          <Tab label="Rooms" />
          <Tab label="House" />
        </Tabs>
      </Box>
    </div>
  );
};

export default TabComponent;
