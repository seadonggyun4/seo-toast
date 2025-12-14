import type { DemoConfig, ToastType, ToastPosition, AnimationType } from './types';
import { ICON_MAPPINGS } from './constants';

declare const SeoToast: any;

/**
 * Control panel manager for demo configuration
 */
class ControlPanelManager {
  private config: DemoConfig;
  private onConfigChange?: (config: DemoConfig) => void;

  constructor(initialConfig: DemoConfig, onConfigChange?: (config: DemoConfig) => void) {
    this.config = { ...initialConfig };
    this.onConfigChange = onConfigChange;
  }

  /**
   * Get current configuration
   */
  getConfig(): DemoConfig {
    return { ...this.config };
  }

  /**
   * Setup all control panel event handlers
   */
  setup(): void {
    this.setupTypeButtons();
    this.setupPositionButtons();
    this.setupEnterAnimationButtons();
    this.setupExitAnimationButtons();
    this.setupIconButtons();
    this.setupFormControls();
    this.updateActiveButtons();
  }

  /**
   * Setup toast type selection buttons
   */
  private setupTypeButtons(): void {
    document.querySelectorAll('[data-type]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.config.type = (btn as HTMLElement).dataset.type as ToastType;
        this.updateActiveButtons();
        this.notifyChange();
      });
    });
  }

  /**
   * Setup position selection buttons
   */
  private setupPositionButtons(): void {
    document.querySelectorAll('[data-position]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.config.position = (btn as HTMLElement).dataset.position as ToastPosition;
        if (typeof SeoToast !== 'undefined') {
          SeoToast.getInstance({ position: this.config.position });
        }
        this.updateActiveButtons();
        this.notifyChange();
      });
    });
  }

  /**
   * Setup enter animation selection buttons
   */
  private setupEnterAnimationButtons(): void {
    document.querySelectorAll('[data-enter]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.config.enterAnimation = (btn as HTMLElement).dataset.enter as AnimationType;
        if (typeof SeoToast !== 'undefined') {
          SeoToast.getInstance({ enterAnimation: this.config.enterAnimation });
        }
        this.updateActiveButtons();
        this.notifyChange();
      });
    });
  }

  /**
   * Setup exit animation selection buttons
   */
  private setupExitAnimationButtons(): void {
    document.querySelectorAll('[data-exit]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.config.exitAnimation = (btn as HTMLElement).dataset.exit as AnimationType;
        if (typeof SeoToast !== 'undefined') {
          SeoToast.getInstance({ exitAnimation: this.config.exitAnimation });
        }
        this.updateActiveButtons();
        this.notifyChange();
      });
    });
  }

  /**
   * Setup custom icon selection buttons
   */
  private setupIconButtons(): void {
    document.querySelectorAll('[data-icon]').forEach(btn => {
      btn.addEventListener('click', () => {
        const iconType = (btn as HTMLElement).dataset.icon!;
        this.config.customIcon = ICON_MAPPINGS[iconType] || null;
        this.updateActiveButtons();
        this.notifyChange();
      });
    });
  }

  /**
   * Setup form input controls
   */
  private setupFormControls(): void {
    // Close time input
    const closeTimeInput = document.getElementById('closeTime') as HTMLInputElement;
    closeTimeInput?.addEventListener('input', (e) => {
      this.config.closeTime = parseInt((e.target as HTMLInputElement).value);
      this.notifyChange();
    });

    // Custom title input
    const customTitleInput = document.getElementById('customTitle') as HTMLInputElement;
    customTitleInput?.addEventListener('input', (e) => {
      this.config.customTitle = (e.target as HTMLInputElement).value;
      this.notifyChange();
    });

    // Show title checkbox
    const showTitleCheckbox = document.getElementById('showTitle') as HTMLInputElement;
    showTitleCheckbox?.addEventListener('change', (e) => {
      this.config.showTitle = (e.target as HTMLInputElement).checked;
      this.notifyChange();
    });

    // Show progress checkbox
    const showProgressCheckbox = document.getElementById('showProgress') as HTMLInputElement;
    showProgressCheckbox?.addEventListener('change', (e) => {
      this.config.showProgress = (e.target as HTMLInputElement).checked;
      this.notifyChange();
    });
  }

  /**
   * Update active button states based on current config
   */
  updateActiveButtons(): void {
    // Reset all control buttons
    document.querySelectorAll('.control-buttons .btn').forEach(btn => {
      btn.classList.remove('btn--primary', 'btn--success', 'btn--error', 'btn--warning', 'btn--info');
      btn.classList.add('btn--outline');
    });

    // Set active type button
    const typeBtn = document.querySelector(`[data-type="${this.config.type}"]`);
    if (typeBtn) {
      typeBtn.classList.remove('btn--outline');
      typeBtn.classList.add(`btn--${this.config.type}`);
    }

    // Set active position button
    const positionBtn = document.querySelector(`[data-position="${this.config.position}"]`);
    if (positionBtn) {
      positionBtn.classList.remove('btn--outline');
      positionBtn.classList.add('btn--primary');
    }

    // Set active enter animation button
    const enterBtn = document.querySelector(`[data-enter="${this.config.enterAnimation}"]`);
    if (enterBtn) {
      enterBtn.classList.remove('btn--outline');
      enterBtn.classList.add('btn--primary');
    }

    // Set active exit animation button
    const exitBtn = document.querySelector(`[data-exit="${this.config.exitAnimation}"]`);
    if (exitBtn) {
      exitBtn.classList.remove('btn--outline');
      exitBtn.classList.add('btn--primary');
    }

    // Handle icon button selection
    document.querySelectorAll('[data-icon]').forEach(btn => {
      btn.classList.remove('btn--primary');
      btn.classList.add('btn--outline');
    });

    // Set active icon button
    if (this.config.customIcon !== null) {
      const activeIconBtn = Array.from(document.querySelectorAll('[data-icon]')).find(btn => {
        const iconType = (btn as HTMLElement).dataset.icon!;
        return ICON_MAPPINGS[iconType] === this.config.customIcon;
      });

      if (activeIconBtn) {
        activeIconBtn.classList.remove('btn--outline');
        activeIconBtn.classList.add('btn--primary');
      }
    }
  }

  /**
   * Notify config change callback
   */
  private notifyChange(): void {
    if (this.onConfigChange) {
      this.onConfigChange(this.getConfig());
    }
  }
}

export { ControlPanelManager };
