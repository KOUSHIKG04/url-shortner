import React from "react";
import "./App.css";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Toaster />
      <Home />
    </>
  );
};

export default App;
