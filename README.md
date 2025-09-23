# SeoToast

A lightweight and versatile toast notification component built as a native Web Component. Works seamlessly across all frameworks and vanilla JavaScript with zero dependencies.

## Features

- 🎯 **4 Toast Types**: success, error, warning, info with built-in icons
- 📍 **6 Positioning Options**: top/bottom left, right, and center
- 🎭 **5 Animation Types**: slide, fade, scale, bounce, flip for enter/exit
- ⏱️ **Progress Indicator**: Visual countdown with pause on hover
- 🔄 **Duplicate Handling**: Smart grouping of identical messages with counters
- 🎨 **Customizable Styling**: SCSS variables for complete visual control
- 📱 **Responsive Design**: Works on desktop and mobile devices
- ♿ **Accessibility**: ARIA labels and keyboard navigation support
- 🖼️ **Custom Icons**: SVG strings or image URLs
- 📦 **Zero Dependencies**: Pure Web Components, no external libraries
- 🌐 **Framework Agnostic**: React, Vue, Angular, Svelte, vanilla JS
- 💾 **Lightweight**: < 15KB gzipped

## Installation

### NPM Installation
```bash
npm install seo-toast
```

```javascript
import 'seo-toast';
```

## Quick Start

### Basic Usage

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module">
    import 'seo-toast';
  </script>
</head>
<body>
  <!-- Optional: Add container for custom positioning -->
  <seo-toast position="top-right"></seo-toast>
  
  <script>
    // Show different types of toasts
    SeoToast.success('Operation completed successfully!');
    SeoToast.error('Something went wrong!');
    SeoToast.warning('Please check your input');
    SeoToast.info('New feature available');
  </script>
</body>
</html>
```

### Advanced Usage

```javascript
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

## Configuration

### Component Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `close-time` | number | 2000 | Auto-close duration in milliseconds |
| `position` | string | 'top-right' | Toast display position |
| `enter-animation` | string | 'slide' | Animation when toast appears |
| `exit-animation` | string | 'slide' | Animation when toast disappears |

### Position Options

- **Top positions**: `top-left`, `top-right`, `top-center`
- **Bottom positions**: `bottom-left`, `bottom-right`, `bottom-center`

### Animation Options

- **slide**: Slides in from the side (default)
- **fade**: Fades in/out with opacity
- **scale**: Scales up/down from center
- **bounce**: Bouncy entrance effect
- **flip**: 3D flip animation

### ToastOptions Interface

```typescript
interface ToastOptions {
  title?: string;                 // Custom title text
  customIcon?: string;           // SVG string or image URL
  closeTime?: number;            // Override default close time
  showTitle?: boolean;           // Show/hide title (default: true)
  showProgress?: boolean;        // Show/hide progress bar (default: true)
}
```

### ToastConfig Interface

```typescript
interface ToastConfig {
  position?: ToastPosition;      // Global position setting
  enterAnimation?: AnimationType; // Global enter animation
  exitAnimation?: AnimationType;  // Global exit animation
}
```

## 📋 API Reference

### Static Methods

```javascript
// Basic toast methods
SeoToast.show(message, type?, options?)
SeoToast.success(message, options?)
SeoToast.error(message, options?)
SeoToast.warning(message, options?)
SeoToast.info(message, options?)

// Global instance management
SeoToast.getInstance(config?)
```

### Instance Methods

```javascript
const toast = SeoToast.getInstance();

// Show toast
toast.showToast(message, type?, options?)

// Property getters/setters
toast.closeTime = 3000;
toast.position = 'bottom-center';
toast.enterAnimation = 'bounce';
toast.exitAnimation = 'scale';
```

### Event System

```javascript
// Listen for toast close events
document.addEventListener('toast-close', (event) => {
  const { message, type, count, title } = event.attach;
  console.log('Toast closed:', { message, type, count });
});

// Event details
interface ToastEventDetail {
  message: string;
  type: ToastType;
  count: number;      // Number of times this message was shown
  title?: string;     // Title if provided
}
```

