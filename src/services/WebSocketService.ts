// Real-time device data interface
export interface RealTimeDeviceData {
  deviceId: string;
  timestamp: Date;
  status: 'online' | 'offline';
  metrics: {
    temperature?: number;
    humidity?: number;
    pressure?: number;
    battery?: number;
    signal?: number;
    waterLevel?: number;
    flow?: number;
    energy?: number;
  };
  alerts?: Array<{
    id: string;
    type: 'warning' | 'error' | 'info';
    message: string;
    timestamp: Date;
  }>;
}

// System analytics data
export interface SystemAnalytics {
  timestamp: Date;
  totalDevices: number;
  onlineDevices: number;
  offlineDevices: number;
  totalEvents: number;
  alertCount: {
    warning: number;
    error: number;
    info: number;
  };
  systemHealth: number; // 0-100
  networkLatency: number;
  dataTransfer: {
    sent: number;
    received: number;
  };
}

// Event listeners interface
interface WebSocketEvents {
  deviceUpdate: (data: RealTimeDeviceData) => void;
  systemAnalytics: (data: SystemAnalytics) => void;
  deviceAlert: (alert: { id: string; deviceId: string; type: 'warning' | 'error' | 'info'; message: string; timestamp: Date }) => void;
  connected: () => void;
  disconnected: () => void;
  error: (error: string) => void;
}

class WebSocketService {
  private listeners: Partial<WebSocketEvents> = {};
  private reconnectAttempts = 0;
  private isConnected = false;
  private connectionTimer: NodeJS.Timeout | null = null;

  // Mock data generators for demo - matching actual device IDs
  // These IDs sync with mockData.ts and MSW handlers
  private mockDeviceIds = [
    'dev-001', 'dev-002', 'dev-003', 'dev-004', 'dev-005',
    'dev-006', 'dev-007', 'dev-008', 'dev-009', 'dev-010',
    'dev-011', 'dev-012', 'dev-013', 'dev-014', 'dev-015'
  ];

  constructor() {
    // Log platform information for debugging
    console.log('🔌 WebSocket Service initialized:', {
      platform: typeof window !== 'undefined' && (window as any).Capacitor ? 'Mobile App' : 'Web Browser',
      environment: import.meta.env.PROD ? 'Production' : 'Development',
      deviceIds: this.mockDeviceIds
    });
    
    // Auto-connect immediately for demo
    this.simulateConnection();
  }

  private simulateConnection() {
    if (this.connectionTimer) {
      clearTimeout(this.connectionTimer);
    }
    
    // Simulate very fast connection for better UX
    this.connectionTimer = setTimeout(() => {
      this.isConnected = true;
      this.listeners.connected?.();
      this.startMockDataStreaming();
      
      // Immediately generate initial data
      const initialAnalytics = this.generateMockSystemAnalytics();
      this.listeners.systemAnalytics?.(initialAnalytics);
    }, 100); // Much faster connection
  }

  private startMockDataStreaming() {
    console.log('📡 Starting real-time data streaming with device IDs:', this.mockDeviceIds.slice(0, 3) + '...');
    
    // Generate immediate data on connection
    const initialDeviceId = this.mockDeviceIds[0];
    const initialData = this.generateMockDeviceData(initialDeviceId);
    this.listeners.deviceUpdate?.(initialData);
    console.log('📱 Initial device data generated for:', initialDeviceId);

    // Simulate real-time device updates
    setInterval(() => {
      if (this.isConnected) {
        const deviceId = this.mockDeviceIds[Math.floor(Math.random() * this.mockDeviceIds.length)];
        const mockData = this.generateMockDeviceData(deviceId);
        this.listeners.deviceUpdate?.(mockData);
      }
    }, 2000);

    // Simulate system analytics updates
    setInterval(() => {
      if (this.isConnected) {
        const analyticsData = this.generateMockSystemAnalytics();
        this.listeners.systemAnalytics?.(analyticsData);
      }
    }, 5000);

    // Simulate random alerts
    setInterval(() => {
      if (this.isConnected && Math.random() < 0.3) { // 30% chance of alert
        const deviceId = this.mockDeviceIds[Math.floor(Math.random() * this.mockDeviceIds.length)];
        const alert = this.generateMockAlert(deviceId);
        this.listeners.deviceAlert?.(alert);
      }
    }, 15000);
  }

