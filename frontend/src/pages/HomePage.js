import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
// import axios from 'axios' //目前頁面資料要交給redux處理
// import products from '../products' //改向服務器獲取資料
import Product from '../components/Product'
import { listProducts } from '../redux/actions/productAction'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import ProductCarousel from '../components/ProductCarousel'
import Paginate from '../components/Paginate'
import Meta from '../components/MetaHelmet'

const HomePage = ({ match }) => {
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
  const { loading, products, error, page, pages } = data

  const keyword = match.params.keyword || '' //是根據App.js設定的路由抓到keyword值
  const pageNumber = match.params.pageNumber || 1

  //根據指令渲染頁面
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber]) //*派發指令或關鍵字改變就渲染頁面

  return (
    <div className="mt-5">
      <Meta />
      {!keyword ? (
        ''
      ) : (
        <Link to="/" className="btn btn-dark mb-3">
          Go Back
        </Link>
      )}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <h1 className="text-center">Latest Products</h1>
          <Row>
            {products.map((product) => (
              <Col
                key={product._id}
                xs={10}
                sm={8}
                md={6}
                lg={4}
                xl={3}
                className="mx-auto"
              >
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <div className="d-flex justify-content-center">
            <Paginate page={page} pages={pages} keyword={keyword} />
          </div>
        </>
      )}
    </div>
  )
}

export default HomePage
