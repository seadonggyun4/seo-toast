/**
 * Solid.js Wrapper Type Definitions for seo-toast component
 */

import type { Component } from 'solid-js';
import type {
  ToastType,
  ToastPosition,
  AnimationType,
  ToastOptions,
  ToastCloseEventDetail,
} from '../../types/index';

// Props interface for SeoToast
export interface SeoToastProps {
  closeTime?: number;
  position?: ToastPosition;
  enterAnimation?: AnimationType;
  exitAnimation?: AnimationType;
  onClose?: (detail: ToastCloseEventDetail) => void;
  ref?: (el: SeoToastElement) => void;
}

// Extended element interface with methods
export interface SeoToastElement extends HTMLElement {
  showToast: (message: string, type?: ToastType, options?: ToastOptions) => void;
  closeTime: number;
  position: ToastPosition;
  enterAnimation: AnimationType;
  exitAnimation: AnimationType;
}

/**
 * SeoToast Solid Component
 */
export declare const SeoToast: Component<SeoToastProps>;

/**
 * Helper functions for using toast
 */
export declare const createToastHelpers: (element: SeoToastElement | undefined) => {
  showToast: (message: string, type?: ToastType, options?: ToastOptions) => void;
  success: (message: string, options?: ToastOptions) => void;
  error: (message: string, options?: ToastOptions) => void;
  warning: (message: string, options?: ToastOptions) => void;
  info: (message: string, options?: ToastOptions) => void;
};

// Re-export types
export type {
  ToastType,
  ToastPosition,
  AnimationType,
  ToastOptions,
  ToastCloseEventDetail,
};
