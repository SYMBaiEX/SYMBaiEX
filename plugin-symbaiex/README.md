# SYMBaiEX Plugin for ElizaOS

Connect your ElizaOS agents with the SYMBaiEX network for character creation.

## Installation

```bash
npm install @symbaiex/plugin
```

## Usage

```typescript
import { SYMBaiEXPlugin } from '@symbaiex/plugin';

// Initialize plugin with API key
const plugin = new SYMBaiEXPlugin({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.symbaiex.com/v1' // Optional
});

// Add to your ElizaOS agent
const agent = {
  plugins: [plugin]
};
```

## Character Creation

Your agent can create characters by using natural language:

```
create a character name: Alice, bio: friendly AI assistant, lore: created in the digital age
```

The plugin will:
1. Parse the request
2. Send it to the SYMBaiEX API
3. Return a markdown link to download the character JSON

## Configuration

Required environment variables:
```env
SYMBAIEX_API_KEY=your-api-key
```

## License

MIT