import SupplyOrder from "../../../models/supply/supplyOrder";
import { ADD_SUPPLY_ORDER, REQUEST_SUPPLY_ORDERS } from "../../actions/supply/supplyOrder";

const initialState = {
    orders: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_SUPPLY_ORDERS:
            return {
                orders: action.supplyOrders
            }
        case ADD_SUPPLY_ORDER:    
            const newOrder = new SupplyOrder(
                new Date().toString(),
                action.supplyData.items,
                action.supplyData.amount,
                new Date()
            );
            return {
                ...state,
                orders: state.orders.concat(newOrder)
            };
    }
    return state;

}