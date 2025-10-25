import {combineReducers} from 'redux';
import homeReducer from "../features/home/store/homeSlice";
import accountReducer from "../features/account/store/accountSlice";

export default combineReducers({
    home: homeReducer,
    account: accountReducer
})