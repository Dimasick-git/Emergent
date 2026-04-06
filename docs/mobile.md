# Mobile Implementation Guide

## React Native Setup

### Project Structure

```
mobile/
├── app/
│   ├── navigation/
│   ├── screens/
│   ├── components/
│   ├── store/
│   ├── api/
│   └── App.tsx
├── app.json
├── app.config.js
├── eas.json
├── package.json
└── tsconfig.json
```

### Initialize with Expo

```bash
npx create-expo-app mobile
cd mobile

# Add TypeScript
npx expo prebuild --clean

# Install dependencies
npm install @react-navigation/native @react-navigation/stack
npm install socket.io-client axios zustand
```

### Navigation

```typescript
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
```

### API Integration

```typescript
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001/api',
});

export const authApi = {
  login: (email: string, password: string) =>
    API.post('/auth/login', { email, password }),
  register: (email: string, username: string, password: string) =>
    API.post('/auth/register', { email, username, password }),
};
```

### WebSocket Integration

```typescript
import io from 'socket.io-client';

const socket = io('ws://localhost:3001', {
  query: { token: 'your-token' },
});

socket.on('message:created', (data) => {
  console.log('New message:', data);
});
```

## Build and Deploy

### Build APK

```bash
eas build --platform android
```

### Build IPA

```bash
eas build --platform ios
```

### Submit to Store

```bash
eas submit --platform android
eas submit --platform ios
```

## Features

- [x] User authentication
- [x] Workspace selection
- [x] Channel browsing
- [x] Message sending/receiving
- [x] Real-time updates
- [ ] File upload
- [ ] Voice messages
- [ ] Push notifications

## Permissions

```json
{
  "expo": {
    "plugins": [
      ["expo-media-library", {
        "photosPermission": "Allow $(PRODUCT_NAME) to access your photos",
        "savePhotosPermission": "Allow $(PRODUCT_NAME) to save photos",
        "videoPermission": "Allow $(PRODUCT_NAME) to access your videos"
      }],
      ["expo-file-system"],
      ["expo-permissions"]
    ]
  }
}
```

## Native Code (iOS/Android)

See native modules directory for platform-specific implementations.

## Flutter Alternative

For Flutter implementation, follow similar architecture patterns with:

- Provider for state management
- Http for API calls
- Socket.io Flutter package for WebSocket

```dart
import 'package:http/http.dart' as http;
import 'package:socket_io_client/socket_io_client.dart' as IO;

class EmergentClient {
  final String apiUrl;
  final String wsUrl;
  late IO.Socket socket;

  EmergentClient({
    required this.apiUrl,
    required this.wsUrl,
  });

  void connect(String token) {
    socket = IO.io(wsUrl, IO.OptionBuilder()
      .setQuery({'token': token})
      .build());
  }
}
```
