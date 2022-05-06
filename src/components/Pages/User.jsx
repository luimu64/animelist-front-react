import React, { useState } from "react";
import { TextField, Button } from "../Inputs";
import { SettingsSection } from "../Sections";
import { getAuth } from "firebase/auth";
import { app } from '../../firebase-config';
import { useAuthState, useUpdatePassword, useUpdateProfile } from "react-firebase-hooks/auth";
import Avatar from "boring-avatars";
import { useEffect } from "react";
import { AiOutlineLoading } from "react-icons/ai";

const auth = getAuth(app);

const ChangePassword = ({ currentUser }) => {
    const [updatePassword, updating, error] = useUpdatePassword(auth);
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updatePassword(password);
    }

    return (
        <SettingsSection
            title='Change password'
            handleSubmit={handleSubmit}
            sectionName='password'>
            <TextField
                type="text"
                name="new-password"
                placeholder="New password"
                minLenght='6'
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
        </SettingsSection>
    )
}

const ChangeUsername = ({ currentUser }) => {
    const [username, setUsername] = useState('')
    const [updateProfile, updating, error] = useUpdateProfile(auth);

    useEffect(() => {
        if (currentUser) setUsername(currentUser.displayName);
    }, [currentUser])

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateProfile({ displayName: username })
    }

    return (
        <SettingsSection
            title='Change username'
            handleSubmit={handleSubmit}
            sectionName='username'>
            {updating ? <AiOutlineLoading className="animate-spin my-5 text-white mx-auto mt-10" size={40} /> : <TextField
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

const ChangeProfilePicture = ({ currentUser }) => {
    const [photoUrl, setPhotoUrl] = useState('');
    const [updateProfile, updating, error] = useUpdateProfile(auth);

    useEffect(() => {
        if (currentUser) setPhotoUrl(currentUser.photoURL)
    }, [currentUser])

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateProfile({ photoURL: photoUrl })
    }

    return (
        <SettingsSection
            title='Change profile picture'
            handleSubmit={handleSubmit}
            sectionName='profile-picture'
            extraButtons={<Button text='Reset' type='button' onClick={() => setPhotoUrl('')} />}
        >
            {updating ? <AiOutlineLoading className="animate-spin my-5 text-white mx-auto mt-10" size={40} /> :
                <div className="w-20 h-20 m-1 flex justify-center items-center">
                    {photoUrl !== '' && photoUrl !== null ?
                        <img
                            className="rounded-full w-full h-full max-h-full object-cover"
                            src={photoUrl}
                            alt='profile picture'
                        /> :
                        <Avatar
                            size={65}
                            name={currentUser.displayName || 'placeholder'}
                            variant="marble"
                            colors={["#8B5CF6", "#DB2777", "#4F46E5"]}
                        />}
                </div>}
            <TextField
                type='text'
                name='profilePictureUrl'
                placeholder='Profile picture url'
                extraClasses='grow'
                value={photoUrl || ''}
                onChange={e => setPhotoUrl(e.target.value)}
            />
        </SettingsSection>
    )
}

const UserPage = () => {
    const [user, loading, error] = useAuthState(auth);

    return (
        loading ? <AiOutlineLoading className="animate-spin my-5 text-white mx-auto mt-10" size={60} /> : <div>
            {/*<ChangePassword currentUser={user} />*/}
            <ChangeUsername currentUser={user} />
            <ChangeProfilePicture currentUser={user} />
        </div>
    )
}


export default UserPage;