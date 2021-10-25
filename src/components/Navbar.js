import React, { useContext, useState } from "react";
import {
    AiOutlineUser,
    AiOutlineLogin,
    AiOutlineUnorderedList,
    AiOutlineLogout,
    AiOutlinePlusCircle,
    AiOutlineSearch
} from "react-icons/ai"
import { Link, BrowserRouter, useHistory } from "react-router-dom";
import { LoginContext } from "../App.js"

const UserSearch = () => {
    let history = useHistory();
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push(`/list/${query}`);
        setQuery('');
    }

    return (
        <form className="pure-form search-form" onSubmit={handleSubmit}>
            <input type="text" value={query} onChange={e => setQuery(e.target.value)} />
            <button type="submit" className="pure-button"><AiOutlineSearch size={30} /></button>
        </form>
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