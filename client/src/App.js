import "bootstrap/dist/css/bootstrap.min.css";
import React, {useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./Layout/Footer";
import Header from "./Layout/Header";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import ProtectedRoute from "./protectedRoute";
import { userContext } from "./context/userContext";

const App = () => {
  const [user, setUser] = useState({});
  return (
    <BrowserRouter>
    <userContext.Provider value={{user, setUser}}>
      <Header />
      
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/api/u/home" element={<Home />} />
        </Route>
        <Route path="/api/signup" element={<Signup />} />
        <Route path="/api/signin" element={<Signin />} />
      </Routes>
      <Footer />
      </userContext.Provider>

    </BrowserRouter>
  );
};

export default App;
