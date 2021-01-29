import React from 'react';
import {View, StyleSheet} from 'react-native';

import Colors from '../../constants/Colors';

var component = 'Card';
component = props => {
    return(
        <View style={{ ...styles.card, ...props.style}}>
            {props.children}
        </View>
    );
}
const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 8,
        elevation: 8,
        borderRadius: 10,
        backgroundColor: Colors.noColor,
        overflow:'hidden'
    }
});
export default component;
