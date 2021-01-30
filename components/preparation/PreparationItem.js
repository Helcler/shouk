import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from "../../constants/Colors"

var component = 'PreparationItem';
component = props => {
    return (
        <View style={styles.preparationItem}>
            <View style={styles.itemData}>
                <Text style={styles.quantity}>{props.quantity}<Text style={styles.mainText}> {props.title}</Text></Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.mainText}>$ {props.amount.toFixed(2)}</Text>
                {props.deletable && <View>
                    <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
                        <Ionicons
                            name={'ios-remove'}
                            size={23}
                            color={Colors.accentColor}
                        />
                    </TouchableOpacity>
                <TouchableOpacity onPress={props.onAdd} style={styles.deleteButton}>
                        <Ionicons
                            name={'ios-add'}
                            size={23}
                            color={Colors.accentColor}
                        />
                    </TouchableOpacity>
                </View>}
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    preparationItem: {
        padding: 10,
        //backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20

    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    quantity: {
        fontFamily: 'open-sans',
        color: '#888',
        fontSize: 16
    },
    mainText: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    deleteButton: {
        flexDirection: 'row',
        marginLeft: 20
    }
});
export default component; 