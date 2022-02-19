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
import { useEffect } from "react/cjs/react.development";
import Avatar from "boring-avatars";

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
        <form className="flex items-center h-full mr-2 md:mr-14" onSubmit={handleSubmit}>
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
    const [open, setOpen] = useState(window.innerWidth > 768);
    const [openAcc, setOpenAcc] = useState(false);

    useEffect(() => {
        const checkNavbarVisibility = () => setOpen(window.innerWidth > 768);

        window.addEventListener("resize", checkNavbarVisibility);

        return () => window.removeEventListener("resize", checkNavbarVisibility);
    }, [])

    return (
        <BrowserRouter>
            <nav className="bg-gray-700 p-2 items-start">
                <div className="flex grow flex-col md:flex-row rounded-b-lg">
                    <button className="block md:hidden m-2 text-white w-min" onClick={() => setOpen(!open)}><AiOutlineMenu size={40} /></button>
                    {open &&
                        <AnimatePresence
                            initial={false}
                        >
                            <motion.div
                                className="flex flex-col md:flex-row flex-1"
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
                    <div className="flex absolute h-10 w-10 right-4 top-4" onClick={() => setOpenAcc(!openAcc)}>
                        {(user && user.photoURL != null) ?
                            <img className="rounded-full object-cover" src={user.photoURL} /> :
                            <Avatar
                                size={40}
                                name={'a'}
                                variant="marble"
                                colors={["#8B5CF6", "#DB2777", "#4F46E5"]}
                            />}
                        {openAcc && <DropdownMenu setOpen={setOpen} user={user} />}
                    </div>
                </div>
            </nav>
            {children}
        </BrowserRouter>
    )
}


export default Navbar;