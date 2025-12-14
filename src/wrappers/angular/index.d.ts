/**
 * Angular Wrapper Type Definitions for seo-toast component
 */

import { EventEmitter, ElementRef } from '@angular/core';
import type {
  ToastType,
  ToastPosition,
  AnimationType,
  ToastOptions,
  ToastCloseEventDetail,
} from '../../types/index';

export declare class SeoToastComponent {
  toastElementRef: ElementRef<HTMLElement>;

  closeTime?: number;
  position?: ToastPosition;
  enterAnimation?: AnimationType;
  exitAnimation?: AnimationType;

  close: EventEmitter<ToastCloseEventDetail>;

  get element(): HTMLElement | null;

  showToast(message: string, type?: ToastType, options?: ToastOptions): void;
  success(message: string, options?: ToastOptions): void;
  error(message: string, options?: ToastOptions): void;
  warning(message: string, options?: ToastOptions): void;
  info(message: string, options?: ToastOptions): void;
}

// Re-export types
export type {
  ToastType,
  ToastPosition,
  AnimationType,
  ToastOptions,
  ToastCloseEventDetail,
};
