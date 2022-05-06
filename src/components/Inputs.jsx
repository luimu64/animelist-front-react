import React, { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import {
    AiOutlineCaretDown
} from "react-icons/ai"

const TextField = (props) => {
    return (
        <input
            className={classNames("m-1 p-2 rounded h-10 bg-gray-500 !outline-none focus:ring-2 focus:ring-red-500 transition text-white", props.extraClasses)}
            type={props.type}
            id={props.id}
            name={props.name}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
        />
    )
}

const TextArea = (props) => {
    return (
        <textarea
            name={props.name}
            onChange={props.onChange}
            value={props.reasoning}
            className={classNames("m-1 p-1 rounded bg-gray-500 grow !outline-none focus:ring-2 focus:ring-red-500 transition text-white", props.extraClasses)}
        ></textarea>
    )
}

const Button = (props) => {
    return props.redirect ?
        <Link
            className="grow m-1 "
            to={props.redirectUrl}>
            <button
                onClick={props.onClick}
                type={props.type}
                className={classNames("transition h-10 hover:bg-red-700 bg-red-600 rounded p-2 w-full text-white", props.extraClasses)}>
                {props.icon}{props.text}
            </button>
        </Link> :
        <button
            onClick={props.onClick}
            type={props.type}
            className={classNames("h-10 transition hover:bg-red-700 bg-red-600 rounded m-1 p-2 text-white", props.extraClasses)}>
            {props.icon}{props.text}
        </button>
}

const Dropdown = (props) => {
    const [active, setActive] = useState(props.options[0]);
    const [open, setOpen] = useState(false);

    const handleClick = (newActive) => {
        setActive(newActive)
        props.onChange(newActive.value);
        setOpen(false);
    }

    return (
        <div className={classNames('relative bg-gray-500 rounded m-1', open && 'rounded-b-none')}>
            <div className='flex items-center p-2' onClick={() => setOpen(!open)}>
                <option
                    className="grow"
                    value={active.value}
                >{active.text}</option>
                <AiOutlineCaretDown />
            </div>
            <div className={classNames('absolute w-full z-10 rounded-b overflow-hidden divide-y divide-gray-800', open && '')}>
                {props.options.filter(o => o.value !== active.value).map((o, i) =>
                    <option
                        className={classNames(open ? 'block' : 'hidden', 'bg-gray-600 p-2 hover:bg-gray-700')}
                        key={i}
                        value={o.value}
                        onClick={() => handleClick(o)}
                    >{o.text}
                    </option>
                )}
            </div>
        </div>
    )
}

export {
    TextField,
    Button,
    TextArea,
    Dropdown
}