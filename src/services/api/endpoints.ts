export const API_ENDPOINTS = {
  // Chat endpoints
  CHAT: '/api/chat',
  CHAT_HISTORY: '/api/chat/history',
  
  // Agent endpoints
  AGENTS: '/api/agents',
  AGENT_PROFILE: '/api/agents/:id',
  
  // Character creation
  CHARACTER_CREATE: '/api/character/create',
  
  // System endpoints
  SYSTEM_STATUS: '/api/system/status',
  SYSTEM_METRICS: '/api/system/metrics',
  
  // Authentication
  AUTH: '/api/auth',
  VERIFY: '/api/auth/verify',
} as const;