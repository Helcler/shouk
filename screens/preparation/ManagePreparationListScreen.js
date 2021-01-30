import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { View, Button, Text, TouchableOpacity, FlatList, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { ListItem, Avatar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';

import * as preparationActions from "../../redux/actions/preparation";
import * as preparationOrderActions from "../../redux/actions/preparationOrder";

import ButtonHeader from "../../components/ButtonHeader";
import Colors from "../../constants/Colors";
import { event } from 'react-native-reanimated';
import { isLoading } from 'expo-font';


var component = 'ManagePreparationList';
component = props => {

    const preparationTotalAmount = useSelector(state => state._preparation.totalAmount);

    const initialItems = useSelector(state => {
        const data = [];
        for (const i in state._preparation.items) {
            data.push({
                id: i,
                title: state._preparation.items[i].title,
                price: state._preparation.items[i].price,
                quantity: state._preparation.items[i].quantity,
                imageUrl: state._preparation.items[i].imageUrl,
                sum: state._preparation.items[i].sum
            });
        }
        //return data.sort((a, b) => a.itemId > b.itemId ? 1 : -1);
        return data;
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


    /* addListener para que sempre q a aba for aberta, recarregar os item*/
    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadItems);

        return () => {
            willFocusSub.remove();
        }
    }, [loadItems]);

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
        props.navigation.setParams({ submit: sendPreparationOrderHandler });

        return () => {
            willFocusSub.remove();
        }
    }, [loadItems, sendPreparationOrderHandler]);

    /* Meu Teste*/

    /*Buttons action*/
    const AddItemtHandler = (evt, itemData) => {
        dispatch(preparationActions.addToPreparation(itemData));
    }

    const sendPreparationOrderHandler = async () => {
        setIsPageIsLoading(true);
        let selectedPreparationItems = initialItems.filter(function (e) {
            return e.sum > 0;
        });
        await dispatch(preparationOrderActions.addPreparation(selectedPreparationItems, preparationTotalAmount));
        setIsPageIsLoading(false);
        props.navigation.goBack();
    }


    /*useEffect(() => {
        props.navigation.setParams({ submit: sendPreparationOrderHandler })
    }, [sendPreparationOrderHandler]);*/

    const renderItemTransformed = (itemData) => {
        return (

            <View style={styles.preparationItem}>
                <ListItem bottomDivider>
                    <Avatar source={{ uri: itemData.item.imageUrl }} />
                    <ListItem.Content>
                        <ListItem.Title>{itemData.item.title}</ListItem.Title>
                        <ListItem.Subtitle>{itemData.item.price}</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Content>
                        <ListItem.Title style={styles.quantity}>{itemData.item.quantity}</ListItem.Title>
                    </ListItem.Content>
                    <View style={styles.itemData}>
                        <TouchableOpacity
                            onPress={() => {
                                dispatch(preparationActions.removeFromPreparation(itemData.item.id));
                            }}
                            style={styles.deleteButton}>
                            <Ionicons
                                name={'ios-remove'}
                                size={23}
                                color={Colors.accentColor}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                AddItemtHandler(event, itemData.item)
                            }}
                            style={styles.deleteButton}>
                            <Ionicons
                                name={'ios-add'}
                                size={23}
                                color={Colors.accentColor}
                            />
                        </TouchableOpacity>
                    </View>

                </ListItem>
            </View>
        );
    }

    return (
        <View>
            <View style={styles.screen}>
                <View style={styles.sumary}>
                    <Text style={styles.sumaryText}>Total:
                        <Text style={styles.amount}>${preparationTotalAmount.toFixed(2)}</Text></Text>
                    {isPageLoading ? <ActivityIndicator size='small' color={Colors.primaryColor} /> :
                        <Button
                            color={Colors.accentColor}
                            title="Save now"
                            disabled={!initialItems.find(item => item.sum > 0)}
                            onPress={sendPreparationOrderHandler}

                        />}
                </View>
            </View>
            <FlatList
                keyExtractor={(item, index) => item.id}
                data={initialItems}
                renderItem={renderItemTransformed}
                numColumns={1}
            />
        </View>
    );
}

/*Custom Header Title*/
component.navigationOptions = (navigationData) => {
    const submitFn = navigationData.navigation.getParam('submit');

    return {
        //headerTitle: navigationData.navigation.getParam('itemId') ? 'Edit Product' : 'Add Product',
        headerTitle: false ? 'Edit Preparation List' : 'Add new Preparation List',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={ButtonHeader}>
                <Item
                    title='Save'
                    iconName='ios-checkmark'
                    onPress={submitFn}
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
    },
    preparationItem: {
        justifyContent: 'space-between',
        marginHorizontal: 10
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    deleteButton: {
        flexDirection: 'row',
        marginLeft: 35
    },
    subtitleView: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 5
    },
    ratingImage: {
        height: 19.21,
        width: 100
    },
    ratingText: {
        paddingLeft: 10,
        color: 'grey'
    }
});
export default component;