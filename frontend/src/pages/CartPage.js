import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Button, Image } from 'react-bootstrap'
import { addToCart, removeFromCart } from '../redux/actions/cartAction'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'

const CartPage = ({ match, location, history }) => {
  const productID = match.params.id
  const qty = Number(location.search.slice(5))

  // console.log(productID)
  // console.log(qty)

  const dispatch = useDispatch()

  const { cartItems } = useSelector((state) => {
    return state.cart //*取得cartReducer的狀態
  })

  useEffect(() => {
    dispatch(addToCart(productID, qty))
  }, [dispatch, productID, qty])

  const removeItemHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  return (
    <Row>
      <Col md={12}>
        <h1>Shopping Cart</h1>
      </Col>
      <Col>
        <Row>
          <Col md={8}>
            {cartItems.length === 0 ? (
              <Message>
                Your cart is empty. <Link to="/">Click Me and Go Back</Link>
              </Message>
            ) : (
              <ListGroup variant="flush">
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.productID}>
                    <Row className="d-center">
                      <Col md={3}>
                        <Image src={item.image} fluid />
                      </Col>
                      <Col md={3}>
                        <Link to={`/product/${item.productID}`}>
                          {item.name}
                        </Link>
                      </Col>
                      <Col md={2}>${item.price}</Col>
                      <Col md={2}>
                        <select
                          value={item.qty}
                          onChange={(e) => {
                            dispatch(
                              addToCart(item.productID, Number(e.target.value)),
                            )
                          }}
                          className="w-100 select"
                        >
                          {[...Array(item.countInStock).keys()].map((count) => (
                            <option key={count + 1} value={count + 1}>
                              {count + 1}
                            </option>
                          ))}
                        </select>
                      </Col>
                      <Col>
                        <Button
                          variant="light"
                          onClick={() => {
                            removeItemHandler(item.productID)
                          }}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>
          <Col md={4} className="text-center">
            <ListGroup.Item>
              <h3>Amount of Items</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              {cartItems.reduce((acc, item) => (acc += item.qty), 0)} items
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>Price in Total</h3>
            </ListGroup.Item>
            <ListGroup.Item as="h4" style={{ color: 'red' }}>
              $
              {cartItems
                .reduce((acc, item) => (acc += item.price * item.qty), 0)
                .toFixed(2)}
            </ListGroup.Item>
            <Button onClick={checkoutHandler} className="cart-btn">
              CHECKOUT
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default CartPage
