import PreparationOrder from "../../models/preparationOrder";

export const ADD_PREPARATION_ORDER = 'ADD_PREPARATION_ORDER';
export const REQUEST_PREPARATION_ORDERS = 'REQUEST_PREPARATION_ORDERS';

export const fetchPreparationOrders = () => {
    return async dispatch => {
        try {
            const response = await fetch('https://rn-shouk-app-default-rtdb.europe-west1.firebasedatabase.app/preparationOrders.json');
            if (!response.ok) {
                throw new Error('Something went wrong!')
            }
            const data = await response.json();
            const loadedPreparationOrders = [];
            for (const i in data) {
                loadedPreparationOrders.push(
                    new PreparationOrder(
                        i,
                        data[i].preparationItems,
                        data[i].totalAmount,
                        new Date(data[i].date)
                    )
                );
            }
            dispatch({ type: REQUEST_PREPARATION_ORDERS, preparationOrders: loadedPreparationOrders });
        } catch (error) {
            //send to custm analytics server
            throw error;
        }
    }
}

export const addPreparation = (preparationItems, totalAmount) => {
    return async (dispatch, getState) => {
        const date = new Date();
        const token = getState()._auth.token;
        const ownerId = getState()._auth.userId;
        const response = await fetch(
            `https://rn-shouk-app-default-rtdb.europe-west1.firebasedatabase.app/preparationOrders/.json?auth=${token}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ownerId: ownerId,
                    preparationItems,
                    totalAmount,
                    date: date.toISOString()
                })
            }
        );

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        const data = await response.json();
        console.log(data);
        dispatch({
            type: ADD_PREPARATION_ORDER,
            preparationData: { id: data.name, items: preparationItems, amount: totalAmount, date: date }
        });
    }

}