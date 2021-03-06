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
import { PRODUCT_CREATE_RESET } from '../redux/constants/productConstants'

const ProductListPage = ({ history, match }) => {
  const dispatch = useDispatch()

  const { products, loading, error, page, pages } = useSelector(
    (state) => state.productList,
  )
  const { userInfo } = useSelector((state) => state.userLogin)
  const { successDelete, errorDelete } = useSelector(
    (state) => state.productDelete,
  ) //得到successDelete就渲染畫面
  const { errorCreate, createdProduct } = useSelector(
    (state) => state.productCreate,
  ) //得到successCreate就渲染畫面

  useEffect(() => {
    if (!userInfo.isAdmin) {
      history.push('/login') //*預防直接輸入/admin/userlist
    }
  }, [history, userInfo])

  const pageNumber = match.params.pageNumber

  useEffect(() => {
    if (createdProduct) {
      history.push(`/admin/product/${createdProduct._id}/edit`)
      dispatch({ type: PRODUCT_CREATE_RESET })
    } else {
      dispatch(listProducts('', pageNumber))
    }
  }, [dispatch, history, createdProduct, pageNumber])

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
      <Row className="mt-5 mb-3">
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
                  <td className="line-height-1">{product._id}</td>
                  <td className="line-height-1">{product.name}</td>
                  <td className="line-height-1">${product.price}</td>
                  <td className="line-height-1">{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="info" className="btn-sm rounded">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm rounded mt-2 mt-lg-0 ml-0 ml-lg-2"
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
