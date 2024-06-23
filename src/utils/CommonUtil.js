import {isAndroid} from "./screenUtil";
import {ToastAndroid} from "react-native";
import Toast from "../components/Toast";

/**
 * 吐司方法
 * @param info 吐司文案信息
 * @return
 */
export function showToast(info) {
    if (isAndroid) {
        return ToastAndroid.show(info, ToastAndroid.SHORT);
    }
    Toast.add(info)
}