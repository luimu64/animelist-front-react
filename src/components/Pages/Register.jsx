import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { getAuth } from "firebase/auth";
import { app } from '../../firebase-config';
import { TextField, Button } from "../Inputs";

const RegisterForm = () => {
    const [reqBody, setReqBody] = useState({ username: "", email: "", password: "", password_verify: "" });
    const history = useNavigate();
    const auth = getAuth(app);
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);


    const register = async (e) => {
        e.preventDefault();
        if (reqBody.password === reqBody.password_verify) {
            await createUserWithEmailAndPassword(reqBody.email, reqBody.password);
        }
    }

    const handleChange = (e) => {
        e.preventDefault()
        setReqBody(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    return (loading ? <p>Loading...</p> :
        <div className="flex justify-center" >
            <form
                className="flex flex-col col-span-auto text-white m-10"
                onSubmit={register}>
                <label
                    className="m-2"
                    htmlFor="username">
                    Username
                </label>
                <TextField
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
                <TextField
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
                <TextField
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={reqBody.password}
                    onChange={handleChange}
                />
                <label
                    className="m-2"
                    htmlFor="password-verify">
                    Password again
                </label>
                <TextField
                    type="password"
                    name="password_verify"
                    placeholder="Password"
                    value={reqBody.password_verify}
                    onChange={handleChange}
                />
                <Button
                    type="submit"
                    text="Register"
                />
            </form>
        </div>
    )
}

export default RegisterForm;