import React, { useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Button, Image } from 'react-bootstrap'
import {
  addToCart,
  removeFromCart,
  setProductQTY,
} from '../redux/actions/cartAction'
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
    if (productID) {
      dispatch(addToCart(productID, qty))
    }
  }, [dispatch, productID, qty])

  const removeItemHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    if (cartItems.length === 0) return

    history.push('/login?redirect=shipping')
  }

  return (
    <Row>
      <Col md={12} className="my-4">
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
                      <Col xs={4} md={3}>
                        <Image src={item.image} fluid />
                      </Col>
                      <Col xs={8} md={3}>
                        <div style={{ overflow: 'hidden' }}>
                          <Link to={`/product/${item.productID}`}>
                            {item.name}
                          </Link>
                        </div>
                      </Col>
                      <Col xs={4} md={2} className="mt-3 mt-md-0 text-center">
                        ${item.price}
                      </Col>
                      <Col xs={4} md={2} className="mt-3 mt-md-0">
                        <select
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              setProductQTY(
                                item.productID,
                                Number(e.target.value),
                              ),
                            )
                          }
                          className="w-100 select"
                        >
                          {[...Array(item.countInStock).keys()].map((count) => (
                            <option key={count + 1} value={count + 1}>
                              {count + 1}
                            </option>
                          ))}
                        </select>
                      </Col>
                      <Col xs={4} md={2} className="mt-3 mt-md-0">
                        <Button
                          className="btn btn-danger btn-sm float-right rounded"
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
          <Col
            xs={8}
            sm={8}
            md={4}
            className="text-center my-5 mt-md-0 mx-auto"
          >
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <h4 className="mb-0 text-center px-4 py-3">
                    Amount of Items
                  </h4>
                </tr>
                <tr>
                  <p className="mb-0 text-center px-4 py-3">
                    {cartItems.reduce((acc, item) => (acc += item.qty), 0)}{' '}
                    items
                  </p>
                </tr>
                <tr>
                  <h4 className="mb-0 text-center px-4 py-3">Price in Total</h4>
                </tr>
                <tr>
                  <p className="mb-0 text-center px-4 py-3">
                    {' '}
                    $
                    {cartItems
                      .reduce((acc, item) => (acc += item.price * item.qty), 0)
                      .toFixed(2)}
                  </p>
                </tr>
              </tbody>
            </Table>
            <Button
              onClick={checkoutHandler}
              className="btn-block rounded"
              variant="warning"
            >
              CHECKOUT
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default CartPage
