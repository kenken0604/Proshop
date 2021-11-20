import axios from 'axios'
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
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
