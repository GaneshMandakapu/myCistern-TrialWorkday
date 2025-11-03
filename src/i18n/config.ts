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
      
      // Time
      'time.justNow': 'Just now',
      'time.minutesAgo': '{{count}}m ago',
      'time.hoursAgo': '{{count}}h ago',
      'time.daysAgo': '{{count}}d ago',
      
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
      
      // Time
      'time.justNow': 'Gerade eben',
      'time.minutesAgo': 'vor {{count}}m',
      'time.hoursAgo': 'vor {{count}}h',
      'time.daysAgo': 'vor {{count}}d',
      
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
