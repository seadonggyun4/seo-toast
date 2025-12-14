/**
 * Qwik Wrapper for seo-toast component
 * Provides Qwik-friendly interface with proper event handling
 */

import {
  component$,
  useSignal,
  useVisibleTask$,
  type QRL,
  type Signal,
} from '@builder.io/qwik';

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
export const SeoToast = component$<SeoToastProps>((props) => {
  const elementRef: Signal<SeoToastElement | undefined> = useSignal();

  useVisibleTask$(({ track, cleanup }) => {
    track(() => elementRef.value);

    const el = elementRef.value;
    if (!el) return;

    // Set initial properties
    if (props.closeTime !== undefined) {
      el.closeTime = props.closeTime;
    }
    if (props.position) {
      el.position = props.position;
    }
    if (props.enterAnimation) {
      el.enterAnimation = props.enterAnimation;
    }
    if (props.exitAnimation) {
      el.exitAnimation = props.exitAnimation;
    }

    // Event handler
    const handleClose = (e: Event) => {
      props.onClose$?.((e as CustomEvent<ToastCloseEventDetail>).detail);
    };

    el.addEventListener('toast-close', handleClose);

    cleanup(() => {
      el.removeEventListener('toast-close', handleClose);
    });
  });

  // Watch props changes
  useVisibleTask$(({ track }) => {
    track(() => props.closeTime);
    const el = elementRef.value;
    if (el && props.closeTime !== undefined) {
      el.closeTime = props.closeTime;
    }
  });

  useVisibleTask$(({ track }) => {
    track(() => props.position);
    const el = elementRef.value;
    if (el && props.position) {
      el.position = props.position;
    }
  });

  useVisibleTask$(({ track }) => {
    track(() => props.enterAnimation);
    const el = elementRef.value;
    if (el && props.enterAnimation) {
      el.enterAnimation = props.enterAnimation;
    }
  });

  useVisibleTask$(({ track }) => {
    track(() => props.exitAnimation);
    const el = elementRef.value;
    if (el && props.exitAnimation) {
      el.exitAnimation = props.exitAnimation;
    }
  });

  return (
    <seo-toast
      ref={elementRef}
      close-time={props.closeTime?.toString()}
      position={props.position}
      enter-animation={props.enterAnimation}
      exit-animation={props.exitAnimation}
    />
  );
});

/**
 * Hook to get toast helpers from ref
 */
export const useToastHelpers = (elementRef: Signal<SeoToastElement | undefined>) => ({
  showToast: (message: string, type?: ToastType, options?: ToastOptions) => {
    elementRef.value?.showToast(message, type, options);
  },
  success: (message: string, options?: ToastOptions) => {
    elementRef.value?.showToast(message, 'success', options);
  },
  error: (message: string, options?: ToastOptions) => {
    elementRef.value?.showToast(message, 'error', options);
  },
  warning: (message: string, options?: ToastOptions) => {
    elementRef.value?.showToast(message, 'warning', options);
  },
  info: (message: string, options?: ToastOptions) => {
    elementRef.value?.showToast(message, 'info', options);
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
