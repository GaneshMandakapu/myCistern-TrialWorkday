// API Client configuration
// Now using MSW (Mock Service Worker) for realistic network requests

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

// API functions - using real fetch calls (intercepted by MSW)
export const getDevices = async (query?: string, page = 1): Promise<Device[]> => {
  const response = await fetch(`/api/devices?query=${query || ''}&page=${page}`);
  if (!response.ok) throw new Error('Failed to fetch devices');
  return response.json();
};

export const getDeviceDetails = async (deviceId: string): Promise<DeviceDetails> => {
  const response = await fetch(`/api/devices/${deviceId}`);
  if (!response.ok) throw new Error('Failed to fetch device details');
  return response.json();
};

export const getDeviceMetrics = async (deviceId: string): Promise<DeviceMetrics[]> => {
  const response = await fetch(`/api/devices/${deviceId}/metrics`);
  if (!response.ok) throw new Error('Failed to fetch device metrics');
  return response.json();
};

export const postDeviceCommand = async (command: DeviceCommand): Promise<CommandResponse> => {
  console.log('📤 API Call: postDeviceCommand', {
    deviceId: command.deviceId,
    command: command.command,
    parameters: command.parameters,
    timestamp: new Date().toISOString()
  });
  
  const response = await fetch(`/api/devices/${command.deviceId}/command`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(command),
  });
  if (!response.ok) throw new Error('Failed to send command');
  const data = await response.json();
  
  console.log('✅ API Response:', data);
  return data;
};

