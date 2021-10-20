import React, { useContext, useEffect, useState } from "react";
import StripeCheckout from 'react-stripe-checkout';
import { userContext } from "../../App";
import { getCart } from "../Database/databaseManager";
import NavBar from "../Header/NavBar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Shipment = () => {
  const [loggedInUser, setloggedInUser] = useContext(userContext);
  const [cart, setCart]= useState([]);
  const [isPaid, setIsPaid]=useState(false);
  // console.log(loggedInUser);
  const style = {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    alignContent: "center",
    justifyContent: "center",
    height: "80vh",
  };

  useEffect(() => {
    const useremail= localStorage.getItem('user')
    setloggedInUser({...loggedInUser, email: useremail})
    // if (useremail === undefined || useremail === "") {
    //   const cartData = getCart();
    // if (cartData) {
    //   setCart(JSON.parse(cartData));
    // }
    // }
    
      fetch(`http://localhost:5000/carts?u=${useremail}`,{
        method: 'GET',
        
        headers: { "Content-type": "application/json", authorization:`bearer ${localStorage.getItem("token")}` }
      })
      .then(res=>res.json())
      .then(data=>setCart(data))


      
    
    
  }, [isPaid]);

  let totalAmount = 0;
  let quantity = 0;
  for (let i = 0; i < cart.length; i++) {
    totalAmount = cart[i].price * cart[i].quantity + totalAmount;
    quantity= cart[i].quantity+ quantity;
  }
  let tax = (totalAmount * 0.1).toFixed(2);
  tax = tax * 1;
  let grandTotalAmount = totalAmount + tax;
  

  const handlePayment=(token, addresses)=>{
   
    const paymentDetails= { 
      token, 
      addresses,
      product: cart,
      user: localStorage.getItem('user'),
      amount: grandTotalAmount.toFixed(2)

    }

    fetch(`http://localhost:5000/payment`, {
      method: "POST",
      headers: { "Content-type": "application/json", },
      body: JSON.stringify(paymentDetails)
    })
      .then((res) => {
      
      if (res.ok) {
        setIsPaid(true);
        toast.success('🦄 Payment Successfull!', {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }else{
        setIsPaid(false);
        toast.error('🦄 Payment failed.. try again!', {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }
    });
  }
  
  return (
    <div className="container">
      <NavBar cartShow={false}/>
      <ToastContainer />
      <div style={style} className=" d-flex align-items-center">
        {isPaid ? "You Don't Have Any Due!" :
        
        <div>
          <p>For test: card : 4242 4242 4242 4242
            <br />
            Exp: 10/25 & CVC: 123
          </p>
          
          
        <h6>Item Oedered: {cart.length}</h6>
        <h6>Total Quantity: {quantity} </h6>
        <h6>Total Amount to Pay: {grandTotalAmount.toFixed(2)}</h6>
        <StripeCheckout

            stripeKey= "pk_test_51JmWwZCbpOwsUo9S6cNlX9rMvR4pFIIUWTMnoTWVF1ya6hugfmckWHT4MpA09sVOQcbCnxaRiZx4tQUrVAF3DtdK002JGybmil"
            token= {handlePayment}
            label="PAY NOW"
            amount={grandTotalAmount.toFixed(2)*100}
            currency="USD"
            shippingAddress
            billingAddress
            
        
        
        />
        
        
      </div>
        }
       
        <div>
         
        </div>
      </div>
    </div>
  );
};

export default Shipment;
