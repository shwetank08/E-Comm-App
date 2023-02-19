import React, { useContext, useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { userContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
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
    context.setProductId({id: e});
    console.log(context.productId?.id);
    context.setIsUpdate(true);
    navigate("/api/u/admindashboard/product");    
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
        product.map((item,key) => {
          {
            console.log(item);
          }
          return (
            <Card style={{ width: "18rem" }} key={key}>
              <Card.Img variant="top" src={item.photos?.secure_url} />
              <Card.Body className="flex justify-center flex-col">
                <Card.Title className="text-center flex justify-around">
                  <Card.Text>{item.name}</Card.Text>
                  <Card.Text>&#8377;{item.price}</Card.Text>
                </Card.Title>
                <Card.Text className="text-center">{item.description}</Card.Text>
                {context.user.role == "ADMIN" ? (
                  <Button variant="primary" onClick={()=>handleAdmin(item._id)}>Update</Button>
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
