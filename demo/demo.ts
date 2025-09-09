import { SeoToast } from '../src//main';

// Types
type ToastType = 'success' | 'error' | 'warning' | 'info';
type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
type AnimationType = 'slide' | 'fade' | 'scale' | 'bounce' | 'flip';

interface ToastOptions {
  title?: string;
  customIcon?: string;
  closeTime?: number;
  showTitle?: boolean;
  showProgress?: boolean;
}

interface ToastConfig {
  position?: ToastPosition;
  enterAnimation?: AnimationType;
  exitAnimation?: AnimationType;
}

// Demo configuration state
interface DemoConfig {
  type: ToastType;
  position: ToastPosition;
  enterAnimation: AnimationType;
  exitAnimation: AnimationType;
  closeTime: number;
  showTitle: boolean;
  showProgress: boolean;
  customTitle: string;
  customIcon: string | null;
}

// Statistics tracking
interface ToastStats {
  total: number;
  success: number;
  error: number;
  warning: number;
  info: number;
}

// Global demo state
let currentConfig: DemoConfig = {
  type: 'success',
  position: 'top-right',
  enterAnimation: 'slide',
  exitAnimation: 'slide',
  closeTime: 2000,
  showTitle: true,
  showProgress: true,
  customTitle: '',
  customIcon: null
};

let toastStats: ToastStats = {
  total: 0,
  success: 0,
  error: 0,
  warning: 0,
  info: 0
};

