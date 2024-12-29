import React from "react";
import "./App.css";
import Hero from "./components/hero/Hero";

const App = () => {
  return (
    <div className="app">
      <h1>Guess the Word</h1>
      <Hero />
    </div>
  );
};

export default App;
