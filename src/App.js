import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";
import Nav from "./components/Nav/Nav";
const HomePage = lazy(() => import("./components/HomePage/HomePage"));
const MovieDetailsPage = lazy(() =>
  import("./components/MovieDetailsPage/MovieDetailsPage")
);
const MoviesPage = lazy(() => import("./components/MoviesPage/MoviesPage"));
export function App() {
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <Nav />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/movies" component={MoviesPage} />
          <Route path="/movies/:movieId" component={MovieDetailsPage} />
        </Switch>
      </Suspense>
    </>
  );
}
