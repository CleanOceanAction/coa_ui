import './ContributionForm.css';

import React, { useState, useContext } from 'react';
import { Tab, Tabs } from 'react-bootstrap';

import Events from "./events/Events";
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
        <div>
            <h3>Please enter your contribution!</h3>
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
                    <Events
                    />
                </Tab>
                <Tab eventKey="items" title="Items">
                    <p>Items</p>
                </Tab>
                <Tab eventKey="sites" title="Sites">
                    <p>Sites</p>
                </Tab>
            </Tabs>
        </div>
    );
}
  