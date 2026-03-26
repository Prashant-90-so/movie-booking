'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function TheatersPage() {
  const [theaters, setTheaters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check login status with window guard
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    setIsLoggedIn(!!token);

    // Fetch theaters from Render backend directly
    const fetchTheaters = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://movie-booking-backend-nps5.onrender.com';
        const response = await fetch(`${apiUrl}/theaters/`);
        if (response.ok) {
          const data = await response.json();
          setTheaters(data);
        }
      } catch (error) {
        console.error("Failed to fetch theaters:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTheaters();
  }, []);

  return (
    <main className="home-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar */}
      <nav className="nav-container" style={{ background: 'var(--glass-bg)' }}>
        <div className="nav-logo" style={{ fontSize: '1.8rem', fontWeight: '900', letterSpacing: '-0.05em' }}>
          KARNATAKA<span style={{ color: 'var(--primary)' }}>BOOKING</span>
        </div>
        <ul className="nav-links">
          <li><Link href="/" className="nav-link">Home</Link></li>
          <li><Link href="/movies" className="nav-link">Movies</Link></li>
          <li><Link href="/theaters" className="nav-link active">Theaters</Link></li>
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
          <h1 className="title" style={{ fontSize: '3rem', textAlign: 'left', marginBottom: '1rem' }}>Our Premium Theaters</h1>
          <p className="subtitle" style={{ textAlign: 'left', marginBottom: '0', maxWidth: '600px' }}>
            Experience cinema like never before. From immersive IMAX screens to luxurious VIP lounges, find the perfect venue for your next movie night.
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', fontSize: '1.5rem', color: 'var(--text-muted)' }}>
            Loading premium locations...
          </div>
        ) : (
          <div className="theater-grid">
            {theaters.map(theater => (
              <div key={theater.id} className="theater-card" style={{ cursor: 'default' }}>
                <div className="theater-img-wrapper" style={{ height: '250px' }}>
                  <img src={theater.image_url} alt={theater.name} className="theater-img" />
                </div>
                <div className="theater-info">
                  <h3 className="theater-title">{theater.name}</h3>
                  <p className="theater-location" style={{ fontSize: '1.05rem', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
                    <span style={{ color: 'var(--primary)' }}>📍</span> {theater.location}
                  </p>
                  
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', marginTop: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', fontSize: '0.9rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Capacity:</span>
                      <span style={{ fontWeight: '600', color: 'white' }}>{theater.capacity} Seats</span>
                    </div>
                    <p className="theater-features" style={{ padding: '0', border: 'none', margin: '0' }}>
                      {theater.features.split(', ').map((feat, idx) => (
                        <span key={idx} style={{ display: 'inline-block', background: 'rgba(239, 68, 68, 0.15)', color: '#fca5a5', padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', marginRight: '0.5rem', marginBottom: '0.5rem', fontWeight: '500' }}>
                          {feat}
                        </span>
                      ))}
                    </p>
                  </div>
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
