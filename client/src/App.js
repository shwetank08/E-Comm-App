import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./Layout/Footer";
import Header from "./Layout/Header";
import Home from "./pages/Home";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/api/home" element={<Home/>} />
        <Route path="/api/signup" element={<Signup/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
