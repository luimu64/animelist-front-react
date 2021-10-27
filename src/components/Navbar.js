import React, { useContext, useState } from "react";
import {
    AiOutlineUser,
    AiOutlineLogin,
    AiOutlineUnorderedList,
    AiOutlineLogout,
    AiOutlinePlusCircle,
    AiOutlineSearch,
    AiOutlineMenu
} from "react-icons/ai"
import { Link, BrowserRouter, useHistory } from "react-router-dom";
import { LoginContext } from "../App.js"
import { motion, AnimatePresence } from "framer-motion"

const UserSearch = ({ setOpen }) => {
    let history = useHistory();
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push(`/list/${query}`);
        setQuery('');
        setOpen(window.innerWidth > 1024);
    }

    return (
        <form className="flex max-h-full mr-2" onSubmit={handleSubmit}>
            <input type="text" className="m-2 p-2 rounded-lg text-lg font-semibold bg-gray-500 text-white" value={query} onChange={e => setQuery(e.target.value)} />
            <button type="submit" className="text-white filter hover:brightness-90 bg-red-500 rounded-md p-2 my-2"><AiOutlineSearch size={30} /></button>
        </form>
    )
}

const NavLink = ({ setOpen, icon, text, route }) => {
    return (
        <Link className="text-white m-2 flex lg:self-center"
            to={route}
            onClick={() => setOpen(window.innerWidth > 1024)} >
            {icon}
            <p className="my-1 mx-2 font-semibold text-lg self-center">{text}</p>
        </Link >
    )
}

const Navbar = ({ children }) => {
    const { isLoggedIn } = useContext(LoginContext);
    const [open, setOpen] = useState(window.innerWidth > 1024);

    window.addEventListener("resize", () => {
        setOpen(window.innerWidth > 1024);
    });

    return (
        <BrowserRouter>
            <nav className="flex bg-gray-700 p-2 flex-col lg:flex-row rounded-b-lg mb-2">
                <button className="block lg:hidden m-2 text-white" onClick={() => setOpen(!open)}><AiOutlineMenu size={40} /></button>
                {open &&
                    <AnimatePresence
                        initial={false}
                    >
                        <motion.div
                            className="flex flex-col lg:flex-row flex-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {isLoggedIn && <NavLink
                                icon={<AiOutlineUnorderedList size={40} />}
                                text={"Animelist"}
                                route="/list"
                                setOpen={setOpen} />

                            }
                            {isLoggedIn && <NavLink
                                icon={<AiOutlinePlusCircle size={40} />}
                                text={"Add new"}
                                route="/title/add"
                                setOpen={setOpen} />
                            }
                            {isLoggedIn && <NavLink
                                icon={<AiOutlineUser size={40} />}
                                text={"Settings"}
                                route="/user"
                                setOpen={setOpen} />
                            }
                            {isLoggedIn ?
                                <NavLink
                                    icon={<AiOutlineLogout size={40} />}
                                    text={"Logout"}
                                    route="/logout"
                                    setOpen={setOpen} /> :
                                <NavLink
                                    icon={<AiOutlineLogin size={40} />}
                                    text={"Login"}
                                    route="/login"
                                    setOpen={setOpen} />}
                            <span className="flex-1" />
                            <UserSearch setOpen={setOpen} />
                        </motion.div>
                    </AnimatePresence>}
            </nav>
            {children}
        </BrowserRouter>
    )
}


export default Navbar;