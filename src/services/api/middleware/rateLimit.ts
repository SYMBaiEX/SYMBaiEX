import { RateLimiterConfig } from '../../../utils/RateLimiter';

export class RateLimiter {
  private requests: number[] = [];
  private readonly maxRequests: number;
  private readonly windowMs: number;

  constructor(config: RateLimiterConfig) {
    this.maxRequests = config.maxRequests;
    this.windowMs = config.windowMs;
  }

  canMakeRequest(): boolean {
    this.clearOldRequests();
    return this.requests.length < this.maxRequests;
  }

  incrementRequests(): void {
    this.clearOldRequests();
    this.requests.push(Date.now());
  }

  getRemainingRequests(): number {
    this.clearOldRequests();
    return Math.max(0, this.maxRequests - this.requests.length);
  }

  getTimeUntilReset(): number {
    if (this.requests.length === 0) return 0;
    const oldestRequest = Math.min(...this.requests);
    return Math.max(0, this.windowMs - (Date.now() - oldestRequest));
  }

  private clearOldRequests(): void {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < this.windowMs);
  }
}

// Create and export a singleton instance
export const rateLimiter = new RateLimiter({
  maxRequests: 20,
  windowMs: 900000 // 15 minutes
});