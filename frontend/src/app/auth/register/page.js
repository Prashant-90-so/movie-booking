"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

/**
 * Register Component
 * Minimal requirements: Name, Email, Password
 */
export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://movie-booking-backend-nps5.onrender.com';
      const response = await fetch(`${apiUrl}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Registration failed. Please try again.');
      }

      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => {
        window.location.href = '/auth/login';
      }, 2000);
    } catch (err) {
      console.error("Registration Error:", err);
      setError(err.message === 'Failed to fetch' 
        ? 'Unable to connect to the server. Please try again later.' 
        : err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="main-container" style={{ background: 'radial-gradient(circle at top right, #450a0a, #0f172a)' }}>
      <div className="register-card" style={cardStyle}>
        <div className="register-header" style={{ marginBottom: '2rem' }}>
          <h2 className="title" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Join Us</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Create your account to start booking</p>
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
          {success && (
            <div style={{ 
              padding: '1rem', 
              background: 'rgba(34, 197, 94, 0.1)', 
              border: '1px solid #22c55e', 
              borderRadius: '12px', 
              color: '#86efac',
              fontSize: '0.9rem',
              textAlign: 'center'
            }}>
              {success}
            </div>
          )}
          <div className="input-group" style={inputGroupStyle}>
            <label htmlFor="name" style={labelStyle}>Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

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
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p style={{ marginTop: '2rem', color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <Link href="/auth/login" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '600' }}>
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}

// Styling (Inline for simplicity in this task, but following premium design rules)
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
