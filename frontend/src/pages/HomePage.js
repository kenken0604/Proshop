import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
// import products from '../products' //改向服務器獲取資料
import Product from '../components/Product'
// import axios from 'axios' //目前頁面資料要交給redux處理
import { listProducts } from '../redux/actions/productAction'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'

const HomePage = () => {
  // 資料改由redux處理
  // const [products, setProducts] = useState([])
  // useEffect(() => {
  //   const fetchData = () => {
  //     axios.get('/api/products').then((res) => {
  //       let products = res.data
  //       setProducts(products)
  //     })
  //   }
  //   fetchData()
  // }, [])
  //

  //redux操作資料
  //負責派發指令
  const dispatch = useDispatch()

  //負責取得狀態
  const data = useSelector((state) => {
    // console.log(state)
    return state.productList //productList就是在store設定的reducer指令
  })
  const { loading, products, error } = data

  //根據指令渲染頁面
  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch]) //*派發指令改變就渲染頁面

  return (
    <div>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  )
}

export default HomePage
