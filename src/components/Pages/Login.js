import React, { useState, useContext } from "react";
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { getAuth } from "firebase/auth";
import { app } from '../../firebase-config';
import { TextField, Button } from "../Inputs";

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

    const Login = async (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(reqBody.email, reqBody.password);
    }

    console.log(reqBody)

    return (
        <div className="flex justify-center" >
            <form className="flex flex-col col-span-auto text-white m-10"
                onSubmit={Login}>
                <label
                    htmlFor="username"
                    className="m-2">
                    Email
                </label>
                <TextField
                    type='text'
                    id='email'
                    placeholder='email'
                    value={reqBody.email}
                    onChange={e => setReqBody({ ...reqBody, email: e.target.value })}
                />
                <label
                    className="m-2"
                    htmlFor="password">
                    Password
                </label>
                <TextField
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={reqBody.password}
                    onChange={e => setReqBody({ ...reqBody, password: e.target.value })}
                />
                <div className="flex justify-center my-2">
                    <Button
                        onClick={Login}
                        text={'Login'}
                    />
                    <Button
                        redirect={true}
                        redirectUrl={'/register'}
                        text={'Register'}
                    />
                </div>
            </form>
        </div>
    )
}

export { LoginForm, Logout };