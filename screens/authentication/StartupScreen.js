import React, {useEffect} from 'react';
import {View, Text, ActivityIndicator, StyleSheet, ColorPropType} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useDispatch } from "react-redux";

import Colors from '../../constants/Colors';
import * as authActions from '../../redux/actions/auth';

var component = 'StartupScreen';
component = props => {
    const dispatch = useDispatch();

    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if(!userData){
                props.navigation.navigate('Auth');
                return;
            }
            const tranformedData = JSON.parse(userData);
            console.log(tranformedData);
            const {token, userId, userEmail, expiryDate} = tranformedData;
            const expirationDate = new Date(expirationDate);

            if(expirationDate <= new Date() || !token || !userId){
                props.navigation.navigate('Auth');
                return;
            }

            const expirationTime = expirationDate.getTime() - new Date().getTime();

            props.navigation.navigate('Dashboard');
            dispatch(authActions.authenticate(userId, token, userEmail, expirationTime));
        };
        tryLogin();
    }, [dispatch])

    return(
        <View style={styles.screen}>
            <ActivityIndicator size='large' color={Colors.primary} />
        </View>
    );
}
const styles = StyleSheet.create({
    screen:{
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    }
});
export default component;