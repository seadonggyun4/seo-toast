/**
 * seo-toast - 순수 Web Components 기반 토스트 알림 라이브러리
 */

// Main component export
export { SeoToast } from './components/seo-toast/index';

// Types export
export type {
  ToastType,
  ToastPosition,
  AnimationType,
  ToastOptions,
  ToastConfig,
  ToastEventDetail,
  ToastCloseEventDetail,
  ToastShowEventDetail,
  ISeoToast,
} from './types/index';

// Constants export
export {
  DEFAULT_CONFIG,
  DEFAULT_TITLES,
  DEFAULT_ICONS,
  EVENT_NAMES,
} from './constants/constants';

// Utils export
export {
  isBrowser,
  canUseCustomElements,
  safeRequestAnimationFrame,
  safeCancelAnimationFrame,
  safeDefineCustomElement,
} from './utils/environment';
