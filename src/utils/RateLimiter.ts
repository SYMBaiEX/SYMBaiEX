export interface RateLimiterConfig {
  maxRequests: number;
  windowMs: number;
}

export class RateLimiter {
  private requests: number[] = [];
  private readonly maxRequests: number;
  private readonly windowMs: number;
  private readonly storageKey: string;
  private readonly prefix = 'symx_';

  constructor(config: RateLimiterConfig, storageKey?: string) {
    this.maxRequests = config.maxRequests;
    this.windowMs = config.windowMs;
    this.storageKey = `${this.prefix}${storageKey || 'rate_limit_requests'}`;
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.storageKey);
      this.requests = stored ? JSON.parse(stored) : [];
      this.clearOldRequests();
    } catch (error) {
      console.error('Failed to load rate limit data:', error);
      this.requests = [];
    }
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.requests));
    } catch (error) {
      console.error('Failed to save rate limit data:', error);
    }
  }

  canMakeRequest(): boolean {
    this.clearOldRequests();
    return this.requests.length < this.maxRequests;
  }

  incrementRequests(): void {
    this.clearOldRequests();
    this.requests.push(Date.now());
    this.saveToStorage();
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
    this.saveToStorage();
  }

  clear(): void {
    this.requests = [];
    localStorage.removeItem(this.storageKey);
  }
}