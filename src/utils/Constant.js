import {MMKV} from "react-native-mmkv";

class ActionType {
    static FETCH_HOME_LIST = 'FETCH_HOME_LIST' // 请求首页列表
    static LOAD_MORE_HOME_LIST = 'LOAD_MORE_HOME_LIST' // 加载更多首页列表
    static FETCH_HOME_BANNER = 'FETCH_HOME_BANNER'
}

class BottomTabName {
    static BOTTOM_TAB_NAME_HOME = "首页"
    static BOTTOM_TAB_NAME_ASK = "问答"
    static BOTTOM_TAB_NAME_SYSTEM = "体系"
    static BOTTOM_TAB_NAME_MINE = "我的"
}

export const mmkv = new MMKV()

export {ActionType, BottomTabName}
