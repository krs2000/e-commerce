import { CATEGORY_CHANGE, SEARCH_CHANGE, ADD_CART, TOGGLE_DRAWER,SUBSTRACT_CART } from '../constants'

// TO_DO split in seperete files like reducer

export const category_change = category => {
  const action = {
    type: CATEGORY_CHANGE,
    category,
  }
  return action
}

export const search_change = search => {
  const action = {
    type: SEARCH_CHANGE,
    search,
  }
  return action
}

export const add_cart = (product, count) => {
  const action = {
    type: ADD_CART,
    product,
    count
  }
  return action
}

export const substract_cart = (id) => {
  const action = {
    type: SUBSTRACT_CART,
    id
  }
  return action
}

export const toggle_drawer = (payload) => {
  const action = {
    type: TOGGLE_DRAWER,
    payload
  }
  return action
}
