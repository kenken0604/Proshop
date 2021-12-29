import React from 'react'
import { Route } from 'react-router-dom' //*將searchbox轉成路由組件
import { useHistory } from 'react-router'
import { Container, Navbar, Nav, NavDropdown, Badge } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/actions/userAction'
import { USER_REGISTER_RESET } from '../redux/constants/userConstants'
import SearchBox from './SearchBox'

const Header = () => {
  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.userLogin)

  const history = useHistory()
  const logoutHandler = () => {
    dispatch(logout())
    dispatch({ type: USER_REGISTER_RESET }) //*解決無法重複註冊的問題
    history.push('/')
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Proshop</Navbar.Brand>
          </LinkContainer>
          <Route render={({ history }) => <SearchBox history={history} />} />
          {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="d-flex justify-content-between"
          >
            <Nav>
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Cart{' '}
                  <Badge pill bg="danger">
                    <p className="mtb">1</p>
                  </Badge>
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/myorders">
                    <NavDropdown.Item>My Orders</NavDropdown.Item>
                  </LinkContainer>

                  {userInfo && userInfo.isAdmin && (
                    <>
                      <NavDropdown.Divider></NavDropdown.Divider>
                      <LinkContainer to="/admin/userlist">
                        <NavDropdown.Item>User Control</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/productlist">
                        <NavDropdown.Item>Product List</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/orderlist">
                        <NavDropdown.Item>Order List</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider></NavDropdown.Divider>
                    </>
                  )}
                  <NavDropdown.Item
                    onClick={logoutHandler}
                    className="text-danger"
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
