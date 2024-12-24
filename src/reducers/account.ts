import {ActionTypes} from "utils/Constant";

const initialState = {
    isLogin: false,
}

export const AccountReducer = (state = initialState, action: { type: string; payload?: any }) => {
    switch (action.type) {
        case ActionTypes.LOGIN:
            return {
                ...state,
                isLogin: true
            }
        case ActionTypes.UN_LOGIN:
            return {
                ...state,
                isLogin: false
            }
        default:
            return state;
    }
}