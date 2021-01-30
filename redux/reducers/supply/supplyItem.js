import { ADD_TO_SUPPLY_ORDER, REMOVE_FROM_SUPPLY_ORDER, REQUEST_ORDER_ITEMS } from "../../actions/supply/supplyItem";
import { ADD_SUPPLY_ORDER } from "../../actions/supply/supplyOrder";
import ITEMS from "../../../data/dummy-data";
import SupplyItem from "../../../models/supply/supplyItem";

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
    totalAmount: 0,
    //preparationItems: ITEMS.filter(item => item.isPreparation === true)
};

let updatedOrNewSupplyOrderItem;

export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_ORDER_ITEMS:
            return {
                SupplyItem: action.items
                //userItems: action.items.filter(prod => prod.ownerId === action.ownerId)            
            };
        case ADD_TO_SUPPLY_ORDER:
            //const addedId = action.item.id;    
            const addedItem = action.item;
            const itemPrice = addedItem.price;
            const itemTitle = addedItem.title;
            const itemImageUrl = addedItem.imageUrl;
            if (state.items[addedItem.id]) {
                //already have item in the preparation
                updatedOrNewSupplyOrderItem = new SupplyItem(
                    //addedId,
                    state.items[addedItem.id].quantity + 1,
                    itemImageUrl,
                    itemPrice,
                    itemTitle,
                    state.items[addedItem.id].sum + itemPrice
                );
            }
            else {
                updatedOrNewSupplyOrderItem = new SupplyItem(1, itemImageUrl, itemPrice, itemTitle, itemPrice);
            }
            return {
                ...state,
                items: { ...state.items, [addedItem.id]: updatedOrNewSupplyOrderItem },
                totalAmount: state.totalAmount + itemPrice
            };
        case REMOVE_FROM_SUPPLY_ORDER:
            const selectedSupplyOrderItem = state.items[action.itemId];
            const currentQtd = selectedSupplyOrderItem.quantity; //currentQtd seleciona o produto pelo codigo, dentro do state atual procurando pelo id do produto
            let updatedSupplyOrderItems;
            if (currentQtd > 0) {

                //need to reduce it, not erase it
                updatedSupplyOrderItems = new SupplyItem(
                    selectedSupplyOrderItem.quantity - 1,
                    selectedSupplyOrderItem.imageUrl,
                    selectedSupplyOrderItem.price,
                    selectedSupplyOrderItem.title,
                    selectedSupplyOrderItem.sum - selectedSupplyOrderItem.price
                );
                updatedSupplyOrderItems = { ...state.items, [action.itemId]: updatedSupplyOrderItems } //atualizo com copia do state existente mas trocando o item dentro da copia do state, pelo novo item atualizado.
                return {
                    ...state,
                    items: updatedSupplyOrderItems,
                    totalAmount: state.totalAmount - selectedSupplyOrderItem.price
                }
            }
            case ADD_SUPPLY_ORDER:
                return initialState;

    }
    return state;

};
