"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

/**
 * Login Component
 * Matches the register page design
 */
export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://movie-booking-backend-nps5.onrender.com';
      // Used Render backend fallback directly if NEXT_PUBLIC_API_URL is missing
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Login failed Check your credentials.');
      }

      // Store token
      localStorage.setItem('token', data.access_token);
      
      // Use Next.js router for seamless client-side navigation
      router.push('/');
      router.refresh();
    } catch (err) {
      console.error("Login Error:", err);
      // Simplify error message for user
      setError(err.message === 'Failed to fetch' 
        ? 'Unable to connect to the server. Please try again later.' 
        : err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="main-container" style={{ background: 'radial-gradient(circle at top left, #450a0a, #0f172a)' }}>
      <div className="login-card" style={cardStyle}>
        <div className="login-header" style={{ marginBottom: '2rem' }}>
          <h2 className="title" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Welcome Back</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Sign in to manage your bookings</p>
        </div>

        <form onSubmit={handleSubmit} style={formStyle}>
          {error && (
            <div style={{ 
              padding: '1rem', 
              background: 'rgba(239, 68, 68, 0.1)', 
              border: '1px solid var(--primary)', 
              borderRadius: '12px', 
              color: '#fca5a5',
              fontSize: '0.9rem',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}
          <div className="input-group" style={inputGroupStyle}>
            <label htmlFor="email" style={labelStyle}>Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div className="input-group" style={inputGroupStyle}>
            <label htmlFor="password" style={labelStyle}>Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={isLoading}
            style={{ 
              width: '100%', 
              marginTop: '1.5rem', 
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.7 : 1
            }}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p style={{ marginTop: '2rem', color: 'var(--text-muted)' }}>
          Don't have an account?{' '}
          <Link href="/auth/register" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '600' }}>
            Register now
          </Link>
        </p>
      </div>
    </main>
  );
}

// Styling (Consistent with Register Page)
const cardStyle = {
  width: '100%',
  maxWidth: '450px',
  padding: '3rem 2.5rem',
  background: 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  borderRadius: '24px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
  animation: 'fadeIn 0.8s ease-out'
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem',
  textAlign: 'left'
};

const inputGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem'
};

const labelStyle = {
  fontSize: '0.9rem',
  fontWeight: '500',
  color: 'var(--text-muted)',
  marginLeft: '0.25rem'
};

const inputStyle = {
  width: '100%',
  padding: '1rem 1.25rem',
  borderRadius: '12px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  background: 'rgba(255, 255, 255, 0.05)',
  color: 'var(--text-main)',
  fontSize: '1rem',
  outline: 'none',
  transition: 'all 0.3s ease'
};
