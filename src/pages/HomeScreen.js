import React from 'react';
import './HomeScreen.css';
import Nav from '../components/Nav';
import Banner from '../components/Banner';

function HomeScreen() {
    return (
        <div className="HomeScreen">
            <Nav />
            <Banner />
        </div>
    );
}

export default HomeScreen;