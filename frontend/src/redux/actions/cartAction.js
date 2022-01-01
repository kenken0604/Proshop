import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_ADDRESS,
  CART_SET_METHOD,
  BADGE_GET_POSITION,
  CALL_TO_BOUNCE,
  CART_CLEAR_ITEMS,
  CART_SET_QTY,
} from '../constants/cartConstants'

import axios from 'axios'

export const addToCart = (id, qty) => {
  return async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
      type: CART_ADD_ITEM,
      //儲存的資料為物件
      payload: {
        productID: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      },
    })

    // console.log(getState) //取得狀態的函數
    // console.log(getState()) //執行函數
    // console.log(getState().cart) //找到該reducer
    // console.log(getState().cart.cartItems) //該reducer中cart的狀態

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  }
}

export const setProductQTY = (id, qty) => {
  return async (dispatch, getState) => {
    dispatch({
      type: CART_SET_QTY,
      payload: {
        productID: id,
        qty,
      },
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  }
}

export const removeFromCart = (id) => {
  return (dispatch, getState) => {
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: id,
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  }
}

export const clearCart = () => {
  return (dispatch) => {
    dispatch({
      type: CART_CLEAR_ITEMS,
    })

    localStorage.setItem('cartItems', '')
  }
}

export const saveShipingAddress = (data) => {
  return (dispatch) => {
    dispatch({
      type: CART_SAVE_ADDRESS,
      payload: data,
    })

    localStorage.setItem('address', JSON.stringify(data))
  }
}

export const setPayment = (method) => {
  return (dispatch) => {
    dispatch({
      type: CART_SET_METHOD,
      payload: method,
    })

    localStorage.setItem('paymentMethod', method)
  }
}

export const sendRefInfo = (position) => {
  return { type: BADGE_GET_POSITION, payload: position }
}

export const calltoBounce = (signal) => {
  return { type: CALL_TO_BOUNCE, payload: signal }
}
