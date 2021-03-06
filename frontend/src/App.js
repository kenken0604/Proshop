import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import ShippingPage from './pages/ShippingPage'
import PaymentPage from './pages/PaymentPage'
import PlaceOrderPage from './pages/PlaceOrderPage'
import OrderPage from './pages/OrderPage'
import UserListPage from './pages/UserListPage'
import UserEditPage from './pages/UserEditPage'
import ProductListPage from './pages/ProductListPage'
import ProductEditPage from './pages/ProductEditPage'
import OrderListPage from './pages/OrderListPage'
import ScrollToTop from './components/ScrollToTop'
import MyOrdersPage from './pages/MyOrdersPage'
import ProductCarousel from './components/ProductCarousel'

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/product/:id" component={ProductPage} />
          <Route path="/cart/:id?" component={CartPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/shipping" component={ShippingPage} />
          <Route path="/payment" component={PaymentPage} />
          <Route path="/placeorder" component={PlaceOrderPage} />
          <Route path="/order/:id" component={OrderPage} />
          <Route path="/myorders" component={MyOrdersPage} />
          <Route
            path="/admin/userlist/:pageNumber?"
            component={UserListPage}
            exact
          />
          <Route path="/admin/user/:id/edit" component={UserEditPage} />
          <Route
            path="/admin/productlist/:pageNumber?"
            component={ProductListPage}
            exact
          />
          <Route path="/admin/product/:id/edit" component={ProductEditPage} />
          <Route path="/admin/orderlist" component={OrderListPage} />
          <Route path="/search/:keyword" component={HomePage} exact />
          {<ProductCarousel /> && (
            <Route path="/page/:pageNumber" component={HomePage} exact />
          )}
          <Route
            path="/search/:keyword/page/:pageNumber"
            component={HomePage}
            exact
          />
          <Route path="/" component={HomePage} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
