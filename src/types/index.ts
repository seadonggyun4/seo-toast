/**
 * seo-toast 타입 정의
 */

import type { ToastType, ToastPosition, AnimationType } from '../constants/constants';

// Re-export from constants
export type { ToastType, ToastPosition, AnimationType };

/**
 * Toast 표시 옵션
 */
export interface ToastOptions {
  /** 자동 닫힘 시간 (ms) */
  closeTime?: number;
  /** 커스텀 아이콘 (SVG 문자열 또는 이미지 URL) */
  customIcon?: string;
  /** 커스텀 타이틀 */
  title?: string;
  /** 타이틀 표시 여부 (기본값: true) */
  showTitle?: boolean;
  /** 프로그레스 바 표시 여부 (기본값: true) */
  showProgress?: boolean;
}

/**
 * Toast 인스턴스 설정
 */
export interface ToastConfig {
  /** Toast 위치 */
  position?: ToastPosition;
  /** 진입 애니메이션 */
  enterAnimation?: AnimationType;
  /** 퇴장 애니메이션 */
  exitAnimation?: AnimationType;
}

/**
 * Toast 이벤트 상세 정보
 */
export interface ToastEventDetail {
  /** 메시지 내용 */
  message: string;
  /** Toast 타입 */
  type: ToastType;
  /** 동일 메시지 표시 횟수 */
  count: number;
  /** 타이틀 (있는 경우) */
  title?: string;
}

/**
 * Toast Close 이벤트 상세 정보
 */
export interface ToastCloseEventDetail extends ToastEventDetail {
  /** 닫힘 원인 */
  reason: 'timeout' | 'click' | 'manual';
}

/**
 * Toast Show 이벤트 상세 정보
 */
export interface ToastShowEventDetail extends ToastEventDetail {
  /** Toast 요소 ID */
  toastId: string;
}

/**
 * SeoToast 컴포넌트 인터페이스
 */
export interface ISeoToast extends HTMLElement {
  /** 자동 닫힘 시간 */
  closeTime: number;
  /** Toast 위치 */
  position: ToastPosition;
  /** 진입 애니메이션 */
  enterAnimation: AnimationType;
  /** 퇴장 애니메이션 */
  exitAnimation: AnimationType;
  /** Toast 표시 */
  showToast(message: string, type?: ToastType, options?: ToastOptions): void;
}

// Global type declarations
declare global {
  interface HTMLElementTagNameMap {
    'seo-toast': ISeoToast;
  }

  interface WindowEventMap {
    'toast-show': CustomEvent<ToastShowEventDetail>;
    'toast-close': CustomEvent<ToastCloseEventDetail>;
    'toast-click': CustomEvent<ToastEventDetail>;
  }
}
