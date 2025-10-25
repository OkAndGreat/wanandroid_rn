import {combineReducers} from 'redux';
import homeReducer from "./homeSlice";
import accountReducer from "./accountSlice";

export default combineReducers({
    home: homeReducer,
    account: accountReducer
})