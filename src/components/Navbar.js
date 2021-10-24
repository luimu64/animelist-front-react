import React, { useContext } from "react";
import {
    AiOutlineUser,
    AiOutlineLogin,
    AiOutlineUnorderedList,
    AiOutlineLogout,
    AiOutlinePlusCircle
} from "react-icons/ai"
import { Link, BrowserRouter, useHistory } from "react-router-dom";
import { LoginContext } from "../App.js"

const UserSearch = () => {
    let history = useHistory();
    return (
        <input className="search-input" type="text" onKeyPress={e => {
            if (e.key === 'Enter') history.push(`/list/${e.target.value}`)
        }} />
    )
}

const Navbar = ({ children }) => {
    const { isLoggedIn } = useContext(LoginContext);

    return (
        <BrowserRouter>
            <nav>
                {isLoggedIn && <Link className="nav-icon" to="/user"><AiOutlineUser size={50} /></Link>}
                {isLoggedIn && <Link className="nav-icon" to="/list"><AiOutlineUnorderedList size={50} /></Link>}
                {isLoggedIn && <Link className="nav-icon" to="/title/add"><AiOutlinePlusCircle size={50} /></Link>}
                {isLoggedIn ?
                    <Link className="nav-icon" to="/logout"><AiOutlineLogout size={50} /></Link> :
                    <Link className="nav-icon" to="/login"><AiOutlineLogin size={50} /></Link>}
                <UserSearch />
            </nav>
            {children}
        </BrowserRouter>
    )
}


export default Navbar;