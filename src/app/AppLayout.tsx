import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './AppLayout.css';

function AppLayout() {
  return (
    <div className="app-layout">
      <header className="app-header">
        <div className="header-content">
          <h1 className="logo">myCistern IoT</h1>
          <nav className="nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/devices" className="nav-link">Devices</Link>
          </nav>
        </div>
      </header>
      
      <main className="app-main">
        <Outlet />
      </main>
      
      <footer className="app-footer">
        <p>&copy; 2025 myCistern. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default AppLayout;
