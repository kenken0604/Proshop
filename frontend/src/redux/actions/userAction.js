import axios from 'axios'
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from '../constants/userConstants'

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch({ type: USER_LOGIN_REQUEST })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        '/api/users/login',
        { email, password },
        config,
      )

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      })

      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message //*測試值
            ? error.response.data.message
            : error.message,
      })
    }
  }
}

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('address')
    localStorage.removeItem('paymentMethod')
    dispatch({ type: USER_LOGOUT })
  }
}

export const register = (name, email, password) => {
  return async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_SUCCESS })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        '/api/users',
        { name, email, password },
        config,
      )

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      })

      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message //*測試值
            ? error.response.data.message
            : error.message,
      })
    }
  }
}

export const getUserDetails = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: USER_DETAILS_REQUEST })

      const {
        userLogin: { userInfo },
      } = getState() //*

      const config = {
        headers: {
          'Content-Type': 'aplication/json',
          Authorization: `Bearer ${userInfo.token}`, //*
        },
      }

      const { data } = await axios.get(`/api/users/${id}`, config)

      console.log(data)
      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: USER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message //*測試值
            ? error.response.data.message
            : error.message,
      })
    }
  }
}

export const update = (updateInfo) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: USER_UPDATE_REQUEST })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`, //*
        },
      }

      const { data } = await axios.put('/api/users/profile', updateInfo, config)

      dispatch({
        type: USER_UPDATE_SUCCESS,
        payload: data,
      })

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      })

      localStorage.setItem('userInfo', JSON.stringify(data))

      dispatch({ type: USER_LOGOUT })
    } catch (error) {
      dispatch({
        type: USER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message //*測試值
            ? error.response.data.message
            : error.message,
      })
    }
  }
}
