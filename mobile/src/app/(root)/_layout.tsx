import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Чаты',
          tabBarIcon: ({ color }) => <Ionicons name="chatbubbles" size={24} color={color} />,
          headerTitle: 'Emergent Chat',
        }}
      />
      <Tabs.Screen
        name="channels"
        options={{
          title: 'Каналы',
          tabBarIcon: ({ color }) => <Ionicons name="grid" size={24} color={color} />,
          headerTitle: 'Каналы',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Профиль',
          tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
          headerTitle: 'Профиль',
        }}
      />
    </Tabs>
  );
}
