import './Home.css';

function Home() {
  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to myCistern IoT Platform</h1>
        <p className="subtitle">
          Monitor and manage your IoT devices in real-time
        </p>
      </div>
      
      <div className="features">
        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h3>Real-time Monitoring</h3>
          <p>Track device status and metrics in real-time</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">🔍</div>
          <h3>Smart Search</h3>
          <p>Quickly find devices with powerful search and filters</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3>Device Control</h3>
          <p>Send commands and control devices remotely</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
