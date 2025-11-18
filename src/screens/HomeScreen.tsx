import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/Button';
import MarketCard from '../components/MarketCard';
import TokenCard from '../components/TokenCard';
import StatCard from '../components/StatCard';
import StepCard from '../components/StepCard';
import FeatureCard from '../components/FeatureCard';

export default function HomeScreen() {
  const navigation = useNavigation();

  const handleMarketPress = (market: {
    title: string;
    yesPercentage: number;
    noPercentage: number;
    category?: string;
  }) => {
    (navigation as any).navigate('MarketDetail', {
      title: market.title,
      yesPercentage: market.yesPercentage,
      noPercentage: market.noPercentage,
      category: market.category || 'Solana',
      endDate: 'December 31, 2025',
      totalStaked: '125.5 ETH',
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>SB-Mobile</Text>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color="#1f2937" />
          </TouchableOpacity>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Predict the Future of Crypto</Text>
          <Text style={styles.heroSubtitle}>
            Join now, the leading platform for crypto prediction market. Use
            your knowledge to forecast the digital assets and earn rewards
          </Text>
          <View style={styles.heroButtons}>
            <Button title="Join Now" onPress={() => {}} style={styles.heroButton} />
            <Button
              title="Explore"
              onPress={() => {}}
              variant="outline"
              style={styles.heroButton}
            />
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <StatCard value="1,000+" label="Market Created" />
          <StatCard value="10M+" label="Trusted User" />
          <StatCard value="195" label="Countries Supported" />
        </View>

        {/* How it Works */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How it Works</Text>
          <StepCard
            number="01"
            title="Create Your Market"
            description="Simply create a market by setting your event question, stake tokens on the outcome you believe in, and once the event resolves, winners automatically claim their fair share of the pooled rewards"
          />
          <StepCard
            number="02"
            title="Place Your Prediction"
            description="Browse active markets and stake your tokens on the outcome you believe will happen. Your stake represents your confidence in the prediction"
          />
          <StepCard
            number="03"
            title="Earn Rewards"
            description="When the event concludes and the outcome is verified, winners automatically receive their proportional share of the total pool based on their stake"
          />
        </View>

        {/* Active Markets */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Active Markets</Text>
            <TouchableOpacity>
              <Text style={styles.seeMore}>See more</Text>
            </TouchableOpacity>
          </View>
          <MarketCard
            title="Will Bonk Transition to proof-of-stake by Q3 2025"
            yesPercentage={52}
            noPercentage={48}
            onPress={() =>
              handleMarketPress({
                title: 'Will Bonk Transition to proof-of-stake by Q3 2025',
                yesPercentage: 52,
                noPercentage: 48,
                category: 'Solana',
              })
            }
          />
          <MarketCard
            title="Will Price of Tether REACH $1200.00 by 31st December, 2025?"
            yesPercentage={40}
            noPercentage={60}
            onPress={() =>
              handleMarketPress({
                title: 'Will Price of Tether REACH $1200.00 by 31st December, 2025?',
                yesPercentage: 40,
                noPercentage: 60,
                category: 'Token',
              })
            }
          />
          <MarketCard
            title="Will Price of SOL exceed $200 by 31st December, 2025?"
            yesPercentage={65}
            noPercentage={35}
            onPress={() =>
              handleMarketPress({
                title: 'Will Price of SOL exceed $200 by 31st December, 2025?',
                yesPercentage: 65,
                noPercentage: 35,
                category: 'Solana',
              })
            }
          />
        </View>

        {/* Token Prices */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trending Tokens</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tokenScroll}
            contentContainerStyle={styles.tokenScrollContent}
          >
            <TokenCard
              symbol="BONK"
              name="Bonk"
              price="$0.00001904"
              change="2.00%"
              isPositive={true}
            />
            <TokenCard
              symbol="USDT"
              name="Tether"
              price="$1.00"
              change="4.36%"
              isPositive={true}
            />
            <TokenCard
              symbol="PENGU"
              name="PENGU"
              price="$0.02804879"
              change="3.43%"
              isPositive={true}
            />
            <TokenCard
              symbol="TRUMP"
              name="TRUMP"
              price="$7.59"
              change="2.62%"
              isPositive={false}
            />
            <TokenCard
              symbol="SOL"
              name="Solana"
              price="$207.04"
              change="7.56%"
              isPositive={true}
            />
          </ScrollView>
        </View>

        {/* Why Choose Us */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why Choose Us</Text>
          <FeatureCard
            icon="flash"
            title="Stake on the Future"
            description="Stake on predictions anytime, anywhere with our secure, easy-to-use decentralized platform."
          />
          <FeatureCard
            icon="rocket"
            title="Fast Transaction"
            description="Stake on outcomes with our secure, easy-to-use decentralized platform. With transparent smart contracts and community-backed resolution, you can predict with confidence anytime."
          />
          <FeatureCard
            icon="shield-checkmark"
            title="Secure"
            description="Gain access to a variety of prediction markets with just a few clicks. Our intuitive platform makes it simple to create events, stake tokens, and claim your rewards safely."
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
  },
  logo: {
    fontSize: 24,
    fontWeight: '700',
    color: '#6366f1',
  },
  heroSection: {
    padding: 20,
    backgroundColor: '#6366f1',
    marginTop: 1,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 12,
    lineHeight: 40,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#e0e7ff',
    marginBottom: 24,
    lineHeight: 24,
  },
  heroButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  heroButton: {
    flex: 1,
  },
  statsSection: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
    backgroundColor: '#ffffff',
    marginTop: 1,
  },
  section: {
    padding: 20,
    backgroundColor: '#ffffff',
    marginTop: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 16,
  },
  seeMore: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366f1',
  },
  tokenScroll: {
    marginHorizontal: -20,
  },
  tokenScrollContent: {
    paddingHorizontal: 20,
  },
});

