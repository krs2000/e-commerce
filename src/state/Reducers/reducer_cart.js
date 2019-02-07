import { ADD_CART, SUBSTRACT_CART,TOGGLE_DRAWER } from '../constants'
import _ from 'lodash'
let initialState = {
  items: [],
  countAll: 0,
  valueAll: 0,
  isDrawerOpen: false
}

//TO_DO needs small refactor
export default (state = initialState, action) => {
  const newState = Object.assign({}, state)
  switch (action.type) {
    case ADD_CART:
      newState.countAll > 0 &&
      newState.items.find(item => item.product.id === action.product.id)
        ? (newState.items.find(
            item => item.product.id === action.product.id
          ).count += parseInt(action.count))
        : (newState.items = state.items.concat({
            product: action.product,
            count: parseInt(action.count),
            get value() {
              return this.count * this.product.price
            },
          }))
      newState.countAll = _.sumBy(newState.items, 'count')
      newState.valueAll = _.sumBy(newState.items, 'value')
      newState.isDrawerOpen = true
      return newState
    case SUBSTRACT_CART:
      newState.items = [].concat(
        newState.items.filter(item => item.product.id !== action.id)
      )
      newState.countAll = _.sumBy(newState.items, 'count')
      newState.valueAll = _.sumBy(newState.items, 'value')
      return newState
    case TOGGLE_DRAWER:
      return Object.assign({}, state, {
        isDrawerOpen: action.payload,
      })
    default:
      return state
  }
}
