import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Header = () => {
  return (
    <Navbar
      bg="dark"
      variant="dark"
      fixed="top"
      className="d-flex justify-content-around"
    >
      <div>
        <Navbar.Brand href="#home">TSHIRT STORE</Navbar.Brand>
      </div>
      <div>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
      </div>
      <div>
        <Nav>
          <Nav.Link>Sign Up</Nav.Link>
          <Nav.Link>Sign In</Nav.Link>
        </Nav>
      </div>
    </Navbar>
  );
};

export default Header;

// <Navbar.Brand href="#home">TSHIRT STORE</Navbar.Brand>
//   <Nav className="me-auto">
//     <Nav.Link href="#home">Home</Nav.Link>
//     <Nav.Link href="#features">Features</Nav.Link>
//     <Nav.Link href="#pricing">Pricing</Nav.Link>
//   </Nav>
//   <Nav>
//     <Nav.Link>Sign Up</Nav.Link>
//     <Nav.Link>Sign In</Nav.Link>
//   </Nav>
