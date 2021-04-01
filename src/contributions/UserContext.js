import React, { createContext, useState } from "react";

const initialState = {};
export const userContext = createContext(initialState);

const {Provider} = userContext;
export const UserProvider = ( { children } ) => {
    const [userState, setUserState] = useState(initialState);

    return(
        <Provider
            value={{userState, setUserState}}>
            {children}
        </Provider>
    );
};
