import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { userContext } from "../context/userContext";
const Signup = () => {

  const context = useContext(userContext);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/signup', {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          password: user.password,
        }),
      });

      const data = await res.json();
      if (!data || data.status === 400) {
        return alert("user not signed up!");
      }else{
        context.setUser({userid: data.user._id, role: data.user.role, productId: ""})
        console.log('user signed up')
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
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
          <h2 className="text-center text-black">Sign Up</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label className="text-black">Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                onChange={(e) => {
                  setUser({ ...user, name: e.target.value });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label className="text-black">Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                onChange={(e) => {
                  setUser({ ...user, email: e.target.value });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label className="text-black">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                onChange={(e) => {
                  setUser({ ...user, password: e.target.value });
                }}
              />
            </Form.Group>

            <Button
              variant="outline-dark"
              type="submit"
              className="w-100"
              onClick={handleSubmit}
            >
              SIGN UP
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Signup;