// Copy code examples
const copyCodeExamples: Record<string, string> = {
  install: 'npm install seo-toast',
  
  'basic-usage': `import { SeoToast } from 'seo-toast';

// Show different types of toasts
SeoToast.success('Operation completed successfully!');
SeoToast.error('Something went wrong!');
SeoToast.warning('Please check your input');
SeoToast.info('New feature available');`,

  position: `import { SeoToast } from 'seo-toast';

// Configure toast position
SeoToast.getInstance({ 
  position: 'top-center' // top-left, top-center, top-right
                        // bottom-left, bottom-center, bottom-right
});

SeoToast.success('Positioned toast!');`,

  animations: `import { SeoToast } from 'seo-toast';

// Different animation types
SeoToast.getInstance({
  enterAnimation: 'bounce', // slide, fade, scale, bounce, flip
  exitAnimation: 'fade'
});

SeoToast.info('Animated toast!');`,

  'custom-options': `import { SeoToast } from 'seo-toast';

// Custom configuration
SeoToast.success('Data saved!', {
  title: 'Success',
  closeTime: 5000,
  showProgress: true,
  showTitle: true
});`,

  'custom-icons': `import { SeoToast } from 'seo-toast';

// Using custom image
SeoToast.success('Profile updated!', {
  customIcon: '/profile-icon.png'
});

// Using custom SVG
const customSvg = \`<svg viewBox="0 0 24 24" fill="currentColor">
  <path d="M12 2l3.09 8.26L24 9l-6 5.74L19.18 24 12 19.5 4.82 24 6 14.74 0 9l8.91-1.26L12 2z"/>
</svg>\`;

SeoToast.info('Custom star icon!', { 
  customIcon: customSvg 
});`,

  events: `import { SeoToast } from 'seo-toast';

// Listen for toast close events
document.addEventListener('toast-close', (event) => {
  const { message, type, count } = event.detail;
  console.log(\`Toast "\${message}" closed (shown \${count} times)\`);
});

SeoToast.warning('This toast has event handling', {
  closeTime: 3000
});`,

  duplicates: `import { SeoToast } from 'seo-toast';

// Multiple calls with same message show count
SeoToast.info('Duplicate message test');
SeoToast.info('Duplicate message test'); // Shows (2)
SeoToast.info('Duplicate message test'); // Shows (3)`,

  react: `import { useEffect } from 'react';
import { SeoToast } from 'seo-toast';

function App() {
  useEffect(() => {
    const handleToastClose = (event) => {
      console.log('Toast closed:', event.detail);
    };
    
    document.addEventListener('toast-close', handleToastClose);
    return () => {
      document.removeEventListener('toast-close', handleToastClose);
    };
  }, []);

  const showSuccess = () => {
    SeoToast.success('React integration works!');
  };

  return (
    <div>
      <button onClick={showSuccess}>Show Toast</button>
      <seo-toast position="top-center" />
    </div>
  );
}`,

  vue: `<template>
  <div>
    <button @click="showToast">Show Toast</button>
    <seo-toast position="bottom-right" />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import { SeoToast } from 'seo-toast';

const showToast = () => {
  SeoToast.info('Vue integration successful!');
};

let toastCloseHandler;

onMounted(() => {
  toastCloseHandler = (event) => {
    console.log('Toast closed:', event.detail);
  };
  document.addEventListener('toast-close', toastCloseHandler);
});

onUnmounted(() => {
  if (toastCloseHandler) {
    document.removeEventListener('toast-close', toastCloseHandler);
  }
});
</script>`,

  angular: `import { Component, OnInit, OnDestroy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SeoToast } from 'seo-toast';

@Component({
  selector: 'app-toast-demo',
  template: \`
    <button (click)="showToast()">Show Toast</button>
    <seo-toast position="top-left"></seo-toast>
  \`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ToastDemoComponent implements OnInit, OnDestroy {
  private toastCloseHandler?: (event: any) => void;

  ngOnInit() {
    this.toastCloseHandler = (event: any) => {
      console.log('Toast closed:', event.detail);
    };
    document.addEventListener('toast-close', this.toastCloseHandler);
  }

  ngOnDestroy() {
    if (this.toastCloseHandler) {
      document.removeEventListener('toast-close', this.toastCloseHandler);
    }
  }

  showToast() {
    SeoToast.warning('Angular integration ready!');
  }
}`,

  svelte: `<script>
  import { onMount, onDestroy } from 'svelte';
  import { SeoToast } from 'seo-toast';

  let toastCloseHandler;

  onMount(() => {
    toastCloseHandler = (event) => {
      console.log('Toast closed:', event.detail);
    };
    document.addEventListener('toast-close', toastCloseHandler);
  });

  onDestroy(() => {
    if (toastCloseHandler) {
      document.removeEventListener('toast-close', toastCloseHandler);
    }
  });

  const showToast = () => {
    SeoToast.error('Svelte integration complete!');
  };
</script>

<button on:click={showToast}>Show Toast</button>
<seo-toast position="bottom-center" />`,

  vanilla: `<!DOCTYPE html>
<html>
<head>
  <script type="module" src="https://unpkg.com/seo-toast/dist/seo-toast.min.js"></script>
</head>
<body>
  <button id="toast-btn">Show Toast</button>
  <seo-toast id="toast-container"></seo-toast>

  <script>
    document.getElementById('toast-btn').addEventListener('click', () => {
      SeoToast.success('Vanilla JS works perfectly!');
    });

    // Event handling
    document.addEventListener('toast-close', (event) => {
      const { message, type, count } = event.detail;
      console.log(\`Toast "\${message}" closed (shown \${count} times)\`);
    });
  </script>
</body>
</html>`,

  typescript: `// TypeScript declarations for React
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'seo-toast': any;
    }
  }
}

// Import types
import { SeoToast, ToastOptions, ToastConfig } from 'seo-toast';

// Usage with types
const options: ToastOptions = {
  title: 'Custom Title',
  closeTime: 3000,
  showProgress: true,
  customIcon: 'path/to/icon.svg'
};

const config: ToastConfig = {
  position: 'top-right',
  enterAnimation: 'bounce',
  exitAnimation: 'fade'
};

SeoToast.success('TypeScript ready!', options);`,

  'static-methods': `// Basic toast methods
SeoToast.show(message, type?, options?)
SeoToast.success(message, options?)
SeoToast.error(message, options?)
SeoToast.warning(message, options?)
SeoToast.info(message, options?)

// Global instance management
SeoToast.getInstance(config?)`,

  'config-types': `interface ToastOptions {
  title?: string;           // Custom title text
  customIcon?: string;      // SVG string or image URL
  closeTime?: number;       // Override default close time
  showTitle?: boolean;      // Show/hide title (default: true)
  showProgress?: boolean;   // Show/hide progress bar (default: true)
}

interface ToastConfig {
  position?: ToastPosition;     // Global position setting
  enterAnimation?: AnimationType; // Global enter animation
  exitAnimation?: AnimationType;  // Global exit animation
}`,

  'event-system': `// Listen for toast close events
document.addEventListener('toast-close', (event) => {
  const { message, type, count, title } = event.detail;
  console.log('Toast closed:', { message, type, count });
});

// Event details interface
interface ToastEventDetail {
  message: string;
  type: ToastType;
  count: number;    // Number of times this message was shown
  title?: string;   // Title if provided
}`,

  'css-vars': `seo-toast {
  /* Container positioning */
  --toast-container-top: 1rem;
  --toast-container-right: 1rem;
  --toast-container-z-index: 200000;
  
  /* Toast layout */
  --toast-gap: 1rem;
  --toast-padding: 0.5rem 0.5rem 1rem 0.5rem;
  --toast-border-radius: 0.5rem;
  --toast-min-width: 20rem;
  --toast-max-width: 20rem;
  
  /* Type-specific backgrounds */
  --toast-success-bg: #dcfce7;
  --toast-error-bg: #fee2e2;
  --toast-warning-bg: #fef3c7;
  --toast-info-bg: #dbeafe;
  
  /* Animation timing */
  --toast-enter-duration: 0.3s;
  --toast-exit-duration: 0.2s;
}`
};

