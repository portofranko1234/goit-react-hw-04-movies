import React, { useState, useEffect } from "react";
import {
  Link,
  Switch,
  Route,
  useRouteMatch,
  useLocation,
} from "react-router-dom";
import PropTypes from "prop-types";

import { fetchMovieDetails } from "../../services/MovieDatabaseApi";
import { Cast } from "../Cast/Cast";
import { Reviews } from "../Reviews/Reviews";

MovieDetailsPage.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

function MovieDetailsPage(props) {
  const [movie, setMovie] = useState({});
  const [from, setFrom] = useState("");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const movieId = useRouteMatch().params.movieId;

  useEffect(() => {
    (async () => {
      try {
        const getMovieDetails = fetchMovieDetails(movieId);
        setMovie(getMovieDetails);
      } catch (error) {
        if (error.response) {
          setError(error.response.data.status_message);
        }
      }
    })();
  }, [movieId]);

  useEffect(() => {
    setFrom(location.state && location.state.from ? location.state.from : "/");
    setSearch(
      location.state && location.state.search ? location.state.search : ""
    );
  }, [location.state]);

  const handelClick = () =>
    props.history.push({
      pathname: from,
      search: search,
    });

  return (
    <>
      <button type="button" onClick={handelClick}>
        Go back
      </button>
      {(movie.id && (
        <>
          <div>
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                width="300"
                alt={movie.title || movie.name}
              />
            )}
            <div className="descr">
              <h2>{movie.title || movie.name}</h2>
              <p>User score: {movie.vote_average * 10}%</p>
              <h3>Overview</h3>
              <p>{movie.overview || "This movie has no overview yet."}</p>
              <h3>Genres</h3>
              <ul>
                {movie.genres.map((el) => (
                  <li key={el.id}>{el.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <p>Additional information</p>
            <ul>
              <li>
                <Link
                  to={{
                    pathname: `/movies/${movie.id}/cast`,
                    state: {
                      search: search,
                      from: from,
                    },
                  }}
                >
                  Cast
                </Link>
              </li>{" "}
              <li>
                <Link
                  to={{
                    pathname: `/movies/${movie.id}/reviews`,
                    state: {
                      search: search,
                      from: from,
                    },
                  }}
                >
                  Reviews
                </Link>
              </li>
            </ul>
          </div>
          <Switch>
            <Route path="/movies/:movieId/cast" component={Cast} />
            <Route path="/movies/:movieId/reviews" component={Reviews} />
          </Switch>
        </>
      )) ||
        (error && <p className="descr">{error}</p>)}
    </>
  );
}
export default MovieDetailsPage;
