import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { userContext } from "../context/userContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card";

const ProductDashboard = () => {
  //for fetching product if user clicked on update
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);

  let form = new FormData();
  form.append("name", product.name);
  form.append("description", product.description);
  form.append("price", product.price);
  form.append("stock", product.stock);
  // form.append("category", product.category);

  //for populating fields to update or create
  // const [item, setItems] = useState({

  // });
  const navigate = useNavigate();
  const context = useContext(userContext);
  const id = context.productId?.id;
  const isUpdate = context.isUpdate;
  const handleGet = async () => {
    const res = await fetch(`/api/${id}/getproduct`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    setProduct(data.showOneProduct);
  };
  useEffect(() => {
    if (id) {
      handleGet();
    }
  }, [id]);

  const handleProduct = () => {
    navigate("/api/u/admindashboard/product");
  };
  const handleOrder = () => {
    navigate("/api/u/admindashboard/order");
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      
      const res = await fetch(`/api/addproduct`, {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      console.log("FORM -> ", form.get("category"));
      if (!data || res.status === 400) {
        navigate("/api/u/home");
        return alert("product could not be added");
      }
      console.log("success", data);
      setLoading(false);
      navigate("/api/u/home");
    } catch (err) {
      console.log(err);
      setLoading(false);
      return alert(err);
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      console.log(form);
      const res = await fetch(`/api/${id}/updateproduct`, {
        method: "PUT",
        body: form,
      });

      const data = await res.json();
      console.log("FORM -> ", form);
      if (!data || res.status === 400) {
        navigate("/api/u/home");
        return alert("update failed");
      }
      console.log("success", data);
      context.setProductId("");
      context.setIsUpdate(false);
      navigate("/api/u/home");
    } catch (err) {
      console.log(err);
    }
  };

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
                <span class="flex-1 ml-3 whitespace-nowrap">Orders</span>
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
                <span class="flex-1 ml-3 whitespace-nowrap no-underline">
                  Products
                </span>
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
          style={{
            width: "34rem",
            backgroundColor: "#f5f5f5",
            marginTop: "3.5rem",
          }}
          className="pl-4 pr-4 border-0"
        >
          <Card.Body className="">
            <h2 className="text-center text-black">Manage Product</h2>
            <Form>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label className="text-black">Enter Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  name="name"
                  value={product.name ? product.name : ""}
                  onChange={(e) => {
                    setProduct({ ...product, name: e.target.value });
                    form.append("name", e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label className="text-black">Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Description"
                  value={product.description ? product.description : ""}
                  onChange={(e) => {
                    setProduct({ ...product, description: e.target.value });
                    form.append("description", e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label className="text-black">Price</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Price"
                  value={product.price ? product.price : ""}
                  onChange={(e) => {
                    setProduct({ ...product, price: e.target.value });
                    form.append("price", e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label className="text-black">Stock</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Stock"
                  value={product.stock ? product.stock : ""}
                  onChange={(e) => {
                    setProduct({ ...product, stock: e.target.value });
                    form.append("stock", e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label className="text-black">Photo</Form.Label>
                <Form.Control
                  type="file"
                  controlId="formFile"
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      form.append("photos", e.target.files[0]);
                    }
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label className="text-black">Category</Form.Label>
                <select
                  value={form.get("category")}
                  onChange={(e) => {
                    setProduct({ ...product, category: e.target.value });
                    form.append("category", e.target.value);
                    console.log(form.get("category"));
                  }}
                >
                  <option value="Tees">TEES</option>
                  <option value="Hoodie">HOODIE</option>
                </select>
              </Form.Group>
              {isUpdate ? (
                loading ? (
                  <Button variant="outline-dark" className="w-100">
                    Loading.....
                  </Button>
                ) : (
                  <Button
                    variant="outline-dark"
                    type="submit"
                    className="w-100"
                    onClick={(e) => handleUpdate(e)}
                  >
                    Update
                  </Button>
                )
              ) : (
                <Button
                  variant="outline-dark"
                  type="submit"
                  className="w-100"
                  onClick={(e) => handleAdd(e)}
                >
                  Add
                </Button>
              )}
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default ProductDashboard;
