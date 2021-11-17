//處理products組件的指令
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
} from '../constants/productConstants'

export const productListReducer = (state = { products: [] }, action) => {
  const { type, payload } = action //傳入動作類型
  switch (type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] }
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: payload }
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}

export const productDetailReducer = (state = { product: {} }, action) => {
  const { type, payload } = action //傳入動作類型
  switch (type) {
    case PRODUCT_DETAIL_REQUEST:
      return { loading: true, product: {} }
    case PRODUCT_DETAIL_SUCCESS:
      return { loading: false, product: payload }
    case PRODUCT_DETAIL_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}
