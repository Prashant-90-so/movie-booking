export default function Home() {
  return (
    <main className="main-container">
      <div className="hero">
        <h1 className="title">Movie Booking</h1>
        <p className="subtitle">Book your favorite movies with ease</p>
        <div className="button-group">
          <a href="/auth/login" className="btn btn-primary">Sign In</a>
          <a href="/auth/register" className="btn btn-secondary">Sign Up</a>
        </div>
      </div>
    </main>
  );
}
