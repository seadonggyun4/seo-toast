/**
 * React Wrapper Type Definitions for seo-toast component
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import type {
  ToastType,
  ToastPosition,
  AnimationType,
  ToastOptions,
  ToastCloseEventDetail,
} from '../../types/index';

// Event detail types
export interface ToastCloseEvent {
  message: string;
  type: ToastType;
  count: number;
  title?: string;
  reason: 'timeout' | 'click' | 'manual';
}

// Component ref interface
export interface SeoToastRef {
  element: HTMLElement | null;
  showToast: (message: string, type?: ToastType, options?: ToastOptions) => void;
  success: (message: string, options?: ToastOptions) => void;
  error: (message: string, options?: ToastOptions) => void;
  warning: (message: string, options?: ToastOptions) => void;
  info: (message: string, options?: ToastOptions) => void;
}

// Props interface for SeoToast
export interface SeoToastReactProps {
  /** Toast 자동 닫힘 시간 (ms) */
  closeTime?: number;
  /** Toast 위치 */
  position?: ToastPosition;
  /** 진입 애니메이션 */
  enterAnimation?: AnimationType;
  /** 퇴장 애니메이션 */
  exitAnimation?: AnimationType;

  // Events
  /** Toast 닫힘 이벤트 */
  onClose?: (event: CustomEvent<ToastCloseEventDetail>) => void;
}

/**
 * SeoToast React Component
 */
export declare const SeoToast: ForwardRefExoticComponent<SeoToastReactProps & RefAttributes<SeoToastRef>>;

// Re-export types
export type {
  ToastType,
  ToastPosition,
  AnimationType,
  ToastOptions,
  ToastCloseEventDetail,
};
