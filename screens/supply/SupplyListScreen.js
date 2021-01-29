import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ButtonHeader from "../../components/ButtonHeader";

var component = 'SupplyListScreen';
component = props => {

    const NavigateToManageSupplyListScreen = () => {
        return props.navigation.navigate({
            routeName: 'ManageSupplyList'
        });
    }
    
    return(
        <View style={styles.screen}>
        <Text>The Supply List Screen</Text>   
        <Button title="Go to Manage Supply List Screen" onPress={NavigateToManageSupplyListScreen} />                
    </View>
    );
}

/*Custom Header Title*/
component.navigationOptions = (navigationData) => {
    return {
        headerTitle: 'Supply',
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