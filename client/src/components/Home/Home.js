import React, { useContext, useEffect, useState } from "react";
import "../../App.css";
import { faShoppingCart, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../Header/Header";
import Product from "../Product/Product";
import { Link, useLocation } from "react-router-dom";
import {  useHistory } from "react-router";

import { getCart, saveCartData } from "../Database/databaseManager";
import { userContext } from "../../App";
import logout from "../Login/logout";

const Home = (props) => {
  let location = useLocation();
  const history = useHistory();

  let marginstyle = { marginTop: "120px" };
  if (location.pathname === "/shop") {
    marginstyle = { marginTop: "20px" };
  }
  
  const [loggedInUser, setloggedInUser] = useContext(userContext);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalBuy, setTotalBuy] = useState(0);
  
  useEffect(() => {
    const useremail= localStorage.getItem('user')
  const token= localStorage.getItem('token')
    
    setloggedInUser({...loggedInUser, email: useremail})
    
    console.log(useremail)
    fetch("http://localhost:5000/products", {
      method: "GET",
    })
      .then((res) => res.json())
      
      .then((data) =>{
        
        setProducts(data)
      });
      
    
    if (useremail === null || useremail ==="") {
      const cartData = getCart();
      console.log("from local_storage", useremail)
    if (cartData) {
      setCart(JSON.parse(cartData));
    }
    }
    else{
      console.log("from user", useremail)
      fetch(`http://localhost:5000/carts?u=${loggedInUser.email}`,{
        method: 'GET',
        headers: {
          authorization:`bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'}
      })
      .then(res=>{
        if (res.status===401) {
          history.push('/login')
        }
        console.log(res)
        return res.json()
      })
      .then(data=>{
        console.log(data)
        if (data) {
          setCart(data)
        }
        })
      
    }
  }, []);

  const saveCartToDB = (item) => {
    

    fetch(`http://localhost:5000/addcart?u=${loggedInUser.email}`, {
      method: "POST",
      headers: { "Content-type": "application/json", authorization:`bearer ${localStorage.getItem("token")}` },
      body: JSON.stringify(item)
    })
      .then((res) => {
      console.log(res);
    });
  };
  function handleAddToCart(product) {
    product.user=loggedInUser.email;
    setTotalBuy(totalBuy + 1);
    // console.log("from add to cart button", product);
    // const cartData = getCart();
    // setCart(JSON.parse(cartData));

    if (cart.length > 0) {
      const existing = cart.find(({ id }) => id === product.id);

      // debugger;
      if (existing !== undefined) {
        const others = cart.filter(({ id }) => id !== existing.id);
        console.log("1st", existing.quantity);
        let quantity = existing.quantity;
        console.log("2nd", quantity);
        existing.quantity = quantity + 1;
        console.log("existing", existing);
        const newCart = others.concat(existing);
        // const newCart = [...others, existing];
        console.log("new array", existing.quantity);
        // const qniqueProduct = [...new Set(newCart)];
        // newCart.user=loggedInUser.email;
        setCart(newCart);
        if (loggedInUser.email === undefined || loggedInUser.email === null || loggedInUser.email === "") {
          saveCartData(JSON.stringify(newCart));
        } else {
          saveCartToDB(newCart);
        }
      } else {
        
        product.quantity = 1;
        const newCart = [...cart, product];
        const qniqueProduct = newCart;
        console.log("cart", cart);
        // qniqueProduct.user=loggedInUser.email;
        setCart(qniqueProduct);
       
    
      setCart(qniqueProduct);
        if (loggedInUser.email === null || loggedInUser.email === "") {
          saveCartData(JSON.stringify(qniqueProduct));
        } else {
          saveCartToDB(qniqueProduct);
        }
      }
    } else {
     
      product.quantity = 1;
      const newCart = [...cart, product];
      // const {id , user, quantity} = newCart[0];
      // qniqueProduct.user=loggedInUser.email;
      setCart(newCart);
      if (loggedInUser.email === null || loggedInUser.email === "") {
          saveCartData(JSON.stringify(newCart));
        } else {
          saveCartToDB(newCart);
        }
        console.log("cart added 1st time", cart);
    }
  }

  // cart calculation
  let totalAmount = 0;
  if (cart) {
    for (let i = 0; i < cart.length; i++) {
      totalAmount = cart[i].price * cart[i].quantity + totalAmount;
      totalAmount = Math.round(totalAmount);
    }
  }

  // console.log(totalAmount);

  return (
    <div className="container">
      {/* <NavBar totalAmount={totalAmount} cartLength={cart.length}></NavBar> */}
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

        <Link className="navbar-brand ml-2 ml-sm-auto" to="/">
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
            <li className="nav-item">
            {loggedInUser.email? <Link to="/" style={{color: "#e80808", fonWeight:"700"}} className="nav-link" onClick={()=>{
              setCart(JSON.parse(localStorage.getItem('cart')))
              setloggedInUser({...loggedInUser, email:""})
              logout();
            }} >Log-out</Link> : <Link onClick={()=>{}} style={{color: "#2fb60d"}} className="nav-link" to="/login">Login</Link>}
            </li>
          </ul>
        </div>
        {/* <div className="login">
        
            {loggedInUser.email? <button onClick={()=>{
              setloggedInUser({...loggedInUser, email:""})
              logout();
            }} >Log out</button> : <button><Link to="/login">Login</Link></button>}
          
        </div> */}
        <div className="cart cart-btn">
          <button className="btn btn-outline-dark " type="submit">
            <FontAwesomeIcon icon={faShoppingCart} />
            <h6 style={{ display: "inline-block" }}>Cart</h6>
            <span className="badge bg-dark text-white ms-1 rounded-pill">
              {cart&& cart.length}
            </span>
          </button>
          <div className="shopping-cart">
            <p>Oedered Items: {cart&& cart.length}</p>
            <p>Total products: {totalBuy}</p>
            <h6 style={{ color: "#DE1F56" }}>Total Amount : ${totalAmount}</h6>
            <div className="d-flex justify-content-center">
              <button className="btn btn-warning btncart">
                <Link style={{ color: "white" }} to="/checkout">
                  {" "}
                  Check out
                </Link>
              </button>
            </div>
          </div>
        </div>
      </nav>
      {/* conditional rendering, if it's shop route then it won't display header component */}
      {props.page === undefined ? (
        <div className="row header-card">
          <Header></Header>
        </div>
      ) : (
        ""
      )}

      <div style={marginstyle} id="product" className="product">
        <h2 className="text-center  mb-3">All Products</h2>

        {products.map((pd) => {
          return (
            <Product
              handleAddToCart={handleAddToCart}
              product={pd}
              key={pd.id}
            ></Product>
          );
        })}
      </div>

      <footer className="py-5 bg-dark">
        <div className="container">
          <p className="m-0 text-center text-white">
            {" "}
            &copy;
            <a href="https://www.linkedin.com/in/rakibul21">
              {" "}
              Design & developed by Rakibul - 2021{" "}
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
