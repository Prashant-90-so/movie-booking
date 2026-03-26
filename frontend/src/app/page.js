'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Check login status
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    setIsLoggedIn(!!token);

    // Navbar scroll effect
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Fetch movies and theaters
    const fetchData = async () => {
      try {
        const [resMovies, resTheaters] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/movies/`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/theaters/`)
        ]);
        
        if (resMovies.ok) {
          setMovies(await resMovies.json());
        }
        if (resTheaters.ok) {
          setTheaters(await resTheaters.json());
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // For visual appeal if movies are empty during development
  const placeholderMovies = [
    { id: '1', title: 'Inception', genre: 'Sci-Fi', rating: 9.3, poster_url: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg', description: 'A thief who steals corporate secrets through the use of dream-sharing technology.' },
    { id: '2', title: 'The Dark Knight', genre: 'Action', rating: 9.0, poster_url: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg' },
    { id: '3', title: 'Interstellar', genre: 'Sci-Fi', rating: 8.6, poster_url: 'https://image.tmdb.org/t/p/w500/gEU2QlsUUHXjNpeXvdCWAOywDJe.jpg' },
    { id: '4', title: 'Avatar', genre: 'Adventure', rating: 7.8, poster_url: 'https://image.tmdb.org/t/p/w500/jRXYjXNqtl1wTz31YpeTEnRtxA8.jpg' },
  ];

  const placeholderTheaters = [
    { id: '1', name: 'IMAX Orion Mall', location: 'Rajajinagar, Bengaluru', features: 'IMAX, Dolby Atmos, 4K Laser', image_url: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' },
    { id: '2', name: 'PVR Nexus', location: 'Koramangala, Bengaluru', features: 'Recliners, Dolby Atmos, Dine-in', image_url: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' },
    { id: '3', name: 'Cinepolis', location: 'Bannerghatta Road', features: '3D, Dolby 7.1', image_url: 'https://images.unsplash.com/photo-1595769816263-9b910be24d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' }
  ];

  const displayMovies = movies.length > 0 ? movies : placeholderMovies;
  const displayTheaters = theaters.length > 0 ? theaters : placeholderTheaters;
  const featuredMovie = displayMovies.find(m => m.rating >= 9.0) || displayMovies[0];

  return (
    <main className="home-layout">
      {/* Navbar */}
      <nav className="nav-container" style={{ background: scrolled ? 'rgba(2, 6, 23, 0.95)' : 'transparent', boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.5)' : 'none' }}>
        <Link href="/" className="nav-logo">
          KARNATAKA<span className="text-gradient">BOOKING</span>
        </Link>
        <ul className="nav-links">
          <li><Link href="/" className="nav-link active">Home</Link></li>
          <li><Link href="/movies" className="nav-link">Movies</Link></li>
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
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Link href="/auth/login" className="nav-link">Sign In</Link>
              <Link href="/auth/register" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>
                Join Now
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      {featuredMovie && (
        <section 
          className="home-hero animate-on-load delay-1" 
          style={{ backgroundImage: `url(${featuredMovie.poster_url})` }}
        >
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <span className="featured-tag">🔥 Trending This Week</span>
            <h1 className="title text-gradient">{featuredMovie.title}</h1>
            <p className="subtitle">
              {featuredMovie.description || "Experience cinematic brilliance with our featured movie of the week. Book your premium seats now and dive into the ultimate entertainment journey."}
            </p>
            <div className="button-group">
              <Link href={`/movie/${featuredMovie.id}`} className="btn btn-primary">
                Book Tickets
              </Link>
              <button className="btn btn-secondary">
                View Trailer
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Search Bar */}
      <div className="search-container animate-on-load delay-2">
        <div className="search-box">
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search for movies, theaters, or genres..."
          />
          <button className="search-btn">Search</button>
        </div>
      </div>

      {/* Movies Section */}
      <section className="content-section animate-on-load delay-3">
        <h2 className="section-title">Now Showing</h2>
        {loading && movies.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <div style={{ display: 'inline-block', width: '50px', height: '50px', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
          </div>
        ) : (
          <div className="movie-grid">
            {displayMovies.map((movie, index) => (
              <div key={movie.id} className="movie-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="poster-wrapper">
                  <img src={movie.poster_url} alt={movie.title} className="poster-img" />
                </div>
                <div className="movie-info">
                  <h3 className="movie-title">{movie.title}</h3>
                  <div className="movie-meta">
                    <span>{movie.genre}</span>
                    <span className="rating">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#fbbf24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                      {movie.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Theaters Section */}
      <section className="content-section">
        <h2 className="section-title">Premium Experiences</h2>
        {loading && theaters.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}>Loading premium theaters...</div>
        ) : (
          <div className="theater-grid">
            {displayTheaters.map(theater => (
              <div key={theater.id} className="theater-card">
                <div className="theater-img-wrapper">
                  <img src={theater.image_url} alt={theater.name} className="theater-img" />
                  <div className="theater-img-overlay"></div>
                </div>
                <div className="theater-info">
                  <h3 className="theater-title">{theater.name}</h3>
                  <p className="theater-location">📍 {theater.location}</p>
                  <div className="theater-features">
                    {theater.features.split(', ').map(f => (
                      <span key={f} className="feature-pill">{f}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="footer">
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '3rem', position: 'relative', zIndex: 10 }}>
          <div style={{ flex: '1', minWidth: '250px' }}>
            <Link href="/" className="nav-logo" style={{ marginBottom: '1.5rem', display: 'block' }}>
              KARNATAKA<span className="text-gradient">BOOKING</span>
            </Link>
            <p style={{ color: 'var(--text-muted)', maxWidth: '300px', lineHeight: '1.6' }}>
              The most luxurious destination for movie tickets, exclusive premieres, and unparalleled cinematic experiences.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '5rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h4 style={{ color: 'white', letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.9rem' }}>Experience</h4>
              <Link href="#" className="nav-link">Now Showing</Link>
              <Link href="#" className="nav-link">Coming Soon</Link>
              <Link href="#" className="nav-link">IMAX & Premium</Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h4 style={{ color: 'white', letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.9rem' }}>Support</h4>
              <Link href="#" className="nav-link">Help Center</Link>
              <Link href="#" className="nav-link">Privacy Policy</Link>
              <Link href="#" className="nav-link">Contact Us</Link>
            </div>
          </div>
        </div>
        <div style={{ marginTop: '5rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', position: 'relative', zIndex: 10 }}>
          &copy; 2026 Karnataka Booking. All rights reserved. Designed with precision.
        </div>
      </footer>
    </main>
  );
}
