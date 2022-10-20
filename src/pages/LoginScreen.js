import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginScreen.css';
import SigninScreen from './SigninScreen';

function LoginScreen() {
    const [signIn, setSignIn] = useState(false);
    const emailRef = useRef(null);
    const navigate = useNavigate();

    return (
        <div className="loginScreen">
            <div className="loginScreen__background">
                <img
                    className="loginScreen__logo"
                    src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png" alt=""
                    onClick={() => setSignIn(false)} />
                <button onClick={() => setSignIn(true)}
                    className="loginScreen__button">Sign In</button>
                <div className="loginScreen--gradient" />
            </div>
            <div className="loginScreen__body">
                {signIn ? (
                    <SigninScreen />
                ) : (
                    <>
                        <h1>Unlimited movies, TV shows, and more.</h1>
                        <h2>Watch anywhere. Cancel anytime.</h2>
                        <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
                        <div className="loginScreen__input">
                            <form>
                                <input ref={emailRef} type="email" placeholder="Email address" />
                                <button onClick={() => navigate('/signup', { state: { email: emailRef.current.value } })}
                                    className="loginScreen__getStarted">Get Started &gt;</button>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default LoginScreen;