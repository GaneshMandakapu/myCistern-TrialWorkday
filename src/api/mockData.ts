// Mobile-compatible mock data
// This works in both web browsers and native mobile apps

import { Device, DeviceDetails, DeviceMetrics, CommandResponse } from './client';

export const mockDevices: Device[] = [
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
  {
    id: 'dev-005',
    name: 'Temperature Sensor T1',
    status: 'online',
    type: 'Temperature Sensor',
    location: 'Building A - Ground Floor',
    lastSeen: new Date(Date.now() - 120000).toISOString(),
  },
  {
    id: 'dev-006',
    name: 'Pressure Sensor P1',
    status: 'online',
    type: 'Pressure Sensor',
    location: 'Building B - Basement',
    lastSeen: new Date(Date.now() - 60000).toISOString(),
  },
  {
    id: 'dev-007',
    name: 'Valve Controller V1',
    status: 'online',
    type: 'Valve Controller',
    location: 'Building C - Basement',
    lastSeen: new Date().toISOString(),
  },
  {
    id: 'dev-008',
    name: 'Water Quality Sensor Q1',
    status: 'offline',
    type: 'Water Quality Sensor',
    location: 'Building A - Ground Floor',
    lastSeen: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'dev-009',
    name: 'Humidity Sensor H1',
    status: 'online',
    type: 'Humidity Sensor',
    location: 'Building B - 2nd Floor',
    lastSeen: new Date(Date.now() - 180000).toISOString(),
  },
  {
    id: 'dev-010',
    name: 'Flow Meter X2',
    status: 'online',
    type: 'Flow Meter',
    location: 'Building D - Ground Floor',
    lastSeen: new Date(Date.now() - 90000).toISOString(),
  },
  {
    id: 'dev-011',
    name: 'Pump Controller 2',
    status: 'online',
    type: 'Pump Controller',
    location: 'Building B - Basement',
    lastSeen: new Date().toISOString(),
  },
  {
    id: 'dev-012',
    name: 'Water Tank Sensor C3',
    status: 'offline',
    type: 'Water Level Sensor',
    location: 'Building C - Roof',
    lastSeen: new Date(Date.now() - 14400000).toISOString(),
  },
  {
    id: 'dev-013',
    name: 'Leak Detection Sensor L1',
    status: 'online',
    type: 'Leak Detector',
    location: 'Building A - 1st Floor',
    lastSeen: new Date(Date.now() - 240000).toISOString(),
  },
  {
    id: 'dev-014',
    name: 'Energy Monitor E1',
    status: 'online',
    type: 'Energy Monitor',
    location: 'Building D - Electrical Room',
    lastSeen: new Date().toISOString(),
  },
  {
    id: 'dev-015',
    name: 'Smart Valve SV1',
    status: 'online',
    type: 'Smart Valve',
    location: 'Building C - 1st Floor',
    lastSeen: new Date(Date.now() - 150000).toISOString(),
  },
];

