import React, { useContext } from "react";
import { userContext } from "../../App";
import NavBar from "../Header/NavBar";

const Shipment = () => {
  const [loggedInUser, setloggedInUser] = useContext(userContext);
  console.log(loggedInUser);
  const style = {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    alignContent: "center",
    justifyContent: "center",
    height: "80vh",
  };
  return (
    <div className="container">
      <NavBar />

      <div style={style} className=" d-flex align-items-center">
        <div>
          <h2>Welcome {loggedInUser.name}</h2>
        </div>
        <div>
          <p>shipping method & payment option comming soon.....</p>
        </div>
      </div>
    </div>
  );
};

export default Shipment;
