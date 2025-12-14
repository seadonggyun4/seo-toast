/**
 * React Wrapper for seo-toast component
 * Provides React-friendly interface with proper event handling and types
 */

import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from 'react';

// Import the actual web component to register it
import '../../components/seo-toast/index';

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

// Component ref interface for imperative methods
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
 * Wrapper for the seo-toast web component
 */
export const SeoToast = forwardRef<SeoToastRef, SeoToastReactProps>(
  (props, ref) => {
    const elementRef = useRef<HTMLElement>(null);

    const {
      closeTime,
      position,
      enterAnimation,
      exitAnimation,
      onClose,
    } = props;

    // Imperative handle methods
    const showToast = useCallback((message: string, type?: ToastType, options?: ToastOptions) => {
      if (elementRef.current) {
        (elementRef.current as any).showToast(message, type, options);
      }
    }, []);

    const success = useCallback((message: string, options?: ToastOptions) => {
      showToast(message, 'success', options);
    }, [showToast]);

    const error = useCallback((message: string, options?: ToastOptions) => {
      showToast(message, 'error', options);
    }, [showToast]);

    const warning = useCallback((message: string, options?: ToastOptions) => {
      showToast(message, 'warning', options);
    }, [showToast]);

    const info = useCallback((message: string, options?: ToastOptions) => {
      showToast(message, 'info', options);
    }, [showToast]);

    // Expose methods via ref
    useImperativeHandle(ref, () => ({
      element: elementRef.current,
      showToast,
      success,
      error,
      warning,
      info,
    }), [showToast, success, error, warning, info]);

    // Set properties
    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      if (closeTime !== undefined) {
        (element as any).closeTime = closeTime;
      }
      if (position) {
        (element as any).position = position;
      }
      if (enterAnimation) {
        (element as any).enterAnimation = enterAnimation;
      }
      if (exitAnimation) {
        (element as any).exitAnimation = exitAnimation;
      }
    }, [closeTime, position, enterAnimation, exitAnimation]);

    // Set up event listeners
    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      const handlers: Array<[string, EventListener]> = [];

      if (onClose) {
        const handler = onClose as EventListener;
        element.addEventListener('toast-close', handler);
        handlers.push(['toast-close', handler]);
      }

      return () => {
        handlers.forEach(([event, handler]) => {
          element.removeEventListener(event, handler);
        });
      };
    }, [onClose]);

    return (
      <seo-toast
        ref={elementRef as React.RefObject<any>}
        close-time={closeTime?.toString()}
        position={position}
        enter-animation={enterAnimation}
        exit-animation={exitAnimation}
      />
    );
  }
);

SeoToast.displayName = 'SeoToast';

// Re-export types
export type {
  ToastType,
  ToastPosition,
  AnimationType,
  ToastOptions,
  ToastCloseEventDetail,
};

// Declare JSX intrinsic elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'seo-toast': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        ref?: React.RefObject<any>;
        'close-time'?: string;
        position?: string;
        'enter-animation'?: string;
        'exit-animation'?: string;
      };
    }
  }
}
