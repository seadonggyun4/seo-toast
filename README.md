# SeoToast

<img width="300" height="300" alt="logo" src="https://github.com/user-attachments/assets/e567ea31-d046-45b3-80d1-9a1e32c7e002" />

A lightweight and versatile toast notification component built as a native Web Component. Works seamlessly across all frameworks and vanilla JavaScript with zero dependencies.

[![NPM](https://img.shields.io/npm/dt/seo-toast.svg?label=NPM)](https://www.npmjs.com/package/seo-toast)
[![GitHub stars](https://img.shields.io/github/stars/seadonggyun4/seo-toast.svg)](https://github.com/seadonggyun4/seo-toast/stargazers)

> 🌟 Support with a `GitHub star` — your encouragement means the world to me!

**[Live Demo](https://seo-toast.netlify.app/)** | **[NPM Package](https://www.npmjs.com/package/seo-toast)**

## Features

- **4 Toast Types**: success, error, warning, info with built-in icons
- **6 Positioning Options**: top/bottom left, right, and center
- **5 Animation Types**: slide, fade, scale, bounce, flip for enter/exit
- **Progress Indicator**: Visual countdown with pause on hover
- **Duplicate Handling**: Smart grouping of identical messages with counters
- **Customizable Styling**: SCSS variables for complete visual control
- **Responsive Design**: Works on desktop and mobile devices
- **Accessibility**: ARIA labels and keyboard navigation support
- **Custom Icons**: SVG strings or image URLs
- **Zero Dependencies**: Pure Web Components, no external libraries
- **SSR Compatible**: Safe for server-side rendering environments
- **Framework Wrappers**: Native support for React, Vue, Angular, Solid, Qwik
- **Lightweight**: ~10KB gzipped

## Installation

```bash
npm install seo-toast
```

## Quick Start

### Basic Import

```javascript
// Import component and styles
import 'seo-toast';
import 'seo-toast/styles';

// Use static methods
SeoToast.success('Operation completed!');
SeoToast.error('Something went wrong!');
SeoToast.warning('Please check your input');
SeoToast.info('New feature available');
```

### Module Imports

```javascript
// Main component
import 'seo-toast';

// Component only
import 'seo-toast/components/seo-toast';

// Types (TypeScript)
import type { ToastType, ToastPosition, ToastOptions } from 'seo-toast/types';

// Event helpers
import { eventHelpers, EVENT_NAMES } from 'seo-toast/event';

// Constants
import { DEFAULT_CONFIG, DEFAULT_TITLES } from 'seo-toast/constants';

// Styles only
import 'seo-toast/styles';
```

### HTML Usage

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module">
    import 'seo-toast';
    import 'seo-toast/styles';
  </script>
</head>
<body>
  <seo-toast position="top-right"></seo-toast>

  <button onclick="SeoToast.success('Hello!')">Show Toast</button>
</body>
</html>
```

### Advanced Usage

```javascript
import { SeoToast } from 'seo-toast';
import 'seo-toast/styles';

// Custom configuration
SeoToast.success('Data saved!', {
  title: 'Success',
  closeTime: 5000,
  showProgress: true,
  customIcon: 'https://example.com/success.svg'
});

// Using instance for consistent configuration
const toast = SeoToast.getInstance({
  position: 'bottom-center',
  enterAnimation: 'bounce',
  exitAnimation: 'fade'
});

toast.showToast('Custom message', 'warning', {
  showTitle: false,
  closeTime: 3000
});
```

## Framework Integration

### React

```bash
npm install seo-toast
```

```tsx
import { useRef } from 'react';
import { SeoToast, type SeoToastRef } from 'seo-toast/react';
import 'seo-toast/styles';

function App() {
  const toastRef = useRef<SeoToastRef>(null);

  const handleSuccess = () => {
    toastRef.current?.success('React toast works!');
  };

  return (
    <div>
      <button onClick={handleSuccess}>Show Toast</button>
      <SeoToast
        ref={toastRef}
        position="top-right"
        enterAnimation="bounce"
        onClose={(e) => console.log('Closed:', e.detail)}
      />
    </div>
  );
}
```

### Vue

```vue
<template>
  <div>
    <button @click="showToast">Show Toast</button>
    <SeoToast
      ref="toastRef"
      position="bottom-right"
      @close="handleClose"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SeoToast } from 'seo-toast/vue';
import 'seo-toast/styles';

const toastRef = ref();

const showToast = () => {
  toastRef.value?.success('Vue toast works!');
};

const handleClose = (detail) => {
  console.log('Toast closed:', detail);
};
</script>
```

### Angular

```typescript
import { Component, ViewChild } from '@angular/core';
import { SeoToastComponent } from 'seo-toast/angular';
import 'seo-toast/styles';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SeoToastComponent],
  template: `
    <button (click)="showToast()">Show Toast</button>
    <seo-toast-wrapper
      #toast
      position="top-center"
      (close)="onClose($event)"
    />
  `
})
export class AppComponent {
  @ViewChild('toast') toast!: SeoToastComponent;

  showToast() {
    this.toast.success('Angular toast works!');
  }

  onClose(detail: any) {
    console.log('Toast closed:', detail);
  }
}
```

### Solid

```tsx
import { SeoToast, createToastHelpers, type SeoToastElement } from 'seo-toast/solid';
import 'seo-toast/styles';

function App() {
  let toastRef: SeoToastElement | undefined;

  const toast = () => createToastHelpers(toastRef);

  return (
    <div>
      <button onClick={() => toast().success('Solid toast works!')}>
        Show Toast
      </button>
      <SeoToast
        ref={(el) => (toastRef = el)}
        position="top-right"
        onClose={(detail) => console.log('Closed:', detail)}
      />
    </div>
  );
}
```

### Qwik

```tsx
import { component$, useSignal } from '@builder.io/qwik';
import { SeoToast, useToastHelpers, type SeoToastElement } from 'seo-toast/qwik';
import 'seo-toast/styles';

export default component$(() => {
  const toastRef = useSignal<SeoToastElement>();
  const toast = useToastHelpers(toastRef);

  return (
    <div>
      <button onClick$={() => toast.success('Qwik toast works!')}>
        Show Toast
      </button>
      <SeoToast
        ref={toastRef}
        position="bottom-center"
        onClose$={(detail) => console.log('Closed:', detail)}
      />
    </div>
  );
});
```

### Vanilla JavaScript

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module">
    import 'seo-toast';
    import 'seo-toast/styles';
  </script>
</head>
<body>
  <button id="toast-btn">Show Toast</button>
  <seo-toast position="top-right"></seo-toast>

  <script>
    document.getElementById('toast-btn').addEventListener('click', () => {
      SeoToast.success('Vanilla JS works!');
    });

    // Event handling
    document.addEventListener('toast-close', (event) => {
      console.log('Toast closed:', event.detail);
    });
  </script>
</body>
</html>
```

## Configuration

### Component Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `close-time` | number | 3000 | Auto-close duration in milliseconds |
| `position` | string | 'top-right' | Toast display position |
| `enter-animation` | string | 'slide' | Animation when toast appears |
| `exit-animation` | string | 'slide' | Animation when toast disappears |

### Position Options

- `top-left`, `top-center`, `top-right`
- `bottom-left`, `bottom-center`, `bottom-right`

### Animation Options

- `slide` - Slides in from the side (default)
- `fade` - Fades in/out with opacity
- `scale` - Scales up/down from center
- `bounce` - Bouncy entrance effect
- `flip` - 3D flip animation

### TypeScript Interfaces

```typescript
interface ToastOptions {
  title?: string;           // Custom title text
  customIcon?: string;      // SVG string or image URL
  closeTime?: number;       // Override default close time
  showTitle?: boolean;      // Show/hide title (default: true)
  showProgress?: boolean;   // Show/hide progress bar (default: true)
}

interface ToastConfig {
  position?: ToastPosition;
  enterAnimation?: AnimationType;
  exitAnimation?: AnimationType;
}

type ToastType = 'success' | 'error' | 'warning' | 'info';
type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
type AnimationType = 'slide' | 'fade' | 'scale' | 'bounce' | 'flip';
```

## API Reference

### Static Methods

```javascript
SeoToast.show(message, type?, options?)
SeoToast.success(message, options?)
SeoToast.error(message, options?)
SeoToast.warning(message, options?)
SeoToast.info(message, options?)
SeoToast.getInstance(config?)
```

### Instance Methods

```javascript
const toast = SeoToast.getInstance();

toast.showToast(message, type?, options?)
toast.closeTime = 3000;
toast.position = 'bottom-center';
toast.enterAnimation = 'bounce';
toast.exitAnimation = 'scale';
```

### Events

```javascript
// Listen for toast close events
document.addEventListener('toast-close', (event) => {
  const { message, type, count, title, reason } = event.detail;
  console.log('Toast closed:', { message, type, reason });
});

// Event detail interface
interface ToastCloseEventDetail {
  message: string;
  type: ToastType;
  count: number;
  title?: string;
  reason: 'timeout' | 'click' | 'manual';
}
```

## Styling & Customization

### CSS Variables

```css
seo-toast {
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
  --toast-box-shadow: 0 2px 2px rgba(0,0,0,.1);

  /* Text colors (prevents external CSS interference) */
  --toast-bg-color: #ffffff;
  --toast-title-color: #1f2937;
  --toast-desc-color: #374151;
  --toast-close-color: #6b7280;
  --toast-close-hover-color: #1f2937;

  /* Type-specific backgrounds */
  --toast-success-bg: #dcfce7;
  --toast-error-bg: #fee2e2;
  --toast-warning-bg: #fef3c7;
  --toast-info-bg: #dbeafe;

  /* Animation timing */
  --toast-enter-duration: 0.3s;
  --toast-exit-duration: 0.2s;
}
```

### Custom Themes

```css
/* Dark theme */
seo-toast.dark-theme {
  --toast-bg-color: #1f2937;
  --toast-title-color: #f9fafb;
  --toast-desc-color: #e5e7eb;
  --toast-close-color: #9ca3af;
  --toast-close-hover-color: #f9fafb;
  --toast-success-bg: #064e3b;
  --toast-error-bg: #7f1d1d;
  --toast-warning-bg: #78350f;
  --toast-info-bg: #1e3a8a;
  --toast-box-shadow: 0 4px 8px rgba(0,0,0,.3);
}
```

### Responsive Design

```css
@media (max-width: 768px) {
  seo-toast {
    --toast-min-width: calc(100vw - 2rem);
    --toast-max-width: calc(100vw - 2rem);
  }
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  seo-toast {
    --toast-enter-duration: 0.1s;
    --toast-exit-duration: 0.1s;
  }
}
```

## Custom Icons

```javascript
// SVG string
SeoToast.success('Complete!', {
  customIcon: `<svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
  </svg>`
});

// Image URL
SeoToast.error('Network error', {
  customIcon: 'https://example.com/icons/error.svg'
});
```

## Browser Support

- Chrome 67+
- Firefox 63+
- Safari 10.1+
- Edge 79+

## License

MIT License - see [LICENSE](https://github.com/seadonggyun4/seo-toast/blob/main/LICENSE) file for details.

## Links

- [GitHub Repository](https://github.com/seadonggyun4/seo-toast)
- [NPM Package](https://www.npmjs.com/package/seo-toast)
- [Live Demo](https://seo-toast.netlify.app/)
- [Issues](https://github.com/seadonggyun4/seo-toast/issues)
