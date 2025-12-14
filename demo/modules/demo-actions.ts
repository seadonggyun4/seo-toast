import type { DemoConfig, ToastOptions, ToastType } from './types';
import { statisticsManager } from './statistics';

declare const SeoToast: any;

/**
 * Demo action handlers
 */

/**
 * Add loading effect to a button
 */
export function addButtonLoadingEffect(button: HTMLElement, duration: number = 300): void {
  button.classList.add('loading');
  setTimeout(() => {
    button.classList.remove('loading');
  }, duration);
}

/**
 * Show a quick demo toast
 */
export function showQuickDemoToast(
  type: ToastType,
  message: string,
  button?: HTMLElement
): void {
  if (typeof SeoToast !== 'undefined') {
    SeoToast[type](message);
    statisticsManager.update(type);
  } else {
    console.log(`SeoToast not loaded - would show: ${message}`);
  }

  if (button) {
    addButtonLoadingEffect(button);
  }
}

/**
 * Show a configured toast based on demo config
 */
export function showConfiguredToast(config: DemoConfig, button?: HTMLElement): void {
  const options: ToastOptions = {
    closeTime: config.closeTime,
    showTitle: config.showTitle,
    showProgress: config.showProgress
  };

  if (config.customTitle) {
    options.title = config.customTitle;
  }

  if (config.customIcon) {
    options.customIcon = config.customIcon;
  }

  const message = `Configured ${config.type} toast with ${config.enterAnimation} enter and ${config.exitAnimation} exit animations at ${config.position}`;

  if (typeof SeoToast !== 'undefined') {
    SeoToast[config.type](message, options);
    statisticsManager.update(config.type);
  } else {
    console.log(`SeoToast not loaded - would show ${config.type}: ${message}`, options);
  }

  if (button) {
    addButtonLoadingEffect(button);
  }
}

/**
 * Test duplicate toast handling
 */
export function testDuplicates(button?: HTMLElement): void {
  const message = 'Duplicate prevention test';

  if (typeof SeoToast !== 'undefined') {
    SeoToast.info(message);
    statisticsManager.update('info');

    setTimeout(() => {
      SeoToast.info(message);
      statisticsManager.update('info');
    }, 500);

    setTimeout(() => {
      SeoToast.info(message);
      statisticsManager.update('info');
    }, 1000);
  } else {
    console.log('SeoToast not loaded - would show duplicate test');
  }

  if (button) {
    addButtonLoadingEffect(button);
  }
}

/**
 * Show welcome message toast
 */
export function showWelcomeMessage(delay: number = 1000): void {
  setTimeout(() => {
    if (typeof SeoToast !== 'undefined') {
      SeoToast.info('Welcome to seo-toast demo! Try the interactive controls above.', {
        closeTime: 4000
      });
      statisticsManager.update('info');
    }
  }, delay);
}

/**
 * Demo message templates for each toast type
 */
export const DEMO_MESSAGES: Record<ToastType, string> = {
  success: 'Success! Operation completed successfully.',
  error: 'Error! Something went wrong. Please try again.',
  warning: 'Warning! Please check your input before proceeding.',
  info: 'Info: New update is available for download.'
};
