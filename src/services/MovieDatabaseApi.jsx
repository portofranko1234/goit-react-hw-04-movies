import axios from "axios";
const apiKey = "aaee1fa0f8436ed85929dc238ccb2c10";

axios.defaults.baseURL = "https://api.themoviedb.org";

// service for showing trending movies at start page
export const trendingMovies = () => {
  return axios
    .get(`/3/trending/all/day?api_key=${apiKey}`)
    .then((response) => response.data.results);
};

export const FetchMoviesBySearchQuery = (query) => {
  return axios
    .get(
      `/3/search/movie?api_key=${apiKey}&query=${query}&language=en-US&page=1&include_adult=false`
    )
    .then((response) => response.data.results);
};

export const fetchMovieDetails = (movieId) => {
  axios
    .get(`/3/movie/${movieId}?api_key=${apiKey}&language=en-US`)
    .then((response) => response.data);
};

export const fetchCastAndCrew = (movieId) => {
  axios
    .get(`/3/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`)
    .then((response) => response.data.cast);
};

export const fetchMovieReviews = (movieId) => {
  axios
    .get(`/3/movie/${movieId}/reviews?api_key=${apiKey}&language=en-US&page=1`)
    .then((response) => response.data.results);
};
