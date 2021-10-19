import React from "react";
import { Link } from "react-router-dom";
import "./product.css";

function Product(props) {
  const { title, description, price, image, category, rating } = props.product;

  return (
    <div className="mb-2">
      <div className="container d-flex justify-content-center">
        <div className="row">
          <div className="">
            <div className="card card-body">
              <div className="media align-items-center align-items-lg-start text-center text-lg-left flex-column flex-lg-row">
                <div className="mr-2 mb-3 mb-lg-0">
                  {" "}
                  <img src={image} width="180" height="180" alt="" />
                </div>
                <div className="media-body">
                  <h6 className="media-title font-weight-semibold">
                    {" "}
                    <p data-abc="true">{title}</p>
                  </h6>
                  <ul className="list-inline list-inline-dotted mb-3 mb-lg-2">
                    <li className="list-inline-item">
                      <p href="#" className="text-muted" data-abc="true">
                        {category}
                      </p>
                    </li>
                  </ul>
                  <p className="mb-3 desc"> {description} </p>
                  <ul className="list-inline list-inline-dotted mb-0">
                    <li className="list-inline-item">
                      Total rating of {rating.rate} from {rating.count} vote
                    </li>
                  </ul>
                </div>
                <div className="mt-3 mt-lg-0 ml-lg-3 text-center">
                  <h3 className="mb-0 font-weight-semibold">${price}</h3>
                  <div>
                    {" "}
                    <i className="fa fa-star"></i>{" "}
                    <i className="fa fa-star"></i>{" "}
                    <i className="fa fa-star"></i>{" "}
                    <i className="fa fa-star"></i>{" "}
                  </div>
                  <div className="text-muted"> {rating.count} reviews</div>

                  <button
                    type="button"
                    data-toggle="modal"
                    data-target="#modalAbandonedCart"
                    onClick={() => {
                      // props.product.quantity = 1;
                      props.handleAddToCart(props.product);
                    }}
                    className="btn addtocartbtn mt-4 text-white"
                  >
                    <i className="icon-cart-add mr-2"></i> Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Modal: modalAbandonedCart--> */}
        <div
          className="modal fade bottom"
          id="modalAbandonedCart"
          tabIndex="500"
          role="dialog"
          aria-labelledby="myModalLabel"
          aria-hidden="true"
          data-backdrop="false"
        >
          <div
            className="modal-dialog modal-side modal-bottom-right modal-notify modal-info"
            role="document"
          >
            {/* <!--Content--> */}
            <div className="modal-content">
              {/* <!--Header--> */}
              <div className="modal-header">
                <p className="heading">Product Has Been Added</p>

                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true" className="white-text">
                    &times;
                  </span>
                </button>
              </div>

              {/* <!--Body--> */}
              <div className="modal-body">
                <div className="row">
                  <div className="col-3">
                    <p></p>
                    <p className="text-center">
                      <i className="fas fa-shopping-cart fa-4x"></i>
                    </p>
                  </div>

                  <div className="col-9">
                    <p>Your product has been added to the cart!</p>
                    <p>
                      You can buy more products or you can review your product
                      to check out. Happy Shopping!!
                    </p>
                  </div>
                </div>
              </div>

              {/* <!--Footer--> */}
              <div className="modal-footer justify-content-center">
                <Link to="/checkout" type="button" className="btn btn-info">
                  Review Items
                </Link>
                <a
                  type="button"
                  className="btn btn-outline-info waves-effect"
                  data-dismiss="modal"
                >
                  Continue Shopping
                </a>
              </div>
            </div>
            {/* <!--/.Content--> */}
          </div>
        </div>
        {/* <!-- Modal: modalAbandonedCart--> */}
      </div>
    </div>
  );
}

export default Product;
