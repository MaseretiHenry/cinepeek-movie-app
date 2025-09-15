import React, { useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

  const searchMovies = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
      );
      const data = await res.json();
      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setError(data.Error || "No results found");
        setMovies([]);
      }
    } catch (err) {
      setError("Failed to fetch movies");
    }
    setLoading(false);
  };

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <h1>🎬 Movie Explorer</h1>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <h2>Discover Your Next Favorite Movie</h2>
        <p>Search, explore details, and save your favorites.</p>
        <div className="search-bar">
          <input
            type="text"
            placeholder="🔍 Search for a movie..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={searchMovies}>Search</button>
        </div>
      </header>

      {/* Results */}
      <section className="movies-preview">
        <h3>Results</h3>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "tomato" }}>{error}</p>}
        <div className="movie-cards">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="movie-card">
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : ""}
                alt={movie.Title}
                style={{ width: "100%", borderRadius: "6px" }}
              />
              <h4>{movie.Title}</h4>
              <p>{movie.Year}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Movie Explorer | Built by Henry Masereti</p>
      </footer>
    </div>
  );
}

export default App;
