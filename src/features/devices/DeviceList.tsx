import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Mic } from 'lucide-react';
import { getDevices } from '../../api/client';
import type { Device } from '../../api/client';
import LoadingSpinner from '../../shared/components/LoadingSpinner';
import ErrorDisplay from '../../shared/components/ErrorDisplay';
import './DeviceList.css';

function DeviceList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isListening, setIsListening] = useState(false);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setCurrentPage(1); // Reset to first page on new search
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch devices using React Query
  const { data: devices, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['devices', debouncedQuery, currentPage],
    queryFn: () => getDevices(debouncedQuery, currentPage),
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleRetry = () => {
    refetch();
  };

  const handleVoiceSearch = () => {
    // Check if browser supports speech recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert('Voice search is not supported in your browser. Please try Chrome, Edge, or Safari.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      if (event.error === 'not-allowed') {
        alert('Microphone access denied. Please enable microphone permissions in your browser settings.');
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const getStatusBadgeClass = (status: Device['status']) => {
    return status === 'online' ? 'status-badge online' : 'status-badge offline';
  };

  const formatLastSeen = (lastSeen: string) => {
    const date = new Date(lastSeen);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  return (
    <div className="device-list">
      <div className="page-header">
        <h1>IoT Devices</h1>
        <p className="page-description">
          View and manage all your connected devices
        </p>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <form onSubmit={(e) => e.preventDefault()} className="search-form">
          <div className="search-input-wrapper">
            <input
              type="text"
              name="search"
              placeholder="Search devices by name, type, or location..."
              value={searchQuery}
              onChange={handleSearch}
              className="search-input"
            />
          </div>
          <button
            type="submit"
            className="search-button"
            aria-label="Search"
          >
            <Search className="search-icon" size={20} />
          </button>
        </form>
        
        <button
          className={`voice-button ${isListening ? 'listening' : ''}`}
          aria-label="Search with voice"
          onClick={handleVoiceSearch}
          title={isListening ? 'Listening...' : 'Voice search'}
        >
          <Mic className="mic-icon" size={20} />
        </button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <LoadingSpinner size="large" message="Loading devices..." />
      )}

      {/* Error State */}
      {isError && (
        <ErrorDisplay 
          message={error instanceof Error ? error.message : 'Failed to load devices'} 
          onRetry={handleRetry}
        />
      )}

      {/* Devices Grid */}
      {!isLoading && !isError && devices && (
        <>
          {devices.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <h3>No devices found</h3>
              <p>
                {searchQuery 
                  ? `No devices match "${searchQuery}"`
                  : 'No devices available'}
              </p>
            </div>
          ) : (
            <div className="devices-grid">
              {devices.map((device) => (
                <div key={device.id} className="device-card">
                  <div className="device-header">
                    <h3 className="device-name">{device.name}</h3>
                    <span className={getStatusBadgeClass(device.status)}>
                      {device.status}
                    </span>
                  </div>
                  
                  <div className="device-info">
                    <div className="info-row">
                      <span className="info-label">Type:</span>
                      <span className="info-value">{device.type}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Location:</span>
                      <span className="info-value">{device.location}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Last Seen:</span>
                      <span className="info-value">{formatLastSeen(device.lastSeen)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination - Always show when not on first page or when there are devices */}
          {(currentPage > 1 || devices.length > 0) && (
            <div className="pagination">
              <button
                className="pagination-button"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="pagination-info">Page {currentPage}</span>
              <button
                className="pagination-button"
                onClick={() => setCurrentPage(prev => prev + 1)}
                disabled={devices.length === 0}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default DeviceList;
