import React from 'react';
import { Platform } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

import Colors from '../constants/Colors';
import System from '../constants/System';

var component = 'ButtonFavoriteHeader';

component = props => {
    return(
        <HeaderButton 
        {...props}
        IconComponent={Ionicons}
        iconSize={23}
        color={Platform.OS === System.A ? Colors.noColor : Colors.primaryColor}
        />
    );
}
export default component;
