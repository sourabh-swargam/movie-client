import "./Main.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import api from "../../api/axiosConfig";
import Layout from "../Layout";
import Home from "../home/Home";
import Header from "../header/Header";
import Trailer from "../trailer/Trailer";
import Reviews from "../reviews/Reviews";
import NotFound from "../notFound/NotFound";

function Main({ login, logout }) {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);

  const getMovies = async () => {
    try {
      const response = await api.get("/api/v1/movies");
      setMovies(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getMovieData = async (movieId) => {
    try {
      const response = await api.get(`/api/v1/movies/${movieId}`);
      setMovie(response.data);
      setReviews(response.data.reviewsIds);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="App">
      <Header login={login} logout={logout} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home movies={movies} />}></Route>
          <Route path="/Trailer/:ytTrailerId" element={<Trailer />}></Route>
          <Route
            path="/Reviews/:movieId"
            element={
              <Reviews
                getMovieData={getMovieData}
                movie={movie}
                setReviews={setReviews}
                reviews={reviews}
              />
            }
          ></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default Main;
