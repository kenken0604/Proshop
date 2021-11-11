import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
// import products from '../products' //改向服務器獲取資料
import Product from '../components/Product'
import axios from 'axios'

const HomeScreen = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchData = () => {
      axios.get('/api/products').then((res) => {
        let products = res.data
        setProducts(products)
      })
    }
    fetchData()
  }, [])

  return (
    <div>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default HomeScreen
