import React from "react";
import "../../App.css";
import { faShoppingCart, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  const cartLength = props.cartLength;
  const totalAmount = props.totalAmount;

  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-white">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span>
          <FontAwesomeIcon icon={faBars} />
        </span>
      </button>

      <Link to="/" className="navbar-brand ml-2 ml-sm-auto">
        Global Store
      </Link>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
          <li className="nav-item">
            <Link to="/shop" className="nav-link">
              Shop
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/checkout" className="nav-link">
              Check out
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">
              About
            </Link>
          </li>
        </ul>
      </div>
      <div className="cart cart-btn">
        <button className="btn btn-outline-dark " type="submit">
          <FontAwesomeIcon icon={faShoppingCart} />
          <h6 style={{ display: "inline-block" }}>Cart</h6>
          <span className="badge bg-dark text-white ms-1 rounded-pill">
            {cartLength}
          </span>
        </button>
        <div className="shopping-cart">
          <p>Oedered Items: {cartLength}</p>
          <h6 style={{ color: "#DE1F56" }}>Total Amount : ${totalAmount}</h6>
          <div className="d-flex justify-content-center">
            <button className="btn btn-warning btncart">
              <Link style={{ color: "white" }} to="/checkout">
                Check out
              </Link>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
