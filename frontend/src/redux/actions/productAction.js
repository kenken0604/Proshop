//替product產生action
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  REVIEW_CREATE_REQUEST,
  REVIEW_CREATE_SUCCESS,
  REVIEW_CREATE_FAIL,
} from '../constants/productConstants'

import axios from 'axios'

export const listProducts = (keyword = '') => {
  //*讓keyword默認為''渲染畫面
  return async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST }) //增加loading過程

      const { data } = await axios.get(`/api/products?keyword=${keyword}`)

      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message //*測試值
            ? error.response.data.message
            : error.message,
      })
      // console.log(error.response)
      // console.log(error.response.data)
      // console.log(error.response.data.message) //自製的回應
      // console.log(error.message) //電腦設定的回應
    }
  }
}

export const detailProduct = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_DETAIL_REQUEST }) //增加loading過程

      const { data } = await axios.get(`/api/products/${id}`)

      dispatch({
        type: PRODUCT_DETAIL_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAIL_FAIL,
        payload:
          error.response && error.response.data.message //*測試值
            ? error.response.data.message
            : error.message,
      })
    }
  }
}

export const deleteProduct = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_DELETE_REQUEST }) //增加loading過程

      const { token } = getState().userLogin.userInfo

      const config = {
        headers: {
          Authorization: 'Bearer ' + token, //私密路由一定需要
        },
      }

      await axios.delete(`/api/products/${id}`, config)

      dispatch({
        type: PRODUCT_DELETE_SUCCESS,
      })
    } catch (error) {
      dispatch({
        type: PRODUCT_DELETE_FAIL,
        payload:
          error.response && error.response.data.message //*測試值
            ? error.response.data.message
            : error.message,
      })
    }
  }
}

export const createProduct = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_CREATE_REQUEST })

      const { token } = getState().userLogin.userInfo

      const config = {
        headers: {
          Authorization: 'Bearer ' + token, //私密路由一定需要
        },
      }

      const { data } = await axios.post(`/api/products`, {}, config)

      dispatch({
        type: PRODUCT_CREATE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: PRODUCT_CREATE_FAIL,
        payload:
          error.response && error.response.data.message //*測試值
            ? error.response.data.message
            : error.message,
      })
    }
  }
}

export const updateProduct = (id, updateInfo) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_UPDATE_REQUEST })

      const { token } = getState().userLogin.userInfo

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token, //私密路由一定需要
        },
      }

      await axios.put(`/api/products/${id}`, updateInfo, config)

      dispatch({
        type: PRODUCT_UPDATE_SUCCESS,
      })
    } catch (error) {
      dispatch({
        type: PRODUCT_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message //*測試值
            ? error.response.data.message
            : error.message,
      })
    }
  }
}

export const createReview = (id, review) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: REVIEW_CREATE_REQUEST })

      const { token } = getState().userLogin.userInfo

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token, //私密路由一定需要
        },
      }

      await axios.post(`/api/products/${id}/review`, review, config)

      dispatch({
        type: REVIEW_CREATE_SUCCESS,
      })
    } catch (error) {
      dispatch({
        type: REVIEW_CREATE_FAIL,
        payload:
          error.response && error.response.data.message //*測試值
            ? error.response.data.message
            : error.message,
      })
    }
  }
}
