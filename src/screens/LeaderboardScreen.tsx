import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface LeaderboardEntry {
  rank: number;
  username: string;
  earnings: string;
  wins: number;
  winRate: string;
}

export default function LeaderboardScreen() {
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'all'>('all');

  const leaderboardData: LeaderboardEntry[] = [
    {
      rank: 1,
      username: 'CryptoMaster',
      earnings: '125.5 ETH',
      wins: 234,
      winRate: '78%',
    },
    {
      rank: 2,
      username: 'PredictionPro',
      earnings: '98.2 ETH',
      wins: 189,
      winRate: '72%',
    },
    {
      rank: 3,
      username: 'MarketWizard',
      earnings: '87.3 ETH',
      wins: 156,
      winRate: '69%',
    },
    {
      rank: 4,
      username: 'StakeKing',
      earnings: '76.1 ETH',
      wins: 142,
      winRate: '65%',
    },
    {
      rank: 5,
      username: 'ForecastGuru',
      earnings: '65.8 ETH',
      wins: 128,
      winRate: '63%',
    },
    {
      rank: 6,
      username: 'BetExpert',
      earnings: '54.2 ETH',
      wins: 115,
      winRate: '61%',
    },
    {
      rank: 7,
      username: 'CryptoOracle',
      earnings: '48.9 ETH',
      wins: 98,
      winRate: '58%',
    },
    {
      rank: 8,
      username: 'MarketSeer',
      earnings: '42.5 ETH',
      wins: 87,
      winRate: '56%',
    },
  ];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return '#fbbf24';
    if (rank === 2) return '#9ca3af';
    if (rank === 3) return '#cd7f32';
    return '#6b7280';
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Leaderboard</Text>
        <Text style={styles.subtitle}>Top performers this month</Text>
      </View>

      <View style={styles.timeframeContainer}>
        {(['daily', 'weekly', 'all'] as const).map((tf) => (
          <TouchableOpacity
            key={tf}
            style={[
              styles.timeframeButton,
              timeframe === tf && styles.timeframeButtonActive,
            ]}
            onPress={() => setTimeframe(tf)}
          >
            <Text
              style={[
                styles.timeframeText,
                timeframe === tf && styles.timeframeTextActive,
              ]}
            >
              {tf.charAt(0).toUpperCase() + tf.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.leaderboard}>
          {leaderboardData.map((entry) => (
            <View
              key={entry.rank}
              style={[
                styles.leaderboardItem,
                entry.rank <= 3 && styles.topThreeItem,
              ]}
            >
              <View style={styles.rankContainer}>
                <Text
                  style={[
                    styles.rank,
                    { color: getRankColor(entry.rank) },
                  ]}
                >
                  {getRankIcon(entry.rank)}
                </Text>
              </View>

              <View style={styles.userInfo}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {entry.username.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <View style={styles.userDetails}>
                  <Text style={styles.username}>{entry.username}</Text>
                  <Text style={styles.userStats}>
                    {entry.wins} wins • {entry.winRate} win rate
                  </Text>
                </View>
              </View>

              <View style={styles.earningsContainer}>
                <Text style={styles.earnings}>{entry.earnings}</Text>
                <Text style={styles.earningsLabel}>Total Earnings</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.yourRankSection}>
          <Text style={styles.yourRankTitle}>Your Rank</Text>
          <View style={styles.yourRankCard}>
            <View style={styles.rankContainer}>
              <Text style={styles.yourRankNumber}>#42</Text>
            </View>
            <View style={styles.userInfo}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>Y</Text>
              </View>
              <View style={styles.userDetails}>
                <Text style={styles.username}>You</Text>
                <Text style={styles.userStats}>12 wins • 55% win rate</Text>
              </View>
            </View>
            <View style={styles.earningsContainer}>
              <Text style={styles.earnings}>8.5 ETH</Text>
              <Text style={styles.earningsLabel}>Total Earnings</Text>
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
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  timeframeContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  timeframeButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
  },
  timeframeButtonActive: {
    backgroundColor: '#6366f1',
  },
  timeframeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  timeframeTextActive: {
    color: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  leaderboard: {
    padding: 20,
    gap: 12,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  topThreeItem: {
    borderWidth: 2,
    borderColor: '#eef2ff',
  },
  rankContainer: {
    width: 40,
    alignItems: 'center',
  },
  rank: {
    fontSize: 18,
    fontWeight: '700',
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  userDetails: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  userStats: {
    fontSize: 12,
    color: '#6b7280',
  },
  earningsContainer: {
    alignItems: 'flex-end',
  },
  earnings: {
    fontSize: 16,
    fontWeight: '700',
    color: '#10b981',
    marginBottom: 4,
  },
  earningsLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  yourRankSection: {
    padding: 20,
    paddingTop: 0,
  },
  yourRankTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 16,
  },
  yourRankCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eef2ff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#6366f1',
  },
  yourRankNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#6366f1',
  },
});

