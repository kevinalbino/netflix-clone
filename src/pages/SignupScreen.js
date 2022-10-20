import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, createUserWithEmailAndPassword } from '../firebase';
import './SignupScreen.css';

function SignupScreen() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();

    const register = (e) => {
        e.preventDefault();

        createUserWithEmailAndPassword(
            auth,
            emailRef.current.value,
            passwordRef.current.value
        ).then(() => {
            navigate('/');
        }).catch((error) => alert(error.message));
    };

    return (
        <div className="signupScreen">
            <div className="signupHeader">
                <img
                    className="signupScreen__logo"
                    src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png" alt=""
                    onClick={() => navigate('/')} />
                <span className="signinScreen__link" onClick={() => navigate('/')}>Sign In</span>
            </div>
            <div className="signupScreen__body">
                <form>
                    <h3>SIGN UP</h3>
                    <h1>Create a password to start your membership</h1>
                    <input ref={emailRef} placeholder="Email" type="email" />
                    <input ref={passwordRef} placeholder="Password" type="password" />
                    <button type="submit" onClick={register}>Sign Up</button>
                    <h4>
                        <span className="signinScreen__gray">Already have an account? </span>
                        <span className="signinScreen__link" onClick={() => navigate('/')}>Sign in now.</span>
                    </h4>
                </form>
            </div>
        </div>
    )
}

export default SignupScreen;