import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({ product }) => {
  return (
    <Card className="my-4 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>
      <Card.Body className="px-2 py-3">
        <Link to={`/product/${product._id}`}>
          <Card.Title as="b">{product.name}</Card.Title>
        </Link>
        <Card.Text className="my-3" as="div">
          <Rating value={product.rating} />
          <small>from {product.numReviews} reviews</small>
        </Card.Text>

        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
