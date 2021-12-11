import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
// import products from '../products' //改向服務器獲取資料
// import axios from 'axios'
import { detailProduct, createReview } from '../redux/actions/productAction'
import { REVIEW_CREATE_RESET } from '../redux/constants/productConstants'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Meta from '../components/MetaHelmet'

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

  const [quantity, setQuantity] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const { loading, product, error } = useSelector(
    (state) => state.productDetail,
  )

  // console.log(product)
  const { userInfo } = useSelector((state) => state.userLogin)
  const { reviewSuccess, reviewError } = useSelector(
    (state) => state.reviewCreate,
  )

  useEffect(() => {
    dispatch(detailProduct(match.params.id))
  }, [dispatch, match]) //默認就要渲染畫面

  useEffect(() => {
    if (reviewSuccess) {
      setRating(0)
      setComment('')
      dispatch(detailProduct(match.params.id))
      dispatch({ type: REVIEW_CREATE_RESET }) //***讓reviewSuccess歸零
    }
  }, [dispatch, match, reviewSuccess])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${quantity}`)
  }
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createReview(match.params.id, { rating, comment }))
  }
  return (
    <div>
      <Link className="btn btn-dark rounded" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
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
                        {[...Array(product.countInStock).keys()].map(
                          (count) => (
                            <option key={count + 1} value={count + 1}>
                              {count + 1}
                            </option>
                          ),
                        )}
                      </select>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
              <Button
                onClick={addToCartHandler}
                disabled={product.countInStock === 0}
                className="cart-btn"
                variant="danger"
              >
                ADD TO CART
              </Button>
            </Col>
          </Row>
          <Row className="my-3">
            <Col md={6}>
              <h4>Reviews</h4>
              {product.reviews.length === 0 && (
                <Message variant="warning">No review</Message>
              )}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong className="d-block m10">
                      <b>{review.name} </b>
                      <Rating value={review.rating} className="fl-right" />
                    </strong>

                    <p>{review.comment}</p>
                    <b className="fl-right">{review.createdAt.slice(0, 10)}</b>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            <Col md={6}>
              <h4>write a customer review</h4>
              {reviewError && <Message variant="danger">{reviewError}</Message>}
              {userInfo ? (
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId="rating" className="mb-3">
                    <Form.Label as="h6">Rating</Form.Label>
                    <Form.Control
                      as="select"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value="">Select...</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Great</option>
                      <option value="5">5 - Excellent</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="comment" className="mb-3">
                    <Form.Label as="h6">Comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      value={comment}
                      placeholder="Make your comment here"
                      onChange={(e) => setComment(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Button type="submit" variant="info">
                    Submit
                  </Button>
                </Form>
              ) : (
                <Message>
                  Please <Link to="/login">Log in</Link> to write a review
                </Message>
              )}
            </Col>
          </Row>
        </>
      )}
    </div>
  )
}

export default ProductPage
