import type { ToastStats, ToastType } from './types';
import { DEFAULT_STATS } from './types';

/**
 * Statistics manager for tracking toast usage
 */
class StatisticsManager {
  private stats: ToastStats;

  constructor() {
    this.stats = { ...DEFAULT_STATS };
  }

  /**
   * Update stats for a specific toast type
   */
  update(type: ToastType): void {
    this.stats.total += 1;
    this.stats[type] += 1;
    this.updateDisplay();
  }

  /**
   * Get current stats
   */
  getStats(): ToastStats {
    return { ...this.stats };
  }

  /**
   * Reset all stats to zero
   */
  reset(): void {
    this.stats = { ...DEFAULT_STATS };
    this.updateDisplay();
  }

  /**
   * Update the stats display in the DOM
   */
  updateDisplay(): void {
    const elements = {
      total: document.getElementById('stat-total'),
      success: document.getElementById('stat-success'),
      error: document.getElementById('stat-error'),
      warning: document.getElementById('stat-warning'),
      info: document.getElementById('stat-info')
    };

    Object.entries(elements).forEach(([key, element]) => {
      if (element) {
        element.textContent = this.stats[key as keyof ToastStats].toString();
      }
    });
  }

  /**
   * Setup toast close event listener for statistics
   */
  setupEventListener(): void {
    document.addEventListener('toast-close', () => {
      this.updateDisplay();
    });
  }
}

// Export singleton instance
export const statisticsManager = new StatisticsManager();

// Export class for custom instances
export { StatisticsManager };
