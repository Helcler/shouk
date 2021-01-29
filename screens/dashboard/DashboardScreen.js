import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ButtonHeader from "../../components/ButtonHeader";

var component = 'DashboardScreen';
component = props => {

    return (
        <View style={styles.screen}>
            <Text>The Dashboard Screen</Text>
        </View>
    );
}
/*Custom Header Title*/
component.navigationOptions = (navigationData) => {
    return {
        headerTitle: 'Dashboard',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={ButtonHeader}>
                <Item
                    title='Menu'
                    iconName='ios-menu'
                    onPress={() => {
                       navigationData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>)}
    }

    const styles = StyleSheet.create({
        screen: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }
    });

    export default component;