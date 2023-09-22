import React, { useState } from "react";
import { Stack, Chip } from "@mui/material";

export const ChipComponent = (props) => {
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleChipClick = (chipLabel) => {
    if (selectedFilters.includes(chipLabel)) {
      setSelectedFilters(
        selectedFilters.filter((label) => label !== chipLabel)
      );
    } else {
      setSelectedFilters([...selectedFilters, chipLabel]);
    }
  };
  return (
    <Stack direction="row" spacing={1}>
      {props?.label?.map((lab) => {
        const isSelected = selectedFilters.includes(lab);
        return (
          <Chip
            key={lab}
            label={lab}
            variant={isSelected ? "filled" : "outlined"}
            color={isSelected ? "primary" : "default"}
            onClick={() => handleChipClick(lab)}
          />
        );
      })}
    </Stack>
  );
};
