import React, { useContext } from "react";
import { AiOutlineUser, AiOutlineLogin, AiOutlineUnorderedList, AiOutlineLogout } from "react-icons/ai"
import { Link, BrowserRouter } from "react-router-dom";
import { LoginContext } from "../App.js"

const Navbar = ({ children }) => {
    const { isLoggedIn } = useContext(LoginContext);
    return (
        <BrowserRouter>
            <nav>
                {isLoggedIn ? <Link className="nav-icon" to="/user"><AiOutlineUser size={50} /></Link> : undefined}
                {isLoggedIn ? <Link className="nav-icon" to="/list"><AiOutlineUnorderedList size={50} /></Link> : undefined}
                {isLoggedIn ?
                    <Link className="nav-icon" to="/logout"><AiOutlineLogout size={50} /></Link> :
                    <Link className="nav-icon" to="/login"><AiOutlineLogin size={50} /></Link>}
                <input className="search-input" type="text" onKeyPress={e => {
                    if (e.key === 'Enter') window.location.replace(`/list/${e.target.value}`)
                }} />
            </nav>
            {children}
        </BrowserRouter>
    )
}


export default Navbar;