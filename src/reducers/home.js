import {ActionType} from "../utils/Constant";

const initialState = {
    curPage: 0,
    dataSource: [], // 列表数据源
    homeBanner: [], // 首页轮播数据
}

const home = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.FETCH_HOME_LIST:
            return {
                ...state,
                curPage: 1,
                dataSource: action.params.datas
            }
        case ActionType.FETCH_HOME_BANNER:
            return {
                ...state,
                homeBanner: action.params
            };
        case ActionType.LOAD_MORE_HOME_LIST:
            return {
                ...state,
                curPage: state.curPage + 1,
                dataSource: state.dataSource.concat(action.params.datas)
            }
        default:
            return state;
    }
}

export default home
