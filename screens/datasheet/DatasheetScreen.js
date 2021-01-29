import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Button, ListItem, Icon, Avatar } from 'react-native-elements';

import ButtonHeader from "../../components/ButtonHeader";

import { CATEGORIES } from '../../data/dummy-data';
import { Colors } from 'react-native/Libraries/NewAppScreen';

var component = 'DatasheetScreen';
/*START COMPONENT*/
component = props => {

    /*Buttons action*/
    const NavigateToRecipe = (id) => {
        return props.navigation.navigate({
            routeName: 'Recipe',
            params: {
                recipeId: id
            }
        });
    };

    /*Grid Action*/
    const renderRecipeCategoriesOdl = (itemData) => {
        return (
            <TouchableOpacity
                onPress={NavigateToRecipe.bind(this, itemData.item.id)}
                style={styles.gridItem}
            >
                <View>
                    <Text>{itemData.item.title}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    const renderRecipeCategories = (itemData) => {
        return (
            <TouchableOpacity
                onPress={NavigateToRecipe.bind(this, itemData.item.id)}
            // style={styles.gridItem}
            >
                <View>
                    <ListItem bottomDivider>
                        <Icon
                            reverse
                            name='list-outline'
                            type='ionicon'
                            color='#ff6f00'
                            size={15}
                        />
                        <ListItem.Content>
                            <ListItem.Title>{itemData.item.title}</ListItem.Title>
                            {/*<ListItem.Subtitle>{itemData.item.title}</ListItem.Subtitle>*/}
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>

                </View>
            </TouchableOpacity>
        );
    }
    return (
        <View>
            <FlatList
                keyExtractor={(item, index) => item.id}
                data={CATEGORIES}
                renderItem={renderRecipeCategories}
                numColumns={1}
            />
        </View>
    );
}


/*Custom Header Title*/
component.navigationOptions = (navigationData) => {
    return {
        headerTitle: 'Datasheet',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={ButtonHeader}>
                <Item
                    title='Menu'
                    iconName='ios-menu'
                    onPress={() => {
                        navigationData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>)
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    gridItem: {
        flex: 1,
        margin: 15,
        height: 150
    },
    list: {
        flexDirection: 'row'
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