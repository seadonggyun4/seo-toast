// core/interactions.ts
import { ToastType, ToastEventDetail } from './types';
import { getAnimationClass } from './animations';
import { triggerEvent } from '../event/triggerEvent';

export function wireToastInteractions(params: {
  toastEl: HTMLDivElement;
  key: string;
  message: string;
  type: ToastType;
  closeTime: number;
  title?: string;
  showProgress?: boolean;
  onFinalize?: (key: string) => void;
}) {
  const {
    toastEl,
    key,
    message,
    type,
    closeTime,
    title,
    showProgress = true,
    onFinalize,
  } = params;

  let timeoutId: number;
  let isPaused = false;
  let remaining = closeTime;
  let startTime = Date.now();

  const progressBar = toastEl.querySelector('.toast__progress-bar') as
    | HTMLElement
    | null;

  const closeToast = () => {
    if (timeoutId) clearTimeout(timeoutId);
    const exitClass = getAnimationClass('exit', (toastEl.dataset.exitAnim as any) || 'slide');
    toastEl.classList.add(exitClass);

    const finalize = () => {
      toastEl.remove();

      const detail: ToastEventDetail = {
        message,
        type,
        count: Number(toastEl.dataset.count || 1),
        ...(title !== undefined && { title }),
      };

      // Dispatch close event via helper (no CustomEvent assumption)
      triggerEvent(toastEl, 'toast-close', detail.title ?? 'toast', detail.count, {
        bubbles: true,
        composed: true,
        attach: detail, // payload attached properly (see triggerEvent)
      });

      onFinalize?.(key);
    };

    // transitionend가 없는 환경도 고려해 fallback 타이머 추가 가능
    toastEl.addEventListener('transitionend', finalize, { once: true });
    // 안전장치
    setTimeout(finalize, 500);
  };

  const startProgress = () => {
    if (showProgress && progressBar) {
      startTime = Date.now();
      progressBar.style.animationDuration = `${remaining}ms`;
      progressBar.style.animationPlayState = 'running';
    }
  };

  const pauseProgress = () => {
    if (showProgress && progressBar && !isPaused) {
      isPaused = true;
      const elapsed = Date.now() - startTime;
      remaining = Math.max(0, remaining - elapsed);
      progressBar.style.animationPlayState = 'paused';
      clearTimeout(timeoutId);
    }
  };

  const resumeProgress = () => {
    if (showProgress && progressBar && isPaused) {
      isPaused = false;
      startProgress();
      timeoutId = window.setTimeout(closeToast, remaining);
    }
  };

  if (showProgress && progressBar) {
    setTimeout(startProgress, 100);
  }

  toastEl.addEventListener('mouseenter', pauseProgress);
  toastEl.addEventListener('mouseleave', resumeProgress);

  const closeBtn = toastEl.querySelector('.toast__close');
  closeBtn?.addEventListener('click', closeToast);

  timeoutId = window.setTimeout(closeToast, closeTime);
}
