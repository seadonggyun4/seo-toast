/**
 * Angular Wrapper for seo-toast component
 * Provides Angular-friendly interface
 */

// Import the actual web component to register it
import '../../components/seo-toast/index';

// Re-export everything from the Angular component
export { SeoToastComponent } from './seo-toast.component';

// Re-export types
export type {
  ToastType,
  ToastPosition,
  AnimationType,
  ToastOptions,
  ToastCloseEventDetail,
} from '../../types/index';
