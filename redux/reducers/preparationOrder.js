import PreparationOrder from "../../models/preparationOrder";
import { ADD_PREPARATION_ORDER, REQUEST_PREPARATION_ORDERS } from "../actions/preparationOrder";

const initialState = {
    preparations: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_PREPARATION_ORDERS:
            return {
                preparations: action.preparationOrders
            }
        case ADD_PREPARATION_ORDER:
            const newOrder = new PreparationOrder(
                action.preparationData.id,
                action.preparationData.items,
                action.preparationData.amount,
                action.preparationData.date
            );
            return {
                ...state,
                preparations: state.preparations.concat(newOrder)
            };
    }
    return state;

}