import React from "react";
import FilterCard from "../Components/filterCard/FilterCard";
import PropertyListView from "../Components/cardPropertyDetails/PropertyListView";
import Navbar from "../Components/common/Navbar";
const ListYourProperty = () => {
  return (
    <>
      <Navbar />
      <div style={{ display: "flex" }}>
        <FilterCard />
        <PropertyListView />
      </div>
    </>
  );
};

export default ListYourProperty;
