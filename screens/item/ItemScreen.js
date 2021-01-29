import React, { useState, useEffect, useCallback } from 'react';
import { Button, FlatList, Alert, ActivityIndicator, StyleSheet, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from "react-redux";

import ProductItem from "../../components/items/ProductItem";
import DefaultText from '../../components/DefaultText';
import ButtonHeader from "../../components/ButtonHeader";
import Colors from "../../constants/Colors";

import * as itemActions from "../../redux/actions/items";


var component = 'ItemScreen';
component = props => {
    //const items = useSelector(state => state._items.availableItems);
    const items = useSelector(state => state._items.userItems);

    const [isPageLoading, setIsPageIsLoading] = useState(false);
    const [isPageRefreshing, setIsPageIsRefreshing] = useState(false);
    const [error, setError] = useState();
    /* this funcition run aways when the companent is load. load Items from the db*/

    /* addListener para que sempre q a aba for aberta, recarregar os item*/
    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadItems);

        return () => {
            willFocusSub.remove();
        }
    }, [loadItems]);

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

    /*useEffect(() =>{
        setIsPageIsLoading(true);
        dispatch(itemActions.fetchItems()).then();
    }, [dispatch]);*/

    const editProductHandler = (id) => {
        return props.navigation.navigate(
            'ManageItem',
            { itemId: id }
        );
    }

    const deleteHandler = (id) => {
        Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
            { text: 'No', style: 'default' },
            {
                text: 'Yes', style: 'destructive', onPress: () => {
                    dispatch(itemActions.deleteItem(id));
                }
            }
        ]);

    };
    const dispatch = useDispatch();


    /*icone carregando items*/
    if (error) {
        return <View style={styles.loadingPage}>
            <DefaultText>Sorry, A error occurred!</DefaultText>
            <Button title='Try again' onPress={loadItems} color={Colors.primaryColor} />
        </View>
    }
    if (isPageLoading) {
        return <View style={styles.loadingPage}>
            <ActivityIndicator size='large' color={Colors.primaryColor} />
        </View>
    }

    if (!isPageLoading && items.length === 0) {
        return <View style={styles.loadingPage}>
            <DefaultText>No items Found. Maybe start adding some</DefaultText>
        </View>
    }
    return (
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
                        editProductHandler(itemData.item.id)
                    }}>
                    <Button
                        color={Colors.primaryColor}
                        title="Edit"
                        onPress={() => {
                            editProductHandler(itemData.item.id)
                        }}
                    />
                    <Button
                        color={Colors.primaryColor}
                        title="Delete"
                        onPress={deleteHandler.bind(this, itemData.item.id)}
                    />
                </ProductItem>
            )}
        />
    );
}
/*Custom Header Title*/
component.navigationOptions = (navigationData) => {
    return {
        headerTitle: 'All Items',
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
                        navigationData.navigation.navigate('ManageItem');
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
    },
    loadingPage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export default component;