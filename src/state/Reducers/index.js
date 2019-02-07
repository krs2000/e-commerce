import { combineReducers } from "redux";
import productFilter from "./reducer_list";
import cart from "./reducer_cart"


export default combineReducers({
    productFilter,
    cart
});