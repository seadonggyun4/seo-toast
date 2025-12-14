import { DEFAULT_DEMO_CONFIG } from './types';
import type { DemoConfig } from './types';
import { CODE_EXAMPLES } from './constants';
import { copyToClipboard } from './clipboard';
import { statisticsManager } from './statistics';
import { setupTabSwitching } from './tab-manager';
import { ControlPanelManager } from './control-panel';
import { initializeToasterCanvas, ToasterCanvas } from './toaster-canvas';
import {
  showQuickDemoToast,
  showConfiguredToast,
  testDuplicates,
  showWelcomeMessage,
  addButtonLoadingEffect,
  DEMO_MESSAGES
} from './demo-actions';

/**
 * Main demo manager class that coordinates all demo functionality
 * Note: PageLoader and safety are initialized in demo.ts before DemoManager
 */
class DemoManager {
  private controlPanel: ControlPanelManager;
  private toasterCanvas: ToasterCanvas | null = null;

  constructor() {
    this.controlPanel = new ControlPanelManager(DEFAULT_DEMO_CONFIG);
    this.initialize();
  }

  /**
   * Initialize all demo functionality
   */
  private initialize(): void {
    // Setup all components (DOM should be ready when DemoManager is created)
    this.setupAll();

    // Setup statistics event listener
    statisticsManager.setupEventListener();

    // Show welcome toast after page loads
    showWelcomeMessage();
  }

  /**
   * Setup all demo components
   */
  private setupAll(): void {
    setupTabSwitching();
    this.setupCopyButtons();
    this.setupDemoButtons();
    this.controlPanel.setup();
    this.setupToasterCanvas();
  }

  /**
   * Setup interactive toaster canvas
   */
  private setupToasterCanvas(): void {
    this.toasterCanvas = initializeToasterCanvas();
    if (this.toasterCanvas) {
      console.log('🍞 Toaster canvas initialized');
    }
  }

  /**
   * Setup copy buttons for code examples
   */
  private setupCopyButtons(): void {
    document.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const codeKey = (btn as HTMLElement).dataset.copy;
        const code = CODE_EXAMPLES[codeKey!];

        if (code) {
          await copyToClipboard(code);
          btn.textContent = 'Copied!';
          btn.classList.add('copied');

          setTimeout(() => {
            btn.textContent = 'Copy';
            btn.classList.remove('copied');
          }, 2000);
        }
      });
    });
  }

  /**
   * Setup demo action buttons
   */
  private setupDemoButtons(): void {
    // Quick demo buttons
    const demoButtons = {
      'demo-success': 'success',
      'demo-error': 'error',
      'demo-warning': 'warning',
      'demo-info': 'info'
    } as const;

    Object.entries(demoButtons).forEach(([id, type]) => {
      document.getElementById(id)?.addEventListener('click', (e) => {
        // 토스터 애니메이션 트리거 (토스트 알림은 애니메이션에서 처리)
        this.toasterCanvas?.triggerToast(type);
        addButtonLoadingEffect(e.target as HTMLElement);
      });
    });

    // Configured toast button
    document.getElementById('showConfiguredToast')?.addEventListener('click', (e) => {
      showConfiguredToast(this.controlPanel.getConfig(), e.target as HTMLElement);
    });

    // Test duplicates button
    document.getElementById('testDuplicates')?.addEventListener('click', (e) => {
      testDuplicates(e.target as HTMLElement);
    });
  }

  /**
   * Get current demo configuration
   */
  getConfig(): DemoConfig {
    return this.controlPanel.getConfig();
  }
}

// Export class
export { DemoManager };
