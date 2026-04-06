import requests
import socketio
from typing import Optional, Dict, Any

class EmergentClient:
    """Python SDK for Emergent API"""

    def __init__(self, api_url: str, ws_url: str, token: Optional[str] = None):
        self.api_url = api_url
        self.ws_url = ws_url
        self.token = token
        self.session = requests.Session()
        self.sio = socketio.Client()

        if token:
            self.set_token(token)

    def set_token(self, token: str):
        """Set authentication token"""
        self.token = token
        self.session.headers.update({
            'Authorization': f'Bearer {token}',
            'Content-Type': 'application/json'
        })

    def connect(self):
        """Connect to WebSocket"""
        try:
            self.sio.connect(
                self.ws_url,
                auth={'token': self.token},
                wait_timeout=10
            )
        except Exception as e:
            print(f"Connect error: {e}")

    def disconnect(self):
        """Disconnect from WebSocket"""
        if self.sio.connected:
            self.sio.disconnect()

    def on(self, event: str, callback):
        """Register event listener"""
        self.sio.on(event, callback)

    def emit(self, event: str, data: Dict[str, Any]):
        """Emit WebSocket event"""
        self.sio.emit(event, data)

    # Auth API
    def register(self, email: str, username: str, password: str):
        """Register new user"""
        return self.session.post(f"{self.api_url}/auth/register", json={
            'email': email,
            'username': username,
            'password': password
        }).json()

    def login(self, email: str, password: str):
        """Login user"""
        return self.session.post(f"{self.api_url}/auth/login", json={
            'email': email,
            'password': password
        }).json()

    # Users API
    def get_current_user(self):
        """Get current user"""
        return self.session.get(f"{self.api_url}/auth/me").json()

    def get_user(self, user_id: str):
        """Get user by ID"""
        return self.session.get(f"{self.api_url}/users/{user_id}").json()

    # Workspaces API
    def create_workspace(self, name: str, description: Optional[str] = None):
        """Create workspace"""
        return self.session.post(f"{self.api_url}/workspaces", json={
            'name': name,
            'description': description
        }).json()

    def list_workspaces(self):
        """List workspaces"""
        return self.session.get(f"{self.api_url}/workspaces").json()

    # Channels API
    def create_channel(self, workspace_id: str, name: str, description: Optional[str] = None):
        """Create channel"""
        return self.session.post(f"{self.api_url}/channels", json={
            'workspaceId': workspace_id,
            'name': name,
            'description': description
        }).json()

    # Messages API
    def send_message(self, channel_id: str, user_id: str, content: str):
        """Send message"""
        return self.session.post(f"{self.api_url}/messages/{channel_id}", json={
            'userId': user_id,
            'content': content,
            'type': 'text'
        }).json()

    def get_messages(self, channel_id: str, skip: int = 0, take: int = 50):
        """Get channel messages"""
        return self.session.get(
            f"{self.api_url}/messages/channel/{channel_id}",
            params={'skip': skip, 'take': take}
        ).json()
