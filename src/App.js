import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './pages/HomeScreen';
import LoginScreen from './pages/LoginScreen';
import ProfileScreen from './pages/ProfileScreen';
import PrivateRoutes from './components/PrivateRoutes';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth, onAuthStateChanged } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser, removeSub } from './features/userSlice';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email
          })
        );
      } else {
        dispatch(logout());
        dispatch(removeSub());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route exact path="/" element={!user ? <LoginScreen /> : <HomeScreen />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/profile" element={<ProfileScreen />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
