import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      'nav.home': 'Home',
      'nav.devices': 'Devices',
      'nav.back': 'Back',
      
      // Home Page
      'home.title': 'Welcome to myCistern Platform',
      'home.subtitle': 'Monitor and manage your IoT devices in real-time with our powerful, intuitive platform',
      'home.exploreDevices': 'Explore Devices',
      'home.learnMore': 'Learn More',
      'home.features.title': 'Powerful Features',
      'home.features.subtitle': 'Everything you need to monitor, manage, and control your IoT ecosystem',
      'home.features.monitoring.title': 'Real-time Monitoring',
      'home.features.monitoring.description': 'Track device status, performance metrics, and health data in real-time with live dashboards and alerts',
      'home.features.search.title': 'Smart Search',
      'home.features.search.description': 'Quickly find devices with powerful search, filtering, and voice search capabilities across your entire network',
      'home.features.control.title': 'Device Control',
      'home.features.control.description': 'Send commands, update configurations, and control devices remotely with secure, reliable communication',
      'home.stats.devices': 'Connected Devices',
      'home.stats.uptime': 'Uptime',
      'home.stats.monitoring': 'Monitoring',
      'home.stats.events': 'Daily Events',
      
      // Theme
      'theme.light': 'Light',
      'theme.dark': 'Dark',
      'theme.toggle': 'Toggle Theme',
      
      // Language
      'language.english': 'English',
      'language.german': 'Deutsch',
      'language.toggle': 'Change Language',
      
      // Device List
      'devices.title': 'IoT Devices',
      'devices.description': 'View and manage all your connected devices',
      'devices.search': 'Search devices...',
      'devices.voiceSearch': 'Voice Search',
      'devices.noResults': 'No devices found',
      'devices.loading': 'Loading devices...',
      'devices.error': 'Failed to load devices',
      'devices.retry': 'Try Again',
      'devices.online': 'online',
      'devices.offline': 'offline',
      'devices.page': 'Page',
      'devices.previous': 'Previous',
      'devices.next': 'Next',
      
      // Device Detail
      'detail.title': 'Device Details',
      'detail.deviceId': 'Device ID',
      'detail.location': 'Location',
      'detail.firmware': 'Firmware',
      'detail.ipAddress': 'IP Address',
      'detail.macAddress': 'MAC Address',
      'detail.lastSeen': 'Last Seen',
      'detail.type': 'Type',
      'detail.status': 'Status',
      
      // Metrics
      'metrics.title': 'Live Metrics',
      'metrics.updating': 'Live',
      'metrics.offline': 'Offline',
      'metrics.temperature': 'Temperature',
      'metrics.humidity': 'Humidity',
      'metrics.pressure': 'Pressure',
      'metrics.battery': 'Battery',
      'metrics.signal': 'Signal',
      'metrics.noData': 'No metrics available for this device',
      'metrics.offlineMessage': 'Device is offline - metrics not available',
      
      // Commands
      'commands.title': 'Device Commands',
      'commands.ping': 'Ping',
      'commands.reboot': 'Reboot',
      'commands.openValve': 'Open Valve',
      'commands.diagnostics': 'Diagnostics',
      'commands.sending': 'Sending command...',
      'commands.offlineNote': 'Commands are disabled when device is offline',
      'commands.tooltip.ping': 'Test device connectivity',
      'commands.tooltip.reboot': 'Restart the device',
      'commands.tooltip.openValve': 'Open primary valve',
      'commands.tooltip.diagnostics': 'Run diagnostics',
      'commands.tooltip.offline': 'Device must be online',
      
      // Errors
      'error.title': 'Error',
      'error.notFound': 'Device not found',
      'error.network': 'Network error',
      'error.unknown': 'An unexpected error occurred',
      'error.retry': 'Retry',
      'error.retryCount': 'Attempt {{count}} of {{max}}',
      'error.maxRetries': 'Maximum retry attempts reached. Please refresh the page or try again later.',
      
      // Time
      'time.justNow': 'Just now',
      'time.minutesAgo': '{{count}}m ago',
      'time.hoursAgo': '{{count}}h ago',
      'time.daysAgo': '{{count}}d ago',
      
      // Error Handling
      'error.notFound.title': '404 - Page Not Found',
      'error.notFound.message': 'The page you are looking for does not exist or has been moved.',
      'error.notFound.goHome': 'Go to Home',
      'error.notFound.goDevices': 'Browse Devices',
      'error.notFound.goBack': 'Go Back',
      'error.notFound.help': 'You can navigate to:',
      
      'error.boundary.title': 'Something Went Wrong',
      'error.boundary.message': 'An unexpected error occurred. Please try reloading the page or go back to the home page.',
      'error.boundary.details': 'Technical Details',
      'error.boundary.reload': 'Reload Page',
      'error.boundary.goHome': 'Go to Home',
      'error.boundary.help': 'If the problem persists, please contact support.',
      
      'error.network.title': 'Network Connection Error',
      'error.network.message': 'Unable to connect to the server. Please check your internet connection and try again.',
      'error.network.retry': 'Try Again',
      'error.network.retrying': 'Retrying...',
      'error.network.online': 'Online',
      'error.network.offline': 'Offline',
      'error.network.help': 'Connection troubleshooting:',
      'error.network.suggestion1': 'Check your internet connection',
      'error.network.suggestion2': 'Refresh the page',
      'error.network.suggestion3': 'Try again in a few moments',
      
      // Empty States
      'empty.default.title': 'No Data Available',
      'empty.default.message': 'There is currently no data to display.',
      'empty.search.title': 'No Results Found',
      'empty.search.message': 'Try adjusting your search criteria or clearing filters.',
      'empty.error.title': 'Loading Error',
      'empty.error.message': 'Failed to load data. Please try again.',
      'empty.loading.title': 'Loading...',
      'empty.loading.message': 'Please wait while we fetch the data.',
      'empty.action.primary': 'Refresh',
      'empty.action.secondary': 'Clear Filters',
      
      // Toast messages
      'toast.commandSuccess': 'Command "{{command}}" sent to {{device}}',
      'toast.commandFailed': 'Failed to send command',
      'toast.deviceOffline': 'Device {{device}} is offline and cannot process commands',
      
      // Device Types (for translation)
      'deviceType.Water Level Sensor': 'Water Level Sensor',
      'deviceType.Pump Controller': 'Pump Controller',
      'deviceType.Flow Meter': 'Flow Meter',
      'deviceType.Temperature Sensor': 'Temperature Sensor',
      'deviceType.Pressure Sensor': 'Pressure Sensor',
      'deviceType.Valve Controller': 'Valve Controller',
      'deviceType.Water Quality Sensor': 'Water Quality Sensor',
      'deviceType.Humidity Sensor': 'Humidity Sensor',
      'deviceType.Leak Detector': 'Leak Detector',
      'deviceType.Energy Monitor': 'Energy Monitor',
      'deviceType.Smart Valve': 'Smart Valve',
      
      // Device Names (for demo localization)
      'deviceName.Water Tank Sensor A1': 'Water Tank Sensor A1',
      'deviceName.Water Tank Sensor B2': 'Water Tank Sensor B2',
      'deviceName.Pump Controller 1': 'Pump Controller 1',
      'deviceName.Flow Meter X1': 'Flow Meter X1',
      'deviceName.Temperature Sensor T1': 'Temperature Sensor T1',
      'deviceName.Pressure Sensor P1': 'Pressure Sensor P1',
      'deviceName.Valve Controller V1': 'Valve Controller V1',
      'deviceName.Water Quality Sensor Q1': 'Water Quality Sensor Q1',
      'deviceName.Humidity Sensor H1': 'Humidity Sensor H1',
      'deviceName.Flow Meter X2': 'Flow Meter X2',
      'deviceName.Pump Controller 2': 'Pump Controller 2',
      'deviceName.Water Tank Sensor C3': 'Water Tank Sensor C3',
      'deviceName.Leak Detection Sensor L1': 'Leak Detection Sensor L1',
      'deviceName.Energy Monitor E1': 'Energy Monitor E1',
      'deviceName.Smart Valve SV1': 'Smart Valve SV1',
      
      // Locations (for demo localization)
      'location.Building A - Roof': 'Building A - Roof',
      'location.Building B - Roof': 'Building B - Roof',
      'location.Building A - Basement': 'Building A - Basement',
      'location.Building C - Ground Floor': 'Building C - Ground Floor',
      'location.Building A - Ground Floor': 'Building A - Ground Floor',
      'location.Building B - Basement': 'Building B - Basement',
      'location.Building C - Basement': 'Building C - Basement',
      'location.Building B - 2nd Floor': 'Building B - 2nd Floor',
      'location.Building D - Ground Floor': 'Building D - Ground Floor',
      'location.Building C - Roof': 'Building C - Roof',
      'location.Building A - 1st Floor': 'Building A - 1st Floor',
      'location.Building D - Electrical Room': 'Building D - Electrical Room',
      'location.Building C - 1st Floor': 'Building C - 1st Floor',
    },
  },
  de: {
    translation: {
      // Navigation
      'nav.home': 'Startseite',
      'nav.devices': 'Geräte',
      'nav.back': 'Zurück',
      
      // Home Page
      'home.title': 'Willkommen bei myCistern Plattform',
      'home.subtitle': 'Überwachen und verwalten Sie Ihre IoT-Geräte in Echtzeit mit unserer leistungsstarken, intuitiven Plattform',
      'home.exploreDevices': 'Geräte erkunden',
      'home.learnMore': 'Mehr erfahren',
      'home.features.title': 'Leistungsstarke Funktionen',
      'home.features.subtitle': 'Alles was Sie brauchen, um Ihr IoT-Ökosystem zu überwachen, verwalten und steuern',
      'home.features.monitoring.title': 'Echtzeit-Überwachung',
      'home.features.monitoring.description': 'Verfolgen Sie Gerätestatus, Leistungsmetriken und Gesundheitsdaten in Echtzeit mit Live-Dashboards und Alarmen',
      'home.features.search.title': 'Intelligente Suche',
      'home.features.search.description': 'Finden Sie Geräte schnell mit leistungsstarker Suche, Filterung und Sprachsuchfunktionen in Ihrem gesamten Netzwerk',
      'home.features.control.title': 'Gerätesteuerung',
      'home.features.control.description': 'Senden Sie Befehle, aktualisieren Sie Konfigurationen und steuern Sie Geräte sicher und zuverlässig aus der Ferne',
      'home.stats.devices': 'Verbundene Geräte',
      'home.stats.uptime': 'Betriebszeit',
      'home.stats.monitoring': 'Überwachung',
      'home.stats.events': 'Tägliche Ereignisse',
      
      // Theme
      'theme.light': 'Hell',
      'theme.dark': 'Dunkel',
      'theme.toggle': 'Design wechseln',
      
      // Language
      'language.english': 'English',
      'language.german': 'Deutsch',
      'language.toggle': 'Sprache ändern',
      
      // Device List
      'devices.title': 'IoT-Geräte',
      'devices.description': 'Alle verbundenen Geräte anzeigen und verwalten',
      'devices.search': 'Geräte suchen...',
      'devices.voiceSearch': 'Sprachsuche',
      'devices.noResults': 'Keine Geräte gefunden',
      'devices.loading': 'Geräte werden geladen...',
      'devices.error': 'Fehler beim Laden der Geräte',
      'devices.retry': 'Erneut versuchen',
      'devices.online': 'online',
      'devices.offline': 'offline',
      'devices.page': 'Seite',
      'devices.previous': 'Zurück',
      'devices.next': 'Weiter',
      
      // Device Detail
      'detail.title': 'Gerätedetails',
      'detail.deviceId': 'Geräte-ID',
      'detail.location': 'Standort',
      'detail.firmware': 'Firmware',
      'detail.ipAddress': 'IP-Adresse',
      'detail.macAddress': 'MAC-Adresse',
      'detail.lastSeen': 'Zuletzt gesehen',
      'detail.type': 'Typ',
      'detail.status': 'Status',
      
      // Metrics
      'metrics.title': 'Live-Metriken',
      'metrics.updating': 'Live',
      'metrics.offline': 'Offline',
      'metrics.temperature': 'Temperatur',
      'metrics.humidity': 'Luftfeuchtigkeit',
      'metrics.pressure': 'Druck',
      'metrics.battery': 'Batterie',
      'metrics.signal': 'Signal',
      'metrics.noData': 'Keine Metriken für dieses Gerät verfügbar',
      'metrics.offlineMessage': 'Gerät ist offline - Metriken nicht verfügbar',
      
      // Commands
      'commands.title': 'Gerätebefehle',
      'commands.ping': 'Ping',
      'commands.reboot': 'Neustart',
      'commands.openValve': 'Ventil öffnen',
      'commands.diagnostics': 'Diagnose',
      'commands.sending': 'Befehl wird gesendet...',
      'commands.offlineNote': 'Befehle sind deaktiviert, wenn das Gerät offline ist',
      'commands.tooltip.ping': 'Geräteverbindung testen',
      'commands.tooltip.reboot': 'Gerät neu starten',
      'commands.tooltip.openValve': 'Hauptventil öffnen',
      'commands.tooltip.diagnostics': 'Diagnose ausführen',
      'commands.tooltip.offline': 'Gerät muss online sein',
      
      // Errors
      'error.title': 'Fehler',
      'error.notFound': 'Gerät nicht gefunden',
      'error.network': 'Netzwerkfehler',
      'error.unknown': 'Ein unerwarteter Fehler ist aufgetreten',
      'error.retry': 'Erneut versuchen',
      'error.retryCount': 'Versuch {{count}} von {{max}}',
      'error.maxRetries': 'Maximale Anzahl der Wiederholungsversuche erreicht. Bitte aktualisieren Sie die Seite oder versuchen Sie es später erneut.',
      
      // Time
      'time.justNow': 'Gerade eben',
      'time.minutesAgo': 'vor {{count}}m',
      'time.hoursAgo': 'vor {{count}}h',
      'time.daysAgo': 'vor {{count}}d',
      
      // Error Handling
      'error.notFound.title': '404 - Seite nicht gefunden',
      'error.notFound.message': 'Die gesuchte Seite existiert nicht oder wurde verschoben.',
      'error.notFound.goHome': 'Zur Startseite',
      'error.notFound.goDevices': 'Geräte durchsuchen',
      'error.notFound.goBack': 'Zurück',
      'error.notFound.help': 'Sie können navigieren zu:',
      
      'error.boundary.title': 'Etwas ist schiefgelaufen',
      'error.boundary.message': 'Ein unerwarteter Fehler ist aufgetreten. Bitte laden Sie die Seite neu oder gehen Sie zur Startseite zurück.',
      'error.boundary.details': 'Technische Details',
      'error.boundary.reload': 'Seite neu laden',
      'error.boundary.goHome': 'Zur Startseite',
      'error.boundary.help': 'Falls das Problem weiterhin besteht, wenden Sie sich an den Support.',
      
      'error.network.title': 'Netzwerkverbindungsfehler',
      'error.network.message': 'Verbindung zum Server nicht möglich. Bitte überprüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.',
      'error.network.retry': 'Erneut versuchen',
      'error.network.retrying': 'Versuche erneut...',
      'error.network.online': 'Online',
      'error.network.offline': 'Offline',
      'error.network.help': 'Verbindungsfehlersuche:',
      'error.network.suggestion1': 'Internetverbindung überprüfen',
      'error.network.suggestion2': 'Seite aktualisieren',
      'error.network.suggestion3': 'In wenigen Minuten erneut versuchen',
      
      // Empty States
      'empty.default.title': 'Keine Daten verfügbar',
      'empty.default.message': 'Derzeit sind keine Daten anzuzeigen.',
      'empty.search.title': 'Keine Ergebnisse gefunden',
      'empty.search.message': 'Versuchen Sie, Ihre Suchkriterien anzupassen oder Filter zu löschen.',
      'empty.error.title': 'Ladefehler',
      'empty.error.message': 'Daten konnten nicht geladen werden. Bitte erneut versuchen.',
      'empty.loading.title': 'Lädt...',
      'empty.loading.message': 'Bitte warten Sie, während wir die Daten laden.',
      'empty.action.primary': 'Aktualisieren',
      'empty.action.secondary': 'Filter löschen',
      
      // Toast messages
      'toast.commandSuccess': 'Befehl "{{command}}" an {{device}} gesendet',
      'toast.commandFailed': 'Befehl konnte nicht gesendet werden',
      'toast.deviceOffline': 'Gerät {{device}} ist offline und kann keine Befehle verarbeiten',
      
      // Device Types (for translation)
      'deviceType.Water Level Sensor': 'Wasserstands-Sensor',
      'deviceType.Pump Controller': 'Pumpensteuerung',
      'deviceType.Flow Meter': 'Durchflussmesser',
      'deviceType.Temperature Sensor': 'Temperatursensor',
      'deviceType.Pressure Sensor': 'Drucksensor',
      'deviceType.Valve Controller': 'Ventilsteuerung',
      'deviceType.Water Quality Sensor': 'Wasserqualitäts-Sensor',
      'deviceType.Humidity Sensor': 'Feuchtigkeitssensor',
      'deviceType.Leak Detector': 'Leckage-Detektor',
      'deviceType.Energy Monitor': 'Energiemonitor',
      'deviceType.Smart Valve': 'Intelligentes Ventil',
      
      // Device Names (for demo localization)
      'deviceName.Water Tank Sensor A1': 'Wassertank-Sensor A1',
      'deviceName.Water Tank Sensor B2': 'Wassertank-Sensor B2',
      'deviceName.Pump Controller 1': 'Pumpensteuerung 1',
      'deviceName.Flow Meter X1': 'Durchflussmesser X1',
      'deviceName.Temperature Sensor T1': 'Temperatursensor T1',
      'deviceName.Pressure Sensor P1': 'Drucksensor P1',
      'deviceName.Valve Controller V1': 'Ventilsteuerung V1',
      'deviceName.Water Quality Sensor Q1': 'Wasserqualitäts-Sensor Q1',
      'deviceName.Humidity Sensor H1': 'Feuchtigkeitssensor H1',
      'deviceName.Flow Meter X2': 'Durchflussmesser X2',
      'deviceName.Pump Controller 2': 'Pumpensteuerung 2',
      'deviceName.Water Tank Sensor C3': 'Wassertank-Sensor C3',
      'deviceName.Leak Detection Sensor L1': 'Leckage-Erkennungssensor L1',
      'deviceName.Energy Monitor E1': 'Energiemonitor E1',
      'deviceName.Smart Valve SV1': 'Intelligentes Ventil SV1',
      
      // Locations (for demo localization)
      'location.Building A - Roof': 'Gebäude A - Dach',
      'location.Building B - Roof': 'Gebäude B - Dach',
      'location.Building A - Basement': 'Gebäude A - Keller',
      'location.Building C - Ground Floor': 'Gebäude C - Erdgeschoss',
      'location.Building A - Ground Floor': 'Gebäude A - Erdgeschoss',
      'location.Building B - Basement': 'Gebäude B - Keller',
      'location.Building C - Basement': 'Gebäude C - Keller',
      'location.Building B - 2nd Floor': 'Gebäude B - 2. Etage',
      'location.Building D - Ground Floor': 'Gebäude D - Erdgeschoss',
      'location.Building C - Roof': 'Gebäude C - Dach',
      'location.Building A - 1st Floor': 'Gebäude A - 1. Etage',
      'location.Building D - Electrical Room': 'Gebäude D - Elektroraum',
      'location.Building C - 1st Floor': 'Gebäude C - 1. Etage',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
