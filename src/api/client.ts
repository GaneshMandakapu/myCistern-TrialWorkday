// API Client configuration
// Now supporting both MSW (web) and direct mock data (mobile)

import { Capacitor } from '@capacitor/core';
import { 
  getMockDevices, 
  getMockDeviceDetails, 
  getMockDeviceMetrics, 
  postMockDeviceCommand 
} from './mockData';

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

// Platform detection
const isNativeMobile = Capacitor.isNativePlatform();
const isProduction = import.meta.env.PROD;

console.log('🔧 API Client initialized:', {
  platform: isNativeMobile ? 'Mobile App' : 'Web Browser',
  environment: isProduction ? 'Production' : 'Development',
  usingMockData: true
});

// API functions - adaptive for web (MSW) and mobile (direct mock)
export const getDevices = async (query?: string, page = 1): Promise<Device[]> => {
  if (isNativeMobile) {
    // Use direct mock data for mobile apps
    return getMockDevices(query, page);
  } else {
    // Use MSW for web browsers
    const response = await fetch(`/api/devices?query=${query || ''}&page=${page}`);
    if (!response.ok) throw new Error('Failed to fetch devices');
    return response.json();
  }
};

export const getDeviceDetails = async (deviceId: string): Promise<DeviceDetails> => {
  if (isNativeMobile) {
    // Use direct mock data for mobile apps
    return getMockDeviceDetails(deviceId);
  } else {
    // Use MSW for web browsers
    const response = await fetch(`/api/devices/${deviceId}`);
    if (!response.ok) throw new Error('Failed to fetch device details');
    return response.json();
  }
};

export const getDeviceMetrics = async (deviceId: string): Promise<DeviceMetrics[]> => {
  if (isNativeMobile) {
    // Use direct mock data for mobile apps
    return getMockDeviceMetrics(deviceId);
  } else {
    // Use MSW for web browsers
    const response = await fetch(`/api/devices/${deviceId}/metrics`);
    if (!response.ok) throw new Error('Failed to fetch device metrics');
    return response.json();
  }
};

export const postDeviceCommand = async (command: DeviceCommand): Promise<CommandResponse> => {
  console.log('📤 API Call: postDeviceCommand', {
    deviceId: command.deviceId,
    command: command.command,
    parameters: command.parameters,
    timestamp: new Date().toISOString(),
    platform: isNativeMobile ? 'mobile' : 'web'
  });
  
  if (isNativeMobile) {
    // Use direct mock data for mobile apps
    const result = await postMockDeviceCommand(command.deviceId, command.command, command.parameters);
    console.log('✅ API Response (Mobile):', result);
    return result;
  } else {
    // Use MSW for web browsers
    const response = await fetch(`/api/devices/${command.deviceId}/command`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(command),
    });
    if (!response.ok) throw new Error('Failed to send command');
    const data = await response.json();
    console.log('✅ API Response (Web):', data);
    return data;
  }
};

