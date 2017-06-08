import { combineReducers } from "redux"

/* Reducers */
import graphReducer from "./graphReducer"

export default combineReducers({
    data: graphReducer
})
