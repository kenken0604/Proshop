import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'

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

export const removeFromCart = (id) => {
  return (dispatch, getState) => {
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: id,
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  }
}
