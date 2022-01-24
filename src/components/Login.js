import React, { useState, useContext } from "react";
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { getAuth } from "firebase/auth";
import { app } from '../firebase-config';

import {
    Link
} from "react-router-dom";

const Logout = () => {
    const auth = getAuth();
    auth.signOut();
    return null;
}

const LoginForm = () => {
    const auth = getAuth(app);
    const [reqBody, setReqBody] = useState({ email: "", password: "" });
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const Login = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(reqBody.email, reqBody.password);
    }

    return (
        <div className="flex justify-center" >
            <form className="flex flex-col col-span-auto text-white m-10"
                onSubmit={Login}>
                <label
                    htmlFor="username"
                    className="m-2">
                    Email
                </label>
                <input
                    className="m-1 p-2 rounded-lg h-10 bg-gray-500"
                    type="text"
                    id="email"
                    placeholder="email"
                    value={reqBody.email}
                    onChange={e => setReqBody({ ...reqBody, email: e.target.value })}
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
                <div className="flex justify-center my-2 mx-1">
                    <button
                        type="submit"
                        className="flex-1 filter hover:brightness-90 bg-red-500 rounded-l-md p-2 mr-0.5">
                        Sign in
                    </button>
                    <Link
                        className="filter hover:brightness-90 bg-red-500 rounded-r-md p-2"
                        to={"/register"}>
                        Don't have an account?
                    </Link>
                </div>
            </form>
        </div>
    )
}

export { LoginForm, Logout };