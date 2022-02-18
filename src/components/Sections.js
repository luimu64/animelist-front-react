import React from "react";
import { Button } from "./Inputs";

const SettingsSection = (props) => {
    return (
        <form className="m-3 p-5 rounded text-white bg-gray-600" onSubmit={props.handleSubmit}>
            <input type='hidden' value={props.sectionName} />
            <h3 className="m-1 font-bold">{props.title}</h3>
            <div className="flex flex-col sm:flex-row">
                {props.children}
                <Button extraClasses='ml-auto' text='Update' onClick={props.handleSubmit} />
            </div>
        </form>
    )
}

export { SettingsSection };