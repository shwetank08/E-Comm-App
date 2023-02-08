import React, { useContext, useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { userContext } from "../context/userContext";

const Home = () => {
  const [product, setProduct] = useState(null);
  const context = useContext(userContext);
  const fetchProducts = async () => {
    const items = await fetch("/api/getallproducts", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const data = await items.json();
    if (data) {
      const itemlist = data.showAllProduct;
      setProduct(itemlist);
    }
  };

  const handleAdmin = (e) => {
    console.log(e);
  }

  useEffect(() => {
    fetchProducts();
    console.log(product);
  }, []);

  return (
    <Container
      style={{
        marginTop: "5rem",
        marginBottom: "5rem",
      }}
      className="flex flex-wrap gap-3"
    >
      {product &&
        product.map((item) => {
          {
            console.log(item);
          }
          return (
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={item.photos?.secure_url} />
              <Card.Body className="flex justify-center flex-col">
                <Card.Title className="text-center flex justify-around">
                  <Card.Text>{item.name}</Card.Text>
                  <Card.Text>&#8377;{item.price}</Card.Text>
                </Card.Title>
                <Card.Text className="text-center">{item.description}</Card.Text>
                {console.log(context.role)}
                {context.user.role == "ADMIN" ? (
                  <Button variant="primary" onClick={(item)=>handleAdmin(item)}>Edit</Button>
                ) : (
                  <Button variant="primary">Add To Cart</Button>
                )}
              </Card.Body>
            </Card>
          );
        })}
    </Container>
  );
};

export default Home;
