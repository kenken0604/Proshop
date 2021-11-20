import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Breadcrumb = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav>
      <Nav.Item className="d-flex justify-content-between mb-3 mx-auto">
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link className="btn btn-light border">Log In</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Log In</Nav.Link>
        )}
        {step2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link className="btn btn-light border ml">Shipping</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
        {step3 ? (
          <LinkContainer to="/payment">
            <Nav.Link className="btn btn-light border ml">Payment</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled className="btn btn-light border ml">
            Payment
          </Nav.Link>
        )}
        {step4 ? (
          <LinkContainer to="/placeorder">
            <Nav.Link className="btn btn-light border ml">Place Order</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled className="btn btn-light border ml">
            Place Order
          </Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  )
}

export default Breadcrumb
