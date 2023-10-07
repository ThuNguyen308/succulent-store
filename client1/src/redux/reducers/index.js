import { combineReducers } from "redux"

import userReducer from "./user"
import cartReducer from "./cart"

const allReducers = combineReducers({
    user: userReducer,
    cart: cartReducer
})

export default allReducers