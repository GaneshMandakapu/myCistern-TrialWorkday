# myCistern Trial Workday - IoT Device Management

A React + TypeScript application for managing IoT devices with React Router, React Query, and mock API.

## Features

- ✅ React 18 with TypeScript
- ✅ Vite for fast development
- ✅ React Router v7 for routing with `<Outlet/>` pattern
- ✅ React Query (@tanstack/react-query) for data fetching
- ✅ React Hot Toast for global notifications
- ✅ Mock API with environment-based switching (.env)
- ✅ Proper folder structure: /app, /features, /shared

## Project Structure

```
src/
├── api/
│   ├── client.ts          # API client with mock/real switching
│   └── mockApi.ts         # Legacy mock functions
├── app/
│   ├── AppLayout.tsx      # Main layout with <Outlet/>
│   ├── AppLayout.css
│   ├── Home.tsx           # Home page
│   └── Home.css
├── features/
│   └── devices/
│       ├── DeviceList.tsx # Device list page (placeholder)
│       └── DeviceList.css
├── shared/
│   └── components/
│       ├── LoadingSpinner.tsx
│       ├── LoadingSpinner.css
│       ├── ErrorDisplay.tsx
│       └── ErrorDisplay.css
├── App.tsx                # Router and Query Provider setup
├── main.tsx               # Entry point
└── index.css              # Global styles
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm

### Installation

Install dependencies:

```bash
pnpm install
```

### Development

Run the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:5173`

### Routes

- `/` - Home page
- `/devices` - Device list page (placeholder for Step 1)

## API Configuration

The app uses mock API by default. This is controlled by the `.env` file:

```bash
VITE_USE_MOCK_API=true
```

Set to `false` to use real API endpoints (to be implemented).

## API Endpoints (Mock)

All API functions are in `src/api/client.ts`:

### Device Management
- `getDevices(query?, page?)` - Get all devices with optional search and pagination
- `getDeviceDetails(deviceId)` - Get detailed information for a specific device
- `getDeviceMetrics(deviceId)` - Get metrics/telemetry data for a device
- `postDeviceCommand(command)` - Send a command to a device

### Types
```typescript
interface Device {
  id: string;
  name: string;
  status: 'online' | 'offline';
  type: string;
  location: string;
  lastSeen: string;
}

interface DeviceDetails extends Device {
  firmwareVersion: string;
  ipAddress: string;
  macAddress: string;
  uptime: number;
  description: string;
}

interface DeviceMetrics {
  deviceId: string;
  timestamp: string;
  temperature?: number;
  humidity?: number;
  pressure?: number;
  batteryLevel?: number;
  signalStrength?: number;
}

interface DeviceCommand {
  deviceId: string;
  command: string;
  parameters?: Record<string, unknown>;
}
```

## Global Components

### Loading States
Use `<LoadingSpinner />` component from `src/shared/components/LoadingSpinner.tsx`

### Error Handling
Use `<ErrorDisplay />` component from `src/shared/components/ErrorDisplay.tsx`

### Notifications
Global toast notifications are configured via React Hot Toast

## Step 0 Acceptance Criteria ✅

- ✅ `pnpm dev` runs successfully
- ✅ `/devices` route shows placeholder
- ✅ API functions exist (mock) with proper types
- ✅ React Router configured with `<Outlet/>`
- ✅ React Query configured with `QueryClientProvider`
- ✅ Global loading/error display components
- ✅ Proper folder structure: /app, /features, /shared

## Next Steps

**Step 1 - Device List:**
- Implement actual device list with data fetching
- Add search functionality
- Add status badges
- Add pagination
- Add loading skeleton and error states with retry

---

**Commit checkpoint:** `chore: bootstrap app with router + query + mock api`
