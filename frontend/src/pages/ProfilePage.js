import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { update, getUserDetails, logout } from '../redux/actions/userAction'
import { myOrderList } from '../redux/actions/orderAction'

const ProfilePage = ({ history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const { loading, user, error } = useSelector((state) => state.userDetails)

  const { userInfo } = useSelector((state) => state.userLogin)

  const { loadingList, orderItem, errorList } = useSelector(
    (state) => state.listMyOrder,
  )

  // console.log(orderItem[1].orderItem[0])

  useEffect(() => {
    if (!userInfo) {
      history.push('/signin')
    } else {
      if (!user.name) {
        dispatch(myOrderList())
        dispatch(getUserDetails('profile'))
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user, orderItem]) //獲得user就會再渲染畫面

  const submitHandler = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage('Password do not match.')
    } else {
      dispatch(update({ id: userInfo._id, name, email, password }))
      dispatch(logout())
      history.push('/login')
    }
  }

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="my-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email" className="my-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password" className="my-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmPassword" className="my-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Update Info
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Order</h2>
        {loadingList ? (
          <Loader />
        ) : errorList ? (
          <Message variant="danger">{errorList}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead className="text-center">
              <tr>
                <th>ORDER ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="text-center">
              {orderItem.map((item) => (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.createdAt.slice(0, 10)}</td>
                  <td>${item.totalPrice}</td>
                  <td>
                    {item.isPaid ? (
                      item.paidAt.slice(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {item.isDelivered ? (
                      item.deliverAt.slice(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${item._id}`}>
                      <Button variant="dark" className="btn-sm">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default ProfilePage
