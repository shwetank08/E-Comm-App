import React, { useContext } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { userContext } from "../context/userContext";

const Header = () => {
  const context = useContext(userContext);
  const user = context?.user?.userid;
  const admin = context?.user?.role;

  console.log(user)
  return (
    <Navbar
      bg="black"
      variant="dark"
      fixed="top"
      className="d-flex justify-content-around"
    >
      <div>
        <Navbar.Brand href="#home" className="text-white">
          TSHIRT STORE
        </Navbar.Brand>
      </div>
      <div>
        <Nav className="me-auto">
          <Nav.Link className="text-white">
            <NavLink
              to="/api/u/home"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              Home
            </NavLink>
          </Nav.Link>
          {admin=="ADMIN" && (
            <Nav.Link className="text-white">
              <NavLink
                to="/api/u/admindashboard"
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                Dashboard
              </NavLink>
            </Nav.Link>
          )
          }
          {user && (
            <Nav.Link className="text-white">
              <NavLink
                to="/api/u/cart"
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                Cart
              </NavLink>
            </Nav.Link>
          )}
        </Nav>
      </div>
      <div>
        <Nav>
          <Nav.Link className="text-white">
            <NavLink
              to="/api/signup"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              Sign Up
            </NavLink>
          </Nav.Link>
          <Nav.Link className="text-white">
            <NavLink
              to="/api/signin"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              Sign In
            </NavLink>
          </Nav.Link>
        </Nav>
      </div>
    </Navbar>
  );
};

export default Header;
