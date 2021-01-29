import React from 'react';
import { useSelector } from "react-redux";
import { View, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
var component = 'FavoritesScreen';

import ButtonHeader from "../components/ButtonHeader";
import DefaultText from '../components/DefaultText';

import RecipeList from "../components/RecipeList";

component = props => {
    /*Select all recipes using State*/

    const availableRecipes = useSelector(state => state._recipes.favoriteRecipes);
    /*filter recipes (in this case by category)*/


    if (availableRecipes.length === 0 || !availableRecipes) {
        return (
            <View style={styles.content}>
                <DefaultText>
                    No favorite Recipe found. Start adding some!
            </DefaultText>
            </View>
        );
    }
    return (
        <RecipeList listData={availableRecipes} navigation={props.navigation} />
    );
}
/*Custom Header Title*/
component.navigationOptions = (navigationData) => {
    return {
        headerTitle: 'Your Favorites',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={ButtonHeader}>
                <Item
                    title='Menu'
                    iconName='ios-menu'
                    onPress={() => {
                        navigationData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>)
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export default component;