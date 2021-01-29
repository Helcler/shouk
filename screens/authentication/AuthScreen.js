import React, { useState, useEffect, useReducer, useCallback } from 'react';
import { Button, KeyboardAvoidingView, ScrollView, StyleSheet, View, ActivityIndicator, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from "react-redux";
import * as authActions from "../../redux/actions/auth";

import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import Colors from '../../constants/Colors';


const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }
    return state;
};


var component = 'AuthScreen';
component = props => {

    const [isPageLoading, setIsPageIsLoading] = useState(false);
    const [error, setError] = useState();
    const [isSignUp, setIsSignUp] = useState(false);

    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: ''
        },
        inputValidities: {
            email: false,
            password: false
        },
        formIsValid: false
    });

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            });
        },
        [dispatchFormState]
    );

    useEffect(() => {
        if(error){
            Alert.alert('An Error Ocurred!', error, [{text: 'Okay'}])
        }
    }, [ error]);

    const authHandler = async () => {
        let action;
        if (isSignUp) {
            action = authActions.signup(formState.inputValues.email, formState.inputValues.password);
        } else {
            action = authActions.login(formState.inputValues.email, formState.inputValues.password);
        }
        setError(null);
        setIsPageIsLoading(true);
        try {
            await dispatch(action);
            props.navigation.navigate('Dashboard');
        } catch (err) {
            setError(err.message);
            setIsPageIsLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={50}
            style={styles.screen}
        >
            <LinearGradient colors={['#A27BF0', '#F5D576']} style={styles.gradient}>
                <Card style={styles.authContainer}>
                    <ScrollView>
                        <Input
                            id="email"
                            label="E-mail"
                            keyboardType="email-address"
                            required
                            email
                            authCapitalize="none"
                            errorText="Please enter a valid email address."
                            onInputChange={inputChangeHandler}
                            initialValue=""
                        />
                        <Input
                            id="password"
                            label="Password"
                            keyboardType="default"
                            secureTextEntry
                            required
                            minLength={5}
                            authCapitalize="none"
                            errorText="Please enter a valid password."
                            onInputChange={inputChangeHandler}
                            initialValue=""
                            autoCapitalize = 'none'
                        />
                        <View style={styles.buttonContainer}>
                            {isPageLoading ?
                                    <ActivityIndicator size='small' color={Colors.primaryColor} /> :
                            <Button
                                title={isSignUp ? 'Sign Up' : 'Login'}
                                color={Colors.Primary}
                                onPress={authHandler} />}
                        </View>
                        <View style={styles.buttonContainer}><Button title={`Switch to ${isSignUp ? 'Login' : 'Sign Up'}`} color={Colors.accentColor}
                            onPress={() => {
                                setIsSignUp(prevState => !prevState);
                            }} />
                        </View>
                    </ScrollView>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
}

/*Custom Header Title*/
component.navigationOptions = (navigationData) => {
    return {
        headerTitle: 'Authentication'
    }
}


const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20
    },
    buttonContainer: {
        marginTop: 10
    }
});
export default component;