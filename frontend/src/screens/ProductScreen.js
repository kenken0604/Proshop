import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
// import products from '../products' //改向服務器獲取資料
import axios from 'axios'

const ProductScreen = ({ match }) => {
  const [product, setProduct] = useState({})

  useEffect(() => {
    const fetchData = () => {
      axios.get(`/api/products/${match.params.id}`).then((res) => {
        let product = res.data

        setProduct(product)
      })
    }
    fetchData()
  }, [match])

  return (
    <div>
      <Link className="btn btn-dark rounded" to="/">
        Go Back
      </Link>
      <Row className="my-3">
        <Col md={6}>
          <Image src={product.image} fluid />
        </Col>
        <Col md={3} className="my-4">
          <ListGroup as="h4">{product.name}</ListGroup>
          <ListGroup className="my-4">
            <p>
              <Rating value={product.rating} />
              <small>from {product.numReviews} reviews</small>
            </p>
          </ListGroup>
          <ListGroup as="p">{product.description}</ListGroup>
        </Col>
        <Col>
          <ListGroup.Item>
            <Row className="text-center">
              <Col>Price:</Col>
              <Col>
                <strong>${product.price}</strong>
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row className="text-center">
              <Col>Status:</Col>
              <Col>
                <strong>
                  {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                </strong>
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup>
            <Button disabled={product.countInStock === 0} className="float">
              ADD TO CART
            </Button>
          </ListGroup>
        </Col>
      </Row>
    </div>
  )
}

export default ProductScreen
