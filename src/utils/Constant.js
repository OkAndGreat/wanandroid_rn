class ActionType {
    static FETCH_HOME_LIST = 'FETCH_HOME_LIST' // 请求首页列表
    static FETCH_HOME_LIST_FAILURE = 'FETCH_HOME_LIST_FAILURE' // 请求首页列表失败
    static FETCH_HOME_BANNER = 'FETCH_HOME_BANNER'
    static FETCH_HOME_BANNER_FAILURE = 'FETCH_HOME_BANNER_FAILURE'
}

class BottomTabName {
    static BOTTOM_TAB_NAME_HOME = "首页"
    static BOTTOM_TAB_NAME_ASK = "问答"
    static BOTTOM_TAB_NAME_SYSTEM = "体系"
    static BOTTOM_TAB_NAME_MINE = "我的"
}

export {ActionType, BottomTabName}