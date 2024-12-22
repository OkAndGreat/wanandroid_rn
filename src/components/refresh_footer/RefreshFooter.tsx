import React, {Component} from "react";
import {ActivityIndicator, TouchableOpacity, View, Text, StyleSheet} from "react-native";
import {RefreshState} from "components/refresh_footer/RefreshState";

interface RefreshFooterProps {
    state: RefreshState
    footerNoMoreDataText?: string
    footerFailureText?: string
    footerRefreshingText?: string
    onRetryLoading?: () => void
}

export class RefreshFooter extends Component<RefreshFooterProps, void> {

    constructor(props: RefreshFooterProps) {
        super(props);
    }

    render() {
        let {state} = this.props;
        const footerRefreshingText = this.props.footerRefreshingText ?? "正在努力加载"
        const footerNoMoreDataText = this.props.footerNoMoreDataText?? "没有更多数据了"
        const footerFailureText = this.props.footerFailureText?? "加载失败，点击重试"
        let footer = null;
        switch (state) {
            case RefreshState.Idle:
                // Idle情况下为null，不显示尾部组件
                break;
            case RefreshState.Refreshing:
                // 显示一个loading视图
                footer =
                    <View style={styles.loadingView}>
                        <ActivityIndicator size="small"/>
                        <Text style={styles.refreshingText}>{footerRefreshingText}</Text>
                    </View>;
                break;
            case RefreshState.NoMoreData:
                // 显示没有更多数据的文字，内容可以自己修改
                footer =
                    <View style={styles.loadingView}>
                        <Text style={styles.footerText}>{footerNoMoreDataText}</Text>
                    </View>;
                break;
            case RefreshState.Failure:
                // 加载失败的情况使用TouchableOpacity做一个可点击的组件，外部调用onRetryLoading重新加载数据
                footer =
                    <TouchableOpacity style={styles.loadingView} onPress={() => {
                        this.props.onRetryLoading && this.props.onRetryLoading();
                    }}>
                        <Text style={styles.footerText}>{footerFailureText}</Text>
                    </TouchableOpacity>;
                break;
        }
        return footer;
    }
}

const styles = StyleSheet.create({
    loadingView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
    },
    refreshingText: {
        fontSize: 13,
        color: "#666666",
        paddingLeft: 10,
    },
    footerText: {
        fontSize: 12,
        color: "#666666"
    }
});

