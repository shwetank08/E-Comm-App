import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Header = () => {
  return (
    <Navbar
      bg="black"
      variant="dark"
      fixed="top"
      className="d-flex justify-content-around"
    >
      <div>
        <Navbar.Brand href="#home" className="text-white">TSHIRT STORE</Navbar.Brand>
      </div>
      <div>
        <Nav className="me-auto">
          <Nav.Link href="#home" className="text-white">Home</Nav.Link>
          <Nav.Link href="#features" className="text-white">Features</Nav.Link>
          <Nav.Link href="#pricing" className="text-white">Pricing</Nav.Link>
        </Nav>
      </div>
      <div>
        <Nav>
          <Nav.Link className="text-white">Sign Up</Nav.Link>
          <Nav.Link className="text-white">Sign In</Nav.Link>
        </Nav>
      </div>
    </Navbar>
  );
};

export default Header;


