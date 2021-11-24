import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import Breadcrumb from '../components/Breadcrumb'
import { useDispatch, useSelector } from 'react-redux'
import { setPayment } from '../redux/actions/cartAction'

const PaymentPage = ({ history }) => {
  const { userAddress, paymentMethod } = useSelector((state) => state.cart) //傳入reducer設定的資料

  if (!userAddress) {
    history.push('/shipping')
  }

  const [method, setMethod] = useState(paymentMethod)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(setPayment(method))
    history.push('/placeorder')
  }
  return (
    <FormContainer>
      <Breadcrumb step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="country" className="my-3">
          <Form.Label as="legend">Select Method</Form.Label>

          <Col>
            <Form.Check
              type="radio"
              label="Paypal or Credit Card"
              id="Paypal"
              name="paymentmethod"
              checked={method === 'Paypal'}
              value="Paypal"
              onChange={(e) => setMethod(e.target.value)}
            ></Form.Check>
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="Stripe"
              id="Stripe"
              name="paymentmethod"
              value="Stripe"
              checked={method === 'Stripe'}
              onChange={(e) => setMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentPage