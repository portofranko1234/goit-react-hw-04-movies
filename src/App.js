import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";
import Nav from "./components/Nav/Nav";

const HomePage = lazy(() =>
  import("./components/HomePage/HomePage" /* webpackChunkName: "home-page" */)
);
const MoviesPage = lazy(() =>
  import(
    "./components/MoviesPage/MoviesPage" /* webpackChunkName: "movies-page" */
  )
);
const MovieDetailsPage = lazy(() =>
  import(
    "./components/MovieDetailsPage/MovieDetailsPage" /* webpackChunkName: "movie-details-page" */
  )
);
const PageNotFound = lazy(() =>
  import(
    "./components/PageNotFound/PageNotFound" /* webpackChunkName: "page-not-found" */
  )
);

export function App() {
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <Nav />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/movies" component={MoviesPage} />
          <Route path="/movies/:movieId" component={MovieDetailsPage} />
          <Route component={PageNotFound} />
        </Switch>
      </Suspense>
    </>
  );
}
