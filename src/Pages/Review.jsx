import { Box, Button, Grid } from "@mui/material";
import React from "react";
import Navbar from "../Components/common/Navbar";
import ReviewCard from "../Components/ReviewCard";
import Addreviews from "../Modals/AddReview";

const Review = () => {
  const [openReview, setOpenReview] = React.useState(false);
  return (
    <div>
      <Navbar />
      <Box sx={{ margin: "10px" }}>
        {openReview && (
          <Addreviews openModal={true} onClick={() => setOpenReview(false)} />
        )}
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          {/* <Button variant="contained" onClick={() => setOpenReview(true)}>
            Post a Review
          </Button> */}
        </Box>

        <Grid
          container
          spacing={{ xs: 4, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{ margin: "15px", padding: "10px" }}
        >
          <Grid item xs={2} sm={4} md={4}>
            <ReviewCard />
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <ReviewCard />
          </Grid>{" "}
          <Grid item xs={2} sm={4} md={4}>
            <ReviewCard />
          </Grid>{" "}
          <Grid item xs={2} sm={4} md={4}>
            <ReviewCard />
          </Grid>{" "}
          <Grid item xs={2} sm={4} md={4}>
            <ReviewCard />
          </Grid>{" "}
          <Grid item xs={2} sm={4} md={4}>
            <ReviewCard />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Review;
