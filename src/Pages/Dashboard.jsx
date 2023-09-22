import React from "react";
import Navbar from "../Components/common/Navbar";
import SearchCompo from "../Components/SearchCompo";
import CouponListView from "../Components/coupon/CouponListView";

const Dashboard = () => {
  return (
    <>
      <div>
        <Navbar />
        <div className="wrapper">
          <SearchCompo />
          <CouponListView />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
