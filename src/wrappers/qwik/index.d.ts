/**
 * Qwik Wrapper Type Definitions for seo-toast component
 */

import type { Component, QRL, Signal } from '@builder.io/qwik';
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
  onClose$?: QRL<(detail: ToastCloseEventDetail) => void>;
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
 * SeoToast Qwik Component
 */
export declare const SeoToast: Component<SeoToastProps>;

/**
 * Hook to get toast helpers from ref
 */
export declare const useToastHelpers: (elementRef: Signal<SeoToastElement | undefined>) => {
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
