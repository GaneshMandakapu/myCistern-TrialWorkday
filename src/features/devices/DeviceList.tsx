import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, Mic } from 'lucide-react';
import { getDevices } from '../../api/client';
import type { Device } from '../../api/client';
import LoadingSpinner from '../../shared/components/LoadingSpinner';
import ErrorDisplay from '../../shared/components/ErrorDisplay';
import './DeviceList.css';

function DeviceList() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Initialize state from URL params
  const urlQuery = searchParams.get('q') || '';
  const urlPage = Number(searchParams.get('page')) || 1;
  
  const [searchQuery, setSearchQuery] = useState(urlQuery);
  const [currentPage, setCurrentPage] = useState(urlPage);
  const [debouncedQuery, setDebouncedQuery] = useState(urlQuery);
  const [isListening, setIsListening] = useState(false);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      // Only reset to page 1 if the query actually changed
      if (debouncedQuery !== searchQuery) {
        setCurrentPage(1);
      }
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, debouncedQuery]);

  // Update URL when search or page changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedQuery) params.set('q', debouncedQuery);
    if (currentPage > 1) params.set('page', currentPage.toString());
    setSearchParams(params, { replace: true });
  }, [debouncedQuery, currentPage, setSearchParams]);

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
    
    if (diffMins < 1) return t('time.justNow');
    if (diffMins < 60) return t('time.minutesAgo', { count: diffMins });
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return t('time.hoursAgo', { count: diffHours });
    
    const diffDays = Math.floor(diffHours / 24);
    return t('time.daysAgo', { count: diffDays });
  };

  return (
    <div className="device-list">
      <div className="page-header">
        <h1>{t('devices.title')}</h1>
        <p className="page-description">
          {t('devices.description')}
        </p>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <form onSubmit={(e) => e.preventDefault()} className="search-form">
          <div className="search-input-wrapper">
            <input
              type="text"
              name="search"
              placeholder={t('devices.search')}
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
          aria-label={t('devices.voiceSearch')}
          onClick={handleVoiceSearch}
          title={isListening ? 'Listening...' : t('devices.voiceSearch')}
        >
          <Mic className="mic-icon" size={20} />
        </button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <LoadingSpinner size="large" message={t('devices.loading')} />
      )}

      {/* Error State */}
      {isError && (
        <ErrorDisplay 
          message={error instanceof Error ? error.message : t('devices.error')} 
          onRetry={handleRetry}
        />
      )}

      {/* Devices Grid */}
      {!isLoading && !isError && devices && (
        <>
          {devices.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <h3>{t('devices.noResults')}</h3>
              <p>
                {searchQuery 
                  ? `No devices match "${searchQuery}"`
                  : 'No devices available'}
              </p>
            </div>
          ) : (
            <div className="devices-grid">
              {devices.map((device) => (
                <div 
                  key={device.id} 
                  className="device-card"
                  onClick={() => navigate(`/devices/${device.id}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      navigate(`/devices/${device.id}`);
                    }
                  }}
                >
                  <div className="device-header">
                    <h3 className="device-name">{t(`deviceName.${device.name}`, device.name)}</h3>
                    <span className={getStatusBadgeClass(device.status)}>
                      {t(`devices.${device.status}`)}
                    </span>
                  </div>
                  
                  <div className="device-info">
                    <div className="info-row">
                      <span className="info-label">{t('detail.type')}:</span>
                      <span className="info-value">{t(`deviceType.${device.type}`, device.type)}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">{t('detail.location')}:</span>
                      <span className="info-value">{t(`location.${device.location}`, device.location)}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">{t('detail.lastSeen')}:</span>
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
                {t('devices.previous')}
              </button>
              <span className="pagination-info">{t('devices.page')} {currentPage}</span>
              <button
                className="pagination-button"
                onClick={() => setCurrentPage(prev => prev + 1)}
                disabled={devices.length === 0}
              >
                {t('devices.next')}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default DeviceList;
