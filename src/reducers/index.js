import {combineReducers} from 'redux';
import HomeReducer from "./home";
import {AccountReducer} from "reducers/account";

export default combineReducers({
    home: HomeReducer,
    account: AccountReducer
})