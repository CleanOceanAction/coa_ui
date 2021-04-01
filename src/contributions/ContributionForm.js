import './ContributionForm.css';

import React, { useState, useContext } from 'react';
import { Tab, Tabs } from 'react-bootstrap';

import Events from "./events/Events";
import Items from "./items/Items";
import Sites from "./sites/Sites";
import { userContext } from "./UserContext";

export default function ContributionForm() {
    const [selectedTab, setSelectedTab] = useState("events");
    const {userState, setUserState} = useContext(userContext);

    const onLogout = () => {
        setUserState({
            "name": ""
        });
    };

    return(
        <div id="mainBody">
            <div className="name">{userState.name}</div>
            <button
                onClick={onLogout}>
                Logout
            </button>
            <br/><br/>
            <Tabs
                id="edit-details-tab"
                activeKey={selectedTab}
                onSelect={setSelectedTab}>
                <Tab eventKey="events" title="Cleanup Events">
                    <Events/>
                </Tab>
                <Tab eventKey="items" title="Items">
                    <Items/>
                </Tab>
                <Tab eventKey="sites" title="Sites">
                    <Sites/>
                </Tab>
            </Tabs>
        </div>
    );
}
