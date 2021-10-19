import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AboutUs from "./components/AboutUs/AboutUs";
import CheckOut from "./components/CheckOut/CheckOut";

import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import PrivateRoute from "./components/Login/PrivateRoute";
import NoMatch from "./components/NoMatch/NoMatch";
import AddProducts from "./components/Product/AddProducts";
import Shipment from "./components/Shipment/Shipment";

export const userContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/shop">
            <Home page="shop"></Home>
          </Route>
          <Route path="/home">
            <Home></Home>
          </Route>
          <Route exact path="/checkout">
            <CheckOut></CheckOut>
          </Route>
          <Route path="/about">
            <AboutUs></AboutUs>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/addproduct">
            <AddProducts></AddProducts>
          </Route>
          <PrivateRoute path="/shipment">
            <Shipment></Shipment>
          </PrivateRoute>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </userContext.Provider>
  );
}

export default App;
