# SeoToast

<img width="300" height="300" alt="logo" src="https://github.com/user-attachments/assets/8ea33832-77b7-43d6-acdb-b622b20ea17b" />

A lightweight and versatile toast notification component implemented as a native Web Component. This library operates seamlessly across all frameworks and vanilla JavaScript without external dependencies.

[![NPM](https://img.shields.io/npm/dt/seo-toast.svg?label=NPM)](https://www.npmjs.com/package/seo-toast)
[![GitHub stars](https://img.shields.io/github/stars/seadonggyun4/seo-toast.svg)](https://github.com/seadonggyun4/seo-toast/stargazers)

- **[GitHub Repository](https://github.com/seadonggyun4/seo-toast)**
- **[Documentation Site](https://seo-toast.netlify.app/)**

---

## Features

- **Toast Types**: Four notification types (success, error, warning, info) with built-in icons
- **Position Options**: Six configurable positions (top/bottom combined with left, center, right)
- **Animation Effects**: Five animation types (slide, fade, scale, bounce, flip)
- **Progress Bar**: Visual countdown indicator with pause-on-hover functionality
- **Duplicate Grouping**: Identical messages are automatically grouped with occurrence counters
- **Customizable Theming**: SCSS variables for comprehensive styling control
- **Accessibility**: ARIA attributes and keyboard navigation support
- **Custom Icons**: Support for SVG strings and image URLs
- **Framework Wrappers**: Official support for React, Vue, Angular, Solid, and Qwik
- **SSR Compatibility**: Functions correctly in server-side rendering environments
- **Zero Dependencies**: Implemented with pure Web Components without external libraries
- **Minimal Footprint**: Approximately 10KB gzipped

---

## Comparative Analysis

SeoToast is implemented as a pure Web Component that operates independently of any framework, with native support for React, Vue, Angular, Solid, and Qwik. The following table presents a feature comparison with established toast notification libraries:

| Feature            | SeoToast                       | react-toastify | sonner  | notistack |
| ------------------ | ------------------------------ | -------------- | ------- | --------- |
| Framework Agnostic | Web Component                  | React only     | React   | React     |
| Bundle Size        | ~10KB                          | Large          | Moderate| Moderate  |
| Dependencies       | None                           | React only     | Required| Required  |
| Position Options   | 6 positions                    | Limited        | Limited | Limited   |
| Animations         | 5 types                        | Basic          | Basic   | None      |
| Duplicate Grouping | Built-in                       | Not available  | Not available | Not available |
| Progress Bar       | Hover pause                    | Partial        | None    | None      |
| Accessibility      | ARIA + Keyboard                | Partial        | Partial | Partial   |
| SSR Support        | Compatible                     | Issues reported| Partial | Partial   |
| Custom Icons       | SVG/URL                        | Partial        | Partial | Partial   |
| Multi-Framework    | React/Vue/Angular/Qwik/Solid   | Not available  | Not available | Not available |

### Key Advantages

SeoToast provides a framework-agnostic Web Component architecture that is SSR-compatible, lightweight, and highly extensible. The library offers comprehensive functionality including duplicate message grouping, custom icon support, flexible positioning and animation options, and accessibility compliance. Official wrapper components for React, Vue, Angular, Solid, and Qwik facilitate seamless integration across diverse project environments.

---

## Installation

### Module Bundlers

```bash
npm install seo-toast
```

```javascript
import 'seo-toast';
import 'seo-toast/styles';
```

### Direct Browser Usage

```html
<link rel="stylesheet" href="./min/index.css">
<script type="module" src="./min/index.js"></script>
```

---

## Component Overview

### seo-toast

The native Web Component for toast notifications utilizes Light DOM for global theming compatibility. All configuration is available through attributes or the JavaScript API.

---

## Usage Examples

### HTML Implementation

```html
<seo-toast position="top-right"></seo-toast>
<button onclick="SeoToast.success('Hello!')">Show Toast</button>
```

### JavaScript Implementation

```javascript
import 'seo-toast';
import 'seo-toast/styles';

SeoToast.success('Operation completed!');
SeoToast.error('Something went wrong!');
SeoToast.warning('Please check your input');
SeoToast.info('New feature available');
```

### Advanced Configuration

```javascript
SeoToast.success('Saved!', {
  title: 'Success',
  closeTime: 5000,
  showProgress: true,
  customIcon: 'https://example.com/success.svg'
});

const toast = SeoToast.getInstance({
  position: 'bottom-center',
  enterAnimation: 'bounce',
  exitAnimation: 'fade'
});
toast.showToast('Custom message', 'warning', { showTitle: false, closeTime: 3000 });
```

---

## Framework Integration

SeoToast provides official wrapper components for major frameworks with native APIs and proper event handling.

### Supported Frameworks

| Framework | Import Path         | Minimum Version |
|-----------|---------------------|-----------------|
| React     | seo-toast/react     | 17.0.0          |
| Vue       | seo-toast/vue       | 3.0.0           |
| Angular   | seo-toast/angular   | 14.0.0          |
| Solid     | seo-toast/solid     | 1.0.0           |
| Qwik      | seo-toast/qwik      | 1.0.0           |

All framework dependencies are optional peer dependencies.

---

### React

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

---

### Vue 3

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

---

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

---

### Solid.js

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

---

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

---

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

    document.addEventListener('toast-close', (event) => {
      console.log('Toast closed:', event.detail);
    });
  </script>
</body>
</html>
```

---

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

---

## Event Reference

| Event Name    | Properties                                    | Description                        |
|---------------|-----------------------------------------------|------------------------------------|
| `toast-close` | `{ message, type, count, title, reason }`     | Triggered when a toast is closed   |

### Event Handling

```javascript
document.addEventListener('toast-close', (event) => {
  const { message, type, count, title, reason } = event.detail;
  console.log('Toast closed:', { message, type, reason });
});
```

### Event Detail Interface

```typescript
interface ToastCloseEventDetail {
  message: string;
  type: ToastType;
  count: number;
  title?: string;
  reason: 'timeout' | 'click' | 'manual';
}
```

---

## Component Attributes

| Attribute         | Type   | Default      | Description                          |
|-------------------|--------|--------------|--------------------------------------|
| `close-time`      | number | 3000         | Auto-close duration in milliseconds  |
| `position`        | string | 'top-right'  | Toast display position               |
| `enter-animation` | string | 'slide'      | Animation when toast appears         |
| `exit-animation`  | string | 'slide'      | Animation when toast disappears      |

### Valid Values

**Position Options**
- `top-left`, `top-center`, `top-right`
- `bottom-left`, `bottom-center`, `bottom-right`

**Animation Options**
- `slide`: Slides in from the side (default)
- `fade`: Fades in/out with opacity transition
- `scale`: Scales up/down from center
- `bounce`: Bouncy entrance effect
- `flip`: 3D flip animation

**Toast Types**
- `success`, `error`, `warning`, `info`

---

## TypeScript Support

### Type Definitions

```typescript
import type { ToastType, ToastPosition, ToastOptions } from 'seo-toast/types';
```

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

---

## Styling and Customization

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

  /* Text colors */
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

### Dark Theme Configuration

```css
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

### Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  seo-toast {
    --toast-enter-duration: 0.1s;
    --toast-exit-duration: 0.1s;
  }
}
```

---

## Custom Icons

### SVG String

```javascript
SeoToast.success('Complete!', {
  customIcon: `<svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
  </svg>`
});
```

### Image URL

```javascript
SeoToast.error('Network error', {
  customIcon: 'https://example.com/icons/error.svg'
});
```

---

## Browser Support

| Browser | Minimum Version |
|---------|-----------------|
| Chrome  | 67+             |
| Firefox | 63+             |
| Safari  | 10.1+           |
| Edge    | 79+             |

---

## Development Workflows

| Command | Description |
|---------|-------------|
| `npm run build` | Production build |
| `npm run build:min` | Standalone minified build |
| `npm run dev` | Development server |
| `npm run type-check` | TypeScript type checking |
| `npm run release:patch\|minor\|major` | Version release |

The `demo/` directory contains demonstration files that can be executed with the development server.

---

## License

MIT License - Refer to the [LICENSE](https://github.com/seadonggyun4/seo-toast/blob/main/LICENSE) file for details.

---

## Resources

- [GitHub Repository](https://github.com/seadonggyun4/seo-toast)
- [NPM Package](https://www.npmjs.com/package/seo-toast)
- [Live Demo](https://seo-toast.netlify.app/)
- [Issue Tracker](https://github.com/seadonggyun4/seo-toast/issues)
