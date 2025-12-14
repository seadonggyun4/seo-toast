/**
 * Vue 3 Wrapper Type Definitions for seo-toast component
 */

import type { DefineComponent, Ref } from 'vue';
import type {
  ToastType,
  ToastPosition,
  AnimationType,
  ToastOptions,
  ToastCloseEventDetail,
} from '../../types/index';

// Props interface
export interface SeoToastProps {
  closeTime?: number;
  position?: ToastPosition;
  enterAnimation?: AnimationType;
  exitAnimation?: AnimationType;
}

// Emits interface
export interface SeoToastEmits {
  (e: 'close', detail: ToastCloseEventDetail): void;
}

// Exposed methods interface
export interface SeoToastExposed {
  element: Ref<HTMLElement | null>;
  showToast: (message: string, type?: ToastType, options?: ToastOptions) => void;
  success: (message: string, options?: ToastOptions) => void;
  error: (message: string, options?: ToastOptions) => void;
  warning: (message: string, options?: ToastOptions) => void;
  info: (message: string, options?: ToastOptions) => void;
}

/**
 * SeoToast Vue Component
 */
export declare const SeoToast: DefineComponent<
  SeoToastProps,
  SeoToastExposed,
  {},
  {},
  {},
  {},
  {},
  SeoToastEmits
>;

// Re-export types
export type {
  ToastType,
  ToastPosition,
  AnimationType,
  ToastOptions,
  ToastCloseEventDetail,
};
