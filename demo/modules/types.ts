// Toast types (re-exported from main)
export type ToastType = 'success' | 'error' | 'warning' | 'info';
export type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
export type AnimationType = 'slide' | 'fade' | 'scale' | 'bounce' | 'flip';

export interface ToastOptions {
  title?: string;
  customIcon?: string;
  closeTime?: number;
  showTitle?: boolean;
  showProgress?: boolean;
}

export interface ToastConfig {
  position?: ToastPosition;
  enterAnimation?: AnimationType;
  exitAnimation?: AnimationType;
}

// Demo configuration state
export interface DemoConfig {
  type: ToastType;
  position: ToastPosition;
  enterAnimation: AnimationType;
  exitAnimation: AnimationType;
  closeTime: number;
  showTitle: boolean;
  showProgress: boolean;
  customTitle: string;
  customIcon: string | null;
}

// Statistics tracking
export interface ToastStats {
  total: number;
  success: number;
  error: number;
  warning: number;
  info: number;
}

// Default demo configuration
export const DEFAULT_DEMO_CONFIG: DemoConfig = {
  type: 'success',
  position: 'top-right',
  enterAnimation: 'slide',
  exitAnimation: 'slide',
  closeTime: 2000,
  showTitle: true,
  showProgress: true,
  customTitle: '',
  customIcon: null
};

// Default stats
export const DEFAULT_STATS: ToastStats = {
  total: 0,
  success: 0,
  error: 0,
  warning: 0,
  info: 0
};
