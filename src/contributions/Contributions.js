import './Contributions.css';

import React from 'react';
import ContributionsAccess from "./ContributionsAccess";
import { UserProvider } from "./UserContext";

export default function Contributions() {
    return(
        <div>
            <UserProvider>
                <ContributionsAccess/>
            </UserProvider>
        </div>
    );
}
  