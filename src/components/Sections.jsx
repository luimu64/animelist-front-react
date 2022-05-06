import React from "react";
import { Button } from "./Inputs";

const SettingsSection = (props) => {
    return (
        <form className="m-3 p-5 rounded text-white bg-gray-600" onSubmit={props.handleSubmit}>
            <h3 className="mx-1 mb-3 font-bold text-center sm:text-left">{props.title}</h3>
            <div className="flex flex-col items-center :items-baseline sm:flex-row">
                {props.children}
                <div className="flex sm:ml-auto">
                    {props.extraButtons}
                    <Button text='Update' onClick={props.handleSubmit} />
                </div>
            </div>
        </form>
    )
}

export { SettingsSection };