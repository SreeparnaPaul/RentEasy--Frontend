import React from "react";
import { Stack, Box, Typography } from "@mui/material";
import CouponCard from "./CouponCard";
import "./CouponListView.css";

const CouponListView = () => {
  const couponList = [
    {
      id: 1,
      title: "Zero Deposit Homes",
      description:
        "applicable on selected houses. *T&C apply. Coupon code is not required",
      logo: "https://nestaway-assets.nestaway.com/refonte/precompiled-assets/src/assets/images/eqaro/zeroDepositSrp-3b912c586ddb172ce65ebce9731065e5.png",
      color: "lightBlue",
    },
    {
      id: 2,
      title: "Get 1 month FREE Stay",
      description: "Book a home with Nestaway and get 1 month FREE Stay",
      logo: "https://nestaway-assets.nestaway.com/refonte/precompiled-assets/src/assets/images/offers/offer-green-3d415573c7e62e8c9e562f1823ed8377.png",
      color: "lightPink",
    },
    {
      id: 3,
      title: "Pay with 0% EMI",
      description: "Pay security deposit & rent with easy EMIs at 0% interest",
      logo: "https://nestaway-assets.nestaway.com/refonte/precompiled-assets/src/assets/images/offers/offer-yellow-6f6e16084d4ddc0b9c56f9de088c9f70.png",
      color: "pink",
    },
    {
      id: 4,
      title: "Instant deposit refund",
      description:
        "Guaranteed security deposit within 1-7 days when vacated. Valid on selected houses",
      logo: "https://nestaway-assets.nestaway.com/refonte/precompiled-assets/src/assets/images/common/idr-02781155a3000e59b2c460213bee901b.png",
      color: "brown",
    },
    {
      id: 5,
      title: "Refer owner & earn Rs 1000",
      description:
        "Refer your previous owner or a friend who owns a house and is looking for tenants",
      logo: "https://nestaway-assets.nestaway.com/refonte/precompiled-assets/src/assets/images/offers/refer-owner-c48a34a3913056353b52056e1f93ee6a.png",
      color: "blue",
    },
    {
      id: 6,
      title: "Refer tenants & earn Rs 1000",
      description:
        "Refer 5 or more tenants and win a trip to Goa, plus 1k bonus for each successful referral",
      logo: "https://nestaway-assets.nestaway.com/refonte/precompiled-assets/src/assets/images/offers/refer-tenant-1faef4453fbf12ed8091ca33bbf76c03.png",
      color: "lightBlue",
    },
  ];

  return (
    <>
      <Box overflow={"scroll"} className="custom-scroll" marginBottom={"50px"}>
        <Stack direction="row" spacing={2}>
          {couponList &&
            couponList?.map((coupon) => <CouponCard coupon={coupon} />)}
        </Stack>
      </Box>
    </>
  );
};

export default CouponListView;
