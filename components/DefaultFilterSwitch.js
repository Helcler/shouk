import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
var component = 'DefaultFilterSwitch';

import Colors from "../constants/Colors";

component = props => {

    return (
        <View style={styles.filterContainer}>
            <Text>{props.label}</Text>
            <Switch
                trackColor={{ true: Colors.primaryColor }}
                thumbColor={Colors.noColor}
                value={props.state}
                onValueChange={props.onChange}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 10

    }
});
export default component;