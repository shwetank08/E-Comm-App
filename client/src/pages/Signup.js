import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

const Signup = () => {
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card bg="dark" text="light" style={{ width: "18rem" }}>
        <Card.Header className="text-center">Sign Up</Card.Header>
        <Card.Body></Card.Body>
      </Card>
    </Container>
  );
};

export default Signup;
