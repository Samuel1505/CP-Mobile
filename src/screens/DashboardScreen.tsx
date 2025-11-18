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
import MarketCard from '../components/MarketCard';

export default function DashboardScreen() {
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
      category: market.category || 'Ethereum',
      endDate: 'December 31, 2025',
      totalStaked: '125.5 ETH',
    });
  };
  const stats = [
    { label: 'Total Staked', value: '12.5 ETH', icon: 'wallet' },
    { label: 'Active Markets', value: '8', icon: 'stats-chart' },
    { label: 'Wins', value: '15', icon: 'trophy' },
    { label: 'Total Earnings', value: '3.2 ETH', icon: 'cash' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Dashboard</Text>
          <TouchableOpacity>
            <Ionicons name="settings-outline" size={24} color="#1f2937" />
          </TouchableOpacity>
        </View>

        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <Ionicons name={stat.icon as any} size={24} color="#6366f1" />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Markets</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>

          <MarketCard
            title="Will Ethereum reach $5000 by end of 2025?"
            yesPercentage={45}
            noPercentage={55}
            onPress={() =>
              handleMarketPress({
                title: 'Will Ethereum reach $5000 by end of 2025?',
                yesPercentage: 45,
                noPercentage: 55,
                category: 'Ethereum',
              })
            }
          />
          <MarketCard
            title="Will Solana outperform Ethereum in Q2 2025?"
            yesPercentage={60}
            noPercentage={40}
            onPress={() =>
              handleMarketPress({
                title: 'Will Solana outperform Ethereum in Q2 2025?',
                yesPercentage: 60,
                noPercentage: 40,
                category: 'Solana',
              })
            }
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityList}>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Ionicons name="checkmark-circle" size={20} color="#10b981" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Market Resolved</Text>
                <Text style={styles.activitySubtitle}>
                  "Will BTC hit $100k?" - You won 0.5 ETH
                </Text>
                <Text style={styles.activityTime}>2 hours ago</Text>
              </View>
            </View>

            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Ionicons name="add-circle" size={20} color="#6366f1" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Stake Placed</Text>
                <Text style={styles.activitySubtitle}>
                  Staked 0.2 ETH on "Yes" for SOL market
                </Text>
                <Text style={styles.activityTime}>5 hours ago</Text>
              </View>
            </View>

            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Ionicons name="create" size={20} color="#8b5cf6" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Market Created</Text>
                <Text style={styles.activitySubtitle}>
                  Created new market: "Will ETH 2.0 launch?"
                </Text>
                <Text style={styles.activityTime}>1 day ago</Text>
              </View>
            </View>
          </View>
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
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1f2937',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    gap: 12,
    backgroundColor: '#ffffff',
  },
  statCard: {
    width: '47%',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#eef2ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
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
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366f1',
  },
  activityList: {
    gap: 16,
  },
  activityItem: {
    flexDirection: 'row',
    gap: 12,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  activitySubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: '#9ca3af',
  },
});

