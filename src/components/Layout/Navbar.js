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
import classNames from "classnames";

const auth = getAuth(app);

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
        <form className="flex items-center h-full md:mr-14" onSubmit={handleSubmit}>
            <TextField
                type="text"
                value={query}
                extraClasses='grow sm:grow-0'
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
    const [user, loading, error] = useAuthState(auth);

    return (
        <>
            <div className="absolute top-12 right-0 p-1 bg-gray-500 divide-y-2 divide-gray-400 rounded shadow-xl z-10">
                {user ?
                    <>
                        <p className="text-blue-300 00 m-2 font-bold">{user.displayName}</p>
                        <NavLink
                            icon={<AiOutlineUser size={20} />}
                            text={"Settings"}
                            route="/user"
                            setOpen={props.setOpen}
                        />
                        <NavLink
                            icon={<AiOutlineLogout size={20} />}
                            text={"Logout"}
                            route="/logout"
                            setOpen={props.setOpen}
                        />
                    </> :
                    <NavLink
                        icon={<AiOutlineLogin size={20} />}
                        text={"Login"}
                        route="/login"
                        setOpen={props.setOpen}
                    />}
            </div>
            <div className="fixed h-screen w-screen top-0 left-0 right-0 bottom-0"></div>
        </>
    )
}

const NavLink = (props) => {
    return (
        <Link className={classNames("text-white p-2 flex lg:self-center items-center", props.hover && "hover:bg-gray-800")}
            to={props.route}
            onClick={() => props.setOpen(window.innerWidth > 768)} >
            {props.icon}
            <p className="my-1 mx-2 font-semibold text-lg self-center">{props.text}</p>
        </Link >
    )
}

const Navbar = ({ children }) => {
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
                        {user && <>
                            {user.photoURL ?
                                <img className="rounded-full object-cover" src={user.photoURL} /> :
                                <Avatar
                                    size={40}
                                    name={user ? user.displayName : 'placeholder'}
                                    variant="marble"
                                    colors={["#8B5CF6", "#DB2777", "#4F46E5"]}
                                />}
                        </>}
                        {openAcc && <DropdownMenu setOpen={setOpen} />}
                    </div>
                </div>
            </nav>
            {children}
        </BrowserRouter>
    )
}


export default Navbar;