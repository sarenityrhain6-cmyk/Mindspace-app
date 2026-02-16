// Capacitor Mobile App Initialization
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { App } from '@capacitor/app';

export const initializeCapacitor = async () => {
  // Check if running on native platform
  if (Capacitor.isNativePlatform()) {
    console.log('Running on native platform:', Capacitor.getPlatform());

    try {
      // Configure status bar
      await StatusBar.setStyle({ style: Style.Light });
      await StatusBar.setBackgroundColor({ color: '#8FEC78' });

      // Hide splash screen after app loads
      await SplashScreen.hide();

      // Handle app state changes
      App.addListener('appStateChange', ({ isActive }) => {
        console.log('App state changed. Is active?', isActive);
      });

      // Handle back button
      App.addListener('backButton', ({ canGoBack }) => {
        if (!canGoBack) {
          App.exitApp();
        } else {
          window.history.back();
        }
      });

      console.log('Capacitor initialized successfully');
    } catch (error) {
      console.error('Error initializing Capacitor:', error);
    }
  } else {
    console.log('Running in browser mode');
  }
};

// Check if running on mobile
export const isMobile = () => {
  return Capacitor.isNativePlatform();
};

// Get platform
export const getPlatform = () => {
  return Capacitor.getPlatform();
};
