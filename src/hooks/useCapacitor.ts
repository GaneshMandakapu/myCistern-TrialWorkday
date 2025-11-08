import { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Network } from '@capacitor/network';
import { Device } from '@capacitor/device';

export interface DeviceInfo {
  platform: string;
  operatingSystem: string;
  osVersion: string;
  manufacturer: string;
  model: string;
  isVirtual: boolean;
}

export interface NetworkInfo {
  connected: boolean;
  connectionType: string;
}

export const useCapacitor = () => {
  const [isNative, setIsNative] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo | null>(null);
  const [appState, setAppState] = useState<'active' | 'background'>('active');

  useEffect(() => {
    const checkPlatform = async () => {
      const native = Capacitor.isNativePlatform();
      setIsNative(native);

      if (native) {
        // Configure status bar properly
        await StatusBar.setStyle({ style: Style.Default });
        await StatusBar.setBackgroundColor({ color: '#ffffff' });
        await StatusBar.setOverlaysWebView({ overlay: false });

        // Hide splash screen after app initialization
        await SplashScreen.hide();

        // Get device information
        const deviceData = await Device.getInfo();
        setDeviceInfo({
          platform: deviceData.platform,
          operatingSystem: deviceData.operatingSystem,
          osVersion: deviceData.osVersion,
          manufacturer: deviceData.manufacturer,
          model: deviceData.model,
          isVirtual: deviceData.isVirtual
        });

        // Get network status
        const networkStatus = await Network.getStatus();
        setNetworkInfo({
          connected: networkStatus.connected,
          connectionType: networkStatus.connectionType
        });

        // Listen for network changes
        const networkListener = await Network.addListener('networkStatusChange', (status) => {
          setNetworkInfo({
            connected: status.connected,
            connectionType: status.connectionType
          });
        });

        // Listen for app state changes
        const appStateListener = await App.addListener('appStateChange', ({ isActive }) => {
          setAppState(isActive ? 'active' : 'background');
        });

        // Cleanup listeners
        return () => {
          networkListener.remove();
          appStateListener.remove();
        };
      }
    };

    checkPlatform();
  }, []);

  const setStatusBarStyle = async (style: Style) => {
    if (isNative) {
      await StatusBar.setStyle({ style });
    }
  };

  const exitApp = () => {
    if (isNative) {
      App.exitApp();
    }
  };

  return {
    isNative,
    deviceInfo,
    networkInfo,
    appState,
    setStatusBarStyle,
    exitApp
  };
};
