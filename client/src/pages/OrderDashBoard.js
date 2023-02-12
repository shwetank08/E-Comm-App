import React, { useContext } from 'react'
import { Navigate, useNavigate } from "react-router-dom";
import { userContext } from "../context/userContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card"

const OrderDashBoard = () => {
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
    <>
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
              onClick={handleOrder}
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
              <span class="flex-1 ml-3 whitespace-nowrap" >Orders</span>
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
    <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Card
          style={{ width: "34rem", backgroundColor: "#f5f5f5" }}
          className="p-4 border-0"
        >
          <Card.Body className="">
            <h2 className="text-center text-black">Manage Order</h2>
            <Form>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label className="text-black">Enter Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label className="text-black">Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Description"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label className="text-black">Price</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Price"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label className="text-black">Stock</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Stock"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label className="text-black">Photos</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Photos"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label className="text-black">Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Category"
                />
              </Form.Group>


              <Button
                variant="outline-dark"
                type="submit"
                className="w-100"
              >
                Update
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
      </>
  )
}

export default OrderDashBoard