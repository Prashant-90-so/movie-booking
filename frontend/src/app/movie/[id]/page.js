'use client';
import React from 'react';
import Link from 'next/link';

export default function MovieDetails({ params }) {
  const { id } = React.use(params);
  
  return (
    <main className="main-container" style={{ padding: '10rem 10%', textAlign: 'center' }}>
      <h1 className="title" style={{ fontSize: '3rem', marginBottom: '2rem' }}>Movie Details</h1>
      <p className="subtitle">Details for movie ID: {id} are coming soon!</p>
      <div style={{ marginTop: '3rem' }}>
        <Link href="/" className="btn btn-primary">Back to Home</Link>
      </div>
    </main>
  );
}
