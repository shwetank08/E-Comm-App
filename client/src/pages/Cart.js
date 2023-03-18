import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [productid, setProductId] = useState([]);
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState([]);

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
    console.log(itemlist.price);
    
  };
  const handleUpdate = async () => {
    const arr = Object.keys(localStorage);
    setProductId(arr);
    productid.forEach(async (e) => {
      getAProduct(e);
    });
  };

  const handleRemove = async(id) => {
    localStorage.removeItem(id);
    setItems((item)=>{
      item.filter((e)=>e._id!==id);
    })
  }

  const handleAmount = () => { 
    console.log(items)
    let arr = [];
    items.map((e)=>{
      let itemExist = localStorage.getItem(e._id);
      if(itemExist){
        let times = parseInt(localStorage.getItem(e._id));
        console.log(times);
        arr.push(e.price*times);
      }else{
        arr.push(e.price);
      }
    })
    console.log(arr);
    setPrice(arr);
    let sum = arr.reduce((cur, acc)=>cur+acc,0)
    console.log(sum);
    setAmount(sum);
  }

  const DisplayItems = () => {
      return (
        <>
        {items &&
          items.map((item) => {
            return (
              <Card style={{ width: "16rem"}} key={item._id}>
                <Card.Img variant="top" src={item.photos?.secure_url}/>
                <Card.Body className="flex justify-center flex-col">
                  <Card.Title className="text-center flex justify-around">
                    <Card.Text>{item.name}</Card.Text>
                    <Card.Text>&#8377;{item.price}</Card.Text>
                  </Card.Title>
                  <Card.Text className="text-center">
                    {item.description}
                  </Card.Text>
                  <Button variant="primary" onClick={()=>{handleRemove(item._id)}}>Remove</Button>
                </Card.Body>
              </Card>
            );
          })}
          </>
      )
  }

  useEffect(() => {
    handleUpdate();
  }, [productid.length]);
  useEffect(() => {
    handleAmount();
    console.log("handleAmount have been called")
  }, [items]);

  
  return (
    <Container style={{marginTop: "5rem"}}>
    <Row>
        <Col className="col-4 d-flex flex-column flex-wrap gap-1">
          <DisplayItems/>
        </Col>
      <Col className="col-8">
      <Container>
        <h1>CART CONTENT</h1>
        <h2>Amount - {amount}</h2>
      </Container>  
      </Col>
    </Row>
    </Container>

  );
};

export default Cart;
