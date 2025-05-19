import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './auth/AuthProvider';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // clears user and token from context + localStorage
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <div className="container-fluid">
        {/* Brand */}
        <Link to="/" className="navbar-brand">HotelEase</Link>

        {/* Mobile toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation links */}
        <div className="collapse navbar-collapse justify-content-between" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/rooms" className="nav-link">Rooms</Link>
            </li>
            <li className="nav-item">
              <Link to="/guests" className="nav-link">Guests</Link>
            </li>
          </ul>

          {/* Right aligned login/logout */}
          <div className="d-flex">
            {user ? (
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <Link to="/login" className="btn btn-outline-primary">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
