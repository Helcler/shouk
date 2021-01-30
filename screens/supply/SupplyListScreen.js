import React, { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator, View, Button, FlatList, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import ButtonHeader from "../../components/ButtonHeader";
import DefaultText from '../../components/DefaultText';
import PreparationOrderItem from "../../components/preparation/PreparationOrderItem";
import Colors from '../../constants/Colors'

import * as supplyOrderActions from "../../redux/actions/supply/supplyOrder";


var component = 'SupplyListScreen';
component = props => {

    const orders = useSelector(state => state._supplyOrder.orders);

    //console.log(orders);

    const [isPageLoading, setIsPageIsLoading] = useState(false);
    const [isPageRefreshing, setIsPageIsRefreshing] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadSupplyOrders);

        return () => {
            willFocusSub.remove();
        }
    }, [loadSupplyOrders]);

    /*carregar a pagina com async*/
    const loadSupplyOrders = useCallback(async () => {
        setError(null);
        setIsPageIsRefreshing(true);
        try {
            await dispatch(supplyOrderActions.fetchSupplyOrders());
        } catch (error) {
            setError(error.message);
        }
        setIsPageIsRefreshing(false);
    }, [dispatch, setIsPageIsLoading, setError]);

    useEffect(() => {
        setIsPageIsLoading(true);
        loadSupplyOrders().then(() => {
            setIsPageIsLoading(false);
        });
    }, [dispatch], loadSupplyOrders);

    const dispatch = useDispatch();

    if (error) {
        return <View style={styles.loadingPage}>
            <DefaultText>Sorry, A error occurred!</DefaultText>
            <Button title='Try again' onPress={loadSupplyOrders} color={Colors.primaryColor} />
        </View>
    }
    if (isPageLoading) {
        return <View style={styles.loadingPage}>
            <ActivityIndicator size='large' color={Colors.primaryColor} />
        </View>
    }

    if (!isPageLoading && orders.length === 0) {
        return <View style={styles.loadingPage}>
            <DefaultText>No items Found. Maybe start adding some</DefaultText>
        </View>
    }


    return (
        <FlatList
            onRefresh={loadSupplyOrders}
            refreshing={isPageRefreshing}
            data={orders}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <PreparationOrderItem
                    amount={itemData.item.totalAmount}
                    date={itemData.item.readableDate}
                    items={itemData.item.items}
                />
            )}
        />
    );
}

/*Custom Header Title*/
component.navigationOptions = (navigationData) => {
    return {
        headerTitle: 'All Supply Lists',
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
                        navigationData.navigation.navigate('ManageSupplyList');
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