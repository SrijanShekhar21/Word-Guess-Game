import React, { useState } from "react";
import "./Navbar.css";
import Instructions from "../instructions/Instructions";

const Navbar = () => {
  const [showInstructions, setShowInstructions] = useState(false);

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  return (
    <div className="navbar">
      <h1>Guess the Word</h1>
      <button className="help-btn" onClick={toggleInstructions}>
        ?
      </button>
      {showInstructions && <Instructions onClose={toggleInstructions} />}
    </div>
  );
};

export default Navbar;
