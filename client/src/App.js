import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./Layout/Footer";
import Header from "./Layout/Header";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import ProtectedRoute from "./protectedRoute";
import { userContext } from "./context/userContext";
import AdminDashBoard from "./pages/AdminDashBoard";
import OrderDashBoard from "./pages/OrderDashBoard";
import ProductDashboard from "./pages/ProductDashboard";

const App = () => {
  const [user, setUser] = useState(null);
  const [productId, setProductId] = useState(null);
  const [orderId, setOrderId] = useState(null);
  return (
    <BrowserRouter>
      <userContext.Provider value={{ user, setUser, productId, setProductId, orderId, setOrderId }}>
        <Header />
        <Routes>
          <Route element={<ProtectedRoute/>}>
            <Route path="/api/u/home" element={<Home />} />
          </Route>
          <Route element={<ProtectedRoute/>}>
            <Route path="/api/u/admindashboard" element={<AdminDashBoard />} />
          </Route>
          <Route element={<ProtectedRoute/>}>
            <Route path="/api/u/admindashboard/order" element={<OrderDashBoard />} />
          </Route>
          <Route element={<ProtectedRoute/>}>
            <Route path="/api/u/admindashboard/product" element={<ProductDashboard />} />
          </Route>
          <Route path="/api/signup" element={<Signup />} />
          <Route path="/api/signin" element={<Signin />} />
        </Routes>
      </userContext.Provider>
    </BrowserRouter>
  );
};

export default App;
