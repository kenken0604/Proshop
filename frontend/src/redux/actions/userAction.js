import axios from 'axios'
import { ORDER_MYLIST_RESET } from '../constants/orderConstants'
import {
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_ADMIN_FAIL,
  USER_UPDATE_ADMIN_REQUEST,
  USER_UPDATE_ADMIN_SUCCESS,
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
    dispatch({ type: USER_DETAILS_RESET })
    dispatch({ type: ORDER_MYLIST_RESET })
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

      // localStorage.setItem('userInfo', JSON.stringify(data))
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

      const { data } = await axios.get(`/api/users/${id}`, config) //*id不能改成profile，因為有action需要傳入id使用

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

      // localStorage.setItem('userInfo', JSON.stringify(data))

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

export const getAllUsers = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_LIST_REQUEST,
      })

      const { token } = getState().userLogin.userInfo

      const config = {
        headers: {
          Authorization: 'Bearer ' + token, //私密路由一定需要
        },
      }

      const { data } = await axios.get('/api/users', config)

      dispatch({
        type: USER_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: USER_LIST_FAIL,
        error:
          error.response && error.response.data.message //*測試值
            ? error.response.data.message
            : error.message,
      })
    }
  }
}

export const deleteUser = (userID) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_DELETE_REQUEST,
      })

      const { token } = getState().userLogin.userInfo

      const config = {
        headers: {
          Authorization: 'Bearer ' + token, //私密路由一定需要
        },
      }

      await axios.delete(`/api/users/${userID}`, config)

      dispatch({
        type: USER_DELETE_SUCCESS,
      })
    } catch (error) {
      dispatch({
        type: USER_DELETE_FAIL,
        error:
          error.response && error.response.data.message //*測試值
            ? error.response.data.message
            : error.message,
      })
    }
  }
}

export const adminUpdateUser = (userID, updateInfo) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: USER_UPDATE_ADMIN_REQUEST })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`, //*
        },
      }

      const { data } = await axios.put(
        `/api/users/${userID}`,
        updateInfo,
        config,
      )

      dispatch({
        type: USER_UPDATE_ADMIN_SUCCESS,
      })

      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: USER_UPDATE_ADMIN_FAIL,
        payload:
          error.response && error.response.data.message //*測試值
            ? error.response.data.message
            : error.message,
      })
    }
  }
}
