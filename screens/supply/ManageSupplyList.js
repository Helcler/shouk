import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

var component = 'ManageSupplyList';

component = props => {
    return(
        <View style={styles.screen}>
        <Text>The Manage Supply List</Text>       
    </View>
    );
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export default component;