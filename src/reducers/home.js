import {ActionType} from "../utils/Constant";

const initialState = {
    initPage: 1,
    dataSource: [], // 列表数据源
    homeBanner: [], // 首页轮播数据
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
        case ActionType.FETCH_HOME_BANNER:
            return {
                ...state,
                homeBanner: action.params
            };
        case ActionType.FETCH_HOME_BANNER_FAILURE:
            return state
        default:
            return state;
    }
}

export default home