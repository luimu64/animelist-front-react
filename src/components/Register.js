import React from "react";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { LoginContext } from "../App";

const RegisterForm = () => {
    const [reqBody, setReqBody] = useState({ username: "", password: "", password_verify: "" });
    const { isLoggedIn } = useContext(LoginContext);
    const history = useHistory();

    const register = (e) => {
        e.preventDefault();
        if (reqBody.password === reqBody.password_verify) {
            delete reqBody.password_verify;
            fetch(`${process.env.REACT_APP_APIURL}/register`,
                {
                    method: 'POST',
                    body: JSON.stringify(reqBody),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => console.log(data))
        }
    }

    const handleChange = (e) => {
        e.preventDefault()
        setReqBody(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    if (isLoggedIn) {
        history.push("/list");
        return null;
    } else return (
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
                    placeholder="username"
                    value={reqBody.username}
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