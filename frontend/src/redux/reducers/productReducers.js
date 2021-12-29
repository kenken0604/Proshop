//處理products組件的指令
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  REVIEW_CREATE_REQUEST,
  REVIEW_CREATE_SUCCESS,
  REVIEW_CREATE_FAIL,
  REVIEW_CREATE_RESET,
  GET_TOPS_REQUEST,
  GET_TOPS_SUCCESS,
  GET_TOPS_FAIL,
} from '../constants/productConstants'

export const productListReducer = (state = { products: [] }, action) => {
  const { type, payload } = action //傳入動作類型
  switch (type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] }
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: payload.products,
        page: payload.page,
        pages: payload.pages,
      }
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}

export const productDetailReducer = (
  state = { loading: true, product: {} },
  action,
) => {
  const { type, payload } = action //傳入動作類型
  switch (type) {
    case PRODUCT_DETAIL_REQUEST:
      return { ...state, loading: true }
    case PRODUCT_DETAIL_SUCCESS:
      return { loading: false, product: payload }
    case PRODUCT_DETAIL_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}

export const productDeleteReducer = (state = {}, action) => {
  const { type, payload } = action //傳入動作類型
  switch (type) {
    case PRODUCT_DELETE_REQUEST:
      return { loadingDelete: true }
    case PRODUCT_DELETE_SUCCESS:
      return { loadingDelete: false, successDelete: true }
    case PRODUCT_DELETE_FAIL:
      return { loadingDelete: false, errorDelete: payload }
    default:
      return state
  }
}

export const productCreateReducer = (
  state = { createdProduct: null },
  action,
) => {
  const { type, payload } = action //傳入動作類型
  switch (type) {
    case PRODUCT_CREATE_REQUEST:
      return { loadingCreate: true }
    case PRODUCT_CREATE_SUCCESS:
      return {
        loadingCreate: false,
        suceessCreate: true,
        createdProduct: payload,
      }
    case PRODUCT_CREATE_FAIL:
      return { loadingCreate: false, errorCreate: payload }
    case PRODUCT_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const productUpdateReducer = (
  state = { updateSuccess: false },
  action,
) => {
  const { type, payload } = action //傳入動作類型
  switch (type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true }
    case PRODUCT_UPDATE_SUCCESS:
      return {
        loading: false,
        updateSuccess: true,
      }
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, updateError: payload }
    case PRODUCT_UPDATE_RESET:
      return { updateSuccess: false }
    default:
      return state
  }
}

export const reviewCreateReducer = (state = {}, action) => {
  const { type, payload } = action //傳入動作類型
  switch (type) {
    case REVIEW_CREATE_REQUEST:
      return { reviewLoading: true }
    case REVIEW_CREATE_SUCCESS:
      return { reviewLoading: false, reviewSuccess: true }
    case REVIEW_CREATE_FAIL:
      return { reviewLoading: false, reviewError: payload }
    case REVIEW_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const getTopReducer = (state = { products: [] }, action) => {
  const { type, payload } = action //傳入動作類型
  switch (type) {
    case GET_TOPS_REQUEST:
      return { ...state, loading: true }
    case GET_TOPS_SUCCESS:
      return { loading: false, products: payload }
    case GET_TOPS_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}
