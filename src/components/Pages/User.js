import React, { useState } from "react";

const ChangePassword = () => {
    const [formData, setFormData] = useState({ opassword: '', npassword: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_APIURL}/user/password/change`,
            {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => console.log(data))
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="old-password" >Old password</label>
            <input type="text" name="old-password" value={formData.opassword} onChange={e => setFormData({ ...formData, opassword: e.target.value })} />
            <label htmlFor="new-password" >New password</label>
            <input type="text" name="new-password" value={formData.npassword} onChange={e => setFormData({ ...formData, npassword: e.target.value })} />
            <button type="submit">Change</button>
        </form>
    )
}


const UserPage = () => {
    return (
        <ChangePassword />
    )
}


export default UserPage;