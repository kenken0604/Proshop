import React, { useEffect } from 'react'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  createProduct,
  deleteProduct,
  listProducts,
} from '../redux/actions/productAction'
import Paginate from '../components/Paginate'
// import { PRODUCT_CREATE_RESET } from '../redux/constants/productConstants'

const ProductListPage = ({ history, match }) => {
  const dispatch = useDispatch()

  const { products, loading, error, page, pages } = useSelector(
    (state) => state.productList,
  )
  const { userInfo } = useSelector((state) => state.userLogin)
  const { successDelete, errorDelete } = useSelector(
    (state) => state.productDelete,
  ) //得到successDelete就渲染畫面
  const { successCreate, errorCreate, createdProduct } = useSelector(
    (state) => state.productCreate,
  ) //得到successCreate就渲染畫面

  useEffect(() => {
    if (!userInfo.isAdmin) {
      history.push('/login') //*預防直接輸入/admin/userlist
    }
  }, [history, userInfo])

  const pageNumber = match.params.pageNumber

  useEffect(() => {
    // dispatch({ type: PRODUCT_CREATE_RESET })
    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`) //*無法跳轉路由
    } else {
      dispatch(listProducts('', pageNumber))
    }
  }, [dispatch, history, successCreate, createdProduct, pageNumber])

  useEffect(() => {
    dispatch(listProducts('', pageNumber))
  }, [dispatch, successDelete, pageNumber])

  const deleteHandler = (productID) => {
    if (window.confirm('Are you sure to delete this product?')) {
      dispatch(deleteProduct(productID))
    }
  }

  const createProductHandler = () => {
    dispatch(createProduct())
  }

  return (
    <div>
      <Row>
        <Col>
          <h2 className="mt-2">Products</h2>
        </Col>
        <Col className="text-right">
          <Button className="mb-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr className="text-center">
                <th>PRODUCT ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="text-center">
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="outline-info" className="btn-sm ml-2">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="outline-danger"
                      className="btn-sm ml-2"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate page={page} pages={pages} products={true} />
        </>
      )}
    </div>
  )
}

export default ProductListPage
