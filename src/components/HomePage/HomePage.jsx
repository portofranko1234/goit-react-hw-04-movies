import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { trendingMovies } from "../../services/MovieDatabaseApi";

StartPage.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

function StartPage(props) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await trendingMovies();
      setMovies(data);
    })();
  }, []);

  return (
    <>
      <h1>Trending Today</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link
              to={{
                pathname: `/movies/${movie.id}`,
                state: { from: props.location.pathname },
              }}
            >
              {movie.title || movie.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
export default StartPage;
