import React, { useState } from "react";
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
import { motion, AnimatePresence } from "framer-motion";
import { getAuth } from "firebase/auth";
import { app } from "../../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { TextField, Button } from "../Inputs";

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
            <TextField
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
            />
            <Button
                type="submit"
                icon={<AiOutlineSearch size={20} />}
            />
        </form>
    )
}

const DropdownMenu = (props) => {
    return (
        <div className="absolute top-12 right-0 bg-gray-500 rounded">
            {props.user ?
                <>
                    <NavLink
                        icon={<AiOutlineUser size={40} />}
                        text={"Settings"}
                        route="/user"
                        setOpen={props.setOpen}
                    />
                    <NavLink
                        icon={<AiOutlineLogout size={40} />}
                        text={"Logout"}
                        route="/logout"
                        setOpen={props.setOpen}
                    />
                </> :
                <NavLink
                    icon={<AiOutlineLogin size={40} />}
                    text={"Login"}
                    route="/login"
                    setOpen={props.setOpen}
                />}
        </div>
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
    const auth = getAuth(app);
    const [user, loading, error] = useAuthState(auth);
    const [open, setOpen] = useState(window.innerWidth > 1024);
    const [openAcc, setOpenAcc] = useState(false);

    window.addEventListener("resize", () => {
        setOpen(window.innerWidth > 1024);
    });

    return (
        <BrowserRouter>
            <nav className="flex bg-gray-700 p-2 items-start">
                <div className="flex grow flex-col lg:flex-row rounded-b-lg">
                    <button className={"block lg:hidden m-2 text-white"} onClick={() => setOpen(!open)}><AiOutlineMenu size={40} /></button>
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
                                {user && <NavLink
                                    icon={<AiOutlineUnorderedList size={40} />}
                                    text={"Animelist"}
                                    route="/list"
                                    setOpen={setOpen} />
                                }
                                {user && <NavLink
                                    icon={<AiOutlinePlusCircle size={40} />}
                                    text={"Add new"}
                                    route="/title/add"
                                    setOpen={setOpen} />
                                }

                                <span className="flex-1" />
                                <UserSearch setOpen={setOpen} />
                            </motion.div>
                        </AnimatePresence>}
                </div>
                <div className="flex m-0.5 h-12 w-12 relative" onClick={() => setOpenAcc(!openAcc)}>
                    <img className="rounded-full w-full h-auto" src="https://cdn.myanimelist.net/images/characters/8/433732.jpg" />
                    {openAcc && <DropdownMenu setOpen={setOpen} user={user} />}
                </div>
            </nav>
            {children}
        </BrowserRouter>
    )
}


export default Navbar;