import { CATEGORY_CHANGE , SEARCH_CHANGE} from '../constants'

let initialState = {
  category: undefined,
  search: '',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY_CHANGE:
      return Object.assign({}, state, {
        category: action.category,
      })
      case SEARCH_CHANGE:
      return Object.assign({}, state, {
        search: action.search,
        category:undefined
      })
    default:
      return state
  }
}

