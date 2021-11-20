import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
} from '../constants/orderConstants'

export const orderCreateReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true }
    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: payload }
    case ORDER_CREATE_FAIL:
      return { loading: false, success: false, error: payload }
    default:
      return state
  }
}

//get request最好都要先放入初始狀態，好讓action按照指定容器放入
export const orderDetailsReducer = (
  state = { order: { orderItem: [], shippingAddress: {}, user: {} } },
  action,
) => {
  const { type, payload } = action
  switch (type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true } //*
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: payload }
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}
