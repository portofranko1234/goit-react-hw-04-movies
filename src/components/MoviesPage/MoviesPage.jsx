import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import queryString from "query-string";
import { FetchMoviesBySearchQuery } from "../../services/MovieDatabaseApi";

MoviesPage.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

function MoviesPage(props) {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [notice, setNotice] = useState("");
  const location = useLocation();
  const search = queryString.parse(location.search);

  const handleChange = ({ target: { value } }) => {
    setQuery(value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.history.push({
      search: `query=${query}`,
    });
    setQuery("");
  };

  useEffect(() => {
    search.query &&
      FetchMoviesBySearchQuery(search.query)
        .then((results) => {
          if (results.length) {
            setNotice("");
            setMovies(results);
          } else {
            setMovies([]);
            setNotice("Sorry, we can't find anything for your request");
          }
        })
        .catch((error) => setNotice(error.response.data.status_message));
  }, [search.query]);

  return (
    <div>
      <h2>MoviesPage</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          name="query"
          value={query}
          onChange={handleChange}
        />

        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>
      </form>

      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link
              to={{
                pathname: `/movies/${movie.id}`,
                state: {
                  search: location && location.search ? location.search : "",
                  from: props.location.pathname,
                },
              }}
            >
              {movie.title || movie.name}
            </Link>
          </li>
        ))}
      </ul>
      {notice && <p>{notice}</p>}
    </div>
  );
}
export default MoviesPage;
