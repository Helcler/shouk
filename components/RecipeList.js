import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { circle } from 'react-native/Libraries/Animated/src/Easing';
import { useSelector } from "react-redux";
var component = 'RecipeList';

import RecipeItem from '../components/RecipeItem';

component = props => {

    const favoriteRecipe = useSelector(state => state._recipes.favoriteRecipes);

    const NavigateToRecipeDetailScreen = (itemData) => {
        const isFavorite = favoriteRecipe.some(recipe => recipe.id === itemData.item.id);
        
        return props.navigation.navigate({
            routeName: 'RecipeDetail',
            params: {
                recipeId: itemData.item.id,
                recipeTitle: itemData.item.title,
                isFav: isFavorite
            }
        });
    };
     /*Functions*/
     const renderRecipeItem = itemData =>{
        return <RecipeItem 
        title={itemData.item.title} 
        image={itemData.item.imageUrl} 
        duration={itemData.item.duration}
        complexity={itemData.item.complexity.toUpperCase()}
        affordability={itemData.item.affordability.toUpperCase()}
        onSelectRecipe={NavigateToRecipeDetailScreen.bind(this, itemData)}/>;
    }

    return (
        <View style={styles.list}>
            <FlatList
                data={props.listData}
                keyExtractor={(item, index) => item.id}
                renderItem={renderRecipeItem}
                style={{ width: '95%' }}
            />
           {/*<View style={styles.screen}>
               <Text>The Recipe Screen</Text>
               <Text>{selectedRecipe.title}</Text>
               <Button title="Go to Recipe Detail" onPress={NavigateToRecipeDetailScreen} />
               <Button title="Go Back" onPress={NavigateToRecipe} />
           </View>*/}
        </View>
    );
}
const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export default component;