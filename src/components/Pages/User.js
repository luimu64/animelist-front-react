import React, { useState } from "react";
import { TextField, Button } from "../Inputs";

const ChangePassword = () => {
    const [formData, setFormData] = useState({ opassword: '', npassword: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <form className="m-3 p-5 rounded text-white bg-gray-600" onSubmit={handleSubmit}>
            <h3 className="m-1 font-bold">Change Password</h3>
            <div className="flex flex-col sm:flex-row">
                <TextField
                    type='text'
                    name='old-password'
                    placeholder='Old password'
                    value={formData.opassword}
                    onChange={e => setFormData({ ...formData, opassword: e.target.value })}
                />
                <TextField
                    type="text"
                    name="new-password"
                    placeholder="New password"
                    value={formData.npassword}
                    onChange={e => setFormData({ ...formData, npassword: e.target.value })}
                />
                <Button text='Update' onClick={handleSubmit} />
            </div>
        </form>
    )
}


const UserPage = () => {
    return (
        <ChangePassword />
    )
}


export default UserPage;