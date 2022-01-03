import React, { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import Breadcrumb from '../components/Breadcrumb'
import { useDispatch, useSelector } from 'react-redux'
import { saveShipingAddress } from '../redux/actions/cartAction'

const ShippingPage = ({ history }) => {
  const { userAddress } = useSelector((state) => state.cart) //傳入reducer設定的資料

  const [address, setAddress] = useState(userAddress.address)
  const [city, setCity] = useState(userAddress.city)
  const [postalCode, setPostalCode] = useState(userAddress.postalCode)
  const [country, setCountry] = useState(userAddress.country)
  const [isValidated, setValidated] = useState(true)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()

    if (address && city && postalCode && country) {
      dispatch(saveShipingAddress({ address, city, postalCode, country }))
      setValidated(true)

      setTimeout(() => {
        history.push('/payment')
      }, 500)
    } else {
      setValidated(false)
    }
  }

  const checkBlank = (e) => {
    let text = e.target.value
    if (!text) {
      setValidated(false)
    } else {
      setValidated(true)
    }
  }
  return (
    <>
      <div className="my-4">
        <Breadcrumb step1 step2 />
      </div>
      <div className="mb-5">
        <FormContainer>
          <h1>Shipping</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="address" className="my-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                onBlur={checkBlank}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="city" className="my-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onBlur={checkBlank}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="postalCode" className="my-3">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Postal Code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                onBlur={checkBlank}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="country" className="my-3">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                onBlur={checkBlank}
              ></Form.Control>
            </Form.Group>

            <Row>
              <Col md={9}>
                {!isValidated && (
                  <div className="mr-2">
                    <Message variant="danger">Please fill in the blank</Message>
                  </div>
                )}
              </Col>
              <Col md={3}>
                <Button
                  type="submit"
                  variant="success"
                  className="float-right rounded"
                >
                  Continue
                </Button>
              </Col>
            </Row>
          </Form>
        </FormContainer>
      </div>
    </>
  )
}

export default ShippingPage
