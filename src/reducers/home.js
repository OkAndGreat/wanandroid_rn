import {ActionType} from "../utils/Constant";

const initialState = {
    initPage: 1,
    dataSource: [], // 列表数据源
}

const home = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.FETCH_HOME_LIST:
            return {
                ...state,
                dataSource: action.params.datas
            }
        case ActionType.FETCH_HOME_LIST_FAILURE:
            return state
        default:
            return state;
    }
}

export default home