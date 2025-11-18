import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppKit } from '@reown/appkit-react-native';
import Button from '../components/Button';

export default function WalletConnectScreen() {
  const { open } = useAppKit();
  const [isConnecting, setIsConnecting] = React.useState(false);

  const handleConnectWallet = () => {
    open();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.appTitle}>SB-MOBILE</Text>
        <Text style={styles.subtitle}>Connect your wallet to get started</Text>
        {isConnecting ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#6366f1" />
            <Text style={styles.loadingText}>Connecting...</Text>
          </View>
        ) : (
          <Button
            title="Connect Wallet"
            onPress={handleConnectWallet}
            style={styles.connectButton}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  appTitle: {
    fontSize: 48,
    fontWeight: '700',
    color: '#6366f1',
    marginBottom: 16,
    textAlign: 'center',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 40,
    textAlign: 'center',
  },
  connectButton: {
    minWidth: 200,
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#6b7280',
  },
});

