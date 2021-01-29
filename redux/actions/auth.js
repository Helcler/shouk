import AsyncStorage from '@react-native-community/async-storage';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

let timer;

//validate user if is already authenticate
export const authenticate = (userId, token, userEmail, expiryTime) => {
    return dispatch => {
        dispatch(setLogoutTimer(expiryTime));
        dispatch({ type: AUTHENTICATE, userId, token, userEmail });
    };
}

/*signup*/
export const signup = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDj4IXjVEBAt_6SDpPU5ePNOOOmMw28xkY',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            });

        if (!response.ok) {
            const errorRestData = await response.json();
            const errorId = errorRestData.error.message;
            let message = 'Something wen wrong!'
            if (errorId === 'EMAIL_EXISTS') {
                message = 'This e-mail exist already!'
            }
            throw new Error(message);
        }
        const data = await response.json();
        //console.log(message);
        dispatch(authenticate(data.localId, data.idToken, data.email, parseInt(data.expiresIn) * 1000));
        const expirationDate = new Date(new Date().getTime() + parseInt(data.expiresIn) * 1000);
        //save expiration date to the device
        saveDataToStorage(data.idToken, data.localId, data.email, expirationDate);
    };
}



/*login*/
export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDj4IXjVEBAt_6SDpPU5ePNOOOmMw28xkY',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,                    
                    returnSecureToken: true
                })
            });
        if (!response.ok) {
            const errorRestData = await response.json();
            const errorId = errorRestData.error.message;
            let message = 'Something wen wrong!'
            if (errorId === 'EMAIL_NOT_FOUND') {
                message = 'This e-mail could not be found!'

            } else if (errorId === 'INVALID_PASSWORD') {
                message = 'This password is not valid';
            } else if (errorId === 'USER_DISABLED') {
                message = 'This user is current disabled'
            }
            throw new Error(message);
        }
        const data = await response.json();
        dispatch(authenticate(data.localId, data.idToken, data.email, parseInt(data.expiresIn) * 1000));
        const expirationDate = new Date(new Date().getTime() + parseInt(data.expiresIn) * 1000);
        //save expiration date to the device
        //saveDataToStorage(data.idToken, data.localId, data.email, expirationDate);
    };

}
// Save data localy to device
const saveDataToStorage = (token, userId, userEmail, expirationDate) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        token: token,
        userId: userId,
        userEmail: userEmail,
        expiryDate: expirationDate.toISOString()
    }));
}

export const logout = () => {
    clearLogoutTimer();
    AsyncStorage.removeItem('userData');
    return { type: LOGOUT };
};

const clearLogoutTimer = () => {
    if (timer) {
        clearTimeout(timer);
    }
};

/* set Timer for logout*/
const setLogoutTimer = expirationTime => {
    return dispatch => {
        timer = setTimeout(() => {
            dispatch(logout());
        }, expirationTime);
    };
};