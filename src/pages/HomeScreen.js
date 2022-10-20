import './HomeScreen.css';
import Nav from '../components/Nav';
import Banner from '../components/Banner';
import requests from '../Requests';
import Row from '../components/Row';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectSub } from '../features/userSlice';

function HomeScreen() {
    const sub = useSelector(selectSub);

    return (
        sub?.role ? <div className="HomeScreen">
            <Nav />
            <Banner />
            <Row
                title="Netflix Originals"
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
        </div> : <Navigate to='/profile' />
    );
}

export default HomeScreen;