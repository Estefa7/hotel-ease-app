import { Link } from 'react-router-dom';

function Layout({ children }) {
  return (
    <div className="container mt-4">
      {children}
    </div>
  );
}

export default Layout;
