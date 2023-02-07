import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Cards from "../util/Cards";

const Home = () => {
  const [product, setProduct] = useState(null);

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

      // itemlist.map((e) => {
      //   const { name, description, price, stock } = e;
      //   const photourl = e.photos?.secure_url;
      //   setProduct({
      //     name: name,
      //     price: price,
      //     stock: stock,
      //     description: description,
      //     imageurl: photourl,
      //   });
      //   console.log(product);
      // });
    }
  };

  useEffect(() => {
    fetchProducts();
    console.log(product)
  }, []);

  return (
    <Container
      style={{
        marginTop: "5rem",
        marginBottom: "5rem"
      }}
    >
      {product &&
        product.map((e) => {
          {console.log(e.photos?.secure_url)}
         return ( <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={e.photos?.secure_url} />
            <Card.Body>
              <Card.Title>{e.name}</Card.Title>
              <Card.Text>
                {e.description}
              </Card.Text>
              <Button variant="primary">Add To Cart</Button>
            </Card.Body>
          </Card>);
        })}
    </Container>
  );
};

export default Home;
