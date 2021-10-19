import React, { useContext, useEffect, useState } from "react";
import { getCart, saveCartData } from "../Database/databaseManager";
import NavBar from "../Header/NavBar";
import "./checkout.css";
import CheckOutBody from "./CheckOutBody";
import Footer from "../Footer/Footer";
import { userContext } from "../../App";

const CheckOut = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loggedInUser, setloggedInUser]= useContext(userContext)
  useEffect(() => {
    const useremail= localStorage.getItem('user')
    setloggedInUser({...loggedInUser, email: useremail})
    if (useremail === undefined || useremail === "") {
      const cartData = getCart();
    if (cartData) {
      setCart(JSON.parse(cartData));
    }
    }
    else{
      fetch(`http://localhost:5000/carts?u=${useremail}`,{
        method: 'GET',
        
        headers: { "Content-type": "application/json", authorization:`bearer ${localStorage.getItem("token")}` }
      })
      .then(res=>res.json())
      .then(data=>setCart(data))
      
    }
    
  }, []);

  function cartRemove(product) {
    // console.log(product);
    const pd = product;
    const newCart = cart.filter((item) => {
      const pdLeft = item.id !== pd.id;
      return pdLeft;
    });

    // console.log(newCart);
    // setCart(newCart);
    if (loggedInUser.email === undefined || loggedInUser.email === ""){
      saveCartData(JSON.stringify(newCart));
      setCart(newCart)
    }else{
      fetch(`http://localhost:5000/addcart?u=${loggedInUser.email}`, {
      method: "POST",
      headers: { "Content-type": "application/json",  authorization:`bearer ${localStorage.getItem("token")}` },
      body: JSON.stringify(newCart)
    })
      .then((res) => {
      console.log(res);
      if (res.ok) {
        setCart(newCart);
      }
    });
  }
    
  }
  // this is came from  CheckOut <= CheckOutBody <= quantititySlider
  function handleCartAfterIncrement(cart) {


    fetch(`http://localhost:5000/addcart?u=${loggedInUser.email}`, {
      method: "POST",
      headers: { "Content-type": "application/json", authorization:`bearer ${localStorage.getItem("token")}` },
      body: JSON.stringify(cart)
    })
      .then((res) => {
      
      if (res.status===200) {
        setCart(cart);
      }
    });


    
    for (let i = 0; i < cart.length; i++) {
      totalAmount = cart[i].price * cart[i].quantity + totalAmount;
    }
    let tax = (totalAmount * 0.1).toFixed(2);
    tax = tax * 1;
    let grandTotalAmount = totalAmount + tax;
    setTotalPrice(grandTotalAmount);
  }

  let totalAmount = 0;
  for (let i = 0; i < cart.length; i++) {
    totalAmount = cart[i].price + totalAmount;
    totalAmount = Math.round(totalAmount);
  }

  return (
    <div className="container">
      <NavBar totalAmount={totalAmount} cartLength={cart.length}></NavBar>

      <div className="container checkoutbody">
        <CheckOutBody
          cart={cart}
          cartRemove={cartRemove}
          handleCartAfterIncrement={handleCartAfterIncrement}
        />
      </div>

      <Footer></Footer>
    </div>
  );
};

export default CheckOut;
