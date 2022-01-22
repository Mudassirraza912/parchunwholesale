import { combineReducers } from "redux"

import user from "./userReducer"
import cart from './cartReducer'
import filterReducer from './filterReducer'
export default combineReducers({
  user,
  filterReducer,
  cart,
})
