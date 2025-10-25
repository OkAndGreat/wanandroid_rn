import {MMKV} from "react-native-mmkv";

class BottomTabName {
    static BOTTOM_TAB_NAME_HOME = "首页"
    static BOTTOM_TAB_NAME_ASK = "问答"
    static BOTTOM_TAB_NAME_SYSTEM = "体系"
    static BOTTOM_TAB_NAME_MINE = "我的"
}

export const mmkv = new MMKV()

export {BottomTabName}
