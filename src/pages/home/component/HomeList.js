import {PureComponent} from "react";
import {FlatList, View, StyleSheet} from "react-native";
import {HomeListItem} from "./HomeListItem";

export class HomeList extends PureComponent {

    constructor() {
        super();
    }

    renderItem({item, index}) {
        return (
            <HomeListItem data={item}/>
        )
    }

    render() {
        const {dataList} = this.props;

        return <View style={styles.container}>
            <FlatList
                data={dataList}
                renderItem={this.renderItem}/>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})