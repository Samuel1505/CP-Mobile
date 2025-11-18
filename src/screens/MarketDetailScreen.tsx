import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Button from '../components/Button';

interface MarketDetailScreenParams {
  marketId?: string;
  title?: string;
  yesPercentage?: number;
  noPercentage?: number;
  endDate?: string;
  totalStaked?: string;
  category?: string;
}

export default function MarketDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const params = (route.params as MarketDetailScreenParams) || {};

  const [stakeAmount, setStakeAmount] = useState('');
  const [selectedOption, setSelectedOption] = useState<'yes' | 'no' | null>(null);

  const {
    title = 'Will Bonk Transition to proof-of-stake by Q3 2025',
    yesPercentage = 52,
    noPercentage = 48,
    endDate = 'December 31, 2025',
    totalStaked = '125.5 ETH',
    category = 'Solana',
  } = params;

  const handleStake = () => {
    if (!selectedOption || !stakeAmount) {
      return;
    }
    // Handle stake logic here
    console.log('Staking', stakeAmount, 'on', selectedOption);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#1f2937" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Market Details</Text>
          <TouchableOpacity>
            <Ionicons name="share-outline" size={24} color="#1f2937" />
          </TouchableOpacity>
        </View>

        {/* Market Info */}
        <View style={styles.marketInfo}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{category}</Text>
          </View>
          <Text style={styles.marketTitle}>{title}</Text>
          <View style={styles.metaInfo}>
            <View style={styles.metaItem}>
              <Ionicons name="calendar-outline" size={16} color="#6b7280" />
              <Text style={styles.metaText}>Ends: {endDate}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="wallet-outline" size={16} color="#6b7280" />
              <Text style={styles.metaText}>Total: {totalStaked}</Text>
            </View>
          </View>
        </View>

        {/* Prediction Bars */}
        <View style={styles.predictionSection}>
          <Text style={styles.sectionTitle}>Current Predictions</Text>
          <View style={styles.predictionContainer}>
            <TouchableOpacity
              style={[
                styles.predictionOption,
                selectedOption === 'yes' && styles.predictionOptionSelected,
              ]}
              onPress={() => setSelectedOption('yes')}
            >
              <View style={styles.predictionHeader}>
                <Text style={styles.predictionLabel}>Yes</Text>
                <Text style={styles.predictionPercentage}>{yesPercentage}%</Text>
              </View>
              <View style={styles.predictionBarContainer}>
                <View
                  style={[
                    styles.predictionBar,
                    styles.yesBar,
                    { width: `${yesPercentage}%` },
                  ]}
                />
              </View>
              <Text style={styles.predictionAmount}>62.5 ETH staked</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.predictionOption,
                selectedOption === 'no' && styles.predictionOptionSelected,
              ]}
              onPress={() => setSelectedOption('no')}
            >
              <View style={styles.predictionHeader}>
                <Text style={styles.predictionLabel}>No</Text>
                <Text style={styles.predictionPercentage}>{noPercentage}%</Text>
              </View>
              <View style={styles.predictionBarContainer}>
                <View
                  style={[
                    styles.predictionBar,
                    styles.noBar,
                    { width: `${noPercentage}%` },
                  ]}
                />
              </View>
              <Text style={styles.predictionAmount}>63.0 ETH staked</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stake Section */}
        <View style={styles.stakeSection}>
          <Text style={styles.sectionTitle}>Place Your Stake</Text>
          <View style={styles.stakeInputContainer}>
            <TextInput
              style={styles.stakeInput}
              placeholder="Enter amount"
              placeholderTextColor="#9ca3af"
              value={stakeAmount}
              onChangeText={setStakeAmount}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.maxButton}>
              <Text style={styles.maxButtonText}>MAX</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.quickAmounts}>
            {['0.1', '0.5', '1.0', '5.0'].map((amount) => (
              <TouchableOpacity
                key={amount}
                style={styles.quickAmountButton}
                onPress={() => setStakeAmount(amount)}
              >
                <Text style={styles.quickAmountText}>{amount} ETH</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Button
            title={selectedOption ? `Stake on ${selectedOption.toUpperCase()}` : 'Select Yes or No'}
            onPress={handleStake}
            disabled={!selectedOption || !stakeAmount}
            style={styles.stakeButton}
          />
        </View>

        {/* Market Stats */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Market Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>125.5 ETH</Text>
              <Text style={styles.statLabel}>Total Pool</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>234</Text>
              <Text style={styles.statLabel}>Participants</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>48h</Text>
              <Text style={styles.statLabel}>Time Remaining</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>2.5%</Text>
              <Text style={styles.statLabel}>Platform Fee</Text>
            </View>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.activitySection}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityList}>
            <View style={styles.activityItem}>
              <View style={[styles.activityIcon, styles.activityIconYes]}>
                <Ionicons name="arrow-up" size={16} color="#10b981" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>
                  <Text style={styles.activityUser}>CryptoMaster</Text> staked 2.5 ETH on{' '}
                  <Text style={styles.activityOption}>Yes</Text>
                </Text>
                <Text style={styles.activityTime}>2 minutes ago</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <View style={[styles.activityIcon, styles.activityIconNo]}>
                <Ionicons name="arrow-down" size={16} color="#ef4444" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>
                  <Text style={styles.activityUser}>PredictionPro</Text> staked 1.8 ETH on{' '}
                  <Text style={styles.activityOption}>No</Text>
                </Text>
                <Text style={styles.activityTime}>15 minutes ago</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <View style={[styles.activityIcon, styles.activityIconYes]}>
                <Ionicons name="arrow-up" size={16} color="#10b981" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>
                  <Text style={styles.activityUser}>MarketWizard</Text> staked 5.0 ETH on{' '}
                  <Text style={styles.activityOption}>Yes</Text>
                </Text>
                <Text style={styles.activityTime}>1 hour ago</Text>
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
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
  },
  marketInfo: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#eef2ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6366f1',
  },
  marketTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 16,
    lineHeight: 32,
  },
  metaInfo: {
    flexDirection: 'row',
    gap: 20,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 14,
    color: '#6b7280',
  },
  predictionSection: {
    padding: 20,
    backgroundColor: '#ffffff',
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 16,
  },
  predictionContainer: {
    gap: 16,
  },
  predictionOption: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  predictionOptionSelected: {
    borderColor: '#6366f1',
    backgroundColor: '#eef2ff',
  },
  predictionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  predictionLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
  },
  predictionPercentage: {
    fontSize: 18,
    fontWeight: '700',
    color: '#6366f1',
  },
  predictionBarContainer: {
    height: 12,
    backgroundColor: '#e5e7eb',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 8,
  },
  predictionBar: {
    height: '100%',
    borderRadius: 6,
  },
  yesBar: {
    backgroundColor: '#10b981',
  },
  noBar: {
    backgroundColor: '#ef4444',
  },
  predictionAmount: {
    fontSize: 14,
    color: '#6b7280',
  },
  stakeSection: {
    padding: 20,
    backgroundColor: '#ffffff',
    marginTop: 16,
  },
  stakeInputContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  stakeInput: {
    flex: 1,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1f2937',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  maxButton: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#6366f1',
    borderRadius: 12,
    justifyContent: 'center',
  },
  maxButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  quickAmounts: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  quickAmountButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
  },
  quickAmountText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366f1',
  },
  stakeButton: {
    marginTop: 8,
  },
  statsSection: {
    padding: 20,
    backgroundColor: '#ffffff',
    marginTop: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statItem: {
    width: '47%',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
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
  },
  activitySection: {
    padding: 20,
    backgroundColor: '#ffffff',
    marginTop: 16,
    marginBottom: 20,
  },
  activityList: {
    gap: 16,
  },
  activityItem: {
    flexDirection: 'row',
    gap: 12,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIconYes: {
    backgroundColor: '#d1fae5',
  },
  activityIconNo: {
    backgroundColor: '#fee2e2',
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: '#1f2937',
    marginBottom: 4,
  },
  activityUser: {
    fontWeight: '600',
    color: '#1f2937',
  },
  activityOption: {
    fontWeight: '600',
    color: '#6366f1',
  },
  activityTime: {
    fontSize: 12,
    color: '#9ca3af',
  },
});

