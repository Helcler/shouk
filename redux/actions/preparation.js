/*export const ADD_TO_PREPARATION = 'ADD_TO_PREPARATION';
export const REMOVE_FROM_PREPARATION = 'REMOVE_FROM_PREPARATION';


export const addToPreparation = item => {
    return {type: ADD_TO_PREPARATION, item: item};
};

export const removeFromPreparation = id => {
    return {type: REMOVE_FROM_PREPARATION, itemId: id};
}*/

export const ADD_TO_PREPARATION = 'ADD_TO_PREPARATION';
export const REMOVE_FROM_PREPARATION = 'REMOVE_FROM_PREPARATION';
export const REQUEST_PREP_ITEMS = 'REQUEST_PREP_ITEMS';

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
            dispatch({ type: REQUEST_PREP_ITEMS, items: items, ownerId: ownerId });
        } catch (error) {
            //send to custm analytics server
            throw error;
        }
    }
}

export const addToPreparation = item => {
    return {type: ADD_TO_PREPARATION, item: item};
};

export const removeFromPreparation = id => {
    return {type: REMOVE_FROM_PREPARATION, itemId: id};
}

