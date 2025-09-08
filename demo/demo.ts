import { SeoToast } from '../src/components/seo-toast';

// Initialize toast instance
const toast = SeoToast.getInstance({
  position: 'top-right',
  enterAnimation: 'slide',
  exitAnimation: 'slide'
});

// Demo button handlers
class DemoHandlers {
  constructor() {
    this.setupBasicDemo();
    this.setupPositionDemo();
    this.setupAnimationDemo();
    this.setupAdvancedDemo();
  }

  private setupBasicDemo(): void {
    // Quick demo buttons in hero section
    document.getElementById('demo-success')?.addEventListener('click', () => {
      SeoToast.success('Success! Operation completed successfully.');
    });

    document.getElementById('demo-error')?.addEventListener('click', () => {
      SeoToast.error('Error! Something went wrong. Please try again.');
    });

    document.getElementById('demo-warning')?.addEventListener('click', () => {
      SeoToast.warning('Warning! Please check your input before proceeding.');
    });

    document.getElementById('demo-info')?.addEventListener('click', () => {
      SeoToast.info('Info: New update is available for download.');
    });

    // Basic usage demo
    document.getElementById('demo-basic')?.addEventListener('click', () => {
      const messages = [
        { type: 'success' as const, text: 'Data saved successfully!' },
        { type: 'error' as const, text: 'Network connection failed' },
        { type: 'warning' as const, text: 'Session will expire in 5 minutes' },
        { type: 'info' as const, text: 'New features have been added' }
      ];

      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      SeoToast[randomMessage.type](randomMessage.text);
    });
  }

  private setupPositionDemo(): void {
    document.getElementById('demo-position-top')?.addEventListener('click', () => {
      SeoToast.getInstance({ position: 'top-center' });
      SeoToast.info('Toast positioned at top center');
    });

    document.getElementById('demo-position-bottom')?.addEventListener('click', () => {
      SeoToast.getInstance({ position: 'bottom-center' });
      SeoToast.success('Toast positioned at bottom center');
    });
  }

  private setupAnimationDemo(): void {
    document.getElementById('demo-slide')?.addEventListener('click', () => {
      SeoToast.getInstance({
        enterAnimation: 'slide',
        exitAnimation: 'slide'
      });
      SeoToast.info('Slide animation demo');
    });

    document.getElementById('demo-fade')?.addEventListener('click', () => {
      SeoToast.getInstance({
        enterAnimation: 'fade',
        exitAnimation: 'fade'
      });
      SeoToast.warning('Fade animation demo');
    });

    document.getElementById('demo-scale')?.addEventListener('click', () => {
      SeoToast.getInstance({
        enterAnimation: 'scale',
        exitAnimation: 'scale'
      });
      SeoToast.success('Scale animation demo');
    });

    document.getElementById('demo-bounce')?.addEventListener('click', () => {
      SeoToast.getInstance({
        enterAnimation: 'bounce',
        exitAnimation: 'bounce'
      });
      SeoToast.error('Bounce animation demo');
    });
  }

  private setupAdvancedDemo(): void {
    // Custom icon demo
    document.getElementById('demo-custom-icon')?.addEventListener('click', () => {
      const customSvg = `<svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 8.26L24 9l-6 5.74L19.18 24 12 19.5 4.82 24 6 14.74 0 9l8.91-1.26L12 2z"/>
      </svg>`;
      
      SeoToast.success('⭐ Custom star icon!', {
        customIcon: customSvg,
        closeTime: 3000
      });
    });

    // Advanced configuration demo
    document.getElementById('demo-advanced')?.addEventListener('click', () => {
      // Add event listener for this demo
      const handleToastClose = (event: any) => {
        console.log('Toast closed:', event.detail);
        SeoToast.info(`Previous toast was closed after ${event.detail.count} occurrence(s)`);
        // Remove listener after first use
        toast.removeEventListener('toast-close', handleToastClose);
      };

      toast.addEventListener('toast-close', handleToastClose);

      SeoToast.warning('This toast has custom timing and event handling', {
        closeTime: 5000
      });
    });

    // Duplicate prevention demo
    document.getElementById('demo-duplicate')?.addEventListener('click', () => {
      // Call the same message multiple times quickly
      SeoToast.info('This is a duplicate message test');
      
      setTimeout(() => {
        SeoToast.info('This is a duplicate message test');
      }, 500);
      
      setTimeout(() => {
        SeoToast.info('This is a duplicate message test');
      }, 1000);
    });
  }
}

