import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface MarketCardProps {
  title: string;
  yesPercentage: number;
  noPercentage: number;
  onPress?: () => void;
}

export default function MarketCard({
  title,
  yesPercentage,
  noPercentage,
  onPress,
}: MarketCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
      <View style={styles.percentageContainer}>
        <View style={styles.percentageRow}>
          <View style={styles.percentageBarContainer}>
            <View
              style={[
                styles.percentageBar,
                styles.yesBar,
                { width: `${yesPercentage}%` },
              ]}
            />
          </View>
          <Text style={styles.percentageText}>Yes {yesPercentage}%</Text>
        </View>
        <View style={styles.percentageRow}>
          <View style={styles.percentageBarContainer}>
            <View
              style={[
                styles.percentageBar,
                styles.noBar,
                { width: `${noPercentage}%` },
              ]}
            />
          </View>
          <Text style={styles.percentageText}>No {noPercentage}%</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
    lineHeight: 22,
  },
  percentageContainer: {
    gap: 12,
  },
  percentageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  percentageBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
    overflow: 'hidden',
  },
  percentageBar: {
    height: '100%',
    borderRadius: 4,
  },
  yesBar: {
    backgroundColor: '#10b981',
  },
  noBar: {
    backgroundColor: '#ef4444',
  },
  percentageText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    minWidth: 70,
  },
});

