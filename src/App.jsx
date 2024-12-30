import React from "react";
import "./App.css";
import Hero from "./components/hero/Hero";
import Navbar from "./components/navbar/Navbar";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <p className="footer">Made by Srijan Shekhar</p>
    </div>
  );
};

export default App;
