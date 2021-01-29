import React from 'react';
import { useSelector } from "react-redux";
import { StyleSheet, View } from 'react-native';

import DefaultText from '../../components/DefaultText';


//import { LASTRECIPES } from '../data/dummy-data';
import RecipeList from "../../components/RecipeList";
var component = 'RecipeFilterScreen.js';

component = props => {
    /*Receiving data*/
    const recipeId = props.navigation.getParam('recipeId');
    //const selectedRecipe = LASTRECIPES.find(recipe => recipe.id === recipeId);
       
    /*Select all recipes using State*/
    const selectedRecipe = useSelector(state => state._recipes.filteredRecipes);
    /*filter recipes (in this case by category)*/
    const displaydRecipes = selectedRecipe.filter(recipe => recipe.categoryIds.indexOf(recipeId) >= 0)
    //const displaydRecipes = RECIPES.filter(recipe => recipe.categoryIds.indexOf(recipeId) >= 0)
    
    /*Buttons action*/
    const NavigateToRecipe = () => {
        return props.navigation.goBack();
    };

    if(displaydRecipes.length === 0){
        return(
            <View style={styles.content}>
                <DefaultText>
                    No Recipe founds. Please check your filters.
                </DefaultText>
            </View>
        );
    }

    return (
        <RecipeList listData={displaydRecipes} navigation={props.navigation}/>        
    );

}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export default component;