/**
 * Vue 3 Wrapper for seo-toast component
 * Provides Vue-friendly interface with proper event handling
 */

import {
  defineComponent,
  ref,
  watch,
  onMounted,
  onBeforeUnmount,
  h,
  type PropType,
  type SetupContext,
} from 'vue';

// Import the actual web component to register it
import '../../components/seo-toast/index';

import type {
  ToastType,
  ToastPosition,
  AnimationType,
  ToastOptions,
  ToastCloseEventDetail,
} from '../../types/index';

/**
 * SeoToast Vue Component
 */
export const SeoToast = defineComponent({
  name: 'SeoToast',
  props: {
    closeTime: Number,
    position: String as PropType<ToastPosition>,
    enterAnimation: String as PropType<AnimationType>,
    exitAnimation: String as PropType<AnimationType>,
  },
  emits: ['close'],
  setup(props, { emit, expose }: SetupContext) {
    const elementRef = ref<HTMLElement | null>(null);

    // Event handlers
    const handleClose = (e: Event) => {
      emit('close', (e as CustomEvent<ToastCloseEventDetail>).detail);
    };

    onMounted(() => {
      const el = elementRef.value;
      if (!el) return;

      // Set initial properties
      if (props.closeTime !== undefined) {
        (el as any).closeTime = props.closeTime;
      }
      if (props.position) {
        (el as any).position = props.position;
      }
      if (props.enterAnimation) {
        (el as any).enterAnimation = props.enterAnimation;
      }
      if (props.exitAnimation) {
        (el as any).exitAnimation = props.exitAnimation;
      }

      // Add event listeners
      el.addEventListener('toast-close', handleClose);
    });

    onBeforeUnmount(() => {
      const el = elementRef.value;
      if (!el) return;

      el.removeEventListener('toast-close', handleClose);
    });

    // Watch for prop changes
    watch(() => props.closeTime, (newVal) => {
      if (elementRef.value && newVal !== undefined) {
        (elementRef.value as any).closeTime = newVal;
      }
    });

    watch(() => props.position, (newVal) => {
      if (elementRef.value && newVal) {
        (elementRef.value as any).position = newVal;
      }
    });

    watch(() => props.enterAnimation, (newVal) => {
      if (elementRef.value && newVal) {
        (elementRef.value as any).enterAnimation = newVal;
      }
    });

    watch(() => props.exitAnimation, (newVal) => {
      if (elementRef.value && newVal) {
        (elementRef.value as any).exitAnimation = newVal;
      }
    });

    // Methods
    const showToast = (message: string, type?: ToastType, options?: ToastOptions) => {
      if (elementRef.value) {
        (elementRef.value as any).showToast(message, type, options);
      }
    };

    const success = (message: string, options?: ToastOptions) => {
      showToast(message, 'success', options);
    };

    const error = (message: string, options?: ToastOptions) => {
      showToast(message, 'error', options);
    };

    const warning = (message: string, options?: ToastOptions) => {
      showToast(message, 'warning', options);
    };

    const info = (message: string, options?: ToastOptions) => {
      showToast(message, 'info', options);
    };

    // Expose methods
    expose({
      element: elementRef,
      showToast,
      success,
      error,
      warning,
      info,
    });

    return () => h('seo-toast', {
      ref: elementRef,
      'close-time': props.closeTime?.toString(),
      position: props.position,
      'enter-animation': props.enterAnimation,
      'exit-animation': props.exitAnimation,
    });
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

// Vue custom element declaration
declare module 'vue' {
  export interface GlobalComponents {
    SeoToast: typeof SeoToast;
  }
}
