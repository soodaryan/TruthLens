import React from "react";
import "./Landing.css";
import logo from "./images/TruthLens.png";
import Navbar from "./landingNav";
const  Landing= () => {
  return (
    <>
        <Navbar/>
        <div className="landing_head">
          <img src={logo} alt="FraudGuard" width="250px" height="200px" />
            <h1>TruthLens</h1>
            <p>Focus On Facts, Blur The False</p>
            
        </div>
    </>
  );
};

export default Landing;
