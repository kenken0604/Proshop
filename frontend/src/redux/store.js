import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension' //使用redux開發工具

import {
  productListReducer,
  productDetailReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  reviewCreateReducer,
  getTopReducer,
} from './reducers/productReducers'

import {
  badgePositionReducer,
  bounceCallReducer,
  cartReducer,
} from './reducers/cartReducers'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateAdminReducer,
} from './reducers/userReducers'
import {
  listAllOrdersReducer,
  listMyOrderReducer,
  orderCreateReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderPayReducer,
} from './reducers/orderReducer'

//合併多個組件到store
const allReducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdateAdmin: userUpdateAdminReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  listMyOrder: listMyOrderReducer,
  listAllOrders: listAllOrdersReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  reviewCreate: reviewCreateReducer,
  getTop: getTopReducer,
  badgePosition: badgePositionReducer,
  bounceCall: bounceCallReducer,
})

//取得初本地儲存的狀態
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const addressFromStorage = localStorage.getItem('address')
  ? JSON.parse(localStorage.getItem('address'))
  : {}

const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
  ? localStorage.getItem('paymentMethod')
  : 'Paypal'

//初始狀態
const initialState = {
  //狀態是引入的reducer
  cart: {
    cartItems: cartItemsFromStorage,
    userAddress: addressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]
//讓store執行異步操作需要redux-thunk作為middleware
//而執行middleware需要引入applyMiddleware

const store = createStore(
  allReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
)

export default store
