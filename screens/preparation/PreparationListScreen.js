import React, { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator, View, Button, FlatList, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import ButtonHeader from "../../components/ButtonHeader";
import DefaultText from '../../components/DefaultText';
import PreparationOrderItem from "../../components/preparation/PreparationOrderItem";
import Colors from '../../constants/Colors'

import * as preparationOrderActions from "../../redux/actions/preparationOrder";


var component = 'PreparationListScreen';
component = props => {

    const preparations = useSelector(state => state._preparationOrder.preparations);

    const [isPageLoading, setIsPageIsLoading] = useState(false);
    const [isPageRefreshing, setIsPageIsRefreshing] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadPreparationOrders);

        return () => {
            willFocusSub.remove();
        }
    }, [loadPreparationOrders]);


     /*carregar a pagina com async*/
     const loadPreparationOrders = useCallback(async () => {
        setError(null);
        setIsPageIsRefreshing(true);
        try {
            await dispatch(preparationOrderActions.fetchPreparationOrders());
        } catch (error) {
            setError(error.message);
        }
        setIsPageIsRefreshing(false);
    }, [dispatch, setIsPageIsLoading, setError]);

    useEffect(() => {
        setIsPageIsLoading(true);
        loadPreparationOrders().then(() => {
            setIsPageIsLoading(false);
        });
    }, [dispatch], loadPreparationOrders);

    const dispatch = useDispatch();

    if (error) {
        return <View style={styles.loadingPage}>
            <DefaultText>Sorry, A error occurred!</DefaultText>
            <Button title='Try again' onPress={loadPreparationOrders} color={Colors.primaryColor} />
        </View>
    }
    if (isPageLoading) {
        return <View style={styles.loadingPage}>
            <ActivityIndicator size='large' color={Colors.primaryColor} />
        </View>
    }

    if (!isPageLoading && preparations.length === 0) {
        return <View style={styles.loadingPage}>
            <DefaultText>No items Found. Maybe start adding some</DefaultText>
        </View>
    }
   
    return (
        <FlatList
            onRefresh={loadPreparationOrders}
            refreshing={isPageRefreshing}
            data={preparations}
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
        headerTitle: 'All List of Preparation',
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
                        navigationData.navigation.navigate('ManagePreparationList');
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