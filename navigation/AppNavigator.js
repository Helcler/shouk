import React from 'react';
import { SafeAreaView, Button, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import System from '../constants/System';
import * as authActions from '../redux/actions/auth';

import DashboardScreen from '../screens/dashboard/DashboardScreen';

import DatasheetScreen from '../screens/datasheet/DatasheetScreen';

import ItemScreen from '../screens/item/ItemScreen';
import ManageItemScreen from '../screens/item/ManageItemScreen';

import ManagePreparationListScreen from '../screens/preparation/ManagePreparationListScreen';
import PreparationListScreen from '../screens/preparation/PreparationListScreen';

import RecipeScreen from '../screens/recipe/RecipeScreen';
import RecipeDetailScreen from '../screens/recipe/RecipeDetailScreen';
import RecipeFilterScreen from '../screens/recipe/RecipeFilterScreen';

import ManageSupplyListScreen from '../screens/supply/ManageSupplyList';
import SupplyListScreenScreen from '../screens/supply/SupplyListScreen';

import FavoritesScreen from '../screens/FavoritesScreen';

import UserScreen from '../screens/user/UserScreen';

import AuthScreen from '../screens/authentication/AuthScreen';
import StartupScreen from '../screens/authentication/StartupScreen';

const defaultStackNavOptions = {

    headerStyle: {
        backgroundColor: Platform.OS === System.A ? Colors.primaryColor : Colors.noColor,
        shadowOpacity: 0.2,
        shadowOffset: { height: 0.5, },
        elevation: 0.5,
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === System.A ? Colors.noColor : Colors.primaryColor

};

/* Inicio Navegacao Guto*/

const AppMainTabNavigatorDashboard = createStackNavigator({
    Dashboard: {
        screen: DashboardScreen
    }
},
    {
        defaultNavigationOptions: defaultStackNavOptions
    });
const AppMainTabNavigatorItem = createStackNavigator({
    Item: {
        screen: ItemScreen
    },
    ManageItem: {
        screen: ManageItemScreen
    }
},
    {
        navigationOptions: {
            drawerIcon: drawerConfig => (
                <Ionicons
                    name={'ios-list'}
                    size={23}
                    color={drawerConfig.tintColor}
                />
            )
        },
        defaultNavigationOptions: defaultStackNavOptions
    });
const AppMainTabNavigatorPreparation = createStackNavigator({
    Preparation: {
        screen: PreparationListScreen
    },
    ManagePreparationList: {
        screen: ManagePreparationListScreen
    }
},
    {
        defaultNavigationOptions: defaultStackNavOptions
    });

const AppMainTabNavigatorSupply = createStackNavigator({
    SupplyList: {
        screen: SupplyListScreenScreen
    },
    ManageSupplyList: {
        screen: ManageSupplyListScreen
    }
},
    {
        defaultNavigationOptions: defaultStackNavOptions
    });

const AppMainTabNavigatorDatasheet = createStackNavigator({
    Datasheet: {
        screen: DatasheetScreen
    },
    Recipe: {
        screen: RecipeScreen
    },
    RecipeDetail: {
        screen: RecipeDetailScreen
    },
},
    {
        defaultNavigationOptions: defaultStackNavOptions
    }
)

const AppMainTabNavigatorFavorite = createStackNavigator({
    Favorites: {
        screen: FavoritesScreen
    },
    RecipeDetail: {
        screen: RecipeDetailScreen
    }
},
    {
        defaultNavigationOptions: defaultStackNavOptions
    });

const AppMainTabNavigatorFilter = createStackNavigator({
    Filter: {
        screen: RecipeFilterScreen
    }
},
    {
        navigationOptions: {
            drawerLabel: 'Filters'
        },
        navigationOptions: {
            drawerIcon: drawerConfig => (
                <Ionicons
                    name={'ios-options'}
                    size={23}
                    color={drawerConfig.tintColor}
                />
            )
        },
        defaultNavigationOptions: defaultStackNavOptions
    });

const AppMainTabNavigatorUser = createStackNavigator({
    User: {
        screen: UserScreen
    }
},
    {
        navigationOptions: {
            drawerIcon: drawerConfig => (
                <Ionicons
                    name={'ios-person'}
                    size={23}
                    color={drawerConfig.tintColor}
                />
            )
        },
        defaultNavigationOptions: defaultStackNavOptions
    });

const AppMainTabNavigatorAuthentication = createStackNavigator({
    Auth: {
        screen: AuthScreen
    }
}, {
    defaultNavigationOptions: defaultStackNavOptions
});

/* Start BOTTON*/

const AppMainBottonTabNavigator = createBottomTabNavigator({
    Dashboard: {
        screen: AppMainTabNavigatorDashboard,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-home' size={30} color={tabInfo.tintColor} />;
            }
        }
    },
    Preparation: {
        screen: AppMainTabNavigatorPreparation,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-restaurant' size={30} color={tabInfo.tintColor} />;
            }
        }
    },
    Supply: {
        screen: AppMainTabNavigatorSupply,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-cart' size={30} color={tabInfo.tintColor} />;
            }
        }
    },
    Datasheet: {
        screen: AppMainTabNavigatorDatasheet,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-grid' size={30} color={tabInfo.tintColor} />;
            }
        }
    },
    Favorites: {
        screen: AppMainTabNavigatorFavorite,
        navigationOptions: {
            tabBarLabel: 'Favorites',
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />;
            }
        }
    }
},
    {
        tabBarOptions: {
            activeTintColor: Colors.accentColor,
            labelStyle: {
                fontFamily: 'open-sans-bold'
            }
        }
    });

const AppMainVerticalTabNavigator = createDrawerNavigator({
    Main: {
        screen: AppMainBottonTabNavigator,
        navigationOptions: {
            drawerLabel: 'Dashboard'
        }
    },
    Item: {
        screen: AppMainTabNavigatorItem,
        navigationOptions: {
            drawerLabel: 'Item'
        }
    },
    Filter: {
        screen: AppMainTabNavigatorFilter
    },
    User: {
        screen: AppMainTabNavigatorUser
    }

},
    {
        contentOptions: {
            activeTintColor: Colors.accentColor,
            labelStyle: {
                fontFamily: 'open-sans-bold'
            }
        },
        contentComponent: props => {
            const dispatch = useDispatch();

            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                        <DrawerNavigatorItems {...props} />
                        <Button title="Logout" color={Colors.primaryColor} onPress={() => {
                            dispatch(authActions.logout());
                            //props.navigation.navigate('Auth');
                         }} />
                    </SafeAreaView>
                </View>
            );
        }
    });

/* Login Screen*/
const AppMainNavigator = createSwitchNavigator({
    Startup: StartupScreen,
    Auth: AppMainTabNavigatorAuthentication,
    Dashboard: AppMainVerticalTabNavigator
});

//export default createAppContainer(AppVerticalTabNavigator);
//export default createAppContainer(AppMainTabNavigatorPreparation);
//export default createAppContainer(AppMainTabNavigatorDatasheet);
//export default createAppContainer(AppMainVerticalTabNavigator);
export default createAppContainer(AppMainNavigator);