import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [] }, action) => {
  const { type, payload } = action
  switch (type) {
    case CART_ADD_ITEM:
      const newItem = payload

      const existItem = state.cartItems.find(
        (item) => item.productID === newItem.productID,
      )

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(
            (item) => (item.productID === existItem.productID ? newItem : item), //*找到一樣的商品，換成後來傳入的物件
          ),
        }
      } else {
        return { ...state, cartItems: [...state.cartItems, newItem] } //*要返回跟原狀態一樣的格式
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.productID !== payload),
      }
    default:
      return state
  }
}
