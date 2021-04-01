import './UserSignInForm.css';

import React, { useState, useContext } from 'react';
import { PopupWarning } from "../components/Popup";
import { postData } from "../BackendAccessor.js";
import { userContext } from "./UserContext";

export default function UserSignInForm(props) {
    const {setUserState} = useContext(userContext);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [warning, setWarning] = useState("");

    const attemptLogIn = () => {
        if (!username || !password || !name) {
            setWarning("Please enter all log-in information.");
            return;
        }

        postData('login', {"username": username, "password": password})
            .then((response) => {
                response.json().then((data) => {
                    setUserState({
                        "name": name,
                        "token": data.token
                    });
                });
            });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        attemptLogIn();
    };

    return(
        <div>
        <form>
            <input
                name="name"
                type="text"
                value={name}
                placeholder="Please enter your name"
                onChange={(e) => setName(e.target.value)}
            />
            <br/>
            <input
                name="username"
                type="text"
                value={username}
                placeholder="Please enter your username"
                onChange={(e) => setUsername(e.target.value)}
            /><br/>
            <input
                name="password"
                type="password"
                value={password}
                placeholder="Please enter your password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <br/><br/>
            <input type="submit" value="Enter" onClick={onSubmit}/>
        </form>
        <PopupWarning
            show={!!warning}
            warning={warning}
            onHide={() => {setWarning("");}}
        />
        </div>
    );
}
  