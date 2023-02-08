import React from 'react'
import Container from 'react-bootstrap/esm/Container'

const AdminDashBoard = () => {
  return (
    <Container>
        <div className='col-5 list-group'>
            <div className='list-group-item list-group-item-success'>Add Product</div>
            <div className='list-group-item list-group-item-success'>Update Product</div>
            <div className='list-group-item list-group-item-success'>Delete Product</div>
        </div>
        <div className='col-7'>
        <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={e.photos?.secure_url} />
              <Card.Body className="flex justify-center flex-col">
                <Card.Title className="text-center flex justify-around">
                  <Card.Text>{e.name}</Card.Text>
                  <Card.Text>&#8377;{e.price}</Card.Text>
                </Card.Title>
                <Card.Text className="text-center">{e.description}</Card.Text>
                {console.log(context.role)}
                {context.user.role == "ADMIN" ? (
                  <Button variant="primary">Edit</Button>
                ) : (
                  <Button variant="primary">Add To Cart</Button>
                )}
              </Card.Body>
            </Card>
        </div>
    </Container>
  )
}

export default AdminDashBoard