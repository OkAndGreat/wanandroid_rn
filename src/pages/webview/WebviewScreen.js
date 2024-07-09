import React, {PureComponent} from 'react';
import {Share, StyleSheet, View} from 'react-native';
import WebView from 'react-native-webview';

/**
 * WebViewScreen
 */
class WebViewScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
        };
        this.onShare = this.onShare.bind(this);
    }

    async onShare(title, url) {
        try {
            await Share.share({
                message: `${title}：${url}`,
            });
        } catch (error) {
            alert(error.message);
        }
    }

    render() {
        const {navigation, route} = this.props;
        const {url} = route.params
        return (
            <View style={styles.container}>
                <WebView
                    source={{uri: url}}
                    onError={(error) => {
                        console.log('WebView error:', error);
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        paddingTop: 10
    }
})

export default WebViewScreen;