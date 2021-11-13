//處理products組件的指令
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
} from '../constants/productConstants'

const initialState = { products: [] } //資料初始值

export const productListReducer = (preState = initialState, action) => {
  const { type, data } = action //傳入動作類型
  switch (type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] }
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: data }
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: data }
    default:
      return preState
  }
}
