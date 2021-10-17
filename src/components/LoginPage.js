import React from "react";
import { useState } from "react";

const LoginForm = () => {
    const [reqBody, setReqBody] = useState({ username: "", password: "" });
    const Login = (e) => {
        e.preventDefault()
        console.log(JSON.stringify(reqBody))
        fetch(`http://localhost:8080/aniapi/login`,
            {
                method: 'POST',
                body: JSON.stringify(reqBody),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then((data => console.log(data)))
    }

    return (
        <form className="pure-form pure-form-stacked" onSubmit={e => Login(e)}>
            <fieldset>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" placeholder="username"
                    value={reqBody.username} onChange={e => setReqBody({ ...reqBody, username: e.target.value })} />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Password"
                    value={reqBody.password} onChange={e => setReqBody({ ...reqBody, password: e.target.value })} />
                <button type="submit" className="pure-button pure-button-primary"  >Sign in</button>
            </fieldset>
        </form>
    )
}

export default LoginForm;