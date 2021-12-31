import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_ADDRESS,
  CART_SET_METHOD,
  BADGE_GET_POSITION,
  CALL_TO_BOUNCE,
  CALL_BOUNCE_RESET,
} from '../constants/cartConstants'

export const cartReducer = (
  state = { cartItems: [], userAddress: {}, paymentMethod: 'Paypal' },
  action,
) => {
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
    case CART_SAVE_ADDRESS:
      return {
        ...state,
        userAddress: payload,
      }
    case CART_SET_METHOD:
      return { ...state, paymentMethod: payload }
    default:
      return state
  }
}

export const badgePositionReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case BADGE_GET_POSITION:
      return { position: payload }
    default:
      return state
  }
}

export const bounceCallReducer = (state = { toBounce: false }, action) => {
  const { type, payload } = action
  switch (type) {
    case CALL_TO_BOUNCE:
      return { toBounce: payload }
    case CALL_BOUNCE_RESET:
      return { toBounce: false }
    default:
      return state
  }
}
