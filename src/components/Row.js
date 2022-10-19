import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import axios from '../axios';
import './Row.css';

function Row({ title, fetchURL, isLargeRow = false }) {
    const [movies, setMovies] = useState([]);
    const base_url = "https://image.tmdb.org/t/p/original/";
    const TMDB_KEY = `${process.env.REACT_APP_TMDB_KEY}`;
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchURL);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchURL])

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };

    function getTrailer(tmdbId, mediaType, releaseDate, apiKey) {
        if (mediaType === "movie" || releaseDate) {
            let endpoint = 'https://api.themoviedb.org' + encodeURI('/3/movie/' + tmdbId + '/videos?api_key=' + apiKey + '&language=en-US');
            const result = handleFetch(endpoint);
            return result;
        } else {
            let endpoint = 'https://api.themoviedb.org' + encodeURI('/3/tv/' + tmdbId + '/videos?api_key=' + apiKey + '&language=en-US');
            const result = handleFetch(endpoint);
            return result;
        }
    }

    function handleFetch(endpoint) {
        const result = fetch(endpoint, { method: 'GET' })
            .then(response => response.json())
            .then(json => {
                if (json.results.length === 0) {
                    throw new Error('No trailers found for that TMDB ID')
                };

                let { results } = json

                if (results.length < 2) {
                    results = results.map(result => {
                        return result.key;
                    })
                    return results[0];
                }

                var filteredResults = results.filter((r) => r.type === "Trailer");
                results = filteredResults.map(result => {
                    return result.key;
                });
                return results[0];
            })
            .catch(error => {
                console.warn(error);
                return null;
            })

        return result
    }

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            getTrailer(movie.id, movie.media_type, movie.release_date, TMDB_KEY)
                .then((url) => setTrailerUrl(url)).catch(error => console.log(error));
        }
    };

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
                {movies.map(
                    (movie) =>
                        ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) && (
                            <img className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                                key={movie.id}
                                onClick={() => handleClick(movie)}
                                src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                                alt={movie.title || movie.name}
                            />
                        )
                )}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row;