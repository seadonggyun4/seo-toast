// core/cache.ts
import { CACHE_EXPIRATION } from './constants';

type CacheValue = { timestamp: number; count: number };

export class MessageCache {
  private map = new Map<string, CacheValue>();
  private intervalId: number | null = null;

  constructor(private expiration = CACHE_EXPIRATION) {}

  start(): void {
    if (this.intervalId) return;
    this.intervalId = window.setInterval(() => this.cleanup(), 5000);
  }

  stop(): void {
    if (!this.intervalId) return;
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  get(key: string): CacheValue | undefined {
    return this.map.get(key);
  }

  set(key: string, value: CacheValue): void {
    this.map.set(key, value);
  }

  touchOrCreate(key: string, now: number): CacheValue {
    const cur = this.map.get(key);
    if (cur) {
      cur.timestamp = now;
      cur.count += 1;
      return cur;
    }
    const v = { timestamp: now, count: 1 };
    this.map.set(key, v);
    return v;
  }

  delete(key: string): void {
    this.map.delete(key);
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [k, v] of this.map.entries()) {
      if (now - v.timestamp > this.expiration) {
        this.map.delete(k);
      }
    }
  }
}
