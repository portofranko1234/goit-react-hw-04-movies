import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { fetchCastAndCrew } from "../../services/MovieDatabaseApi";

export function Cast() {
  const [cast, setCast] = useState([]);
  const movieId = useRouteMatch().params.movieId;

  useEffect(() => {
    (async () => {
      const getMovieCast = await fetchCastAndCrew(movieId);
      setCast(getMovieCast);
    })();
  }, [movieId]);

  return (
    <>
      {(cast.length && (
        <ul>
          {cast.map((actor) => (
            <li key={actor.id}>
              {actor.profile_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                  width="200"
                  alt={actor.name}
                />
              )}
              <h3>{actor.name}</h3>
              <p>Character: {actor.character}</p>
            </li>
          ))}
        </ul>
      )) || (
        <p className="descr">The resource you requested could not be found.</p>
      )}
    </>
  );
}
