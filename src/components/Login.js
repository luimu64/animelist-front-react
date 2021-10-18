import React, { useContext } from "react";
import { useState } from "react";
import { LoginContext } from "../App.js"

import {
    Route,
    Redirect
} from "react-router";
import { isLoggedIn } from "../helpers";

const Logout = () => {
    localStorage.removeItem("token");
    const { setLoginStatus } = useContext(LoginContext);
    setLoginStatus(false)
    return (
        <Route>
            <Redirect to={"/login"} />
        </Route>
    )
}

const LoginForm = () => {
    const [reqBody, setReqBody] = useState({ username: "", password: "" });
    const { setLoginStatus } = useContext(LoginContext);
    const Login = (e) => {
        e.preventDefault()
        fetch(`http://localhost:8080/aniapi/login`,
            {
                method: 'POST',
                body: JSON.stringify(reqBody),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                setLoginStatus(true);
                localStorage.setItem("token", data.token)
                localStorage.setItem("userID", data.userID)
            })
    }

    return (isLoggedIn ? (<Route><Redirect to={"/list/1"} /></Route>) : (
        <form className="pure-form pure-form-stacked" onSubmit={e => Login(e)}>
            <fieldset>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" placeholder="username"
                    value={reqBody.username} onChange={e => setReqBody({ ...reqBody, username: e.target.value })} />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Password"
                    value={reqBody.password} onChange={e => setReqBody({ ...reqBody, password: e.target.value })} />
                <button type="submit" className="pure-button pure-button-primary" >Sign in</button>
            </fieldset>
        </form>)
    )
}

export { LoginForm, Logout };