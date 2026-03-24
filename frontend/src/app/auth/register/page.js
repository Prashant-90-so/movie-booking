"use client";
import React, { useState } from 'react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Connect to backend here later
    alert('Registration submitted! (Backend connection pending)');
  };

  return (
    <main className="main-container">
      <div className="hero" style={{ width: "100%", maxWidth: "400px", padding: "2rem", background: "rgba(255,255,255,0.05)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>
        <h2 className="title" style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>Create Account</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>Sign up for a new account</p>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", textAlign: "left" }}>
          <div>
            <label style={{ color: "var(--text-muted)", fontSize: "0.9rem", display: "block", marginBottom: "0.3rem" }}>Full Name</label>
            <input 
              type="text" 
              value={name} onChange={(e) => setName(e.target.value)} required
              style={{ width: "100%", padding: "0.8rem", borderRadius: "8px", border: "1px solid var(--text-muted)", background: "transparent", color: "var(--text-main)", outline: "none" }}
            />
          </div>
          <div>
            <label style={{ color: "var(--text-muted)", fontSize: "0.9rem", display: "block", marginBottom: "0.3rem" }}>Email</label>
            <input 
              type="email" 
              value={email} onChange={(e) => setEmail(e.target.value)} required
              style={{ width: "100%", padding: "0.8rem", borderRadius: "8px", border: "1px solid var(--text-muted)", background: "transparent", color: "var(--text-main)", outline: "none" }}
            />
          </div>
          <div>
            <label style={{ color: "var(--text-muted)", fontSize: "0.9rem", display: "block", marginBottom: "0.3rem" }}>Password</label>
            <input 
              type="password" 
              value={password} onChange={(e) => setPassword(e.target.value)} required
              style={{ width: "100%", padding: "0.8rem", borderRadius: "8px", border: "1px solid var(--text-muted)", background: "transparent", color: "var(--text-main)", outline: "none" }}
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: "1rem", cursor: "pointer" }}>Register</button>
        </form>
        <p style={{ marginTop: "1.5rem", color: "var(--text-muted)" }}>
          Already have an account? <a href="/auth/login" style={{ color: "var(--primary)", textDecoration: "none", fontWeight: "600" }}>Sign in</a>
        </p>
      </div>
    </main>
  );
}
