import axios from 'axios'
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_MYLIST_FAIL,
  ORDER_MYLIST_REQUEST,
  ORDER_MYLIST_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
} from '../constants/orderConstants'

export const createOrder = (order) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_CREATE_REQUEST })

      const { token } = getState().userLogin.userInfo

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token, //*寫再headers裡面
        },
      }

      const { data } = await axios.post('/api/orders', order, config)
      // console.log(data)

      dispatch({
        type: ORDER_CREATE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload:
          error.response && error.response.data.message //*測試值
            ? error.response.data.message
            : error.message,
      })
    }
  }
}

export const getOrderDetails = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_DETAILS_REQUEST })

      const { token } = getState().userLogin.userInfo

      const config = {
        headers: {
          // 'Content-Type': 'application/json', //*get request不一定需要，但post put request一定要
          Authorization: 'Bearer ' + token, //私密路由一定需要
        },
      }

      const { data } = await axios.get(`/api/orders/${id}`, config)

      dispatch({
        type: ORDER_DETAILS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: ORDER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message //*測試值
            ? error.response.data.message
            : error.message,
      })
    }
  }
}

export const payOrder = (orderID, result) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_PAY_REQUEST })

      const { token } = getState().userLogin.userInfo

      const config = {
        headers: {
          'Content-Type': 'application/json', //*get request不一定需要，但post put request一定要
          Authorization: 'Bearer ' + token, //私密路由一定需要
        },
      }

      const { data } = await axios.put(
        `/api/orders/${orderID}/pay`,
        result,
        config,
      )

      dispatch({
        type: ORDER_PAY_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: ORDER_PAY_FAIL,
        payload:
          error.response && error.response.data.message //*測試值
            ? error.response.data.message
            : error.message,
      })
    }
  }
}

export const myOrderList = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_MYLIST_REQUEST })

      const { token } = getState().userLogin.userInfo

      const config = {
        headers: {
          Authorization: 'Bearer ' + token, //私密路由一定需要
        },
      }

      const { data } = await axios.get(`/api/orders/myorders`, config)

      dispatch({
        type: ORDER_MYLIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: ORDER_MYLIST_FAIL,
        payload:
          error.response && error.response.data.message //*測試值
            ? error.response.data.message
            : error.message,
      })
    }
  }
}
