import React, { useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder } from '../redux/actions/orderAction'
import { clearCart } from '../redux/actions/cartAction'
import { ORDER_CREATE_RESET } from '../redux/constants/orderConstants'

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
    setTimeout(dispatch(clearCart()), 100)
  }

  const { order, success, error, loading } = useSelector(
    (state) => state.orderCreate,
  )

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`, { from: '/placeorder' }) //_id是資料庫提供的ID
      dispatch({ type: ORDER_CREATE_RESET })
    }
    // eslint-disable-next-line
  }, [dispatch, history, success])

  return (
    <div>
      <div className="my-4">
        <Breadcrumb step1 step2 step3 step4 />
      </div>
      {loading ? (
        <Loader />
      ) : (
        <Row>
          <Col md={8}>
            <h1>Order Details</h1>
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
                          <Col xs={4} md={3} className="mt-3 mt-md-0">
                            <Image src={item.image} fluid rounded />
                          </Col>
                          <Col xs={8} md={5} className="mt-3 mt-md-0">
                            <Link to={`/product/${item.productID}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col xs={12} md={4} className="mt-3 mt-md-0">
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
          <Col xs={8} md={4} className="mx-auto mb-5">
            <Table striped bordered hover className="mt-5 mt-md-0">
              <thead>
                <tr>
                  <th>
                    <h4 className="text-center mb-0">Summary</h4>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <Row className="px-4 py-3">
                    <Col>Items</Col>
                    <Col>${itemsPrice}</Col>
                  </Row>
                </tr>
                <tr>
                  <Row className="px-4 py-3">
                    <Col>Shipping</Col>
                    <Col>${shippingPrice}</Col>
                  </Row>
                </tr>
                <tr>
                  <Row className="px-4 py-3">
                    <Col>Tax</Col>
                    <Col>${tax}</Col>
                  </Row>
                </tr>
                <tr>
                  <Row className="px-4 py-3">
                    <Col>Total</Col>
                    <Col>${total}</Col>
                  </Row>
                </tr>
              </tbody>
            </Table>
            <Button
              className="btn-block btn-warning"
              disabled={cartItems === 0}
              onClick={placeOrderHandler}
            >
              Place Order
            </Button>
            {error && (
              <div className="mt-3 text-center">
                <Message variant="danger">Your cart is empty...</Message>
              </div>
            )}
          </Col>
        </Row>
      )}
    </div>
  )
}

export default PlaceOrderPage
