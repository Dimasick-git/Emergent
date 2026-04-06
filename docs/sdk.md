# SDK Guide

## TypeScript SDK

### Installation

```bash
npm install @emergent/sdk
```

### Basic Usage

```typescript
import { EmergentClient } from '@emergent/sdk';

const client = new EmergentClient({
  apiUrl: 'http://localhost:3001/api',
  wsUrl: 'ws://localhost:3001',
  token: 'your-jwt-token'
});

// Register new user
const response = await client.register('user@example.com', 'username', 'password');

// Login
const auth = await client.login('user@example.com', 'password');
client.setToken(auth.data.accessToken);

// Create workspace
const workspace = await client.createWorkspace('My Team', 'Team workspace');

// List workspaces
const workspaces = await client.listWorkspaces();

// Create channel
const channel = await client.createChannel(
  workspace.data.id,
  'general',
  'General discussion'
);

// Send message
const message = await client.sendMessage(
  channel.data.id,
  'user-id',
  'Hello, world!'
);

// Get messages
const messages = await client.getMessages(channel.data.id, 0, 50);
```

### Real-time Events

```typescript
// Connect to WebSocket
client.connect();

// Listen for messages
client.on('message:created', (data) => {
  console.log('New message:', data);
});

// Send message via WebSocket
client.emit('message:create', {
  channelId: 'channel-id',
  userId: 'user-id',
  content: 'Hello!'
});

// Disconnect
client.disconnect();
```

## Python SDK

### Installation

```bash
pip install emergent-sdk
```

### Basic Usage

```python
from emergent import EmergentClient

client = EmergentClient(
    api_url='http://localhost:3001/api',
    ws_url='ws://localhost:3001',
    token='your-jwt-token'
)

# Login
response = client.login('user@example.com', 'password')
client.set_token(response['accessToken'])

# Create workspace
workspace = client.create_workspace('My Team', 'Team workspace')

# List workspaces
workspaces = client.list_workspaces()

# Create channel
channel = client.create_channel(workspace['id'], 'general')

# Send message
message = client.send_message(channel['id'], 'user-id', 'Hello!')

# Get messages
messages = client.get_messages(channel['id'], skip=0, take=50)
```

### Real-time Events

```python
# Connect
client.connect()

# Listen for messages
@client.on('message:created')
def on_message(data):
    print(f"New message: {data}")

# Send event
client.emit('message:create', {
    'channelId': 'channel-id',
    'userId': 'user-id',
    'content': 'Hello!'
})

# Disconnect
client.disconnect()
```

## Go SDK

### Installation

```bash
go get github.com/Dimasick-git/emergent-sdk-go
```

### Basic Usage

```go
package main

import (
    "fmt"
    "github.com/Dimasick-git/emergent-sdk-go/emergent"
)

func main() {
    config := &emergent.ClientConfig{
        APIURL: "http://localhost:3001/api",
        WSURL:  "ws://localhost:3001",
        Token:  "your-jwt-token",
    }
    
    client := emergent.NewClient(config)
    
    // Login
    auth, err := client.Login("user@example.com", "password")
    if err != nil {
        panic(err)
    }
    client.SetToken(auth["accessToken"].(string))
    
    // Create workspace
    workspace, err := client.CreateWorkspace("My Team", "Team workspace")
    if err != nil {
        panic(err)
    }
    
    // Create channel
    channel, err := client.CreateChannel(
        workspace["id"].(string),
        "general",
        "General discussion",
    )
    if err != nil {
        panic(err)
    }
    
    // Send message
    message, err := client.SendMessage(
        channel["id"].(string),
        "user-id",
        "Hello, world!",
    )
    if err != nil {
        panic(err)
    }
    
    fmt.Println("Message sent:", message)
}
```

## API Reference

### Authentication

#### Register

```typescript
client.register(email, username, password)
```

#### Login

```typescript
client.login(email, password)
```

### Workspaces

#### Create

```typescript
client.createWorkspace(name, description?)
```

#### List

```typescript
client.listWorkspaces()
```

#### Get

```typescript
client.getWorkspace(id)
```

### Channels

#### Create

```typescript
client.createChannel(workspaceId, name, description?)
```

#### Get

```typescript
client.getChannel(id)
```

### Messages

#### Send

```typescript
client.sendMessage(channelId, userId, content)
```

#### Get

```typescript
client.getMessages(channelId, skip?, take?)
```

#### React

```typescript
client.addReaction(messageId, userId, emoji)
```

## Error Handling

```typescript
try {
  await client.sendMessage(channelId, userId, 'Hello');
} catch (error) {
  if (error.response?.status === 401) {
    console.error('Unauthorized');
  } else if (error.response?.status === 404) {
    console.error('Not found');
  } else {
    console.error('Error:', error.message);
  }
}
```

## Best Practices

1. **Store tokens securely** - Use environment variables, not hardcoded
2. **Handle disconnections** - Implement reconnection logic
3. **Batch requests** - Use pagination for large datasets
4. **Rate limiting** - Implement backoff strategy
5. **Error handling** - Always wrap API calls in try-catch
6. **Resource cleanup** - Disconnect WebSocket on app exit