## Styling & Customization

### CSS Variables

seo-toast uses CSS custom properties for easy theming:

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
  
  /* Type-specific backgrounds */
  --toast-success-bg: #dcfce7;
  --toast-error-bg: #fee2e2;
  --toast-warning-bg: #fef3c7;
  --toast-info-bg: #dbeafe;
  
  /* Animation timing */
  --toast-enter-duration: 0.3s;
  --toast-exit-duration: 0.2s;
  --toast-enter-easing: ease-out;
  --toast-exit-easing: ease-out;
}
```

### 🎨 Layout & Sizing Variables

| Variable | Default Value | Description |
|----------|---------------|-------------|
| `--toast-gap` | 1rem | Gap between multiple toasts |
| `--toast-margin-bottom` | 1rem | Bottom margin of each toast |
| `--toast-padding` | 0.5rem 0.5rem 1rem 0.5rem | Internal padding |
| `--toast-border-width` | 1px | Border thickness |
| `--toast-border-radius` | 0.5rem | Rounded corners |
| `--toast-min-width` | 20rem | Minimum toast width |
| `--toast-max-width` | 20rem | Maximum toast width |

### 🎭 Animation Variables

| Variable | Default Value | Description |
|----------|---------------|-------------|
| `--toast-enter-duration` | 0.3s | Enter animation duration |
| `--toast-exit-duration` | 0.2s | Exit animation duration |
| `--toast-enter-easing` | ease-out | Enter animation timing |
| `--toast-exit-easing` | ease-out | Exit animation timing |
| `--toast-enter-transform` | translateX(10%) | Enter transform |
| `--toast-exit-transform` | translateY(10%) | Exit transform |

### 🎯 Icon & Message Variables

| Variable | Default Value | Description |
|----------|---------------|-------------|
| `--toast-icon-size` | 2rem | Icon wrapper size |
| `--toast-icon-border-radius` | 50% | Icon border radius |
| `--toast-icon-svg-size` | 1.2rem | SVG icon size |
| `--toast-title-font-weight` | bold | Title font weight |
| `--toast-title-font-size` | 0.9rem | Title font size |
| `--toast-desc-font-size` | 0.9rem | Description font size |
| `--toast-desc-line-height` | 1.4 | Description line height |

### 📊 Progress Bar Variables

| Variable | Default Value | Description |
|----------|---------------|-------------|
| `--toast-progress-height` | 3px | Progress bar height |

### ❌ Close Button Variables

| Variable | Default Value | Description |
|----------|---------------|-------------|
| `--toast-close-top` | 0.75rem | Close button top position |
| `--toast-close-right` | 0.75rem | Close button right position |
| `--toast-close-size` | 2.4rem | Close button size |
| `--toast-close-icon-size` | 1.6rem | Close icon size |

### Custom Themes

```css
/* Dark theme example */
seo-toast.dark-theme {
  --toast-success-bg: #064e3b;
  --toast-error-bg: #7f1d1d;
  --toast-warning-bg: #78350f;
  --toast-info-bg: #1e3a8a;
  
  --toast-box-shadow: 0 4px 8px rgba(0,0,0,.3);
  color: white;
}

/* Minimal theme example */
seo-toast.minimal-theme {
  --toast-border-radius: 0;
  --toast-box-shadow: none;
  --toast-padding: 1rem;
  --toast-border-width: 0;
}

/* Large screens optimization */
@media (min-width: 768px) {
  seo-toast {
    --toast-min-width: 24rem;
    --toast-max-width: 24rem;
    --toast-padding: 1rem;
  }
}
```

## Custom Icons

### SVG Strings

```javascript
SeoToast.success('Complete!', {
  customIcon: `<svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
  </svg>`
});
```

### Image URLs

```javascript
SeoToast.error('Network error', {
  customIcon: 'https://example.com/icons/network-error.svg'
});

