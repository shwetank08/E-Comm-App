import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
const Footer = () => {
  return (
    <Navbar
      bg="black"
      variant="dark"
      fixed="bottom"
      className="d-flex justify-content-center"
    >
      <div>
        <Nav className="me-auto">
          <Nav.Link href="#home" className="text-white">Facebook</Nav.Link>
          <Nav.Link href="#features" className="text-white">Instagram</Nav.Link>
          <Nav.Link href="#pricing" className="text-white">Twitter</Nav.Link>
        </Nav>
      </div>
    </Navbar>
  );
};

export default Footer;
