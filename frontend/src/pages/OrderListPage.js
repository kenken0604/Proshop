import React, { useEffect } from 'react'
import { Table, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { allOrdersList } from '../redux/actions/orderAction'

const OrderListPage = ({ history }) => {
  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.userLogin)
  const { loading, orders, error } = useSelector((state) => state.listAllOrders)

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(allOrdersList())
    } else {
      history.push('/login') //*預防直接輸入/admin/userlist
    }
  }, [dispatch, history, userInfo])

  return (
    <div className="mb-5">
      <h2 className="my-5">Order List</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr className="text-center">
              <th>ORDER ID</th>
              <th>USER</th>
              <th>TOTAL</th>
              <th>DATE</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="text-center">
                <td>{order._id}</td>
                <td>{order.user.name}</td>
                <td>${order.totalPrice}</td>
                <td>{order.createdAt.slice(0, 10)}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.slice(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    <i
                      className="fas fa-check"
                      style={{ color: 'yellowgreen' }}
                    ></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button className="rounded btn-sm ml-2">Details</Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  )
}

export default OrderListPage
