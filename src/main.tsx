import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './globals.css'
import './i18n/config' // Initialize i18n
import { ThemeProvider } from './context/ThemeContext'

// Start MSW (Mock Service Worker) in development and preview environments
async function enableMocking() {
  // Enable mocking in development or when explicitly enabled
  const shouldEnableMocking = !import.meta.env.PROD || 
                              import.meta.env.VITE_USE_MOCK_API === 'true' ||
                              import.meta.env.VITE_ENABLE_MOCKING === 'true' ||
                              window.location.hostname.includes('ionic.app') ||
                              window.location.hostname.includes('appflow.ionic.com');

  if (!shouldEnableMocking) {
    console.log('🔇 MSW: Mocking disabled in production environment');
    return
  }

  console.log('🔧 MSW: Starting Mock Service Worker...');
  
  const { worker } = await import('./mocks/browser')

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start({
    onUnhandledRequest: 'bypass', // Don't warn about unhandled requests
  }).then(() => {
    console.log('✅ MSW: Mock Service Worker started successfully');
  }).catch((error) => {
    console.error('❌ MSW: Failed to start Mock Service Worker:', error);
  })
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </React.StrictMode>,
  )
})

