// Icon mappings for custom icon buttons
export const ICON_MAPPINGS: Record<string, string> = {
  star: '⭐',
  heart: '❤️',
  rocket: '🚀',
  bell: '🔔',
  custom: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 8.26L24 9l-6 5.74L19.18 24 12 19.5 4.82 24 6 14.74 0 9l8.91-1.26L12 2z"/></svg>`,
  none: ''
};

// Copy code examples
export const CODE_EXAMPLES: Record<string, string> = {
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
