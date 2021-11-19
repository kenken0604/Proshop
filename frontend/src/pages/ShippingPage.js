import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
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

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShipingAddress({ address, city, postalCode, country }))
    history.push('/payment')
  }
  return (
    <FormContainer>
      <Breadcrumb step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address" className="my-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="city" className="my-3">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="postalCode" className="my-3">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="country" className="my-3">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingPage
