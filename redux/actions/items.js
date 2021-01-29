import Item from "../../models/item";

export const CREATE_ITEM = 'CREATE_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const REQUEST_ITEMS = 'REQUEST_ITEMS';

/*REQUEST LIST OF ITEMS*/
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
                        data[i].ownerId,
                        data[i].title,
                        data[i].imageUrl,
                        data[i].description,
                        +data[i].price
                    )
                );
            }
            //console.log(items);
            dispatch({ type: REQUEST_ITEMS, items: items, ownerId: ownerId });
        } catch (error) {
            //send to custm analytics server
            throw error;
        }
    }
}

export const deleteItem = (id) => {
    return async (dispatch, getState) => {
        const token = getState()._auth.token;
        const response = await fetch(
            `https://rn-shouk-app-default-rtdb.europe-west1.firebasedatabase.app/items/${id}.json?auth=${token}`,
            {
                method: 'DELETE'
            });
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
        dispatch({ type: DELETE_ITEM, itemId: id });
    }

}

/*SAVE ITEM INTO DB*/
export const createItem = (title, description, imageUrl, price) => {
    return async (dispatch, getState) => {
        const token = getState()._auth.token;
        const ownerId = getState()._auth.userId;
        const response = await fetch(
            `https://rn-shouk-app-default-rtdb.europe-west1.firebasedatabase.app/items.json?auth=${token}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ownerId: ownerId,
                    title,
                    description,
                    imageUrl,
                    price
                })
            });

        const data = await response.json();
        //console.log(data);

        dispatch({
            type: CREATE_ITEM,            
            itemData: {
                id: data.name,
                ownerId: ownerId,
                title: title,
                description: description,
                imageUrl: imageUrl,
                price: price
            }
        });
    }
}

export const updateItem = (id, title, description, imageUrl) => {
    return async (dispatch, getState) => {
        const token = getState()._auth.token;
        const ownerId = getState()._auth.userId;
        const response = await fetch(
            `https://rn-shouk-app-default-rtdb.europe-west1.firebasedatabase.app/items/${id}.json?auth=${token}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ownerId: ownerId,
                    title,
                    description,
                    imageUrl
                })
            });

        dispatch({
            type: UPDATE_ITEM,
            itemId: id,
            itemData: {
                title: title,
                description: description,
                imageUrl: imageUrl
            }
        });
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
    }

}

