import React from "react";
import "./Instructions.css";
import rule from "../../assets/rules.png";

const Instructions = ({ onClose }) => {
  return (
    <div className="instructions">
      <div className="instructions-content">
        <h2>How to Play</h2>
        <p>1. Guess the 4-letter word in 8 guesses.</p>
        <p>2. Each guess will show feedback:</p>
        <p>
          - <span style={{ color: "green", fontWeight: "bold" }}>Green</span>:
          Characters with the correct position.
        </p>
        <p>
          - <span style={{ color: "gold", fontWeight: "bold" }}>Yellow</span>:
          Characters in the word but in the wrong position.
        </p>
        <div className="image-container">
          <img src={rule} alt="Game Feedback Example" />
        </div>
        <p>3. If you guess correctly, you win!</p>
        <p>4. If you run out of guesses, the correct word will be revealed.</p>
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Instructions;
