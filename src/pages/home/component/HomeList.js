import {PureComponent} from "react";
import {FlatList, View, StyleSheet} from "react-native";
import {HomeListItem} from "./HomeListItem";

export class HomeList extends PureComponent {
    renderItem = ({item, index, navigation}) => {
        return (
            <HomeListItem
                onItemClicked={(url) => {
                    // 现在可以使用navigation了
                    navigation.navigate("WebviewScreen", {
                        url: url
                    });
                }}
                data={item}
            />
        );
    }

    render() {
        const {dataList} = this.props;

        return (
            <View style={styles.container}>
                <FlatList
                    data={dataList}
                    renderItem={({item, index}) => this.renderItem({item, index, navigation: this.props.navigation})}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})