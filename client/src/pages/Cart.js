import React, { useEffect, useState, useContext } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/userContext";
import Form from "react-bootstrap/Form";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [productid, setProductId] = useState([]);
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState([]);
  const [sKey, setStripeKey] = useState("");
  const [shippingAddress, setShippingAddress] = useState({
    email: "",
    address: "",
    city: "",
    state: "",
    contactNumber: "",
    postalCode: "",
  });
  const [orderItems, setOrderItems] = useState([{
    name: "",
    quantity: "",
    price: "",
    product: ""
  }]);
  const navigate = useNavigate();
  const context = useContext(userContext);
  const user_id = context.user?.userid;
  console.log(user_id);

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
    setOrderItems((e)=>[...e, {
      name: itemlist.name,
      quantity: itemlist.stock,
      price: itemlist.price,
      product: itemlist._id
    }])
    console.log(itemlist);
  };
  const handleUpdate = async () => {
    const arr = Object.keys(localStorage);
    setProductId(arr);
    productid.forEach(async (e) => {
      getAProduct(e);
    });
  };

  const handleRemove = async (id) => {
    console.log(id);
    localStorage.removeItem(id);
    setItems((item) => {
      item.filter((e) => e._id !== id);
    });
  };

  const handleAmount = async () => {
    console.log(items);
    let arr = [];
    items.map((e) => {
      let itemExist = localStorage.getItem(e._id);
      if (itemExist) {
        let times = parseInt(localStorage.getItem(e._id));
        console.log(times);
        arr.push(e.price * times);
      } else {
        arr.push(e.price);
      }
    });
    console.log(arr);
    setPrice(arr);
    let sum = arr.reduce((cur, acc) => cur + acc, 0);
    console.log(sum);
    setAmount(sum);

    try {
      let res = await axios.get("/api/stripekey");
      let k = res.data?.stripeKey;
      console.log(k);
      setStripeKey(k);
    } catch (err) {
      console.log(err);
    }
  };

  // exports.createOrder = BigPromise(async (req, res) => {
  //   const {
  //     shippingInfo,
  //     orderItems,
  //     paymentInfo,
  //     taxAmount,
  //     shippingAmount,
  //     totalAmount,
  //   } = req.body;

  //   const userid = req.params.id;

  //   const order = await Order.create({
  //     shippingInfo,
  //     user: userid,
  //     orderItems,
  //     paymentInfo,
  //     taxAmount,
  //     shippingAmount,
  //     totalAmount
  //   });

  //   res.status(200).json({
  //     success: true,
  //     order
  //   })
  // });
  const makePaymentToken = async (token) => {
    try {
      axios.post("/api/capturepayment", {
        token: token.id,
        amount: amount,
      });
      localStorage.clear();
      setItems([]);
      navigate("/api/u/home");
    } catch (err) {
      console.log(err);
    }
  };
  let form = new FormData();
  form.append("email", shippingAddress.email);
  form.append("address", shippingAddress.address);
  form.append("city", shippingAddress.city);
  form.append("state", shippingAddress.state);
  form.append("contactNumber", shippingAddress.contactNumber);
  form.append("postalCode", shippingAddress.postalCode);
  form.append("orderItems", shippingAddress.orderItems);
  form.append("totalAmount", shippingAddress.totalAmount);

  const handleShipping = async () => {
    try {
      // setOrderItems({
        
      // })
      console.log(shippingAddress);
      const response = fetch(`/api/${user_id}/order/create`, {
        method: "POST",
        body: JSON.stringify({
          email: shippingAddress.email,
          address: shippingAddress.address,
          city: shippingAddress.city,
          state: shippingAddress.state,
          contactNumber: shippingAddress.contactNumber,
          postalCode: shippingAddress.postalCode,
          orderItems: orderItems,
          totalAmount: price,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const DisplayItems = () => {
    return (
      <>
        {items &&
          items.map((item) => {
            return (
              <Card style={{ width: "16rem" }} key={item._id}>
                <Card.Img variant="top" src={item.photos?.secure_url} />
                <Card.Body className="flex justify-center flex-col">
                  <Card.Title className="text-center flex justify-around">
                    <Card.Text>{item.name}</Card.Text>
                    <Card.Text>&#8377;{item.price}</Card.Text>
                  </Card.Title>
                  <Card.Text className="text-center">
                    {item.description}
                  </Card.Text>
                  <Button
                    variant="primary"
                    onClick={(e) => {
                      handleRemove(item._id);
                    }}
                  >
                    Remove
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
      </>
    );
  };

  useEffect(() => {
    handleUpdate();
  }, [productid.length]);
  useEffect(() => {
    handleAmount();
  }, [items]);

  return (
    <Container style={{ marginTop: "5rem" }}>
      {items.length > 0 ? (
        <Row>
          <Col className="col-4 d-flex flex-column flex-wrap gap-1">
            <DisplayItems />
          </Col>
          <Col className="col-8">
            <Container>
              <h1 className="d-flex justify-center mb-2">CART CONTENT</h1>
              {items &&
                items.map((item) => {
                  return (
                    <ListGroup>
                      <ListGroup.Item variant="dark">
                        <div className="d-flex justify-between">
                          <h3 style={{ maxWidth: "100px" }}>{item.name}</h3>
                          <h4>
                            {localStorage.getItem(item._id)} X &#8377;
                            {item.price}
                          </h4>
                        </div>
                      </ListGroup.Item>
                    </ListGroup>
                  );
                })}
              <h2 className="d-flex justify-between mt-3">
                <h2>Total</h2>
                <h2>&#8377;{amount}</h2>
              </h2>

              <Form style={{ backgroundColor: "#D3D3D4", padding: "1.5rem" }}>
                <h1 className="d-flex justify-center py-2">Shipping Address</h1>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={shippingAddress.email ? shippingAddress.email : ""}
                      onChange={(e) => {
                        setShippingAddress({
                          ...shippingAddress,
                          email: e.target.value,
                        });
                      }}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="1234567890"
                      value={
                        shippingAddress.contactNumber
                          ? shippingAddress.contactNumber
                          : ""
                      }
                      onChange={(e) => {
                        setShippingAddress({
                          ...shippingAddress,
                          contactNumber: e.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridAddress1">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={
                      shippingAddress.address ? shippingAddress.address : ""
                    }
                    placeholder="1234 Main St"
                    onChange={(e) => {
                      setShippingAddress({
                        ...shippingAddress,
                        address: e.target.value,
                      });
                    }}
                  />
                </Form.Group>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      onChange={(e) => {
                        setShippingAddress({
                          ...shippingAddress,
                          city: e.target.value,
                        });
                      }}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      value={shippingAddress.state ? shippingAddress.state : ""}
                      onChange={(e) => {
                        setShippingAddress({
                          ...shippingAddress,
                          state: e.target.value,
                        });
                      }}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control
                      type="number"
                      value={
                        shippingAddress.postalCode
                          ? shippingAddress.postalCode
                          : ""
                      }
                      onChange={(e) => {
                        setShippingAddress({
                          ...shippingAddress,
                          postalCode: e.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Row>
                <StripeCheckout token={makePaymentToken} stripeKey={sKey}>
                  <Button
                    variant="primary"
                    className="mt-2 w-100"
                    onClick={handleShipping}
                  >
                    Check Out
                  </Button>
                </StripeCheckout>
              </Form>
            </Container>
          </Col>
        </Row>
      ) : (
        <h1 className="d-flex justify-center align-middle w-100 h-100">
          Cart Empty
        </h1>
      )}
    </Container>
  );
};

export default Cart;
