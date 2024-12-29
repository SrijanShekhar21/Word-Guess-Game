import React, { useState, useEffect, useRef } from "react";
import "./Guess.css";

const Guess = ({ word, active, grayedOut, onSubmit, onWin }) => {
  const [guess, setGuess] = useState(["", "", "", ""]);
  const [matchRight, setMatchRight] = useState(0);
  const [matchWrong, setMatchWrong] = useState(0);
  const [submittedGuess, setSubmittedGuess] = useState(false); // Tracks if the guess has been submitted
  const inputRefs = useRef([]); // Array of refs for the input boxes

  useEffect(() => {
    if (active && inputRefs.current[0]) {
      inputRefs.current[0].focus(); // Auto-focus the first input field if active
    }
  }, [active]);

  const calculateMatches = () => {
    let right = 0;
    let wrong = 0;
    const wordArray = word.split("");
    const usedIndices = new Set();

    // First pass: Check for right position matches
    guess.forEach((letter, index) => {
      if (letter === wordArray[index]) {
        right++;
        usedIndices.add(index);
      }
    });

    // Second pass: Check for wrong position matches
    guess.forEach((letter, index) => {
      if (letter !== wordArray[index] && wordArray.includes(letter)) {
        const matchIndex = wordArray.findIndex(
          (char, i) => char === letter && !usedIndices.has(i)
        );
        if (matchIndex !== -1) {
          wrong++;
          usedIndices.add(matchIndex);
        }
      }
    });

    setMatchRight(right);
    setMatchWrong(wrong);
    return { right, wrong };
  };

  const handleSubmit = () => {
    if (active && !submittedGuess && guess.join("").length === 4) {
      const { right, wrong } = calculateMatches();
      const outcome = {
        guess: guess.join(""),
        matchRight: right,
        matchWrong: wrong,
      };
      setSubmittedGuess(true); // Mark the guess as submitted
      onSubmit(outcome);

      // Check for win condition
      if (guess.join("") === word) {
        onWin(); // Trigger win callback
      }
    }
  };

  const handleInputChange = (index, value) => {
    if (!/^[A-Za-z]?$/.test(value)) return; // Allow only single alphabet letters

    const newGuess = [...guess];
    newGuess[index] = value.toUpperCase();
    setGuess(newGuess);

    if (value && index < 3) {
      // Auto-focus the next input if not the last box
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !guess[index] && index > 0) {
      // Move focus to the previous input if empty
      inputRefs.current[index - 1].focus();
    }
    if (e.key === "Enter" && guess.join("").length === 4) {
      // Submit when Enter is pressed and all boxes are filled
      handleSubmit();
    }
  };

  return (
    <div
      className={`guess ${active ? "active" : ""} ${
        grayedOut ? "grayed-out" : ""
      }`}
    >
      <div className="input-group">
        {guess.map((letter, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)} // Attach the ref to the input field
            type="text"
            value={letter}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            maxLength={1}
            disabled={!active || submittedGuess} // Disable input if not active or already submitted
          />
        ))}
      </div>
      <div className="results">
        <div className="results-display">
          <div className="circle green">{matchRight}</div>
          <div className="circle yellow">{matchWrong}</div>
        </div>
      </div>
    </div>
  );
};

export default Guess;
