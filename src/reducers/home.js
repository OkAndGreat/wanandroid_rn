import {ActionTypes} from "utils/Constant";

const initialState = {
    curPage: 0,
    dataSource: [], // 列表数据源
    homeBanner: [], // 首页轮播数据
}

const HomeReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_HOME_LIST:
            return {
                ...state,
                curPage: 1,
                dataSource: action.params.datas
            }
        case ActionTypes.FETCH_HOME_BANNER:
            return {
                ...state,
                homeBanner: action.params
            };
        case ActionTypes.LOAD_MORE_HOME_LIST:
            return {
                ...state,
                curPage: state.curPage + 1,
                dataSource: state.dataSource.concat(action.params.datas)
            }
        default:
            return state;
    }
}

export default HomeReducer
