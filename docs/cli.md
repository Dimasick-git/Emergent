# CLI Guide

## Installation

### Global Installation

```bash
npm install -g @emergent/cli
emergent --version
```

### Local Installation

```bash
npm install @emergent/cli
npx emergent --version
```

## Commands

### Initialize Configuration

```bash
emergent init
```

Creates `.emergent` configuration file in your project.

### User Management

#### Create User

```bash
emergent user create --email user@example.com --username username --password password
```

#### List Users

```bash
emergent user list
```

### Workspace Management

#### Create Workspace

```bash
emergent workspace create --name "My Team" --description "Team workspace"
```

#### List Workspaces

```bash
emergent workspace list
```

### Channel Management

#### Create Channel

```bash
emergent channel create \
  --workspace-id workspace-id \
  --name general \
  --description "General discussion"
```

#### Make Channel Private

```bash
emergent channel create \
  --workspace-id workspace-id \
  --name private-channel \
  --private
```

#### List Channels

```bash
emergent channel list --workspace-id workspace-id
```

### Message Operations

#### Send Message

```bash
emergent message send \
  --channel-id channel-id \
  --message "Hello, team!"
```

#### Send Message from File

```bash
emergent message send \
  --channel-id channel-id \
  --from-file message.txt
```

## Configuration

Create `.emergent` file:

```json
{
  "apiUrl": "http://localhost:3001/api",
  "wsUrl": "ws://localhost:3001",
  "token": "your-jwt-token",
  "defaultWorkspace": "workspace-id"
}
```

Or set environment variables:

```bash
export EMERGENT_API_URL=http://localhost:3001/api
export EMERGENT_WS_URL=ws://localhost:3001
export EMERGENT_TOKEN=your-jwt-token
```

## Examples

### Setup New Team

```bash
# 1. Create workspace
emergent workspace create --name "Development Team"

# 2. Create channels
emergent channel create --workspace-id <id> --name general
emergent channel create --workspace-id <id> --name random

# 3. Send welcome message
emergent message send --channel-id <id> --message "Welcome to Emergent! 🚀"
```

### Batch Operations

```bash
# Create multiple channels
for channel in general random dev-talk; do
  emergent channel create --workspace-id <id> --name $channel
done
```

### Scripting

```bash
#!/bin/bash

WORKSPACE_ID=$(emergent workspace create --name "New Team" | grep -o '"id":"[^"]*' | cut -d'"' -f4)
CHANNEL_ID=$(emergent channel create --workspace-id $WORKSPACE_ID --name general | grep -o '"id":"[^"]*' | cut -d'"' -f4)
emergent message send --channel-id $CHANNEL_ID --message "Setup complete!"
```

## Troubleshooting

### Connection Issues

```bash
# Check API connectivity
emergent ping

# Verify token
emergent auth status
```

### Debug Mode

```bash
emergent --debug <command>
```

## Help

```bash
emergent --help
emergent <command> --help
emergent user --help
```