export const mockDeviceDetails: Record<string, DeviceDetails> = {
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
  'dev-005': {
    ...mockDevices[4],
    firmwareVersion: 'v2.1.0',
    ipAddress: '192.168.1.105',
    macAddress: '00:1B:44:11:3A:BB',
    uptime: 720000,
    description: 'Temperature monitoring sensor',
  },
  'dev-006': {
    ...mockDevices[5],
    firmwareVersion: 'v2.0.5',
    ipAddress: '192.168.1.106',
    macAddress: '00:1B:44:11:3A:BC',
    uptime: 950000,
    description: 'Water pressure monitoring device',
  },
  'dev-007': {
    ...mockDevices[6],
    firmwareVersion: 'v1.8.2',
    ipAddress: '192.168.1.107',
    macAddress: '00:1B:44:11:3A:BD',
    uptime: 1100000,
    description: 'Automated valve control system',
  },
  'dev-008': {
    ...mockDevices[7],
    firmwareVersion: 'v1.9.1',
    ipAddress: '192.168.1.108',
    macAddress: '00:1B:44:11:3A:BE',
    uptime: 0,
    description: 'Water quality analysis sensor - offline',
  },
  'dev-009': {
    ...mockDevices[8],
    firmwareVersion: 'v2.2.0',
    ipAddress: '192.168.1.109',
    macAddress: '00:1B:44:11:3A:BF',
    uptime: 680000,
    description: 'Environmental humidity monitoring',
  },
  'dev-010': {
    ...mockDevices[9],
    firmwareVersion: 'v2.0.1',
    ipAddress: '192.168.1.110',
    macAddress: '00:1B:44:11:3A:C0',
    uptime: 850000,
    description: 'Secondary flow meter for Building D',
  },
  'dev-011': {
    ...mockDevices[10],
    firmwareVersion: 'v1.6.3',
    ipAddress: '192.168.1.111',
    macAddress: '00:1B:44:11:3A:C1',
    uptime: 1200000,
    description: 'Backup pump controller for Building B',
  },
  'dev-012': {
    ...mockDevices[11],
    firmwareVersion: 'v2.1.3',
    ipAddress: '192.168.1.112',
    macAddress: '00:1B:44:11:3A:C2',
    uptime: 0,
    description: 'Water tank level sensor - needs maintenance',
  },
  'dev-013': {
    ...mockDevices[12],
    firmwareVersion: 'v3.0.1',
    ipAddress: '192.168.1.113',
    macAddress: '00:1B:44:11:3A:C3',
    uptime: 920000,
    description: 'Advanced leak detection system',
  },
  'dev-014': {
    ...mockDevices[13],
    firmwareVersion: 'v2.5.0',
    ipAddress: '192.168.1.114',
    macAddress: '00:1B:44:11:3A:C4',
    uptime: 1500000,
    description: 'Real-time energy consumption monitor',
  },
  'dev-015': {
    ...mockDevices[14],
    firmwareVersion: 'v1.7.4',
    ipAddress: '192.168.1.115',
    macAddress: '00:1B:44:11:3A:C5',
    uptime: 780000,
    description: 'IoT-enabled smart valve with remote control',
  },
};

// Mock API functions that work in both web and mobile
export const mockApiDelay = (ms: number = 500) => 
  new Promise(resolve => setTimeout(resolve, ms));

export const getMockDevices = async (query?: string, page = 1): Promise<Device[]> => {
  await mockApiDelay(500);
  
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
  
  // Pagination (5 items per page)
  const start = (page - 1) * 5;
  const end = start + 5;
  
  console.log('📱 Mock API: getMockDevices', { query, page, total: filteredDevices.length });
  
  return filteredDevices.slice(start, end);
};

export const getMockDeviceDetails = async (deviceId: string): Promise<DeviceDetails> => {
  await mockApiDelay(400);
  
  const details = mockDeviceDetails[deviceId];
  
  console.log('📱 Mock API: getMockDeviceDetails', { deviceId, found: !!details });
  
  if (!details) {
    throw new Error(`Device ${deviceId} not found`);
  }
  
  return details;
};

export const getMockDeviceMetrics = async (deviceId: string): Promise<DeviceMetrics[]> => {
  await mockApiDelay(600);
  
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
  
  console.log('📱 Mock API: getMockDeviceMetrics', { deviceId, metricsCount: metrics.length });
  
  return metrics;
};

export const postMockDeviceCommand = async (deviceId: string, command: string, parameters?: Record<string, unknown>): Promise<CommandResponse> => {
  await mockApiDelay(800);
  
  console.log('📱 Mock API: postMockDeviceCommand', {
    deviceId,
    command,
    parameters,
    timestamp: new Date().toISOString()
  });
  
  const device = mockDevices.find(d => d.id === deviceId);
  
  if (!device) {
    throw new Error(`Device ${deviceId} not found`);
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
    message: `Command "${command}" sent to ${device.name}`,
    commandId: `cmd-${Date.now()}`,
  };
};
