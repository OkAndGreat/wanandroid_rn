import {TouchableOpacity} from "react-native";
import React from "react";

export const TouchableOpacityWithoutFeedback = (props) => {
    // 将默认的 activeOpacity 设置为 1
    const defaultProps = {
        activeOpacity: 1
    };

    // 合并默认属性和传入的属性
    const mergedProps = {
        ...defaultProps,
        ...props
    };

    return <TouchableOpacity {...mergedProps} />;
};