//import React, {useEffect} from 'react';
//import {useSelector, useDispatch} from 'react-redux';
import { ADD_TO_PREPARATION, REMOVE_FROM_PREPARATION, REQUEST_PREP_ITEMS } from "../actions/preparation";
import { ADD_PREPARATION_ORDER } from "../actions/preparationOrder";
import ITEMS from "../../data/dummy-data";
//import * as itemActions from "../actions/items";
import PreparationItem from "../../models/preparationItem";

const convertArrayToObject = (array, key) => {


    const initialValue = {};
    /*adding quantity property*/
    array.forEach(function (element) {
        element.quantity = 0;
        element.sum = 0;
    });

    return array.reduce((obj, item) => {
        return {
            ...obj,
            [item[key]]: item,
        };
    }, initialValue);
};



const initialState = {    
    items: convertArrayToObject(ITEMS, 'id'),
    //items: convertArrayToObject(ITEMS, 'id'),
    totalAmount: 0,
    //preparationItems: ITEMS.filter(item => item.isPreparation === true)
};

let updatedOrNewPreparationItem;

export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_PREP_ITEMS:
            return {
                preparationItems: action.items
                //userItems: action.items.filter(prod => prod.ownerId === action.ownerId)            
            };
        case ADD_TO_PREPARATION:
            //const addedId = action.item.id;    
            const addedItem = action.item;
            const itemPrice = addedItem.price;
            const itemTitle = addedItem.title;
            const itemImageUrl = addedItem.imageUrl;
            if (state.items[addedItem.id]) {
                //already have item in the preparation
                updatedOrNewPreparationItem = new PreparationItem(
                    //addedId,
                    state.items[addedItem.id].quantity + 1,
                    itemImageUrl,
                    itemPrice,
                    itemTitle,
                    state.items[addedItem.id].sum + itemPrice
                );
            }
            else {
                updatedOrNewPreparationItem = new PreparationItem(1, itemImageUrl, itemPrice, itemTitle, itemPrice);
            }
            return {
                ...state,
                items: { ...state.items, [addedItem.id]: updatedOrNewPreparationItem },
                totalAmount: state.totalAmount + itemPrice
            };
        case REMOVE_FROM_PREPARATION:
            const selectedPreparationItem = state.items[action.itemId];
            const currentQtd = selectedPreparationItem.quantity; //currentQtd seleciona o produto pelo codigo, dentro do state atual procurando pelo id do produto
            let updatedPreparationItems;
            if (currentQtd > 0) {

                //need to reduce it, not erase it
                updatedPreparationItems = new PreparationItem(
                    selectedPreparationItem.quantity - 1,
                    selectedPreparationItem.imageUrl,
                    selectedPreparationItem.price,
                    selectedPreparationItem.title,
                    selectedPreparationItem.sum - selectedPreparationItem.price
                );
                updatedPreparationItems = { ...state.items, [action.itemId]: updatedPreparationItems } //atualizo com copia do state existente mas trocando o item dentro da copia do state, pelo novo item atualizado.
                return {
                    ...state,
                    items: updatedPreparationItems,
                    totalAmount: state.totalAmount - selectedPreparationItem.price
                }
            }/*
            else // delete
            {
                updatedPreparationItems = { ...state.item }; //updatedPreparationItem recebe um clone do state atual
                delete updatedPreparationItems[action.itemId]; //deleta o produto do objeto clonado (delete é uma palavra reservada do proprio java)
            }
            return {
                ...state,
                items: updatedPreparationItems,
                totalAmount: state.totalAmount - selectedPreparationItem.price
            }*/

            case ADD_PREPARATION_ORDER:
                return initialState;

    }
    return state;

};
/*
const initialState = {
    items: {},
    totalAmount: 0
};

let updatedOrNewPreparationItem;

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_PREPARATION:
            console.log(action.item);
            const addedItem = action.item;
            const itemPrice = addedItem.price;
            const itemTitle = addedItem.title;

            if (state.items[addedItem.id]) {
                //already have item in the preparation
                updatedOrNewPreparationItem = new PreparationItem(
                    state.items[addedItem.id].quantity + 1,
                    itemPrice,
                    itemTitle,
                    state.items[addedItem.id].sum + itemPrice
                );

            } else {
                updatedOrNewPreparationItem = new PreparationItem(1, itemPrice, itemTitle, itemPrice);
            }
            return {
                ...state,
                items: { ...state.items, [addedItem.id]: updatedOrNewPreparationItem },
                totalAmount: state.totalAmount + itemPrice
            };
        case REMOVE_FROM_PREPARATION:
            const selectedPreparationItem = state.items[action.itemId];
            const currentQtd = selectedPreparationItem.quantity; //currentQtd seleciona o produto pelo codigo, dentro do state atual procurando pelo id do produto
            let updatedPreparationItems;
            if (currentQtd > 1) {
                //need to reduce it, not erase it
                updatedPreparationItems = new CardItem(
                    selectedPreparationItem.quantity - 1,
                    selectedPreparationItem.price,
                    selectedPreparationItem.title,
                    selectedPreparationItem.sum - selectedPreparationItem.price
                );
                updatedPreparationItems = {...state.items, [action.itemId]: updatedPreparationItems} //atualizo com copia do state existente mas trocando o item dentro da copia do state, pelo novo item atualizado.

            }
            else // delete
            {
                updatedPreparationItems = { ...state.item }; //updatedPreparationItem recebe um clone do state atual
                delete updatedPreparationItems[action.itemId]; //deleta o produto do objeto clonado (delete é uma palavra reservada do proprio java)
            }
            return{
                ...state,
                items: updatedPreparationItems,
                totalAmount: state.totalAmount - selectedPreparationItem.price
            }

    }
    return state;
};
*/
