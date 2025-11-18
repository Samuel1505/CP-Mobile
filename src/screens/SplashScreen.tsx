import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Svg, Circle, Path } from 'react-native-svg';

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Fade in animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto navigate after 3 seconds
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Clouds */}
        <View style={styles.cloudsContainer}>
          <View style={[styles.cloud, styles.cloud1]} />
          <View style={[styles.cloud, styles.cloud2]} />
          <View style={[styles.cloud, styles.cloud3]} />
          <View style={[styles.cloud, styles.cloud4]} />
        </View>

        {/* Logo */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {/* Stack of cards */}
          <View style={styles.cardsStack}>
            <View style={[styles.card, styles.card1]} />
            <View style={[styles.card, styles.card2]} />
            <View style={[styles.card, styles.card3]} />
          </View>

          {/* SM letters and lines */}
          <View style={styles.logoText}>
            <Text style={styles.logoSM}>sm</Text>
            <View style={styles.speedLines}>
              <View style={[styles.line, styles.line1]} />
              <View style={[styles.line, styles.line2]} />
              <View style={[styles.line, styles.line3]} />
            </View>
          </View>
        </Animated.View>

        {/* App Name */}
        <Animated.View
          style={[
            styles.appNameContainer,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <Text style={styles.appName}>SB-Mobile</Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B8E6B8', // Light pastel green
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cloudsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  cloud: {
    position: 'absolute',
    backgroundColor: '#A8D8A8',
    borderRadius: 50,
    opacity: 0.6,
  },
  cloud1: {
    width: 80,
    height: 40,
    top: 60,
    left: 50,
  },
  cloud2: {
    width: 100,
    height: 50,
    top: 100,
    right: 60,
  },
  cloud3: {
    width: 70,
    height: 35,
    top: 40,
    right: 120,
  },
  cloud4: {
    width: 90,
    height: 45,
    top: 80,
    left: 150,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  cardsStack: {
    position: 'relative',
    marginBottom: 20,
  },
  card: {
    position: 'absolute',
    backgroundColor: '#10b981',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#059669',
  },
  card1: {
    width: 60,
    height: 40,
    transform: [{ rotate: '-15deg' }],
    left: -10,
    zIndex: 1,
  },
  card2: {
    width: 60,
    height: 40,
    transform: [{ rotate: '-5deg' }],
    left: 0,
    zIndex: 2,
  },
  card3: {
    width: 60,
    height: 40,
    transform: [{ rotate: '5deg' }],
    left: 10,
    zIndex: 3,
    backgroundColor: '#34d399',
  },
  logoText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  logoSM: {
    fontSize: 32,
    fontWeight: '700',
    color: '#10b981',
    letterSpacing: -1,
  },
  speedLines: {
    marginLeft: 8,
    justifyContent: 'center',
  },
  line: {
    backgroundColor: '#10b981',
    marginVertical: 2,
  },
  line1: {
    width: 20,
    height: 3,
  },
  line2: {
    width: 15,
    height: 3,
  },
  line3: {
    width: 10,
    height: 3,
  },
  appNameContainer: {
    marginTop: 20,
  },
  appName: {
    fontSize: 32,
    fontWeight: '700',
    color: '#10b981',
    textAlign: 'center',
  },
});

