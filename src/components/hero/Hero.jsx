import React, { useEffect, useState } from "react";
import "./Hero.css";
import Guess from "../guess/Guess";

const Hero = () => {
  const words = [
    "LOVE",
    "LIFE",
    "HOPE",
    "TIME",
    "WORK",
    "HOME",
    "FEAR",
    "WIND",
    "RAIN",
    "SNOW",
    "SONG",
    "DARK",
    "MOON",
    "STAR",
    "FISH",
    "BALL",
    "JUMP",
    "FIRE",
    "FOOD",
    "PLAY",
    "HATE",
    "EYES",
    "MIND",
    "HAND",
    "GOLD",
    "ROSE",
    "TREE",
    "BIRD",
    "BOOK",
    "DOOR",
    "ROAD",
    "HILL",
    "HAIR",
    "HEAD",
    "FACE",
    "WORD",
    "BOAT",
    "SHIP",
    "DESK",
    "LAMP",
    "BEAR",
    "DUCK",
    "GAME",
    "GIFT",
    "SOCK",
    "SHOE",
    "SAND",
    "MILK",
    "CAKE",
    "HORN",
    "BOOT",
    "RING",
    "FOOT",
    "NOSE",
    "COAT",
    "SUIT",
    "SIGN",
    "SHOP",
    "BANK",
    "MAKE",
    "KIND",
    "TRUE",
    "BLUE",
    "FAST",
    "SLOW",
    "WISE",
    "GOOD",
    "FREE",
    "LUCK",
    "PURE",
    "CALL",
    "SEED",
    "GROW",
    "PLAN",
    "HOLD",
    "CALM",
    "REST",
    "POND",
    "WAVE",
  ];

  const [word, setWord] = useState(
    words[Math.floor(Math.random() * words.length)]
    // "MAKE"
  );

  const totalGuess = 8;
  const [currentGuessIndex, setCurrentGuessIndex] = useState(0);
  const [guessResults, setGuessResults] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(null);
  const [showCorrectWord, setShowCorrectWord] = useState(false);

  const handleGuessSubmit = (index, outcome) => {
    const updatedResults = [...guessResults];
    updatedResults[index] = outcome;
    setGuessResults(updatedResults);

    if (index < totalGuess - 1) {
      setCurrentGuessIndex(index + 1);
    } else {
      // If it's the last guess and the player doesn't win, end the game
      setGameOver(true);
      setShowCorrectWord(true);
    }
  };

  const handleWin = () => {
    setGameOver(true);
    setShowCorrectWord(false); // No need to show the correct word if the player wins
    const currentScore = currentGuessIndex + 1;
    if (!highScore || currentScore < highScore) {
      setHighScore(currentScore);
    }
  };

  const resetGame = () => {
    setGameOver(false);
    setShowCorrectWord(false);
    setGuessResults([]);
    setCurrentGuessIndex(0);
    setWord("MAKE"); // Reset the word, or you can randomize it if needed
  };

  return (
    <div className="hero">
      <div className="high-score">
        <h2>
          High Score:{" "}
          <span
            style={{
              fontWeight: "lighter",
            }}
          >
            {highScore || "NA"} Guesses
          </span>
        </h2>
      </div>

      {gameOver ? (
        <div className="game-over">
          {showCorrectWord && (
            <p className="correct-word">
              The correct word was: <strong>{word}</strong>
            </p>
          )}
          {!showCorrectWord && <h1>🎉 Congratulations! 🎉</h1>}
          <p>
            {showCorrectWord
              ? "Better luck next time!"
              : `You guessed the word in ${currentGuessIndex} guesses!`}
          </p>
          {highScore && !showCorrectWord && (
            <p>🏆 High Score: {highScore} guesses 🏆</p>
          )}
          <button className="play-again-btn" onClick={resetGame}>
            Play Again
          </button>
        </div>
      ) : (
        <div className="guess-container">
          {Array.from({ length: totalGuess }, (_, i) => (
            <Guess
              key={i}
              word={word}
              active={i === currentGuessIndex}
              grayedOut={i > currentGuessIndex}
              onSubmit={(outcome) => handleGuessSubmit(i, outcome)}
              onWin={handleWin}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Hero;
