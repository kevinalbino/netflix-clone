import React, { useRef } from 'react';
import { auth, signInWithEmailAndPassword } from '../firebase';
import { useNavigate } from 'react-router-dom';
import './SigninScreen.css';

function SigninScreen() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();

    const signIn = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(
            auth,
            emailRef.current.value,
            passwordRef.current.value
        ).then((authUser) => {
            console.log(authUser)
        }).catch((error) => alert(error.message));
    };

    return (
        <div className="signinScreen">
            <form>
                <h1>Sign In</h1>
                <input ref={emailRef} placeholder="Email" type="email" />
                <input ref={passwordRef} placeholder="Password" type="password" />
                <button type="submit" onClick={signIn}>Sign In</button>
                <h4>
                    <span className="signupScreen__gray">New to Netflix? </span>
                    <span className="signupScreen__link" onClick={() => navigate('/signup', { state: { email: emailRef.current.value } })}>Sign up now.</span>
                </h4>
            </form>
        </div>
    )
}

export default SigninScreen;