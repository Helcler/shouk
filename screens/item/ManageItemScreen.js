import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet, Alert, KeyboardAvoidingView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import ButtonHeader from "../../components/ButtonHeader";
import * as itemsAction from "../../redux/actions/items";
import Input from "../../components/UI/Input";


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


var component = 'ManageItemScreen';
component = props => {

    const itemId = props.navigation.getParam('itemId');
    const editedProduct = useSelector(state => state._items.userItems.find(item => item.id == itemId));

    const [error, setError] = useState();
    const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
    const [titleIsValid, setTitleIsValid] = useState(editedProduct ? true : false);
    const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');

    const dispatch = useDispatch();

    /*Verificar se foi possivel alterar o item com sucesso*/
    useEffect(() => {
        if(error){
            Alert.alert('An error occurred!', error, [{ text:'Okay'}])
        }
    }, [error])

    const submitHandler = useCallback(() => {
        if(!titleIsValid) {
           return Alert.alert('Wrong input!', 'Please check the errors in the form.', [{text: 'Okay'}])
        }
        /*update Item*/
        if (editedProduct) {
            //console.log(title);
            dispatch(itemsAction.updateItem(
                itemId,
                title,
                description,
                imageUrl
            ));
        }
        /*save new item*/
        else {
            dispatch(itemsAction.createItem(
                title,
                description,
                imageUrl,
                +price
            ));
        }
        props.navigation.goBack();
    }, [dispatch, itemId, title, description, imageUrl, price]);

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler })
    }, [submitHandler]);

    const titleChangeHandler = text => {
        if(text.trim().length === 0){
            setTitleIsValid(false);
        }else{
            setTitleIsValid(true);
        }
        setTitle(text);
    };

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formContainer}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={titleChangeHandler}
                    />
                     {!titleIsValid && <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>Please enter a valid title!</Text>
                    </View>}
                </View>

                <View style={styles.formContainer}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput
                        style={styles.input}
                        value={imageUrl}
                        onChangeText={text => setImageUrl(text)} />
                </View>
                {editedProduct ? null : (
                    <View style={styles.formContainer}>
                        <Text style={styles.label}>Price</Text>
                        <TextInput
                            style={styles.input}
                            value={price}
                            onChangeText={text => setPrice(text)} />
                    </View>
                )}
                <View style={styles.formContainer}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.input}
                        value={description}
                        onChangeText={text => setDescription(text)} />
                </View>
            </View>
        </ScrollView >
    );
}
/*Custom Header Title*/
component.navigationOptions = (navigationData) => {
    const submitFn = navigationData.navigation.getParam('submit');

    return {
        headerTitle: navigationData.navigation.getParam('itemId') ? 'Edit Product' : 'Add Product',
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
    form: {
        margin: 20
    },
    formContainer: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    errorContainer: {
        marginVertical: 5
    },
    errorText: {
        fontFamily: 'open-sans',
        color: 'red',
        fontSize: 13
    }
});
export default component;