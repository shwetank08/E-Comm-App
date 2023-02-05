import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";
import Cards from "../util/Cards";


const Home = () => {
  return (
    <Container
    style={{
      marginTop:'5rem'
    }}>
      <Row>
        <Col><Cards/></Col>
        <Col><Cards/></Col>
        <Col><Cards/></Col>
      </Row>
      <Row>
      <Col><Cards/></Col>
      <Col><Cards/></Col>
      <Col><Cards/></Col>
      </Row>
    </Container>
  );
};

export default Home;
