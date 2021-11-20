import React, { useEffect } from 'react'
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails } from '../redux/actions/orderAction'

const OrderPage = ({ match }) => {
  const orderID = match.params.id

  const { order, loading, error } = useSelector((state) => state.orderDetails)

  const itemsPrice = order.orderItem
    .reduce((acc, item) => (acc += item.qty * item.price), 0)
    .toFixed(2)

  const dispatch = useDispatch()

  useEffect(() => {
    //解決拿不到order的方案之一 //方案二是將reducer的狀態詳細指定
    if (!order || order._id !== orderID) {
      dispatch(getOrderDetails(orderID))
    }
  }, [orderID, order, dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <h3 className="mb-3">
        Order <u>{order._id}</u>
      </h3>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h4>Shipping</h4>
              <p>
                <span>Name:</span>
                {order.user.name}
              </p>
              <p>
                <span>Email:</span>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>

              <p>
                <b>Address:</b>
                {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success"> on {order.deliverAt}</Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>Payment Method</h4>
              <p>
                <b>Method:</b>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>Order Items</h4>
              {order.orderItem.length === 0 ? (
                <Message>
                  Your order is empty.{' '}
                  <Link to="/">Go to choose something good</Link>
                </Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItem.map((item, index) => (
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
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default OrderPage
