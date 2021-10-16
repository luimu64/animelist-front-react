import React from "react";

const LoginForm = () => {
    return (
        <form class="pure-form pure-form-stacked" method="post" >
            <fieldset>
                <label for="username">Username</label>
                <input type="text" id="username" placeholder="username" />
                <label for="password">Password</label>
                <input type="password" id="password" placeholder="Password" />
                <button type="submit" class="pure-button pure-button-primary">Sign in</button>
            </fieldset>
        </form>
    )
}

export default LoginForm;