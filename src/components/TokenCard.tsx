import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface TokenCardProps {
  symbol: string;
  name: string;
  price: string;
  change: string;
  isPositive: boolean;
  onPress?: () => void;
}

export default function TokenCard({
  symbol,
  name,
  price,
  change,
  isPositive,
  onPress,
}: TokenCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <View style={styles.symbolContainer}>
          <Text style={styles.symbol}>{symbol}</Text>
        </View>
        <Text style={styles.name}>{name}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{price}</Text>
        <Text style={[styles.change, isPositive ? styles.positive : styles.negative]}>
          {isPositive ? '+' : ''}{change}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  symbolContainer: {
    backgroundColor: '#6366f1',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  symbol: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  priceContainer: {
    gap: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
  },
  change: {
    fontSize: 14,
    fontWeight: '600',
  },
  positive: {
    color: '#10b981',
  },
  negative: {
    color: '#ef4444',
  },
});

