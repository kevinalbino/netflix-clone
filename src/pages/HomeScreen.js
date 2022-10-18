import './HomeScreen.css';
import Nav from '../components/Nav';
import Banner from '../components/Banner';
import requests from '../Requests';
import Row from '../components/Row';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectSub } from '../features/userSlice';
import { useEffect } from 'react';

function HomeScreen() {
    const sub = useSelector(selectSub);
    const navigate = useNavigate();

    useEffect(() => {
        if (sub?.role === undefined) {
            navigate("/profile");
        }
    });

    return (
        <div className="HomeScreen">
            <Nav />
            <Banner />
            <Row
                title="NETFLIX ORIGINALS"
                fetchURL={requests.fetchNetflixOriginals}
                isLargeRow
            />
            <Row title="Trending Now" fetchURL={requests.fetchTrending} />
            <Row title="Top Rated" fetchURL={requests.fetchTopRated} />
            <Row title="Action Movies" fetchURL={requests.fetchActionMovies} />
            <Row title="Comedy Movies" fetchURL={requests.fetchComedyMovies} />
            <Row title="Horror Movies" fetchURL={requests.fetchHorrorMovies} />
            <Row title="Romance Movies" fetchURL={requests.fetchRomanceMovies} />
            <Row title="Documentaries" fetchURL={requests.fetchDocumentaries} />
        </div>
    );
}

export default HomeScreen;