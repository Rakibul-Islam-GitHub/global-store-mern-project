import React from "react";
import "./header.css";
import logo1 from "../../images/w1.png";
import logo2 from "../../images/w2.png";
import logo3 from "../../images/w3.png";
import HeaderCard from "./HeaderCard";

function Header() {
  return (
    <div>
      <header className="bg-dark py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="text-center text-white">
            <h1 className="display-4 fw-bolder">
              Grab Your Desired Product Now!
            </h1>
            <p className="lead fw-normal text-white-50 mb-0">
              You Can Buy From a Thousands of Options
            </p>
            <div className="mt-3">
              <a className="btn1" href="#product">
                Shop Now
              </a>
            </div>
          </div>
        </div>
      </header>
      <div className="d-flex header-card">
        <HeaderCard img={logo1} heading="FAST DELIVERY"></HeaderCard>
        <HeaderCard img={logo2} heading="FREE SHIPING"></HeaderCard>
        <HeaderCard img={logo3} heading="BEST QUALITY"></HeaderCard>
      </div>
    </div>
  );
}

export default Header;
