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

  useEffect(() => {
    if (!userInfo) {
      history.push('/signin')
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile')) //傳入profile符合url，因之後有傳入id的需要
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, userInfo, user]) //獲得user就會再渲染畫面

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
      <Col xs={8} md={6} lg={4} className="mx-auto mb-5">
        <h2 className="my-5">User Profile</h2>
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
          <Button type="submit" className="btn-success float-right rounded">
            Update Info
          </Button>
        </Form>
      </Col>
    </Row>
  )
}

export default ProfilePage
