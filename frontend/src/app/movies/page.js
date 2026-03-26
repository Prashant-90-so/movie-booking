'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');

  useEffect(() => {
    // Check login status with window guard
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    setIsLoggedIn(!!token);

    // Fetch movies from Render backend directly
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (search) queryParams.append("q", search);
        if (genre) queryParams.append("genre", genre);
        
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://movie-booking-backend-nps5.onrender.com';
        const response = await fetch(`${apiUrl}/movies/?${queryParams.toString()}`);
        if (response.ok) {
          const data = await response.json();
          setMovies(data);
        }
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchMovies();
    }, 300); // debounce search
    
    return () => clearTimeout(timeoutId);
  }, [search, genre]);

  return (
    <main className="home-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar */}
      <nav className="nav-container" style={{ background: 'var(--glass-bg)' }}>
        <div className="nav-logo" style={{ fontSize: '1.8rem', fontWeight: '900', letterSpacing: '-0.05em' }}>
          KARNATAKA<span style={{ color: 'var(--primary)' }}>BOOKING</span>
        </div>
        <ul className="nav-links">
          <li><Link href="/" className="nav-link">Home</Link></li>
          <li><Link href="/movies" className="nav-link active">Movies</Link></li>
          <li><Link href="/theaters" className="nav-link">Theaters</Link></li>
        </ul>
        <div className="nav-auth">
          {isLoggedIn ? (
            <button 
              onClick={() => { localStorage.removeItem('token'); window.location.reload(); }}
              className="btn btn-secondary"
              style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}
            >
              Sign Out
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link href="/auth/login" className="nav-link" style={{ alignSelf: 'center' }}>Sign In</Link>
              <Link href="/auth/register" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>
                Join Now
              </Link>
            </div>
          )}
        </div>
      </nav>

      <div style={{ flex: 1, padding: '8rem 10% 4rem' }}>
        <div style={{ marginBottom: '3rem' }}>
          <h1 className="title" style={{ fontSize: '3rem', textAlign: 'left', marginBottom: '1rem' }}>All Movies</h1>
          <p className="subtitle" style={{ textAlign: 'left', marginBottom: '1.5rem', maxWidth: '600px' }}>
            Browse our complete collection of cinematic masterpieces. From epic historical dramas to mind-bending sci-fi, find your next adventure here.
          </p>

          <div className="input-group">
            <input 
              type="text" 
              className="form-input" 
              placeholder="Search by title or description..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select 
              className="form-select" 
              value={genre} 
              onChange={(e) => setGenre(e.target.value)}
            >
              <option value="">All Genres</option>
              <option value="Action">Action</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Drama">Drama</option>
              <option value="Horror">Horror</option>
              <option value="Comedy">Comedy</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', fontSize: '1.5rem', color: 'var(--text-muted)' }}>
            Loading cinematic experiences...
          </div>
        ) : (
          <div className="movie-grid">
            {movies.map(movie => (
              <div key={movie.id} className="movie-card">
                <div className="poster-wrapper">
                  <img src={movie.poster_url} alt={movie.title} className="poster-img" />
                </div>
                <div className="movie-info">
                  <h3 className="movie-title">{movie.title}</h3>
                  <div className="movie-meta">
                    <span>{movie.genre}</span>
                    <span className="rating">★ {movie.rating}</span>
                  </div>
                </div>
                {/* Book Now Overlay Button */}
                <div style={{ padding: '0 1.5rem 1.5rem' }}>
                  <Link href={`/movie/${movie.id}`} className="btn btn-primary" style={{ display: 'block', textAlign: 'center', width: '100%', padding: '0.8rem' }}>
                    Book Tickets
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="footer" style={{ position: 'relative', padding: '4rem 10%', background: 'rgba(0,0,0,0.3)', marginTop: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <div className="nav-logo" style={{ marginBottom: '1rem' }}>Karnataka Booking</div>
            <p style={{ color: 'var(--text-muted)', maxWidth: '300px' }}>Your premium destination for movie tickets and cinematic experiences.</p>
          </div>
          <div style={{ display: 'flex', gap: '4rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <h4 style={{ marginBottom: '0.5rem' }}>Movies</h4>
              <Link href="/movies" className="nav-link">All Movies</Link>
              <Link href="/" className="nav-link">Now Showing</Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <h4 style={{ marginBottom: '0.5rem' }}>Support</h4>
              <Link href="#" className="nav-link">Help Center</Link>
              <Link href="#" className="nav-link">Contact Us</Link>
            </div>
          </div>
        </div>
        <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', color: 'var(--text-muted)' }}>
          &copy; 2026 Karnataka Booking. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
