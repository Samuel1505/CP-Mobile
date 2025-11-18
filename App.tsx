import 'react-native-get-random-values';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { useAppKit } from '@reown/appkit-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Polyfill to prevent window.ethereum errors in React Native
if (typeof window !== 'undefined') {
  const win = window as any;
  if (!win.ethereum) {
    win.ethereum = undefined;
  }
}

import { AppKitWrapper } from './src/lib/appkit-config';
import SplashScreen from './src/screens/SplashScreen';
import WalletConnectScreen from './src/screens/WalletConnectScreen';
import HomeScreen from './src/screens/HomeScreen';
import CreateMarketsScreen from './src/screens/CreateMarketsScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import LeaderboardScreen from './src/screens/LeaderboardScreen';
import MarketDetailScreen from './src/screens/MarketDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainApp() {
  const appKit = useAppKit();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [hasCheckedWallet, setHasCheckedWallet] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  // Check connection status from AppKit
  useEffect(() => {
    // AppKit connection state - check if we have a connected account
    // This will be updated when wallet connects
    const checkConnection = async () => {
      try {
        const savedAddress = await AsyncStorage.getItem('wallet_address');
        if (savedAddress) {
          setAddress(savedAddress);
          setIsConnected(true);
        }
      } catch (error) {
        console.warn('Error checking connection:', error);
      }
    };
    if (fontsLoaded && !showSplash) {
      checkConnection();
    }
  }, [fontsLoaded, showSplash]);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          'KHTeka-Regular': require('../assets/fonts/KHTeka-Regular.otf'),
          'KHTeka-Medium': require('../assets/fonts/KHTeka-Medium.otf'),
          'KHTekaMono-Regular': require('../assets/fonts/KHTekaMono-Regular.otf'),
          'SpaceMono-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.warn('Error loading fonts:', error);
        setFontsLoaded(true);
      }
    }
    loadFonts();
  }, []);

  useEffect(() => {
    // Check wallet connection after splash and fonts are loaded
    if (fontsLoaded && !showSplash) {
      setHasCheckedWallet(true);
    }
  }, [fontsLoaded, showSplash]);

  useEffect(() => {
    // Save wallet address when connected
    if (isConnected && address) {
      AsyncStorage.setItem('wallet_address', address);
    } else if (!isConnected) {
      AsyncStorage.removeItem('wallet_address');
    }
  }, [isConnected, address]);

  if (!fontsLoaded || showSplash) {
    if (showSplash) {
      return <SplashScreen onFinish={() => setShowSplash(false)} />;
    }
    return null;
  }

  if (!hasCheckedWallet || !isConnected) {
    return <WalletConnectScreen />;
  }

  function TabNavigator() {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#6366f1',
          tabBarInactiveTintColor: '#9ca3af',
          tabBarStyle: {
            backgroundColor: '#ffffff',
            borderTopWidth: 1,
            borderTopColor: '#e5e7eb',
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Create"
          component={CreateMarketsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="add-circle" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="stats-chart" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Leaderboard"
          component={LeaderboardScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="trophy" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen
          name="MarketDetail"
          component={MarketDetailScreen}
          options={{
            presentation: 'card',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <AppKitWrapper>
        <MainApp />
      </AppKitWrapper>
    </SafeAreaProvider>
  );
}