// Relative paths
SeoToast.warning('Check input', {
  customIcon: './assets/warning-icon.png'
});
```

### Icon Requirements

- **SVG**: Must include `viewBox` attribute
- **Images**: Recommended size 24x24px or 32x32px
- **Format**: SVG, PNG, JPG, WebP supported
- **Color**: Use `fill="currentColor"` for theme-aware SVGs

## Framework Integration

### React

```jsx
import { useEffect } from 'react';
import 'seo-toast';

function App() {
  useEffect(() => {
    // Listen for events
    const handleToastClose = (event) => {
      console.log('Toast closed:', event.attach);
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
}

// TypeScript declarations
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'seo-toast': any;
    }
  }
}
```

### Vue

```vue
<template>
  <div>
    <button @click="showToast">Show Toast</button>
    <seo-toast position="bottom-right" />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import 'seo-toast';

const showToast = () => {
  SeoToast.info('Vue integration successful!');
};

let toastCloseHandler;

onMounted(() => {
  toastCloseHandler = (event) => {
    console.log('Toast closed:', event.attach);
  };
  document.addEventListener('toast-close', toastCloseHandler);
});

onUnmounted(() => {
  if (toastCloseHandler) {
    document.removeEventListener('toast-close', toastCloseHandler);
  }
});
</script>
```

### Angular

```typescript
import { Component, OnInit, OnDestroy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import 'seo-toast';

@Component({
  selector: 'app-toast-demo',
  template: `
    <button (click)="showToast()">Show Toast</button>
    <seo-toast position="top-left"></seo-toast>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ToastDemoComponent implements OnInit, OnDestroy {
  private toastCloseHandler?: (event: any) => void;

  ngOnInit() {
    this.toastCloseHandler = (event: any) => {
      console.log('Toast closed:', event.attach);
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
}
```

### Svelte

```svelte
<script>
  import { onMount, onDestroy } from 'svelte';
  import 'seo-toast';
  
  let toastCloseHandler;
  
  onMount(() => {
    toastCloseHandler = (event) => {
      console.log('Toast closed:', event.attach);
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
<seo-toast position="bottom-center" />
```

### Vanilla JavaScript

```html
<!DOCTYPE html>
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
      const { message, type, count } = event.attach;
      console.log(`Toast "${message}" closed (shown ${count} times)`);
    });
  </script>
</body>
</html>
```

## 📱 Responsive Design

```css
/* Mobile optimizations */
@media (max-width: 768px) {
  seo-toast {
    --toast-min-width: calc(100vw - 2rem);
    --toast-max-width: calc(100vw - 2rem);
    --toast-container-right: 1rem;
    --toast-container-top: 1rem;
  }
}

/* Tablet adjustments */
@media (min-width: 769px) and (max-width: 1024px) {
  seo-toast {
    --toast-min-width: 22rem;
    --toast-max-width: 22rem;
  }
}

/* Large desktop */
@media (min-width: 1440px) {
  seo-toast {
    --toast-container-right: 2rem;
    --toast-container-top: 2rem;
  }
}
```

## ♿ Accessibility Features

- **ARIA Labels**: All interactive elements have proper labels
- **Keyboard Navigation**: Close button is keyboard accessible
- **Screen Reader Support**: Toast messages are announced
- **High Contrast**: Customizable colors for accessibility
- **Reduced Motion**: Respects `prefers-reduced-motion` setting

```css
/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  seo-toast {
    --toast-enter-duration: 0.1s;
    --toast-exit-duration: 0.1s;
    --toast-enter-transform: none;
    --toast-exit-transform: none;
  }
}
```

## Migration Guide

### From Other Toast Libraries

```javascript
// Before: react-toastify
import { toast } from 'react-toastify';
toast.success('Success!');

// After: seo-toast
import 'seo-toast';
SeoToast.success('Success!');
```

```javascript
// Before: vue-toastification
this.$toast.success('Success!');

// After: seo-toast
SeoToast.success('Success!');
```

## License

MIT License - see [LICENSE](https://github.com/seadonggyun4/seo-toast/blob/main/LICENSE) file for details.
