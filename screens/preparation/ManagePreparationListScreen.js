import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert, KeyboardAvoidingView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';


import ProductItem from "../../components/items/ProductItem";
import PreparationItem from "../../components/preparation/PreparationItem";
import DefaultText from '../../components/DefaultText';
import ButtonHeader from "../../components/ButtonHeader";
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";

import * as preparationActions from "../../redux/actions/preparation";

var component = 'ManagePreparationList';
component = props => {

    const preparationTotalAmount = useSelector(state => state._preparation.totalAmount);

    const items = useSelector(state => state._items.userItems);

    //const updatedPrepItems = useSelector(state => state._preparation.items);
    const product = 'p1';
    //const details = useSelector(state => state._preparation.items.find(item => item.id === product))
    const details = useSelector(state => state._preparation.items[product])
    console.log(details);
    const itemTransformed = useSelector(state => {
        const data = [];
        for (const i in state._items.userItems) {
            data.push({
                id: state._items.userItems[i].id,
                title: state._items.userItems[i].title,
                price: state._items.userItems[i].price,
                quantity: state._items.userItems[i].quantity
            });
        }
        return data;
    });


    const preparationItems = useSelector(state => {
        const transformedPreparationItems = [];
        for (const i in state._preparation.items) {
            transformedPreparationItems.push({
                /*itemId: state._preparation.items[i].id,
                itemTitle: state._preparation.items[i].title,
                itemPrice: state._preparation.items[i].price,
                quantity: state._preparation.items[i].quantity,
                sum: state._preparation.items[i].sum*/

                id: state._preparation.items[i].itemId,
                title: state._preparation.items[i].title,
                price: state._preparation.items[i].price,
                quantity: state._preparation.items[i].quantity,
                sum: state._preparation.items[i].sum
            });
        }
        return transformedPreparationItems.sort((a, b) => a.itemId > b.itemId ? 1 : -1);
    });

    const [isPageLoading, setIsPageIsLoading] = useState(false);
    const [isPageRefreshing, setIsPageIsRefreshing] = useState(false);
    const [error, setError] = useState();

    const dispatch = useDispatch();


    /*carregar a pagina com async*/
    const loadItems = useCallback(async () => {
        setError(null);
        setIsPageIsRefreshing(true);
        try {
            await dispatch(itemActions.fetchItems());
        } catch (error) {
            setError(error.message);
        }
        setIsPageIsRefreshing(false);
    }, [dispatch, setIsPageIsLoading, setError]);

    useEffect(() => {
        setIsPageIsLoading(true);
        loadItems().then(() => {
            setIsPageIsLoading(false);
        });
    }, [dispatch], loadItems);


    /*Buttons Functions*/
    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ItemDetail', {
            itemId: id,
            itemTitle: title
        })
    };
    /* addListener para que sempre q a aba for aberta, recarregar os item*/
    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadItems);

        return () => {
            willFocusSub.remove();
        }
    }, [loadItems]);

    /* Meu Teste*/


    return (

        <View style={styles.screen}>
            <View style={styles.sumary}>
                <Text style={styles.sumaryText}>Total:
                <Text style={styles.amount}>${preparationTotalAmount.toFixed(2)}</Text></Text>
                <Button
                    color={Colors.accentColor}
                    title="Save now"
                    disabled={preparationItems.length === 0}
                />
            </View>
            <View>
                <FlatList
                    data={itemTransformed}
                    keyExtractor={item => item.id}
                    renderItem={itemData => (
                        <PreparationItem
                            quantity={itemData.item.quantity}
                            title={itemData.item.title}
                            amount={itemData.item.price}
                            onAdd={() => { 
                                dispatch(preparationActions.addToPreparation(itemData.item));
                            }}
                            onRemove={() => { 
                                dispatch(preparationActions.removeFromPreparation(itemData.item.id));
                            }}
                        />
                    )}
                />
            </View>
        </View>


        /*
        <FlatList
        onRefresh={loadItems}
        refreshing={isPageRefreshing}
        data={items}
        keyExtractor={item => item.id}
        renderItem={itemData => (
            <ProductItem
                image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onSelect={() => {
                    selectItemHandler(itemData.item.id, itemData.item.title)
                }}>
                <Button
                    color={Colors.primaryColor}
                    title="View Details"
                    onPress={() => {
                        selectItemHandler(itemData.item.id, itemData.item.title)
                    }}
                />
                <Button
                    color={Colors.primaryColor}
                    title="Add to List"
                    onPress={() => {
                        dispatch(preparationActions.addToPreparation(itemData.item));
                    }}
                />
            </ProductItem>
        )}
    />
    */
    );
}

/*Custom Header Title*/
component.navigationOptions = (navigationData) => {
    //const submitFn = navigationData.navigation.getParam('submit');

    return {
        //headerTitle: navigationData.navigation.getParam('itemId') ? 'Edit Product' : 'Add Product',
        headerTitle: false ? 'Edit Preparation List' : 'Add new Preparation List',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={ButtonHeader}>
                <Item
                    title='Save'
                    iconName='ios-checkmark'
                    onPress={() => {
                        navigationData.navigation.navigate('Preparation');
                    }}
                />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    loadingPage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sumary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 20,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 8,
        elevation: 8,
        borderRadius: 10,
        backgroundColor: Colors.noColor
    },
    sumaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    amount: {
        color: Colors.accentColor
    }
});
export default component;