import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { setFilters } from '../../redux/actions/recipes';

import ButtonHeader from "../../components/ButtonHeader";
import DefaultFilterSwitch from "../../components/DefaultFilterSwitch";

var component = 'RecipeFilterScreen.js';
component = props => {
    /* object distracturing - clen navigation to recive new parameters on reload */
    const { navigation } = props;

    const [isGlutenFree, setIsglutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setisVegan] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);

    const dispatch = useDispatch();

    const saveFilters = useCallback(() => {
        const appliedFilters = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegan: isVegan,
            vegetarian: isVegetarian
        };
        dispatch(setFilters(appliedFilters));
    }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch]);
    /*Update current values for the current page*/
    useEffect(() => {
        navigation.setParams({ save: saveFilters });
    }, [saveFilters]);

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filter / Restrictions</Text>
            <DefaultFilterSwitch label='Gluten-free' state={isGlutenFree} onChange={newValue => setIsglutenFree(newValue)} />
            <DefaultFilterSwitch label="Lactose-free" state={isLactoseFree} onChange={newValue => setIsLactoseFree(newValue)} />
            <DefaultFilterSwitch label="Vegan" state={isVegan} onChange={newValue => setisVegan(newValue)} />
            <DefaultFilterSwitch label="Vegetarian" state={isVegetarian} onChange={newValue => setIsVegetarian(newValue)} />
        </View>
    );
}
/*Custom Header Title*/
component.navigationOptions = (navigationData) => {
    return {
        headerTitle: 'Filter Recipes',
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
                    title='Save'
                    //iconName='ios-save'
                    onPress={navigationData.navigation.getParam('save')}
                />
            </HeaderButtons>
        )
    }
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },

    title: {
        fontSize: 22,
        fontFamily: 'open-sans-bold',
        margin: 20,
        textAlign: 'center'
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%'

    }
});
export default component;