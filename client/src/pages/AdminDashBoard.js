import React, { useContext, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/esm/Card";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

import { userContext } from "../context/userContext";

const AdminDashBoard = () => {
  const context = useContext(userContext);
  console.log(context.productId?.id);

  const [current, setCurrent] = useState(true);
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
    <Card>
      <Row className="col-5">
          <ListGroup>
            <ListGroup.Item variant="success">Manage Product</ListGroup.Item>
            <ListGroup.Item variant="success">Manage Order</ListGroup.Item>
          </ListGroup>
      </Row>
      <Row className="col-7">
        {current == true ? (
         
            <ListGroup>
              <ListGroup.Item variant="success">Create Product</ListGroup.Item>
              <ListGroup.Item variant="success">Update Order</ListGroup.Item>
              <ListGroup.Item variant="success">Delete Order</ListGroup.Item>
            </ListGroup>
          
        ) : (
          
            <ListGroup>
              <ListGroup.Item variant="success">Update Order</ListGroup.Item>
              <ListGroup.Item variant="success">Delete Order</ListGroup.Item>
            </ListGroup>
          
        )}
        </Row>
      </Card>
    </Container>
  );
};

export default AdminDashBoard;

// <Card style={{ width: "18rem" }}>
// <Card.Img variant="top" src={e.photos?.secure_url} />
// <Card.Body className="flex justify-center flex-col">
//   <Card.Title className="text-center flex justify-around">
//     <Card.Text>{e.name}</Card.Text>
//     <Card.Text>&#8377;{e.price}</Card.Text>
//   </Card.Title>
//   <Card.Text className="text-center">{e.description}</Card.Text>
//   {console.log(context.role)}
//   {context.user.role == "ADMIN" ? (
//     <Button variant="primary">Edit</Button>
//   ) : (
//     <Button variant="primary">Add To Cart</Button>
//   )}
// </Card.Body>
// </Card>

// <div className='col-5 list-group'>
// <div className='list-group-item list-group-item-success'>Add Product</div>
// <div className='list-group-item list-group-item-success'>Update Product</div>
// <div className='list-group-item list-group-item-success'>Delete Product</div>
// </div>
// <div className='col-7'>

// </div>
