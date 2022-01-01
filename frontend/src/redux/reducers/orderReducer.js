import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
  ORDER_MYLIST_REQUEST,
  ORDER_MYLIST_SUCCESS,
  ORDER_MYLIST_FAIL,
  ORDER_MYLIST_RESET,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_RESET,
  ORDER_CREATE_RESET,
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
    case ORDER_CREATE_RESET:
      return { ...state, success: false, error: null }
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
      return { ...state, loading: true } //*放入state讓初始狀態維持
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: payload }
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}

export const orderPayReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case ORDER_PAY_REQUEST:
      return { loadingPay: true } //*不需要維持初始狀態
    case ORDER_PAY_SUCCESS:
      return { loadingPay: false, successPay: true } //不需要payload
    case ORDER_PAY_FAIL:
      return { loadingPay: false, errorPay: payload }
    case ORDER_PAY_RESET:
      return {}
    default:
      return state
  }
}

export const orderDeliverReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case ORDER_DELIVER_REQUEST:
      return { loadingDeliver: true } //*不需要維持初始狀態
    case ORDER_DELIVER_SUCCESS:
      return { loadingDeliver: false, successDeliver: true } //不需要payload
    case ORDER_DELIVER_FAIL:
      return { loadingDeliver: false, errorDeliver: payload }
    case ORDER_DELIVER_RESET:
      return {}
    default:
      return state
  }
}

export const listMyOrderReducer = (state = { orderItem: [] }, action) => {
  const { type, payload } = action
  switch (type) {
    case ORDER_MYLIST_REQUEST:
      return { ...state, loadingList: true }
    case ORDER_MYLIST_SUCCESS:
      return { loadingList: false, orderItem: payload }
    case ORDER_MYLIST_FAIL:
      return { loadingList: false, errorList: payload }
    case ORDER_MYLIST_RESET:
      return { orderItem: [] }
    default:
      return state
  }
}

export const listAllOrdersReducer = (state = { orders: [] }, action) => {
  const { type, payload } = action
  switch (type) {
    case ORDER_LIST_REQUEST:
      return { ...state, loading: true }
    case ORDER_LIST_SUCCESS:
      return { loading: false, orders: payload }
    case ORDER_LIST_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}
