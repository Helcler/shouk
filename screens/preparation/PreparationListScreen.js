import React from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ButtonHeader from "../../components/ButtonHeader";
//import PreparationItem from "../../components/preparation/PreparationItem";

var component = 'PreparationListScreen';
component = props => {

    const NavigateToManagePreparationListScreen = () => {
        return props.navigation.navigate({
            routeName: 'ManagePreparationList'
        });
    }

    return(
        <View style={styles.screen}>
        <Text>The Preparation List Screen</Text>       
        <Button title="Go to Manage Preparation List screen" onPress={NavigateToManagePreparationListScreen} />            
    </View>
    );
}

/*Custom Header Title*/
component.navigationOptions = (navigationData) => {
    return {
        headerTitle: 'All List of Preparation',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={ButtonHeader}>
                <Item
                    title='Menu'
                    iconName='ios-menu'
                    onPress={() => {
                        navigationData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={ButtonHeader}>
                <Item
                    title='New Item'
                    iconName='ios-add'
                    onPress={() => {
                        navigationData.navigation.navigate('ManagePreparationList');
                    }}
                />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export default component;