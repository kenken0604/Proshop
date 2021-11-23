import React, { useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder } from '../redux/actions/orderAction'

const PlaceOrderPage = ({ history }) => {
  const { userAddress, paymentMethod, cartItems } = useSelector(
    (state) => state.cart,
  )

  const addDecimal = (num) => {
    return Math.round((num * 100) / 100).toFixed(2)
  } //十進位

  const itemsPrice = cartItems
    .reduce((acc, item) => (acc += item.price * item.qty), 0)
    .toFixed(2)

  const shippingPrice = addDecimal(itemsPrice > 100 ? 100 : 0)
  const tax = addDecimal((0.06 * itemsPrice).toFixed(2))
  const total = +itemsPrice + +shippingPrice + +tax //字串前面放上+會變成數字

  const dispatch = useDispatch()

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItem: cartItems,
        shippingAddress: userAddress,
        paymentMethod: paymentMethod,
        itemsPrice: itemsPrice,
        taxPrice: tax,
        shippingPrice: shippingPrice,
        totalPrice: total,
      }),
    )
  }

  const { order, success, error, loading } = useSelector(
    (state) => state.orderCreate,
  )

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`) //_id是資料庫提供的ID
    }
    // eslint-disable-next-line
  }, [history, success])

  return (
    <div>
      <Breadcrumb step1 step2 step3 step4 />
      {loading ? (
        <Loader />
      ) : (
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h4>Shipping</h4>
                <b>Address:</b>
                <p>
                  {userAddress.address}, {userAddress.city},{' '}
                  {userAddress.postalCode}, {userAddress.country}
                </p>
              </ListGroup.Item>
              <ListGroup.Item>
                <h4>Payment Method</h4>
                <p>
                  <b>Method:</b>
                  {paymentMethod}
                </p>
              </ListGroup.Item>
              <ListGroup.Item>
                <h4>Order Items</h4>
                {cartItems.length === 0 ? (
                  <Message>
                    Your cart is empty.{' '}
                    <Link to="/">Go to choose something good</Link>
                  </Message>
                ) : (
                  <ListGroup variant="flush">
                    {cartItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row className="d-flex align-items-center">
                          <Col md={2}>
                            <Image src={item.image} fluid rounded />
                          </Col>
                          <Col md={5}>
                            <Link to={`/product/${item.productID}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={5}>
                            <p className="mb-0">
                              ${item.price} x {item.qty} = $
                              {(item.price * item.qty).toFixed(2)}
                            </p>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h4 className="text-center mb-0">Order Summary</h4>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${tax}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>${total}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Button
                    className="btn-block"
                    disabled={cartItems === 0}
                    onClick={placeOrderHandler}
                  >
                    Place Order
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
            {error && <Message variant="danger">{error}</Message>}
          </Col>
        </Row>
      )}
    </div>
  )
}

export default PlaceOrderPage
