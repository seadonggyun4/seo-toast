/**
 * Solid.js Wrapper for seo-toast component
 * Provides Solid-friendly interface with proper event handling
 */

import { onMount, onCleanup, createEffect } from 'solid-js';
import type { Component, JSX } from 'solid-js';

// Import the actual web component to register it
import '../../components/seo-toast/index';

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
export const SeoToast: Component<SeoToastProps> = (props) => {
  let elementRef: SeoToastElement | undefined;

  onMount(() => {
    if (!elementRef) return;

    const handleClose = (e: Event) => {
      props.onClose?.((e as CustomEvent<ToastCloseEventDetail>).detail);
    };

    elementRef.addEventListener('toast-close', handleClose);

    onCleanup(() => {
      elementRef?.removeEventListener('toast-close', handleClose);
    });
  });

  // Watch props changes
  createEffect(() => {
    if (!elementRef) return;
    if (props.closeTime !== undefined) {
      elementRef.closeTime = props.closeTime;
    }
  });

  createEffect(() => {
    if (!elementRef) return;
    if (props.position) {
      elementRef.position = props.position;
    }
  });

  createEffect(() => {
    if (!elementRef) return;
    if (props.enterAnimation) {
      elementRef.enterAnimation = props.enterAnimation;
    }
  });

  createEffect(() => {
    if (!elementRef) return;
    if (props.exitAnimation) {
      elementRef.exitAnimation = props.exitAnimation;
    }
  });

  return (
    <seo-toast
      ref={(el: SeoToastElement) => {
        elementRef = el;
        props.ref?.(el);
      }}
      close-time={props.closeTime?.toString()}
      position={props.position}
      enter-animation={props.enterAnimation}
      exit-animation={props.exitAnimation}
    />
  ) as JSX.Element;
};

// Helper functions for using toast
export const createToastHelpers = (element: SeoToastElement | undefined) => ({
  showToast: (message: string, type?: ToastType, options?: ToastOptions) => {
    element?.showToast(message, type, options);
  },
  success: (message: string, options?: ToastOptions) => {
    element?.showToast(message, 'success', options);
  },
  error: (message: string, options?: ToastOptions) => {
    element?.showToast(message, 'error', options);
  },
  warning: (message: string, options?: ToastOptions) => {
    element?.showToast(message, 'warning', options);
  },
  info: (message: string, options?: ToastOptions) => {
    element?.showToast(message, 'info', options);
  },
});

// Re-export types
export type {
  ToastType,
  ToastPosition,
  AnimationType,
  ToastOptions,
  ToastCloseEventDetail,
};

// JSX type declarations for Solid
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      'seo-toast': {
        ref?: (el: SeoToastElement) => void;
        'close-time'?: string;
        position?: string;
        'enter-animation'?: string;
        'exit-animation'?: string;
      };
    }
  }
}
