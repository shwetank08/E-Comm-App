import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
const Footer = () => {
  return (
    <Navbar
      bg="dark"
      variant="dark"
      fixed="bottom"
      className="d-flex justify-content-center"
    >
      <div>
        <Nav className="me-auto">
          <Nav.Link href="#home">Facebook</Nav.Link>
          <Nav.Link href="#features">Instagram</Nav.Link>
          <Nav.Link href="#pricing">Twitter</Nav.Link>
        </Nav>
      </div>
    </Navbar>
  );
};

export default Footer;
