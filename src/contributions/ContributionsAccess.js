import './ContributionsAccess.css';

import React, { useContext } from 'react';
import ContributionForm from "./ContributionForm";
import UserSignInForm from "./UserSignInForm";
import { userContext } from "./UserContext";

export default function ContributionsAccess() {
    const {userState} = useContext(userContext);
    return(
        <div>
            <div className={userState.name ? "invisible" : ""}>
                <UserSignInForm/>
            </div>
            <div className={userState.name ? "" : "invisible"}>
                <ContributionForm />
            </div>
        </div>
    );
}
  
