import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { channelsAPI } from '../api/channels.api';

export default function ChannelsScreen() {
  const router = useRouter();
  const [channels, setChannels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadChannels();
  }, []);

  const loadChannels = async () => {
    try {
      setLoading(true);
      const data = await channelsAPI.getChannels();
      setChannels(data);
    } catch (error) {
      console.error('Ошибка загрузки каналов:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadChannels();
    setRefreshing(false);
  };

  const renderChannel = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.channelItem}
      onPress={() => router.push(`/(root)/channels/${item.id}`)}
    >
      <View style={styles.channelIcon}>
        <Ionicons name="grid" size={24} color="#007AFF" />
      </View>
      <View style={styles.channelInfo}>
        <Text style={styles.channelName}>#{item.name}</Text>
        <Text style={styles.channelDescription} numberOfLines={1}>
          {item.description || 'Нет описания'}
        </Text>
      </View>
      <Text style={styles.memberCount}>{item.members || 0}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {channels.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="folder-outline" size={48} color="#ccc" />
          <Text style={styles.emptyText}>Нет каналов</Text>
        </View>
      ) : (
        <FlatList
          data={channels}
          keyExtractor={(item) => item.id}
          renderItem={renderChannel}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 12,
    color: '#999',
    fontSize: 16,
  },
  channelItem: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  channelIcon: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  channelInfo: {
    flex: 1,
  },
  channelName: {
    fontSize: 16,
    fontWeight: '600',
  },
  channelDescription: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  memberCount: {
    fontSize: 12,
    color: '#666',
  },
});
