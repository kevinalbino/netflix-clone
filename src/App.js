import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './pages/HomeScreen';
import LoginScreen from './pages/LoginScreen';
import ProfileScreen from './pages/ProfileScreen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth, onAuthStateChanged } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        console.log(userAuth)
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email
          })
        );
      } else {
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="app">
      <Router>
        {!user ? (
          <LoginScreen />
        ) : (
          <Routes>
            <Route exact path="/" element={<HomeScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
