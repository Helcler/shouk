import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';

import Colors from "../../constants/Colors";
import PreparationItem from './PreparationItem';

var component = 'PreparationOrderItem';



component = props => {

    const [showDetails, setShowDetails] = useState(false);

    return (
        <View style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button color={Colors.accentColor} title={showDetails ? "Hide Details" : "Show Details"}
                onPress={() => {
                    setShowDetails(prevState => !prevState);
                }}
            />
            {showDetails && (
                <View style={styles.detailItems}>
                    {props.items.map(preparationItem =>
                    (<PreparationItem
                        key={preparationItem.id}
                        quantity={preparationItem.quantity} 
                        amount={preparationItem.sum} 
                        title={preparationItem.title}
                    />
                    ))}
                </View>
            )}
        </View>
    );
}
const styles = StyleSheet.create({
    orderItem: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 8,
        elevation: 8,
        borderRadius: 10,
        backgroundColor: Colors.noColor,
        margin: 20,
        padding: 10
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15
    },
    totalAmount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    date: {
        fontFamily: 'open-sans',
        fontSize: 16,
        color: '#888'
    },
    detailItems:{
        width: '100%'
    }
});
export default component;