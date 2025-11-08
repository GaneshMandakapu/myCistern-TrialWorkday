import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import AppLayout from './app/AppLayout';
import Home from './app/Home';
import DeviceList from './features/devices/DeviceList';
import DeviceDetail from './features/devices/DeviceDetail';
import CookiePolicy from './pages/CookiePolicy';
import SettingsPage from './pages/SettingsPage';
import AboutPage from './pages/AboutPage';
import NotFound from './shared/components/NotFound';
import ErrorBoundary from './shared/components/ErrorBoundary';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Home />} />
              <Route path="devices" element={<DeviceList />} />
              <Route path="devices/:id" element={<DeviceDetail />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="cookies" element={<CookiePolicy />} />
              {/* Catch-all route for 404 */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
      
      {/* Global toast notifications for errors/success */}
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