// Framework integration examples (for display purposes)
class FrameworkExamples {
  static getReactExample(): string {
    return `import { SeoToast } from 'seo-toast';
import 'seo-toast/dist/style.css';

function MyComponent() {
  const handleSubmit = async () => {
    try {
      await submitForm();
      SeoToast.success('Form submitted successfully!');
    } catch (error) {
      SeoToast.error('Submission failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  );
}`;
  }

  static getVueExample(): string {
    return `<template>
  <button @click="handleClick">Show Toast</button>
</template>

<script setup>
import { SeoToast } from 'seo-toast';
import 'seo-toast/dist/style.css';

const handleClick = () => {
  SeoToast.success('Vue 3 Composition API Toast!');
};
</script>`;
  }

  static getAngularExample(): string {
    return `import { Component } from '@angular/core';
import { SeoToast } from 'seo-toast';

@Component({
  selector: 'app-example',
  template: \`<button (click)="showToast()">Show Toast</button>\`
})
export class ExampleComponent {
  showToast() {
    SeoToast.success('Angular Toast Example!');
  }
}`;
  }

  static getSvelteExample(): string {
    return `<script>
  import { SeoToast } from 'seo-toast';
  import 'seo-toast/dist/style.css';

  function handleClick() {
    SeoToast.success('Svelte Toast Example!');
  }
</script>

<button on:click={handleClick}>Show Toast</button>`;
  }
}

// Statistics and analytics (for demo purposes)
class DemoAnalytics {
  private stats = {
    totalToasts: 0,
    successToasts: 0,
    errorToasts: 0,
    warningToasts: 0,
    infoToasts: 0
  };

  constructor() {
    this.trackToastEvents();
    this.displayStats();
  }

  private trackToastEvents(): void {
    toast.addEventListener('toast-close', (event: any) => {
      this.stats.totalToasts++;
      
      switch (event.detail.type) {
        case 'success':
          this.stats.successToasts++;
          break;
        case 'error':
          this.stats.errorToasts++;
          break;
        case 'warning':
          this.stats.warningToasts++;
          break;
        case 'info':
          this.stats.infoToasts++;
          break;
      }
      
      this.updateStatsDisplay();
    });
  }

  private displayStats(): void {
    // Create stats display element if it doesn't exist
    if (!document.getElementById('demo-stats')) {
      const statsEl = document.createElement('div');
      statsEl.id = 'demo-stats';
      statsEl.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 15px;
        border-radius: 8px;
        font-size: 12px;
        font-family: monospace;
        z-index: 100000;
        min-width: 200px;
      `;
      document.body.appendChild(statsEl);
    }
    
    this.updateStatsDisplay();
  }

  private updateStatsDisplay(): void {
    const statsEl = document.getElementById('demo-stats');
    if (statsEl) {
      statsEl.innerHTML = `
        <div style="font-weight: bold; margin-bottom: 8px;">Demo Statistics</div>
        <div>Total Toasts: ${this.stats.totalToasts}</div>
        <div style="color: #10b981;">Success: ${this.stats.successToasts}</div>
        <div style="color: #ef4444;">Error: ${this.stats.errorToasts}</div>
        <div style="color: #f59e0b;">Warning: ${this.stats.warningToasts}</div>
        <div style="color: #3b82f6;">Info: ${this.stats.infoToasts}</div>
      `;
    }
  }
}

// Smooth scrolling for navigation
class SmoothScroll {
  constructor() {
    this.setupScrollBehavior();
  }

  private setupScrollBehavior(): void {
    // Add navigation if needed
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute('href')?.substring(1);
        const target = targetId ? document.getElementById(targetId) : null;
        
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
}

// Initialize demo when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('🎉 seo-toast Demo Page Loaded');
  
  // Initialize all demo functionality
  new DemoHandlers();
  new DemoAnalytics();
  new SmoothScroll();

  // Show welcome message
  setTimeout(() => {
    SeoToast.info('Welcome to seo-toast demo! Try the buttons above.', {
      closeTime: 4000
    });
  }, 1000);

  // Add some visual feedback for demo interactions
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
      this.classList.add('loading');
      setTimeout(() => {
        this.classList.remove('loading');
      }, 300);
    });
  });
});

// Export for potential external use
export { 
  SeoToast, 
  FrameworkExamples,
  DemoHandlers 
};