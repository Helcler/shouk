import ITEMS from "../../data/dummy-data";
import Item from "../../models/item";
import { CREATE_ITEM, DELETE_ITEM, UPDATE_ITEM, REQUEST_ITEMS } from "../actions/items";
const initialState = {
    availableItems: ITEMS,
    userItems: ITEMS.filter(item => item.ownerId === 'u1')
};

export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_ITEMS:
            return {
            availableItems: action.items,
            userItems: action.items.filter(prod => prod.ownerId === action.ownerId)            
            };
        case CREATE_ITEM:
            const newItem = new Item(
                action.itemData.id,
                action.itemData.ownerId,
                action.itemData.title,
                action.itemData.imageUrl,
                action.itemData.description,
                action.itemData.price
            );
            return{
                ...state,
                availableItems: state.availableItems.concat(newItem),
                userItems: state.userItems.concat(newItem), 
            }
        case UPDATE_ITEM:
             /*index vetor userItems*/
            const itemIndexUserItems = state.userItems.findIndex(item => item.id === action.itemId);
            /*index vetor availableItems*/
            const itemIndexAvailableItem = state.availableItems.findIndex(item => item.id === action.itemId);
            //console.log(action.itemData.title);
            const updateItem = new Item(
                action.itemId, 
                state.userItems[itemIndexUserItems].ownerId,
                action.itemData.title,
                action.itemData.imageUrl,
                action.itemData.description,
                state.userItems[itemIndexUserItems].price
                );
             /*update vetor userItems*/
            const updateUserItem = [...state.userItems];
            updateUserItem[itemIndexUserItems] = updateItem;
            /*update vetor availableItems*/
            const updateAvailableItems = [...state.availableItems];
            updateAvailableItems[itemIndexAvailableItem] = updateItem;
            return{
                ...state,
                availableItems: updateAvailableItems,
                userItems: updateUserItem
            }
        case DELETE_ITEM:
            return {
                ...state,
                userItems: state.userItems.filter(item => item.id !== action.itemId),
                availableItems: state.availableItems.filter(item => item.id !== action.itemId)
            };
            break;

        default:
            break;
    }
    return state;
};
