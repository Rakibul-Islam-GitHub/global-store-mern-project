import React from "react";
import { Route } from "react-router-dom";
import AboutUs from "../AboutUs/AboutUs";

// this is an example :
const Shop = (props) => {
  return (
    <div>
      <Route path="/ok" component={AboutUs}></Route>
    </div>
  );
};

export default Shop;
