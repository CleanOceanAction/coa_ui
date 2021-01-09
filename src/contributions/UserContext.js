import React, { createContext, useState } from 'react';

const initialState = {};
const userContext = createContext(initialState);
const {Provider} = userContext;

const UserProvider = ( { children } ) => {
    const [userState, setUserState] = useState(initialState);
    return <Provider value={{userState, setUserState}}>{children}</Provider>;
};

export { userContext, UserProvider }