import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension' //使用redux開發工具

import { productListReducer } from './reducers/productReducers'

//合併多個組件到store
const allReducer = combineReducers({
  productList: productListReducer,
})

const initialState = {}

const middleware = [thunk]
//讓store執行異步操作需要redux-thunk作為middleware
//而執行middleware需要引入applyMiddleware

const store = createStore(
  allReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
)

export default store