  private generateMockDeviceData(deviceId: string): RealTimeDeviceData {
    const isOnline = Math.random() > 0.1; // 90% online chance
    
    return {
      deviceId,
      timestamp: new Date(),
      status: isOnline ? 'online' : 'offline',
      metrics: isOnline ? {
        temperature: Math.round((Math.random() * 30 + 15) * 10) / 10, // 15-45°C
        humidity: Math.round((Math.random() * 40 + 30) * 10) / 10, // 30-70%
        pressure: Math.round((Math.random() * 200 + 800) * 10) / 10, // 800-1000 hPa
        battery: Math.round(Math.random() * 100), // 0-100%
        signal: Math.round(Math.random() * 100), // 0-100%
        waterLevel: Math.round((Math.random() * 80 + 20) * 10) / 10, // 20-100%
        flow: Math.round((Math.random() * 50 + 10) * 100) / 100, // 10-60 L/min
        energy: Math.round((Math.random() * 1000 + 500) * 100) / 100 // 500-1500W
      } : {}
    };
  }

  private generateMockSystemAnalytics(): SystemAnalytics {
    const totalDevices = this.mockDeviceIds.length;
    const onlineDevices = Math.floor(totalDevices * (0.8 + Math.random() * 0.2)); // 80-100% online
    
    return {
      timestamp: new Date(),
      totalDevices,
      onlineDevices,
      offlineDevices: totalDevices - onlineDevices,
      totalEvents: Math.floor(Math.random() * 1000 + 5000), // 5000-6000 events
      alertCount: {
        warning: Math.floor(Math.random() * 10),
        error: Math.floor(Math.random() * 3),
        info: Math.floor(Math.random() * 15)
      },
      systemHealth: Math.round((90 + Math.random() * 10) * 10) / 10, // 90-100%
      networkLatency: Math.round((Math.random() * 50 + 10) * 10) / 10, // 10-60ms
      dataTransfer: {
        sent: Math.round((Math.random() * 1000 + 5000) * 100) / 100, // MB
        received: Math.round((Math.random() * 2000 + 10000) * 100) / 100 // MB
      }
    };
  }

  private generateMockAlert(deviceId: string) {
    const alertTypes = ['warning', 'error', 'info'] as const;
    const alertMessages = {
      warning: ['Battery level low', 'Signal strength degraded', 'Temperature high'],
      error: ['Connection lost', 'Sensor malfunction', 'Critical failure'],
      info: ['Maintenance scheduled', 'Firmware update available', 'Configuration updated']
    };

    const type = alertTypes[Math.floor(Math.random() * alertTypes.length)];
    const messages = alertMessages[type];
    const message = messages[Math.floor(Math.random() * messages.length)];

    return {
      id: `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      deviceId,
      type,
      message,
      timestamp: new Date()
    };
  }

  // Public methods
  connect() {
    if (!this.isConnected) {
      this.reconnectAttempts++;
      console.log('🔄 WebSocket: Attempting to connect...');
      this.simulateConnection();
    } else {
      console.log('✅ WebSocket: Already connected');
    }
  }

  disconnect() {
    this.isConnected = false;
    if (this.connectionTimer) {
      clearTimeout(this.connectionTimer);
      this.connectionTimer = null;
    }
    this.listeners.disconnected?.();
    console.log('❌ WebSocket: Disconnected');
  }

  on<K extends keyof WebSocketEvents>(event: K, callback: WebSocketEvents[K]) {
    this.listeners[event] = callback as any;
  }

  off<K extends keyof WebSocketEvents>(event: K) {
    delete this.listeners[event];
  }

  emit(event: string, data: any) {
    // In real implementation, this would send data to server
    console.log(`Emitting ${event}:`, data);
  }

  isSocketConnected(): boolean {
    return this.isConnected;
  }

  getConnectionStatus(): 'connected' | 'disconnected' | 'reconnecting' {
    if (this.isConnected) return 'connected';
    if (this.reconnectAttempts > 0) return 'reconnecting';
    return 'disconnected';
  }
}

// Export singleton instance
export const webSocketService = new WebSocketService();
