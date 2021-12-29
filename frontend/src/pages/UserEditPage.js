import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { adminUpdateUser, getUserDetails } from '../redux/actions/userAction'
import { USER_UPDATE_ADMIN_RESET } from '../redux/constants/userConstants'

const UserEditPage = ({ match }) => {
  const history = useHistory()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setisAdmin] = useState(false)

  const userID = match.params.id

  const dispatch = useDispatch()

  const { loading, user, error } = useSelector((state) => state.userDetails)

  const { successUpdate } = useSelector((state) => state.userUpdateAdmin)

  useEffect(() => {
    if (!user || user._id !== userID) {
      dispatch(getUserDetails(userID))
    } else {
      setName(user.name)
      setEmail(user.email)
      setisAdmin(user.isAdmin)
    }
  }, [dispatch, user, userID])

  useEffect(() => {
    dispatch({ type: USER_UPDATE_ADMIN_RESET })
  }, [dispatch]) //*進入畫面就要重置狀態

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(adminUpdateUser(userID, { name, email, isAdmin }))
  }

  return (
    <div>
      <button
        onClick={() => history.goBack()}
        className="btn btn-dark rounded mt-3"
      >
        Go Back
      </button>
      <FormContainer>
        <h1 className="my-5">Edit User</h1>
        {successUpdate && <Message>Update Successfully</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading ? (
          <Loader />
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="isAdmin" className="mb-3">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setisAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button
              type="submit"
              variant="info"
              className="float-right rounded"
            >
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  )
}

export default UserEditPage
