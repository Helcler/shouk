import { RECIPES } from '../../data/dummy-data';
import { SET_FILTERS, TOOGLE_FAVORITE } from '../actions/recipes';

const initialState = {
    recipes: RECIPES,
    filteredRecipes: RECIPES,
    favoriteRecipes: []
}

const recipesReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOOGLE_FAVORITE:
            const existingIndex = state.favoriteRecipes.findIndex(recipe => recipe.id === action.recipeId);
            if (existingIndex >= 0) {
                const updatedFavRecipes = [...state.favoriteRecipes];
                updatedFavRecipes.splice(existingIndex, 1);
                return { ...state, favoriteRecipes: updatedFavRecipes }
            } else {
                const recipe = state.recipes.find(recipe => recipe.id === action.recipeId);
                return { ...state, favoriteRecipes: state.favoriteRecipes.concat(recipe) }
            }
        case SET_FILTERS:
            const appliedFilters = action.filters;
            const updatedFilteredMeaals = state.recipes.filter(recipe => {
                if(appliedFilters.glutenFree && !recipe.isGlutenFree){
                    return false;
                }
                if(appliedFilters.lactoseFree && !recipe.isLactoseFree){
                    return false;
                }
                if(appliedFilters.vegetarian && !recipe.isVegetarian){
                    return false;
                }
                if(appliedFilters.vegan && !recipe.isVegan){
                    return false;
                }
                return true;
            });
        return { ...state, filteredRecipes: updatedFilteredMeaals };
        default:
            return state;
    }
}

export default recipesReducer;