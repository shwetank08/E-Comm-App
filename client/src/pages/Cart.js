import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Cart = () => {
  const [items, setItems] = useState(null);

  const handleUpdate = async() => {
    const arr = Object.keys(localStorage);
    arr.forEach(async(e)=>{
      const res = fetch(`/api/${e}/getproduct`,{
        method: "GET",
        headers:{
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      })

      const data = await res.json();
      console.log(data);
    })
    
  }

  useEffect(()=>{
    handleUpdate();
  },[])

  return (
    <Row>
      <Col className="col-7">
        {items &&
          items.map((item, key) => {
            return (
              <Card style={{ width: "18rem" }} key={key}>
                <Card.Img variant="top" src={item.photos?.secure_url} />
                <Card.Body className="flex justify-center flex-col">
                  <Card.Title className="text-center flex justify-around">
                    <Card.Text>{item.name}</Card.Text>
                    <Card.Text>&#8377;{item.price}</Card.Text>
                  </Card.Title>
                  <Card.Text className="text-center">
                    {item.description}
                  </Card.Text>
                  <Button variant="primary">
                    Remove
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
      </Col>
      <Col className="col-5"></Col>
    </Row>
  );
};

export default Cart;
