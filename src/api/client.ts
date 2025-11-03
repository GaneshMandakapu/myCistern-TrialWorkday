// API Client configuration
// Switch between mock and real API using environment variable

const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API !== 'false';

export interface Device {
  id: string;
  name: string;
  status: 'online' | 'offline';
  type: string;
  location: string;
  lastSeen: string;
}

export interface DeviceDetails extends Device {
  firmwareVersion: string;
  ipAddress: string;
  macAddress: string;
  uptime: number;
  description: string;
}

export interface DeviceMetrics {
  deviceId: string;
  timestamp: string;
  temperature?: number;
  humidity?: number;
  pressure?: number;
  batteryLevel?: number;
  signalStrength?: number;
}

export interface DeviceCommand {
  deviceId: string;
  command: string;
  parameters?: Record<string, unknown>;
}

export interface CommandResponse {
  success: boolean;
  message: string;
  commandId: string;
}

// Utility function to simulate network delay
const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Mock data
const mockDevices: Device[] = [
  {
    id: 'dev-001',
    name: 'Water Tank Sensor A1',
    status: 'online',
    type: 'Water Level Sensor',
    location: 'Building A - Roof',
    lastSeen: new Date().toISOString(),
  },
  {
    id: 'dev-002',
    name: 'Water Tank Sensor B2',
    status: 'online',
    type: 'Water Level Sensor',
    location: 'Building B - Roof',
    lastSeen: new Date(Date.now() - 300000).toISOString(),
  },
  {
    id: 'dev-003',
    name: 'Pump Controller 1',
    status: 'offline',
    type: 'Pump Controller',
    location: 'Building A - Basement',
    lastSeen: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: 'dev-004',
    name: 'Flow Meter X1',
    status: 'online',
    type: 'Flow Meter',
    location: 'Building C - Ground Floor',
    lastSeen: new Date().toISOString(),
  },
];

const mockDeviceDetails: Record<string, DeviceDetails> = {
  'dev-001': {
    ...mockDevices[0],
    firmwareVersion: 'v2.1.3',
    ipAddress: '192.168.1.101',
    macAddress: '00:1B:44:11:3A:B7',
    uptime: 864000,
    description: 'Primary water tank level sensor for Building A',
  },
  'dev-002': {
    ...mockDevices[1],
    firmwareVersion: 'v2.1.3',
    ipAddress: '192.168.1.102',
    macAddress: '00:1B:44:11:3A:B8',
    uptime: 432000,
    description: 'Primary water tank level sensor for Building B',
  },
  'dev-003': {
    ...mockDevices[2],
    firmwareVersion: 'v1.5.2',
    ipAddress: '192.168.1.103',
    macAddress: '00:1B:44:11:3A:B9',
    uptime: 0,
    description: 'Main pump controller - currently offline',
  },
  'dev-004': {
    ...mockDevices[3],
    firmwareVersion: 'v2.0.1',
    ipAddress: '192.168.1.104',
    macAddress: '00:1B:44:11:3A:BA',
    uptime: 1296000,
    description: 'Water flow measurement device',
  },
};

// Mock API implementations
const mockGetDevices = async (query?: string, page = 1): Promise<Device[]> => {
  await delay(500);
  
  let filteredDevices = [...mockDevices];
  
  if (query) {
    const lowerQuery = query.toLowerCase();
    filteredDevices = filteredDevices.filter(
      device =>
        device.name.toLowerCase().includes(lowerQuery) ||
        device.location.toLowerCase().includes(lowerQuery) ||
        device.type.toLowerCase().includes(lowerQuery)
    );
  }
  
  // Simple pagination (5 items per page)
  const start = (page - 1) * 5;
  const end = start + 5;
  
  return filteredDevices.slice(start, end);
};

const mockGetDeviceDetails = async (deviceId: string): Promise<DeviceDetails> => {
  await delay(400);
  
  const details = mockDeviceDetails[deviceId];
  if (!details) {
    throw new Error(`Device ${deviceId} not found`);
  }
  
  return details;
};

const mockGetDeviceMetrics = async (deviceId: string): Promise<DeviceMetrics[]> => {
  await delay(600);
  
  // Generate mock metrics for the last 10 readings
  const metrics: DeviceMetrics[] = [];
  for (let i = 9; i >= 0; i--) {
    metrics.push({
      deviceId,
      timestamp: new Date(Date.now() - i * 300000).toISOString(),
      temperature: 20 + Math.random() * 10,
      humidity: 40 + Math.random() * 30,
      pressure: 1000 + Math.random() * 50,
      batteryLevel: 80 + Math.random() * 20,
      signalStrength: -60 + Math.random() * 20,
    });
  }
  
  return metrics;
};

const mockPostDeviceCommand = async (command: DeviceCommand): Promise<CommandResponse> => {
  await delay(800);
  
  const device = mockDevices.find(d => d.id === command.deviceId);
  if (!device) {
    throw new Error(`Device ${command.deviceId} not found`);
  }
  
  if (device.status === 'offline') {
    return {
      success: false,
      message: `Device ${device.name} is offline and cannot process commands`,
      commandId: `cmd-${Date.now()}`,
    };
  }
  
  return {
    success: true,
    message: `Command "${command.command}" sent to ${device.name}`,
    commandId: `cmd-${Date.now()}`,
  };
};

// Real API implementations (placeholder for future)
const realGetDevices = async (query?: string, page = 1): Promise<Device[]> => {
  const response = await fetch(`/api/devices?query=${query || ''}&page=${page}`);
  if (!response.ok) throw new Error('Failed to fetch devices');
  return response.json();
};

const realGetDeviceDetails = async (deviceId: string): Promise<DeviceDetails> => {
  const response = await fetch(`/api/devices/${deviceId}`);
  if (!response.ok) throw new Error('Failed to fetch device details');
  return response.json();
};

const realGetDeviceMetrics = async (deviceId: string): Promise<DeviceMetrics[]> => {
  const response = await fetch(`/api/devices/${deviceId}/metrics`);
  if (!response.ok) throw new Error('Failed to fetch device metrics');
  return response.json();
};

const realPostDeviceCommand = async (command: DeviceCommand): Promise<CommandResponse> => {
  const response = await fetch(`/api/devices/${command.deviceId}/command`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(command),
  });
  if (!response.ok) throw new Error('Failed to send command');
  return response.json();
};

// Exported API functions with mock/real switching
export const getDevices = USE_MOCK_API ? mockGetDevices : realGetDevices;
export const getDeviceDetails = USE_MOCK_API ? mockGetDeviceDetails : realGetDeviceDetails;
export const getDeviceMetrics = USE_MOCK_API ? mockGetDeviceMetrics : realGetDeviceMetrics;
export const postDeviceCommand = USE_MOCK_API ? mockPostDeviceCommand : realPostDeviceCommand;
