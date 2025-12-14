/**
 * seo-toast 이벤트 시스템
 */

import { EVENT_NAMES } from '../constants/constants';
import type {
  ToastEventDetail,
  ToastCloseEventDetail,
  ToastShowEventDetail,
} from '../types/index';

/**
 * Toast Show 커스텀 이벤트 생성
 */
export const createToastShowEvent = (
  detail: ToastShowEventDetail
): CustomEvent<ToastShowEventDetail> => {
  return new CustomEvent(EVENT_NAMES.TOAST_SHOW, {
    detail,
    bubbles: true,
    composed: true,
  });
};

/**
 * Toast Close 커스텀 이벤트 생성
 */
export const createToastCloseEvent = (
  detail: ToastCloseEventDetail
): CustomEvent<ToastCloseEventDetail> => {
  return new CustomEvent(EVENT_NAMES.TOAST_CLOSE, {
    detail,
    bubbles: true,
    composed: true,
  });
};

/**
 * Toast Click 커스텀 이벤트 생성
 */
export const createToastClickEvent = (
  detail: ToastEventDetail
): CustomEvent<ToastEventDetail> => {
  return new CustomEvent(EVENT_NAMES.TOAST_CLICK, {
    detail,
    bubbles: true,
    composed: true,
  });
};

/**
 * 이벤트 리스너 헬퍼 타입
 */
export type ToastShowEventListener = (event: CustomEvent<ToastShowEventDetail>) => void;
export type ToastCloseEventListener = (event: CustomEvent<ToastCloseEventDetail>) => void;
export type ToastClickEventListener = (event: CustomEvent<ToastEventDetail>) => void;

/**
 * 이벤트 헬퍼 함수들
 */
export const eventHelpers = {
  /**
   * toast-show 이벤트 리스너 추가
   */
  onShow: (
    element: HTMLElement | Document,
    callback: ToastShowEventListener
  ): (() => void) => {
    element.addEventListener(EVENT_NAMES.TOAST_SHOW, callback as EventListener);
    return () => element.removeEventListener(EVENT_NAMES.TOAST_SHOW, callback as EventListener);
  },

  /**
   * toast-close 이벤트 리스너 추가
   */
  onClose: (
    element: HTMLElement | Document,
    callback: ToastCloseEventListener
  ): (() => void) => {
    element.addEventListener(EVENT_NAMES.TOAST_CLOSE, callback as EventListener);
    return () => element.removeEventListener(EVENT_NAMES.TOAST_CLOSE, callback as EventListener);
  },

  /**
   * toast-click 이벤트 리스너 추가
   */
  onClick: (
    element: HTMLElement | Document,
    callback: ToastClickEventListener
  ): (() => void) => {
    element.addEventListener(EVENT_NAMES.TOAST_CLICK, callback as EventListener);
    return () => element.removeEventListener(EVENT_NAMES.TOAST_CLICK, callback as EventListener);
  },
};

// Re-export event names
export { EVENT_NAMES };
