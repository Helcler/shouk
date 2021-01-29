import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
var component = 'DefaultListItem';

import DefaultText from "../components/DefaultText";

component = props => {
    return(
        <View style={styles.listItem}>
            <DefaultText>{props.children}</DefaultText>
        </View>
    );
}
const styles = StyleSheet.create({
    listItem:{
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor:'#ccc',
        borderWidth: 1,
        padding: 10
    }
});
export default component;