import React, { useState } from "react";
import { TextField, Button } from "../Inputs";
import { SettingsSection } from "../Sections";
import { getAuth } from "firebase/auth";
import { app } from '../../firebase-config';
import { useAuthState } from "react-firebase-hooks/auth";

const auth = getAuth(app)

const ChangePassword = (props) => {
    const [formData, setFormData] = useState({
        opassword: '',
        npassword: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target)
    }

    return (
        <SettingsSection
            title='Change password'
            handleSubmit={handleSubmit}
            sectionName='password'>
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
        </SettingsSection>
    )
}

const ChangeUsername = (props) => {
    const [formData, setFormData] = useState({ username: '' })

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target)
    }

    return (
        <SettingsSection
            title='Change username'
            handleSubmit={handleSubmit}
            sectionName='username'>
            <TextField
                type='text'
                name='username'
                placeholder='Username'
                value={formData.username}
                onChange={e => setFormData({ ...formData, username: e.target.value })}
            />
        </SettingsSection>
    )
}

const ChangeProfilePicture = (props) => {
    const [user, loading, error] = useAuthState(auth);
    const [formData, setFormData] = useState({ username: '' })

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target)
    }

    return (
        <SettingsSection
            title='Change profile picture'
            handleSubmit={handleSubmit}
            sectionName='profile-picture'>
            <div className="w-full flex flex-col" >
                <TextField
                    type='text'
                    name='profilePictureUrl'
                    placeholder='Profile picture url'
                    extraClasses='sm:mr-5'
                    value={formData.username}
                    onChange={e => setFormData({ ...formData, username: e.target.value })}
                />
                <img className="m-1" src={user.photoUrl || ''} alt='profile picture' />
            </div>
        </SettingsSection>
    )
}

const UserPage = () => {
    return (
        <div>
            <ChangePassword />
            <ChangeUsername />
            <ChangeProfilePicture />
        </div>
    )
}


export default UserPage;