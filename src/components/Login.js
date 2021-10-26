import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../App.js"

import {
    Redirect,
    Link
} from "react-router-dom";

const Logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    const { setLoginStatus } = useContext(LoginContext);
    useEffect(() => setLoginStatus(false))
    return (
        <Redirect to={"/login"} />
    )
}

const LoginForm = () => {
    const [reqBody, setReqBody] = useState({ username: "", password: "" });
    const { isLoggedIn, setLoginStatus } = useContext(LoginContext);
    const Login = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_APIURL}/aniapi/login`,
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
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("userID", Number(data.userID));
                    setLoginStatus(true);
                }
            })
    }

    return (isLoggedIn ? <Redirect to="/list" /> :
        <div className="flex justify-center" >
            <form className="flex flex-col col-span-auto text-white m-10"
                onSubmit={Login}>
                <label
                    htmlFor="username"
                    className="m-2">
                    Username
                </label>
                <input
                    className="m-1 p-2 rounded-lg h-10 bg-gray-500"
                    type="text"
                    id="username"
                    placeholder="username"
                    value={reqBody.username}
                    onChange={e => setReqBody({ ...reqBody, username: e.target.value })}
                />
                <label
                    className="m-2"
                    htmlFor="password">
                    Password
                </label>
                <input
                    className="m-1 p-2 rounded-lg h-10 bg-gray-500"
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={reqBody.password}
                    onChange={e => setReqBody({ ...reqBody, password: e.target.value })}
                />
                <div className="flex justify-around my-2">
                    <button
                        type="submit"
                        className="filter hover:brightness-90 bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500 rounded-md p-2 my-2">
                        Sign in
                    </button>
                    <Link
                        className="filter hover:brightness-90 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-md p-2 my-2"
                        to={"/register"}>
                        Don't have an account?
                    </Link>
                </div>
            </form>
        </div>
    )
}

export { LoginForm, Logout };