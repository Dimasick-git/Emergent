# Frontend Guide

## Architecture

### Project Structure

```
frontend/
├── src/
│   ├── pages/         # Page components
│   ├── components/    # Reusable components
│   ├── store/        # Zustand state management
│   ├── api/          # API client
│   ├── hooks/        # Custom hooks
│   ├── App.tsx       # Root component
│   └── main.tsx      # Entry point
├── public/           # Static assets
├── vite.config.ts    # Vite configuration
└── tailwind.config.js # TailwindCSS configuration
```

### State Management

We use **Zustand** for global state:

```typescript
import { create } from 'zustand';

interface AppState {
  // state
  user: User | null;
  // actions
  setUser: (user: User) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

// Usage in components
const user = useAppStore((s) => s.user);
```

### API Client

Centralized API client with axios:

```typescript
import { authApi, messagesApi } from '@/api/client';

// Use in components
const response = await messagesApi.send(channelId, userId, content);
```

### WebSocket

Real-time updates with Socket.IO:

```typescript
import { useSocket } from '@/hooks/useSocket';

export const ChatComponent = () => {
  const socket = useSocket();
  
  useEffect(() => {
    socket?.on('message:created', (data) => {
      // Handle new message
    });
  }, [socket]);
};
```

## Development

### Setup

```bash
cd frontend
npm install
npm run dev
```

### Build

```bash
npm run build
npm run preview
```

### Linting

```bash
npm run lint
npm run format
```

### Environment Variables

Create `.env.local`:

```
VITE_API_URL=http://localhost:3001/api
VITE_WS_URL=ws://localhost:3001
```

## Components

### Creating Components

```typescript
interface MyComponentProps {
  title: string;
  onClick?: () => void;
}

export const MyComponent = ({ title, onClick }: MyComponentProps) => {
  return (
    <div className="p-4 bg-primary rounded">
      <h1 className="font-bold text-primary-foreground">{title}</h1>
      {onClick && <button onClick={onClick}>Click me</button>}
    </div>
  );
};
```

### Styling with TailwindCSS

```tsx
<div className="flex items-center justify-between p-4 border-b border-border">
  <h1 className="text-xl font-bold text-foreground">Title</h1>
  <button className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90">
    Action
  </button>
</div>
```

## Pages

### Creating Pages

```typescript
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const MyPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-4">
      <h1>My Page</h1>
      <button onClick={() => navigate('/other')}>Go to Other</button>
    </div>
  );
};
```

## Hooks

### Creating Custom Hooks

```typescript
import { useEffect, useState } from 'react';

export const useFetch = (url: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        setData(await response.json());
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [url]);

  return { data, loading };
};
```

## Testing

```bash
npm run test
npm run test:watch
npm run test:coverage
```

## Performance Optimization

1. **Code Splitting** - Lazy load routes
2. **Component Memoization** - Use React.memo for expensive components
3. **State Management** - Zustand prevents unnecessary re-renders
4. **Image Optimization** - Compress and serve optimized images
5. **Bundling** - Vite automatically optimizes chunks

## Debugging

```typescript
// Add debug logs
console.log('Debug:', data);

// React DevTools
// Install React DevTools browser extension

// Zustand DevTools
// Monitor store state changes
```

## Deployment

### GitHub Pages

```bash
npm run build
# Output in dist/ is deployed to GitHub Pages via GitHub Actions
```

### Environment Variables in Production

Set in GitHub repository settings → Secrets and variables → Actions

## Best Practices

1. **Type safety** - Use TypeScript for all components
2. **Component reusability** - Create small, focused components
3. **State management** - Keep state as close to usage as possible
4. **Error handling** - Handle API errors gracefully
5. **Accessibility** - Use semantic HTML and ARIA labels
6. **Performance** - Monitor and optimize bundle size

## Troubleshooting

### Vite Hot Module Replacement not working

```bash
# Clear cache and restart
rm -rf node_modules/.vite
npm run dev
```

### Module not found errors

```bash
# Check tsconfig baseUrl and paths
# Ensure import paths match configuration
```

### WebSocket connection fails

```bash
# Check VITE_WS_URL environment variable
# Verify backend is running
# Check CORS settings
```
