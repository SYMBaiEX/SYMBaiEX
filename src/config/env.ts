export const config = {
  api: {
    baseUrl: 'https://api.symbaiex.com/v1',
    wsUrl: 'wss://api.symbaiex.com/v1/ws'
  },
  ai: {
    provider: 'galadriel',
    providers: {
      galadriel: {
        apiKey: import.meta.env.VITE_GALADRIEL_API_KEY || '',
        baseUrl: 'https://api.galadriel.com/v1'
      }
    }
  },
  galadriel: {
    apiKey: import.meta.env.VITE_GALADRIEL_API_KEY || '',
    baseUrl: 'https://api.galadriel.com/v1',
  },
  rateLimit: {
    maxRequests: Number(import.meta.env.VITE_RATE_LIMIT_MAX_REQUESTS) || 20,
    windowMs: Number(import.meta.env.VITE_RATE_LIMIT_WINDOW_MS) || 900000, // 15 minutes
  }
};