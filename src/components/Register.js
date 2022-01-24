import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { getAuth } from "firebase/auth";
import { app } from "../firebase-config";

const RegisterForm = () => {
    const [reqBody, setReqBody] = useState({ username: "", email: "", password: "", password_verify: "" });
    const history = useHistory();
    const auth = getAuth(app);
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);


    const register = (e) => {
        e.preventDefault();
        if (reqBody.password === reqBody.password_verify) {
            createUserWithEmailAndPassword(reqBody.email, reqBody.password)
        }
    }

    const handleChange = (e) => {
        e.preventDefault()
        setReqBody(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    return (
        <div className="flex justify-center" >
            <form
                className="flex flex-col col-span-auto text-white m-10"
                onSubmit={register}>
                <label
                    className="m-2"
                    htmlFor="username">
                    Username
                </label>
                <input
                    className="m-1 p-2 rounded-lg h-10 bg-gray-500"
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={reqBody.username}
                    onChange={handleChange}
                />
                <label
                    className="m-2"
                    htmlFor="email">
                    Email
                </label>
                <input
                    className="m-1 p-2 rounded-lg h-10 bg-gray-500"
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={reqBody.email}
                    onChange={handleChange}
                />
                <label
                    className="m-2"
                    htmlFor="password">
                    Password
                </label>
                <input
                    className="m-1 p-2 rounded-lg h-10 bg-gray-500"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={reqBody.password}
                    minLength={6}
                    onChange={handleChange}
                />
                <label
                    className="m-2"
                    htmlFor="password-verify">
                    Password again
                </label>
                <input
                    className="m-1 p-2 rounded-lg h-10 bg-gray-500"
                    type="password"
                    name="password_verify"
                    placeholder="Password"
                    value={reqBody.password_verify}
                    minLength={6}
                    onChange={handleChange}
                />
                <button
                    type="submit"
                    className="filter hover:brightness-90 bg-red-500 rounded-md p-2 mt-2 mx-1">
                    Sign up
                </button>
            </form>
        </div>
    )
}

export default RegisterForm;