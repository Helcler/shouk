import React, { useEffect, useRef } from 'react';
import { useSelector } from "react-redux";
import { NavigationActions } from 'react-navigation';

import AppNavigator from './AppNavigator';

var component = 'NavigationContainer';
component = props => {
    const navRef = useRef();
    const isAuth = useSelector(state => !!state._auth.token);
    const isAdmin = useSelector(state => state._auth.userEmail === 'admin@shouk.com');
    //console.log(navRef);
    useEffect(() => {
        if (!isAuth) {
            navRef.current.dispatch(NavigationActions.navigate({ routeName: 'Auth' })
            );
        }
    }, [isAuth]);
    return <AppNavigator ref={navRef} />
}
export default component;