import React, { useEffect } from 'react'
import { Table, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, getAllUsers } from '../redux/actions/userAction'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'

const UserListPage = ({ history, match }) => {
  const dispatch = useDispatch()

  const { users, loading, error, page, pages } = useSelector(
    (state) => state.userList,
  )

  const { userInfo } = useSelector((state) => state.userLogin)
  const { successDelete } = useSelector((state) => state.userDelete)

  const pageNumber = match.params.pageNumber

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getAllUsers(pageNumber))
    } else {
      history.push('/login') //*預防直接輸入/admin/userlist
    }
  }, [dispatch, history, userInfo, successDelete, pageNumber]) //得到successDelete就會渲染畫面

  const deleteHandler = (userID) => {
    if (window.confirm('Are you sure to delete this user?')) {
      dispatch(deleteUser(userID))
    }
  }

  return (
    <div>
      <h2 className="mt-2">Users List</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr className="text-center">
                <th>USER ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="text-center">
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.name}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <i
                        className="fas fa-check"
                        style={{ color: 'yellowgreen' }}
                      ></i>
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button variant="outline-info" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="outline-danger"
                      className="btn-sm ml-2"
                      onClick={() => deleteHandler(user._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate page={page} pages={pages} users={true} />
        </>
      )}
    </div>
  )
}

export default UserListPage