// Demo class for managing demo functionality
class DemoManager {
  constructor() {
    this.initializeEventListeners();
    this.setupToastStatistics();
    this.showWelcomeMessage();
  }

  private initializeEventListeners(): void {
    document.addEventListener('DOMContentLoaded', () => {
      this.setupTabSwitching();
      this.setupCopyButtons();
      this.setupDemoButtons();
      this.setupControlPanelHandlers();
      this.updateActiveButtons();
    });
  }

  private setupToastStatistics(): void {
    // Toast event tracking for statistics
    document.addEventListener('toast-close', (event: any) => {
      // Statistics are updated when toasts are shown, not closed
      this.updateStatsDisplay();
    });
  }

  private updateToastStats(type: ToastType): void {
    toastStats.total += 1;
    toastStats[type] += 1;
    this.updateStatsDisplay();
  }

  private updateStatsDisplay(): void {
    const elements = {
      total: document.getElementById('stat-total'),
      success: document.getElementById('stat-success'),
      error: document.getElementById('stat-error'),
      warning: document.getElementById('stat-warning'),
      info: document.getElementById('stat-info')
    };

    Object.entries(elements).forEach(([key, element]) => {
      if (element) {
        element.textContent = toastStats[key as keyof ToastStats].toString();
      }
    });
  }

