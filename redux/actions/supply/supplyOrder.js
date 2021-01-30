import SupplyOrder from "../../../models/supply/supplyOrder";

export const ADD_SUPPLY_ORDER = 'ADD_SUPPLY_ORDER';
export const REQUEST_SUPPLY_ORDERS = 'REQUEST_SUPPLY_ORDERS';

/*export const addSupplyOrder = (supplyItems, totalAmount) => {
    return {
        type: ADD_SUPPLY_ORDER,
        supplyData: { items: supplyItems, amount: totalAmount }
    };
}*/


export const fetchSupplyOrders = () => {
    return async dispatch => {
        try {
            const response = await fetch('https://rn-shouk-app-default-rtdb.europe-west1.firebasedatabase.app/supplyOrders.json');
            if (!response.ok) {
                throw new Error('Something went wrong!')
            }
            const data = await response.json();
            const loadedSupplyOrders = [];
            for (const i in data) {
                loadedSupplyOrders.push(
                    new SupplyOrder(
                        i,
                        data[i].supplyOrderItems,
                        data[i].totalAmount,
                        new Date(data[i].date)
                    )
                );
            }
            dispatch({ type: REQUEST_SUPPLY_ORDERS, supplyOrders: loadedSupplyOrders });
        } catch (error) {
            //send to custm analytics server
            throw error;
        }
    }
}

export const addSupplyOrder = (supplyOrderItems, totalAmount) => {
    return async (dispatch, getState) => {
        const date = new Date();
        const token = getState()._auth.token;
        const ownerId = getState()._auth.userId;
        const response = await fetch(
            `https://rn-shouk-app-default-rtdb.europe-west1.firebasedatabase.app/supplyOrders/.json?auth=${token}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ownerId: ownerId,
                    supplyOrderItems,
                    totalAmount,
                    date: date.toISOString()
                })
            }
        );

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        const data = await response.json();        
        dispatch({
            type: ADD_SUPPLY_ORDER,
            supplyData: { id: data.name, items: supplyOrderItems, amount: totalAmount, date: date }
        });
    }

}