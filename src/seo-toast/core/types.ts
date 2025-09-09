// core/types.ts
export interface ToastOptions {
  closeTime?: number;
  customIcon?: string; // Image URL or inline SVG string
  title?: string;
  showTitle?: boolean;   // default: true
  showProgress?: boolean; // default: true
}

export type ToastType =
  | 'success'
  | 'error'
  | 'info'
  | 'warning';

export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center';

export type AnimationType = 'slide' | 'fade' | 'scale' | 'bounce' | 'flip';

export interface ToastConfig {
  position?: ToastPosition;
  enterAnimation?: AnimationType;
  exitAnimation?: AnimationType;
}

export interface ToastEventDetail {
  message: string;
  type: ToastType;
  count: number;
  title?: string;
}
