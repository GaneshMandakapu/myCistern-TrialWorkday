import './DeviceList.css';

function DeviceList() {
  return (
    <div className="device-list">
      <div className="page-header">
        <h1>IoT Devices</h1>
        <p className="page-description">
          View and manage all your connected devices
        </p>
      </div>
      
      <div className="placeholder-content">
        <div className="placeholder-icon">🔌</div>
        <h2>Device List Coming Soon</h2>
        <p>This page will show all your IoT devices with search, filter, and pagination.</p>
        <div className="placeholder-features">
          <div className="placeholder-feature">✓ Search devices by name</div>
          <div className="placeholder-feature">✓ Filter by status (online/offline)</div>
          <div className="placeholder-feature">✓ Pagination for large device lists</div>
          <div className="placeholder-feature">✓ Real-time status updates</div>
        </div>
      </div>
    </div>
  );
}

export default DeviceList;
