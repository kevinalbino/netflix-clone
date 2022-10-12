import React from 'react';
import './ProfileScreen.css';
import Nav from '../components/Nav';
import PlansScreen from '../components/PlansScreen';
import { useSelector } from 'react-redux';
import { selectUser, selectSub } from '../features/userSlice';
import { auth, signOut } from "../firebase";

function ProfileScreen() {
    const user = useSelector(selectUser);
    const sub = useSelector(selectSub);

    return (
        <div className="profileScreen">
            <Nav />
            <div className="profileScreen__body">
                <h1>Edit Profile</h1>
                <div className="profileScreen__info">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="" />
                    <div className="profileScreen__details">
                        <h2>{user.email}</h2>
                        <div className="profileScreen__plans">
                            <h3>
                                {sub?.role ? `Plans (Current Plan: ${sub?.role})` : `Plans`}
                            </h3>
                            <PlansScreen />
                            <button onClick={() => signOut(auth)}
                                className="profileScreen__signOut">Sign Out</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileScreen;