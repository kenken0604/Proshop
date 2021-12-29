import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { myOrderList } from '../redux/actions/orderAction'

const MyOrdersPage = () => {
  const history = useHistory()

  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.userLogin)

  const { loadingList, orderItem, errorList } = useSelector(
    (state) => state.listMyOrder,
  )

  // console.log(orderItem[1].orderItem[0])

  useEffect(() => {
    if (!userInfo) {
      history.push('/signin')
    } else {
      dispatch(myOrderList())
    }
  }, [dispatch, history, userInfo]) //獲得user就會再渲染畫面
  return (
    <Row>
      <Col>
        <h2 className="my-5">My Orders</h2>
        {loadingList ? (
          <Loader />
        ) : errorList ? (
          <Message variant="danger">{errorList}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead className="text-center">
              <tr>
                <th>ORDER ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="text-center">
              {loadingList ? (
                <Loader />
              ) : (
                orderItem.map((item) => (
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{item.createdAt.slice(1, 10)}</td>
                    <td>${item.totalPrice}</td>
                    <td>
                      {item.isPaid ? (
                        item.paidAt.slice(1, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {item.isDelivered ? (
                        item.deliveredAt.slice(1, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${item._id}`}>
                        <Button variant="dark" className="btn-sm rounded">
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default MyOrdersPage
