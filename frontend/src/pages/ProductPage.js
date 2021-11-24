import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
// import products from '../products' //改向服務器獲取資料
// import axios from 'axios'
import { detailProduct } from '../redux/actions/productAction'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProductPage = ({ history, match }) => {
  // const [product, setProduct] = useState({})
  // useEffect(() => {
  //   const fetchData = () => {
  //     axios.get(`/api/products/${match.params.id}`).then((res) => {
  //       let product = res.data

  //       setProduct(product)
  //     })
  //   }
  //   fetchData()
  // }, [match])

  const dispatch = useDispatch()

  const { loading, product, error } = useSelector((state) => {
    return state.productDetail
  })

  useEffect(() => {
    dispatch(detailProduct(match.params.id))
  }, [dispatch, match])

  const [quantity, setQuantity] = useState(1)

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${quantity}`)
  }

  return (
    <div>
      <Link className="btn btn-dark rounded" to="/">
        Go Back
      </Link>
      <Row className="my-3">
        <Col md={6}>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Image src={product.image} fluid />
          )}
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
        <Col md={3}>
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
          {product.countInStock > 0 && (
            <ListGroup.Item>
              <Row className="text-center">
                <Col>Quantity:</Col>
                <Col>
                  <select
                    onChange={(e) => {
                      setQuantity(e.target.value)
                    }}
                    className="w-100 select"
                  >
                    {[...Array(product.countInStock).keys()].map((count) => (
                      <option key={count + 1} value={count + 1}>
                        {count + 1}
                      </option>
                    ))}
                  </select>
                </Col>
              </Row>
            </ListGroup.Item>
          )}
          <Button
            onClick={addToCartHandler}
            disabled={product.countInStock === 0}
            className="cart-btn"
          >
            ADD TO CART
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default ProductPage
