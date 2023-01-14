import axios from "axios";
import { useEffect, useState } from "react";
import { api_key } from "../Configs/api-key";
import Logo from "../Images/movieImg.png";
import "./movies-pages.css";

const MoviesPage = () => {
  const [search, setSearch] = useState("");
  const [moviesResult, setMoviesResult] = useState([]);

  const fetchMovies = (search: any) => {
    const response = axios
      .get(`http://www.omdbapi.com/?apikey=${api_key}&s=${search}`)
      .then((res) => {
        if (res.data.Response !== "True") return setMoviesResult([]);
        setMoviesResult(res.data.Search);
      });
  };

  const handleSearch = (event: any) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    if (!search) return;
    fetchMovies(search);
  }, [search]);

  return (
    <div className="search-container">
      <img className="movie-img" src={Logo} alt="movieImg" />
      <form className="search-form">
        <input
          className="input-field"
          type="search"
          placeholder="Search for a movie"
          value={search}
          onChange={handleSearch}
        />
      </form>
      <div className="results-container">
        {moviesResult.length
          ? moviesResult.slice(0, 3).map((moviesResult: any) => (
              <div key={moviesResult.imdbID} className="results-card">
                <a href={`http://www.imdb.com/title/${moviesResult.imdbID}`}>
                  <img className="results-card-image" src={moviesResult.Poster} alt={moviesResult.Title} />
                </a>
                <p className="movie-title">{moviesResult.Title}</p>
              </div>
            ))
          : "No movies found"}
      </div>
    </div>
  );
};

export default MoviesPage;