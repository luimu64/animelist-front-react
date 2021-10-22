import React from "react";
import { useState, useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { LoginContext } from "../App";

const RegisterForm = () => {
    const [reqBody, setReqBody] = useState({ username: "", password: "", password_verify: "" });
    const { isLoggedIn } = useContext(LoginContext);
    const Login = (e) => {
        e.preventDefault();
        if (reqBody.password === reqBody.password_verify) {
            delete reqBody.password_verify;
            fetch(`${process.env.REACT_APP_APIURL}/aniapi/register`,
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

    return (isLoggedIn ? (<Route><Redirect to={"/list"} /></Route>) : (
        <form className="pure-form pure-form-stacked" onSubmit={e => Login(e)}>
            <fieldset>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" placeholder="username"
                    value={reqBody.username} onChange={handleChange} />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" placeholder="Password"
                    value={reqBody.password} onChange={handleChange} />
                <label htmlFor="password-verify">Password again</label>
                <input type="password" name="password_verify" placeholder="Password"
                    value={reqBody.password_verify} onChange={handleChange} />
                <button type="submit" className="pure-button pure-button-primary" >Sign up</button>
            </fieldset>
        </form>)
    )
}

export default RegisterForm;