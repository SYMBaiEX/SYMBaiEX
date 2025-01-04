import { BaseCharacter, AICharacter } from '../../types/character';

export interface RateLimiter {
  canMakeRequest(): boolean;
  incrementRequests(): void;
  getRemainingRequests(): number;
  getTimeUntilReset(): number;
  clear(): void;
}

export interface AIProvider {
  chat(message: string, character: AICharacter): Promise<string>;
  validateConfig(): Promise<boolean>;
}

export interface ProviderConfig {
  apiKey?: string;
  host?: string;
  baseUrl?: string;
  models: {
    normal: string;
    large: string;
  };
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatResponse {
  message: string;
  error?: string;
}

export type { BaseCharacter, AICharacter };