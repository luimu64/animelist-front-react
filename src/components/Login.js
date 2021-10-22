import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../App.js"

import {
    Route,
    Redirect,
    Link
} from "react-router-dom";

const Logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    const { setLoginStatus } = useContext(LoginContext);
    useEffect(() => setLoginStatus(false))
    return (
        <Route>
            <Redirect to={"/login"} />
        </Route>
    )
}

const LoginForm = () => {
    const [reqBody, setReqBody] = useState({ username: "", password: "" });
    const { isLoggedIn, setLoginStatus } = useContext(LoginContext);
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
                if (data.token !== undefined && data.userID !== undefined) {
                    setLoginStatus(true);
                    localStorage.setItem("token", data.token)
                    localStorage.setItem("userID", data.userID)
                }
            })
    }

    return (isLoggedIn ?
        (<Route><Redirect to={"/list"} /></Route>) :
        (<form className="pure-form pure-form-stacked" onSubmit={e => Login(e)}>
            <fieldset>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" placeholder="username"
                    value={reqBody.username} onChange={e => setReqBody({ ...reqBody, username: e.target.value })} />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Password"
                    value={reqBody.password} onChange={e => setReqBody({ ...reqBody, password: e.target.value })} />
                <button type="submit" className="pure-button pure-button-primary" >Sign in</button>
                <Route>
                    <Link className="pure-button" to={"/register"}>Don't have an account?</Link>
                </Route>
            </fieldset>
        </form>)
    )
}

export { LoginForm, Logout };