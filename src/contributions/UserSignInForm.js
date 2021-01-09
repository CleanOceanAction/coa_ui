import './UserSignInForm.css';

import React, { useState, useContext } from 'react';
// import { postData } from "../BackendAccessor.js";
import { userContext } from "./UserContext";

export default function UserSignInForm(props) {
    const {setUserState} = useContext(userContext);
    const [name, setName] = useState("");
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");

    const attemptLogIn = () => {
        const contextObj = {
            "name": name
        };
        setUserState(contextObj);
        /*postData('login', {"username": username, "password": password})
            .then((response) => {
                console.log(response);
            });*/
    };

    const onSubmit = (e) => {
        e.preventDefault();
        attemptLogIn();
    };

    return(
        <form>
            <input
                name="name"
                type="text"
                value={name}
                placeholder="Please enter your name"
                onChange={(e) => setName(e.target.value)}
            />
            {/*<br/>
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
            />*/}
            <br/><br/>
            <input type="submit" value="Enter" onClick={onSubmit}/>
        </form>
    );
}
  