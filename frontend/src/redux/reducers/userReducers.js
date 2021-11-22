import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_RESET,
  USER_UPDATE_SUCCESS,
} from '../constants/userConstants'

export const userLoginReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: payload }
    case USER_LOGIN_FAIL:
      return { loading: false, error: payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userRegisterReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case USER_REGISTER_REQUEST:
      return { loading: true }
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: payload }
    case USER_REGISTER_FAIL:
      return { loading: false, error: payload }

    default:
      return state
  }
}

//get request最好都要先放入初始狀態，好讓action按照指定容器放入
export const userDetailsReducer = (state = { user: {} }, action) => {
  const { type, payload } = action
  switch (type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true } //state要放出來
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: payload }
    case USER_DETAILS_FAIL:
      return { loading: false, error: payload }
    case USER_DETAILS_RESET:
      return { user: {} }
    default:
      return state
  }
}

export const userUpdateReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case USER_UPDATE_REQUEST:
      return { loading: true }
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true, userInfo: payload }
    case USER_UPDATE_FAIL:
      return { loading: false, success: false, error: payload }
    case USER_UPDATE_RESET:
      return {}
    default:
      return state
  }
}