  private setupTabSwitching(): void {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = (btn as HTMLElement).dataset.tab;
        
        // Update tab buttons
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Update tab contents
        tabContents.forEach(content => {
          content.classList.remove('active');
          if (content.id === `tab-${targetTab}`) {
            content.classList.add('active');
          }
        });
      });
    });
  }

  private setupCopyButtons(): void {
    document.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const codeKey = (btn as HTMLElement).dataset.copy;
        const code = copyCodeExamples[codeKey!];
        
        if (code) {
          this.copyToClipboard(code);
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

  private setupDemoButtons(): void {
    // Quick demo buttons
    document.getElementById('demo-success')?.addEventListener('click', (e) => {
      if (typeof SeoToast !== 'undefined') {
        SeoToast.success('Success! Operation completed successfully.');
        this.updateToastStats('success');
      } else {
        console.log('SeoToast not loaded - would show: Success! Operation completed successfully.');
      }
      this.addButtonLoadingEffect(e.target as HTMLElement);
    });

    document.getElementById('demo-error')?.addEventListener('click', (e) => {
      if (typeof SeoToast !== 'undefined') {
        SeoToast.error('Error! Something went wrong. Please try again.');
        this.updateToastStats('error');
      } else {
        console.log('SeoToast not loaded - would show: Error! Something went wrong. Please try again.');
      }
      this.addButtonLoadingEffect(e.target as HTMLElement);
    });

    document.getElementById('demo-warning')?.addEventListener('click', (e) => {
      if (typeof SeoToast !== 'undefined') {
        SeoToast.warning('Warning! Please check your input before proceeding.');
        this.updateToastStats('warning');
      } else {
        console.log('SeoToast not loaded - would show: Warning! Please check your input before proceeding.');
      }
      this.addButtonLoadingEffect(e.target as HTMLElement);
    });

    document.getElementById('demo-info')?.addEventListener('click', (e) => {
      if (typeof SeoToast !== 'undefined') {
        SeoToast.info('Info: New update is available for download.');
        this.updateToastStats('info');
      } else {
        console.log('SeoToast not loaded - would show: Info: New update is available for download.');
      }
      this.addButtonLoadingEffect(e.target as HTMLElement);
    });

    // Configured toast button
    document.getElementById('showConfiguredToast')?.addEventListener('click', (e) => {
      this.showConfiguredToast();
      this.addButtonLoadingEffect(e.target as HTMLElement);
    });

    // Test duplicates button
    document.getElementById('testDuplicates')?.addEventListener('click', (e) => {
      this.testDuplicates();
      this.addButtonLoadingEffect(e.target as HTMLElement);
    });
  }

  private setupControlPanelHandlers(): void {
    // Toast type buttons
    document.querySelectorAll('[data-type]').forEach(btn => {
      btn.addEventListener('click', () => {
        currentConfig.type = (btn as HTMLElement).dataset.type as ToastType;
        this.updateActiveButtons();
      });
    });

    // Position buttons
    document.querySelectorAll('[data-position]').forEach(btn => {
      btn.addEventListener('click', () => {
        currentConfig.position = (btn as HTMLElement).dataset.position as ToastPosition;
        if (typeof SeoToast !== 'undefined') {
          SeoToast.getInstance({ position: currentConfig.position });
        }
        this.updateActiveButtons();
      });
    });

    // Enter animation buttons
    document.querySelectorAll('[data-enter]').forEach(btn => {
      btn.addEventListener('click', () => {
        currentConfig.enterAnimation = (btn as HTMLElement).dataset.enter as AnimationType;
        if (typeof SeoToast !== 'undefined') {
          SeoToast.getInstance({ enterAnimation: currentConfig.enterAnimation });
        }
        this.updateActiveButtons();
      });
    });

    // Exit animation buttons
    document.querySelectorAll('[data-exit]').forEach(btn => {
      btn.addEventListener('click', () => {
        currentConfig.exitAnimation = (btn as HTMLElement).dataset.exit as AnimationType;
        if (typeof SeoToast !== 'undefined') {
          SeoToast.getInstance({ exitAnimation: currentConfig.exitAnimation });
        }
        this.updateActiveButtons();
      });
    });

    // Icon buttons
    document.querySelectorAll('[data-icon]').forEach(btn => {
      btn.addEventListener('click', () => {
        const iconType = (btn as HTMLElement).dataset.icon!;
        const icons: Record<string, string> = {
          star: '⭐',
          heart: '❤️',
          rocket: '🚀',
          bell: '🔔',
          custom: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 8.26L24 9l-6 5.74L19.18 24 12 19.5 4.82 24 6 14.74 0 9l8.91-1.26L12 2z"/></svg>`,
          none: ''
        };
        currentConfig.customIcon = icons[iconType];
        this.updateActiveButtons();
      });
    });

    // Form controls
    const closeTimeInput = document.getElementById('closeTime') as HTMLInputElement;
    closeTimeInput?.addEventListener('input', (e) => {
      currentConfig.closeTime = parseInt((e.target as HTMLInputElement).value);
    });

    const customTitleInput = document.getElementById('customTitle') as HTMLInputElement;
    customTitleInput?.addEventListener('input', (e) => {
      currentConfig.customTitle = (e.target as HTMLInputElement).value;
    });

    const showTitleCheckbox = document.getElementById('showTitle') as HTMLInputElement;
    showTitleCheckbox?.addEventListener('change', (e) => {
      currentConfig.showTitle = (e.target as HTMLInputElement).checked;
    });

    const showProgressCheckbox = document.getElementById('showProgress') as HTMLInputElement;
    showProgressCheckbox?.addEventListener('change', (e) => {
      currentConfig.showProgress = (e.target as HTMLInputElement).checked;
    });
  }

  private showConfiguredToast(): void {
    const options: ToastOptions = {
      closeTime: currentConfig.closeTime,
      showTitle: currentConfig.showTitle,
      showProgress: currentConfig.showProgress
    };

    if (currentConfig.customTitle) {
      options.title = currentConfig.customTitle;
    }

    if (currentConfig.customIcon) {
      options.customIcon = currentConfig.customIcon;
    }

    const message = `Configured ${currentConfig.type} toast with ${currentConfig.enterAnimation} enter and ${currentConfig.exitAnimation} exit animations at ${currentConfig.position}`;
    
    if (typeof SeoToast !== 'undefined') {
      SeoToast[currentConfig.type](message, options);
      this.updateToastStats(currentConfig.type);
    } else {
      console.log(`SeoToast not loaded - would show ${currentConfig.type}: ${message}`, options);
    }
  }

  private testDuplicates(): void {
    const message = 'Duplicate prevention test';
    if (typeof SeoToast !== 'undefined') {
      SeoToast.info(message);
      this.updateToastStats('info');
      setTimeout(() => {
        SeoToast.info(message);
        this.updateToastStats('info');
      }, 500);
      setTimeout(() => {
        SeoToast.info(message);
        this.updateToastStats('info');
      }, 1000);
    } else {
      console.log('SeoToast not loaded - would show duplicate test');
    }
  }

  private updateActiveButtons(): void {
    // Reset all control buttons
    document.querySelectorAll('.control-buttons .btn').forEach(btn => {
      btn.classList.remove('btn--primary', 'btn--success', 'btn--error', 'btn--warning', 'btn--info');
      btn.classList.add('btn--outline');
    });

    // Set active buttons based on current config
    const typeBtn = document.querySelector(`[data-type="${currentConfig.type}"]`);
    if (typeBtn) {
      typeBtn.classList.remove('btn--outline');
      typeBtn.classList.add(`btn--${currentConfig.type}`);
    }
    
    const positionBtn = document.querySelector(`[data-position="${currentConfig.position}"]`);
    if (positionBtn) {
      positionBtn.classList.remove('btn--outline');
      positionBtn.classList.add('btn--primary');
    }
    
    const enterBtn = document.querySelector(`[data-enter="${currentConfig.enterAnimation}"]`);
    if (enterBtn) {
      enterBtn.classList.remove('btn--outline');
      enterBtn.classList.add('btn--primary');
    }
    
    const exitBtn = document.querySelector(`[data-exit="${currentConfig.exitAnimation}"]`);
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
    if (currentConfig.customIcon) {
      const activeIconBtn = Array.from(document.querySelectorAll('[data-icon]')).find(btn => {
        const iconType = (btn as HTMLElement).dataset.icon!;
        const icons: Record<string, string | null> = {
          star: '⭐',
          heart: '❤️',
          rocket: '🚀',
          bell: '🔔',
          custom: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 8.26L24 9l-6 5.74L19.18 24 12 19.5 4.82 24 6 14.74 0 9l8.91-1.26L12 2z"/></svg>`,
          none: ''
        };
        return icons[iconType] === currentConfig.customIcon;
      });

      if (activeIconBtn) {
        activeIconBtn.classList.remove('btn--outline');
        activeIconBtn.classList.add('btn--primary');
      }
    }
  }

  private addButtonLoadingEffect(button: HTMLElement): void {
    button.classList.add('loading');
    setTimeout(() => {
      button.classList.remove('loading');
    }, 300);
  }

  private copyToClipboard(text: string): void {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        console.log('Code copied to clipboard');
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  }

  private showWelcomeMessage(): void {
    setTimeout(() => {
      if (typeof SeoToast !== 'undefined') {
        SeoToast.info('Welcome to seo-toast demo! Try the interactive controls above.', {
          closeTime: 4000
        });
        this.updateToastStats('info');
      }
    }, 1000);
  }
}

// Initialize demo when script loads
new DemoManager();

// Export for potential external use
export { DemoManager };