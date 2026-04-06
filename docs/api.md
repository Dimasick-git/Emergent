# API Documentation

## Base URL

```
http://localhost:3001/api
```

## Authentication

All endpoints (except auth) require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### Register

```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "username": "username",
  "password": "password"
}
```

**Response:**
```json
{
  "accessToken": "eyJhbGc...",
  "refreshToken": "uuid",
  "user": {
    "id": "cuid",
    "email": "user@example.com",
    "username": "username",
    "displayName": "username"
  }
}
```

#### Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password"
}
```

#### Refresh Token

```http
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "uuid"
}
```

### Workspaces

#### List Workspaces

```http
GET /workspaces
```

#### Create Workspace

```http
POST /workspaces
Content-Type: application/json

{
  "name": "My Team",
  "description": "Team workspace"
}
```

#### Get Workspace

```http
GET /workspaces/{id}
```

#### Get Workspace Channels

```http
GET /workspaces/{id}/channels
```

### Channels

#### Create Channel

```http
POST /channels
Content-Type: application/json

{
  "workspaceId": "id",
  "name": "general",
  "description": "General discussion",
  "isPrivate": false
}
```

#### Get Channel

```http
GET /channels/{id}
```

#### Add Channel Member

```http
POST /channels/{id}/members
Content-Type: application/json

{
  "userId": "id"
}
```

### Messages

#### Send Message

```http
POST /messages/{channelId}
Content-Type: application/json

{
  "userId": "id",
  "content": "Hello world",
  "type": "text"
}
```

#### Get Channel Messages

```http
GET /messages/channel/{channelId}?skip=0&take=50
```

#### Edit Message

```http
PATCH /messages/{messageId}
Content-Type: application/json

{
  "content": "Updated message"
}
```

#### Delete Message

```http
DELETE /messages/{messageId}
```

#### Add Reaction

```http
POST /messages/{messageId}/reactions
Content-Type: application/json

{
  "userId": "id",
  "emoji": "👍"
}
```

### Users

#### Get Current User

```http
GET /auth/me
```

#### Get User

```http
GET /users/{id}
```

#### Update User

```http
PATCH /users/{id}
Content-Type: application/json

{
  "displayName": "New Name",
  "avatar": "https://...",
  "bio": "My bio",
  "status": "online"
}
```

### Files

#### Upload File

```http
POST /files/upload
Content-Type: multipart/form-data

[binary file data]
```

## WebSocket Events

### Subscribe to Channel

```javascript
ws.emit('channel:subscribe', { channelId: 'id' });
```

### Send Message

```javascript
ws.emit('message:create', {
  channelId: 'id',
  userId: 'id',
  content: 'Hello'
});
```

### Events You Receive

- `message:created` - New message
- `user:online` - User came online
- `user:offline` - User went offline
- `user:typing` - User is typing
- `message:reacted` - Reaction added

## Error Responses

### 400 Bad Request

```json
{
  "statusCode": 400,
  "message": "Invalid input",
  "error": "Bad Request"
}
```

### 401 Unauthorized

```json
{
  "statusCode": 401,
  "message": "Invalid credentials",
  "error": "Unauthorized"
}
```

### 404 Not Found

```json
{
  "statusCode": 404,
  "message": "Resource not found",
  "error": "Not Found"
}
```

## Rate Limiting

- Default: 100 requests per 15 minutes
- Limit appears in response headers:
  - `X-RateLimit-Limit`
  - `X-RateLimit-Remaining`
  - `X-RateLimit-Reset`
