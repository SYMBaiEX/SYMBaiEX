import type { Message } from './types';
import { parseCharacterRequest } from './utils/characterParser';
import { RateLimiter } from './utils/RateLimiter';

export class SYMBaiEXPlugin {
  name = 'symbaiex';
  description = 'SYMBaiEX integration plugin for Eliza framework';

  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly forgeLimiter: RateLimiter;

  constructor(apiKey: string, baseUrl?: string) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl || 'https://api.symbaiex.com/v1';
    this.forgeLimiter = new RateLimiter({
      maxRequests: 5,
      windowMs: 20 * 60 * 1000 // 20 minutes
    }, 'forge_rate_limit');
  }

  async onMessage(message: Message): Promise<string | undefined> {
    try {
      const request = parseCharacterRequest(message.content);
      if (!request) return;

      if (!this.forgeLimiter.canMakeRequest()) {
        const timeLeft = this.forgeLimiter.getTimeUntilReset();
        return `Rate limit exceeded. Try again in ${Math.ceil(timeLeft / 60000)} minutes.`;
      }

      // Generate character using Galadriel
      const response = await fetch(`${this.baseUrl}/api/character/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(request)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create character');
      }

      const data = await response.json();
      this.forgeLimiter.incrementRequests();
      return data.markdownLink;
    } catch (error) {
      console.error('Plugin error:', error);
      return error instanceof Error ? error.message : 'Unknown error occurred';
    }
  }
}