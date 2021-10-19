import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { saveCartData } from "../Database/databaseManager";
import QuantitySlider from "../QuantitySlider/QuantitySlider";

import "./checkout.css";

const CheckOutBody = (props) => {
  let carts = props.cart;

  let totalAmount = 0;

  for (let i = 0; i < carts.length; i++) {
    totalAmount = carts[i].price * carts[i].quantity + totalAmount;
  }

  let tax = (totalAmount * 0.1).toFixed(2);
  tax = tax * 1;
  let grandTotalAmount = totalAmount + tax;
  // setTotalPrice(grandTotalAmount);

  function handlePriceAfterIncrement(pd) {
    const indx = carts.findIndex((item) => item.id === pd.id);
    let newCart = carts;
    newCart[indx] = pd;
    carts = newCart;
    // console.log(carts);
    saveCartData(JSON.stringify(newCart));
    props.handleCartAfterIncrement(newCart);
  }

  return (
    <div id="checkout" className="row panel-wrapper mt-4">
      <div className="col-md-8">
        <div className="col-12 panel-header basket-header">
          <div className="row">
            <div className="col-6 basket-title">
              <span className="emphasized">Cart Summary</span>
              <br />
              <span className="emphasized text-muted">
                Ordered Items: {carts.length}
              </span>
            </div>
            <div className="col-6 order-number align-right">
              <span className="description">order #</span>
              <br />
              <span className="emphasized">A001</span>
            </div>
          </div>
          <div className="row column-titles padding-top-10">
            <div className="col-2 align-center">
              <span>Photo</span>
            </div>
            <div className="col-5 align-center">
              <span>Name</span>
            </div>
            <div className="col-2 align-center">
              <span>Quantity</span>
            </div>
            <div className="col-3 align-right">
              <span>Price</span>
            </div>
          </div>
        </div>
        <div className="col-12 panel-body basket-body">
          {carts.map((pd) => {
            return (
              <div key={pd.id * Math.random()} className="row product">
                <div className="col-2 product-image">
                  <button
                    onClick={() => props.cartRemove(pd)}
                    className="pdremovebtn"
                  >
                    <span className="removebtn">
                      <FontAwesomeIcon
                        style={{ fontSize: "13px" }}
                        icon={faTimes}
                      />
                    </span>
                  </button>
                  <img src={pd.image} alt="product-img" />
                </div>

                <div className="col-5">
                  <p className="tp">{pd.title}</p>
                  <br />
                </div>
                <div className="col-2 align-left">
                  {/* <span className="">unit : </span>
                  {pd.quantity} */}
                </div>
                <div className="col-3 align-right">
                  <p className="tp">${pd.price}</p>
                </div>

                <QuantitySlider
                  handlePriceAfterIncrement={handlePriceAfterIncrement}
                  product={pd}
                ></QuantitySlider>
              </div>
            );
          })}
        </div>
        <div className="col-12 panel-footer basket-footer">
          <hr />
          <div className="row">
            <div className="col-8 align-right description">
              <div className="dive">Subtotal</div>
            </div>
            <div className="col-4 align-right">
              <span className="emphasized">${totalAmount.toFixed(2)}</span>
            </div>
            <div className="col-8 align-right description">
              <div className="dive">Taxes(10%)</div>
            </div>
            <div className="col-4 align-right">
              <span className="emphasized">${tax}</span>
            </div>
            <div className="col-8 align-right description">
              <div className="dive">Shipping</div>
            </div>
            <div className="col-4 align-right">
              <span className="emphasized">Free</span>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-8 align-right description">
              <div className="dive">Total</div>
            </div>
            <div className="col-4 align-right">
              <span className="very emphasized">
                ${grandTotalAmount.toFixed(2)}
              </span>
            </div>

            <Link className="confirmbtn" to="/shipment">
              {" "}
              <div className="confirmbtn">
                <button>Proceed To Checkout</button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutBody;
