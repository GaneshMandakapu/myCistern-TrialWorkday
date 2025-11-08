import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, Mic, Wifi, WifiOff, Filter } from 'lucide-react';
import { getDevices, type Device } from '../../api/client';
import LoadingSpinner from '../../shared/components/LoadingSpinner';
import ErrorDisplay from '../../shared/components/ErrorDisplay';
import EmptyState from '../../shared/components/EmptyState';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useCapacitor } from '@/hooks/useCapacitor';
import { useToast } from '@/hooks/use-toast';

function DeviceList() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isNative } = useCapacitor();
  const { toast } = useToast();
  
  // Initialize state from URL params
  const urlQuery = searchParams.get('q') || '';
  const urlPage = Number(searchParams.get('page')) || 1;
  const urlStatus = searchParams.get('status') || 'all';
  
  const [searchQuery, setSearchQuery] = useState(urlQuery);
  const [currentPage, setCurrentPage] = useState(urlPage);
  const [statusFilter, setStatusFilter] = useState(urlStatus);
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

  // Update URL when search, filter or page changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedQuery) params.set('q', debouncedQuery);
    if (statusFilter !== 'all') params.set('status', statusFilter);
    if (currentPage > 1) params.set('page', currentPage.toString());
    setSearchParams(params, { replace: true });
  }, [debouncedQuery, statusFilter, currentPage, setSearchParams]);

  // Fetch devices using React Query
  const { data: allDevices, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['devices', debouncedQuery, currentPage],
    queryFn: () => getDevices(debouncedQuery, currentPage),
  });

  // Filter devices based on status
  const devices = allDevices?.filter((device: Device) => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'online') return device.status === 'online';
    if (statusFilter === 'offline') return device.status === 'offline';
    return true;
  }) || [];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleVoiceSearch = () => {
    // Check if we're in a native mobile app
    if (isNative) {
      toast({
        title: t('devices.voiceSearch'),
        description: "Voice search is not available in the mobile app. Please use the text search instead.",
        variant: "destructive",
      });
      return;
    }

    // Check if browser supports speech recognition
    interface WindowWithSpeechRecognition extends Window {
      SpeechRecognition?: unknown;
      webkitSpeechRecognition?: unknown;
    }
    
    const windowWithSpeech = window as WindowWithSpeechRecognition;
    const SpeechRecognitionClass = windowWithSpeech.SpeechRecognition || windowWithSpeech.webkitSpeechRecognition;
    
    if (!SpeechRecognitionClass) {
      toast({
        title: "Voice Search Unavailable",
        description: "Voice search is not supported in your browser. Please try Chrome, Edge, or Safari.",
        variant: "destructive",
      });
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const recognition = new (SpeechRecognitionClass as any)();
    recognition.lang = i18n.language === 'de' ? 'de-DE' : 'en-US'; // Use current language
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      toast({
        title: t('devices.voiceSearch'),
        description: "Listening... Please speak your search query.",
      });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      setIsListening(false);
      toast({
        title: "Search Query Recognized",
        description: `Searching for: "${transcript}"`,
      });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      if (event.error === 'not-allowed') {
        toast({
          title: "Microphone Access Denied",
          description: "Please enable microphone permissions in your browser settings.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Voice Recognition Error",
          description: `Error: ${event.error}. Please try again.`,
          variant: "destructive",
        });
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
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
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t('devices.title')}</h1>
        <p className="text-muted-foreground text-lg">
          {t('devices.description')}
        </p>
      </div>

      {/* Search Bar */}
      <Card className="p-6">
        <div className="flex gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder={t('devices.search')}
              value={searchQuery}
              onChange={handleSearch}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            size="default"
            onClick={handleVoiceSearch}
            disabled={isListening}
            className={cn("gap-2", isListening && "animate-pulse")}
          >
            <Mic size={16} />
            {t('devices.voiceSearch')}
          </Button>
        </div>
        
        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">{t('devices.filter')}:</span>
          <div className="flex gap-2">
            <Button
              variant={statusFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleStatusFilter('all')}
              className="gap-1"
            >
              {t('devices.all')}
            </Button>
            <Button
              variant={statusFilter === 'online' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleStatusFilter('online')}
              className="gap-1"
            >
              <Wifi className="h-3 w-3" />
              {t('devices.online')}
            </Button>
            <Button
              variant={statusFilter === 'offline' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleStatusFilter('offline')}
              className="gap-1"
            >
              <WifiOff className="h-3 w-3" />
              {t('devices.offline')}
            </Button>
          </div>
        </div>
      </Card>

      {/* Device Count Display */}
      {!isLoading && !isError && devices && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            {t('devices.showingResults', { 
              count: devices.length, 
              total: allDevices?.length || 0,
              filter: statusFilter === 'all' ? t('devices.all').toLowerCase() : t(`devices.${statusFilter}`)
            })}
          </span>
          {statusFilter !== 'all' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleStatusFilter('all')}
              className="text-xs"
            >
              {t('devices.clearFilter')}
            </Button>
          )}
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <LoadingSpinner size="large" message={t('devices.loading')} />
      )}

      {/* Error State */}
      {isError && (
        <ErrorDisplay 
          message={error instanceof Error ? error.message : t('error.network.message')} 
          onRetry={refetch}
          variant="network"
          title={t('error.network.title')}
          showRetryCount={true}
          maxRetries={3}
          size="large"
        />
      )}

      {/* Devices Grid */}
      {!isLoading && !isError && devices && (
        <>
          {devices.length === 0 ? (
            <EmptyState
              variant={searchQuery ? 'search' : 'default'}
              title={searchQuery ? t('empty.search.title') : t('devices.noResults')}
              message={searchQuery 
                ? t('empty.search.message') 
                : t('empty.default.message')
              }
              actionLabel={searchQuery ? t('empty.action.secondary') : t('empty.action.primary')}
              onAction={searchQuery 
                ? () => { setSearchQuery(''); setDebouncedQuery(''); }
                : () => refetch()
              }
              size="large"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {devices!.map((device: Device) => (
                <Card 
                  key={device.id}
                  className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105"
                  onClick={() => navigate(`/devices/${device.id}`)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg leading-none">
                          {t(`deviceName.${device.name}`, device.name) as string}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {t(`deviceType.${device.type}`, device.type) as string}
                        </CardDescription>
                      </div>
                      <Badge 
                        variant={device.status === 'online' ? 'success' : 'destructive'}
                        className="flex items-center gap-1"
                      >
                        {device.status === 'online' ? 
                          <Wifi className="h-3 w-3" /> : 
                          <WifiOff className="h-3 w-3" />
                        }
                        {t(`devices.${device.status}`)}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>📍</span>
                      <span>{t(`location.${device.location}`, device.location) as string}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>⏰</span>
                      <span>{t('detail.lastSeen')}: {formatLastSeen(device.lastSeen)}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination */}
          {(currentPage > 1 || devices!.length > 0) && (
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  {t('devices.previous')}
                </Button>
                <span className="text-sm font-medium">
                  {t('devices.page')} {currentPage}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  disabled={devices!.length === 0}
                >
                  {t('devices.next')}
                </Button>
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  );
}

export default DeviceList;
