import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer style={{ background: 'gainsboro' }}>
      <Container>
        <Row>
          <Col className="text-center py-3">Copyright &copy; Proshop</Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
