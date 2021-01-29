import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { View, Image, Text, ScrollView, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
var component = 'RecipeDetailScreen.js';

//import { RECIPES } from '../data/dummy-data';
import ButtonHeader from '../../components/ButtonHeader';
import DefaultText from "../../components/DefaultText";
import DefaultListItem from "../../components/DefaultListItem";

import { toogleFavorite } from '../../redux/actions/recipes';


component = props => {
    /*Receiving data*/
    const recipeId = props.navigation.getParam('recipeId');

    /*Select all recipes using State*/
    const availableRecipes = useSelector(state => state._recipes.recipes);
    const currentRecipeIsFavorite = useSelector (state => state._recipes.favoriteRecipes.some(recipe => recipe. id === recipeId));
    /*filter recipes (in this case by category)*/
    const selectedRecipe = availableRecipes.find(recipe => recipe.id === recipeId)

    /*Forward param for tab*/
   const dispatch = useDispatch(() => {});
   const toogleFavoriteHandler = useCallback(() => {
       dispatch(toogleFavorite(recipeId));
   },[dispatch, recipeId]);

   /*useEffect for action to set new favorite*/
    useEffect(() => {
        //props.navigation.setParams({ recipeTitle: selectedRecipe.title });
        props.navigation.setParams({ toogleFav: toogleFavoriteHandler });

    },[toogleFavoriteHandler]);

    /*useEffect for action to set new favorite*/
    useEffect(() => {
        props.navigation.setParams({ isFav: currentRecipeIsFavorite });

    },[currentRecipeIsFavorite]);



    //const selectedRecipe = RECIPES.find(recipe => recipe.id === recipeId);
    
    const NavigateToDatasheeScreen = () => {
        return props.navigation.popToTop();
    };

    return (
        <ScrollView>
            <Image source={{ uri: selectedRecipe.imageUrl }} style={styles.image} />
            <View style={styles.details}>
                <DefaultText>{selectedRecipe.duration}m</DefaultText>
                <DefaultText>{selectedRecipe.complexity}</DefaultText>
                <DefaultText>{selectedRecipe.affordability}</DefaultText>
            </View>
            <Text style={styles.title}>Ingredientes</Text>
            {selectedRecipe.ingredients.map(ingredient => <DefaultListItem key={ingredient}>{ingredient}</DefaultListItem>)}
            <Text style={styles.title}>Steps</Text>
            {selectedRecipe.steps.map(step => <DefaultListItem key={step}>{step}</DefaultListItem>)}

            {/*<View style={styles.screen}>
                <Text>The Recipe Detail Screen</Text>
                <Text>{selectedRecipe.title}</Text>
                <Button title="Go Back to Datasheet" onPress={NavigateToDatasheeScreen} />
            </View>*/}
        </ScrollView>
    );
}
component.navigationOptions = (navigationData) => {
    /*reciving information outside */
    const recipeTitle = navigationData.navigation.getParam('recipeTitle');
    const toogleFavorite = navigationData.navigation.getParam('toogleFav');
    const isFavoriterecipe = navigationData.navigation.getParam('isFav');

    return {
        headerTitle: recipeTitle,
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={ButtonHeader}>
                <Item
                    title='Favorite'
                    iconName={isFavoriterecipe ? 'ios-star': 'ios-star-outline'}
                    onPress={toogleFavorite}
                />
            </HeaderButtons>)
    }
};
const styles = StyleSheet.create({
    details: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 15
    },
    image: {
        width: '100%',
        height: 200
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: 'center'
    }

});
export default component;