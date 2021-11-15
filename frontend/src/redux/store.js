import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension' //使用redux開發工具

import {
  productListReducer,
  productDetailReducer,
} from './reducers/productReducers'

import { cartReducer } from './reducers/cartReducers'

//合併多個組件到store
const allReducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  cart: cartReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
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
