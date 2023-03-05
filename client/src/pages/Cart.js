import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [productid, setProductId] = useState([]);

  const getAProduct = async (e) => {
    const response = await fetch(`/api/${e}/getproduct`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const data = await response.json();
    const itemlist = data.showOneProduct;
    setItems((e) => [...e, itemlist]);
  };
  const handleUpdate = async () => {
    const arr = Object.keys(localStorage);
    setProductId(arr);
    productid.forEach(async (e) => {
      getAProduct(e);
    });
  };

  useEffect(() => {
    handleUpdate();
  }, [productid.length]);

  return (
    <Row>
      <Container
        style={{
          marginTop: "5rem",
          marginBottom: "5rem",
        }}
      >
        <Col className="col-8 d-flex flex-column flex-wrap">
          {items &&
            items.map((item) => {
              return (
                <Card style={{ width: "14rem" }} key={item._id}>
                  <Card.Img variant="top" src={item.photos?.secure_url} />
                  <Card.Body className="flex justify-center flex-col">
                    <Card.Title className="text-center flex justify-around">
                      <Card.Text>{item.name}</Card.Text>
                      <Card.Text>&#8377;{item.price}</Card.Text>
                    </Card.Title>
                    <Card.Text className="text-center">
                      {item.description}
                    </Card.Text>
                    <Button variant="primary">Remove</Button>
                  </Card.Body>
                </Card>
              );
            })}
        </Col>
      </Container>
      <Col className="col-4"></Col>
    </Row>
  );
};

export default Cart;
