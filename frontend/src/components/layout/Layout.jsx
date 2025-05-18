import { Link } from 'react-router-dom';

function Layout({ children }) {
  return (
    <div>
      <header>
        <nav>
          <Link to="/">Home</Link> | <Link to="/rooms">Rooms</Link> | <Link to="/guests">Guests</Link>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}

export default Layout;
