import React, { useContext, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/esm/Card";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

import { userContext } from "../context/userContext";
import ProductDashboard from "./ProductDashboard";
import OrderDashBoard from "./OrderDashBoard";
import { Navigate, useNavigate } from "react-router-dom";



const AdminDashBoard = () => {
  const navigate = useNavigate();
  const context = useContext(userContext);
  console.log(context.productId?.id);

  const handleProduct = () =>{
    navigate("/api/u/admindashboard/product");
  }
  const handleOrder = () =>{
    navigate("/api/u/admindashboard/order");
  }


  return (
    <aside
      id="default-sidebar"
      class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 mt-5"
      aria-label="Sidebar"
    >
      <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul class="space-y-2">
          <li>
            <span
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 no-underline"
              >
              <svg
                aria-hidden="true"
                class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="flex-1 ml-3 whitespace-nowrap" onClick={handleOrder}>Orders</span>
            </span>
          </li>
          <li>
            <a
              class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 no-underline"
              onClick={handleProduct}
              >
              <svg
                aria-hidden="true"
                class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="flex-1 ml-3 whitespace-nowrap no-underline">Products</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default AdminDashBoard;

// <Container
// style={{
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   height: "100vh",
// }}
// >
// <Card>
// <Row className="col-5">
//     <ListGroup>
//       <ListGroup.Item variant="success">Manage Product</ListGroup.Item>
//       <ListGroup.Item variant="success">Manage Order</ListGroup.Item>
//     </ListGroup>
// </Row>
// <Row className="col-7">
//   {current == true ? (

//       <ListGroup>
//         <ListGroup.Item variant="success">Create Product</ListGroup.Item>
//         <ListGroup.Item variant="success">Update Order</ListGroup.Item>
//         <ListGroup.Item variant="success">Delete Order</ListGroup.Item>
//       </ListGroup>

//   ) : (

//       <ListGroup>
//         <ListGroup.Item variant="success">Update Order</ListGroup.Item>
//         <ListGroup.Item variant="success">Delete Order</ListGroup.Item>
//       </ListGroup>

//   )}
//   </Row>
// </Card>
// </Container>

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
