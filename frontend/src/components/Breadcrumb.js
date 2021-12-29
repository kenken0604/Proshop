import React from 'react'
import { Nav, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Breadcrumb = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav>
      <Nav.Item className="d-flex justify-content-between mb-3 mx-auto">
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link className="btn btn-light tail text-dark border border-dark mx-3 rounded-circle">
              1
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>1</Nav.Link>
        )}
        {step2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link
              className={`btn btn-light ${
                step3 ? 'tail' : ''
              } border text-dark border-dark mx-3 rounded-circle`}
            >
              2
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>2</Nav.Link>
        )}
        {step3 ? (
          <LinkContainer to="/payment">
            <Nav.Link
              className={`btn btn-light ${
                step4 ? 'tail' : ''
              } border text-dark border-dark mx-3 rounded-circle`}
            >
              3
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link
            disabled
            className={`btn btn-light ${
              step4 ? 'tail' : ''
            } border text-dark border border-secondary mx-3 rounded-circle`}
          >
            3
          </Nav.Link>
        )}
        {step4 ? (
          <LinkContainer to="/placeorder">
            <Nav.Link className="btn btn-light text-dark border border-dark mx-3 rounded-circle">
              4
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link
            disabled
            className="btn btn-light text-dark border border-secondary mx-3 rounded-circle"
          >
            4
          </Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  )
}

export default Breadcrumb
