import React, { useState } from "react";
import { TextField, Button } from "../Inputs";
import { SettingsSection } from "../Sections";
import { getAuth, updateProfile } from "firebase/auth";
import { app } from '../../firebase-config';
import { useAuthState, useUpdatePassword } from "react-firebase-hooks/auth";
import Avatar from "boring-avatars";
import { useEffect } from "react/cjs/react.development";
import { AiOutlineLoading } from "react-icons/ai";

const auth = getAuth(app)

const ChangePassword = (props) => {
    const [formData, setFormData] = useState({
        opassword: '',
        npassword: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault();
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

const ChangeUsername = () => {
    const [user, loading, error] = useAuthState(auth);
    const [username, setUsername] = useState('')

    useEffect(() => {
        if (user) setUsername(user.displayName);
    }, [user])

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProfile(user, { displayName: username })
    }

    return (
        <SettingsSection
            title='Change username'
            handleSubmit={handleSubmit}
            sectionName='username'>
            {loading ? <AiOutlineLoading className="animate-spin my-5" size={60} /> :
                <TextField
                    type='text'
                    name='username'
                    placeholder='Username'
                    minLenght={1}
                    value={username || ''}
                    onChange={e => setUsername(e.target.value)}
                />}
        </SettingsSection>
    )
}

const ChangeProfilePicture = () => {
    const [user, loading, error] = useAuthState(auth);
    const [photoUrl, setPhotoUrl] = useState('');

    useEffect(() => {
        if (user) setPhotoUrl(user.photoURL)
    }, [user])

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProfile(user, { photoURL: photoUrl })
    }

    return (
        <SettingsSection
            title='Change profile picture'
            handleSubmit={handleSubmit}
            sectionName='profile-picture'
            extraButtons={<Button text='Reset' type='button' onClick={() => setPhotoUrl('')} />}
        >
            {loading ? <AiOutlineLoading className="animate-spin my-5" size={60} /> :
                <>
                    <div className="w-20 h-20 m-1 flex justify-center items-center">
                        {photoUrl !== '' && photoUrl !== null ?
                            <img
                                className="rounded-full w-full h-full max-h-full object-cover"
                                src={photoUrl}
                                alt='profile picture'
                            /> :
                            <Avatar
                                size={65}
                                name={user.displayName || 'placeholder'}
                                variant="marble"
                                colors={["#8B5CF6", "#DB2777", "#4F46E5"]}
                            />}
                    </div>
                    <TextField
                        type='text'
                        name='profilePictureUrl'
                        placeholder='Profile picture url'
                        extraClasses='grow'
                        value={photoUrl || ''}
                        onChange={e => setPhotoUrl(e.target.value)}
                    />
                </>
            }
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