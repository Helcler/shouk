export const ADD_TO_SUPPLY_ORDER = 'ADD_TO_SUPPLY_ORDER';
export const REMOVE_FROM_SUPPLY_ORDER = 'REMOVE_FROM_SUPPLY_ORDER';
export const REQUEST_ORDER_ITEMS = 'REQUEST_ORDER_ITEMS';

/*REQUEST LIST OF ITEMS FOR PREPARATION*/
export const fetchItems = () => {
    return async (dispatch, getState) => {
        const ownerId = getState()._auth.userId;
        try {
            const response = await fetch('https://rn-shouk-app-default-rtdb.europe-west1.firebasedatabase.app/items.json');
            if (!response.ok) {
                throw new Error('Something went wrong!')
            }
            const data = await response.json();
            const items = [];
            for (const i in data) {
                items.push(
                    new Item(
                        i,
                        data[i].itemId,
                        0,
                        +data[i].price,
                        data[i].imageUrl,
                        data[i].title,
                        0,
                        true
                    )
                );
            }
            //console.log(data);
            dispatch({ type: REQUEST_ORDER_ITEMS, items: items, ownerId: ownerId });
        } catch (error) {
            //send to custm analytics server
            throw error;
        }
    }
}

export const addToSupplyOrder = item => {
    return {type: ADD_TO_SUPPLY_ORDER, item: item};
};

export const removeFromSupplyOrder = id => {
    return {type: REMOVE_FROM_SUPPLY_ORDER, itemId: id};
}

