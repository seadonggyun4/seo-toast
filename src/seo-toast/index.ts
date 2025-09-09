// seo-toast.ts
import {
  AnimationType,
  ToastConfig,
  ToastOptions,
  ToastPosition,
  ToastType,
} from './core/types';
import { MessageCache } from './core/cache';
import { DEFAULT_CLOSE_TIME } from './core/constants';
import { resolveIcon } from './core/icons';
import { resolveTitle } from './core/titles';
import { getAnimationClass } from './core/animations';
import { escapeHtml } from './core/utils';
import { wireToastInteractions } from './core/interactions';

export class SeoToast extends HTMLElement {
  // 상태/데이터는 유지
  private messageCache = new MessageCache();
  private toastMap = new Map<string, HTMLDivElement>();

  private _closeTime: number = DEFAULT_CLOSE_TIME;
  private _position: ToastPosition = 'top-right';
  private _enterAnimation: AnimationType = 'slide';
  private _exitAnimation: AnimationType = 'slide';

  static get observedAttributes() {
    return ['close-time', 'position', 'enter-animation', 'exit-animation'];
  }

  constructor() {
    super();
    this.messageCache.start();
    this.render(); // HTML 컨테이너만
  }

  disconnectedCallback(): void {
    this.messageCache.stop();
  }

  attributeChangedCallback(name: string, _o: string, n: string) {
    if (_o === n) return;
    switch (name) {
      case 'close-time':
        this._closeTime = parseInt(n) || DEFAULT_CLOSE_TIME;
        break;
      case 'position':
        this._position = (n as ToastPosition) || 'top-right';
        this.updateContainerPosition();
        break;
      case 'enter-animation':
        this._enterAnimation = (n as AnimationType) || 'slide';
        break;
      case 'exit-animation':
        this._exitAnimation = (n as AnimationType) || 'slide';
        break;
    }
  }

  // --- public getters/setters (변경 없음) ---
  get closeTime() { return this._closeTime; }
  set closeTime(v: number) { this._closeTime = v; this.setAttribute('close-time', String(v)); }

  get position() { return this._position; }
  set position(v: ToastPosition) { this._position = v; this.setAttribute('position', v); }

  get enterAnimation() { return this._enterAnimation; }
  set enterAnimation(v: AnimationType) { this._enterAnimation = v; this.setAttribute('enter-animation', v); }

  get exitAnimation() { return this._exitAnimation; }
  set exitAnimation(v: AnimationType) { this._exitAnimation = v; this.setAttribute('exit-animation', v); }

  // --- HTML 렌더링 (컨테이너만) ---
  private render(): void {
    this.innerHTML = `<div class="toast-container"></div>`;
    this.updateContainerPosition();
  }

  private updateContainerPosition(): void {
    const container = this.container;
    if (!container) return;
    container.className = `toast-container toast-container--${this._position}`;
  }

  private get container(): HTMLDivElement | null {
    return this.querySelector('.toast-container');
  }

  private keyOf(type: ToastType, message: string, title?: string): string {
    return `${type}:${message}:${title ?? ''}`;
  }

  // --- HTML 렌더링: 개별 토스트 DOM(문자열) 생성 ---
  private createToastHtml(args: {
    type: ToastType;
    titleHtml?: string;
    messageHtml: string;
    iconHtml: string;
    progressHtml?: string;
  }): string {
    const { type, titleHtml = '', messageHtml, iconHtml, progressHtml = '' } = args;
    return `
      <div class="toast__icon-wrapper">${iconHtml}</div>
      <div class="toast__message" role="alert">
        ${titleHtml}
        <div class="toast__desc">${messageHtml}</div>
      </div>
      <button class="toast__close" type="button" aria-label="close">
        <!-- close icon inserted via CSS background or constants if preferred -->
        <span class="toast__close-icon"></span>
      </button>
      ${progressHtml}
    `;
  }

  // --- 공개 API ---
  public showToast(message: string, type: ToastType = 'info', options?: ToastOptions): void {
    if (!message.trim()) return;

    const key = this.keyOf(type, message, options?.title);
    const now = Date.now();
    const existing = this.messageCache.get(key);
    const closeTime = options?.closeTime ?? this._closeTime;

    // 중복 처리
    if (existing && now - existing.timestamp < closeTime) {
      existing.count += 1;
      existing.timestamp = now;

      const toastEl = this.toastMap.get(key);
      if (toastEl) {
        const counter = toastEl.querySelector('.toast__count');
        if (counter) counter.textContent = `(${existing.count})`;
        toastEl.dataset.count = String(existing.count);
      }
      return;
    }

    // 신규 등록
    this.messageCache.set(key, { timestamp: now, count: 1 });

    // --- HTML 빌드(렌더링 전용) ---
    const iconHtml = resolveIcon(type, options?.customIcon);
    const showTitle = options?.showTitle !== false;
    const showProgress = options?.showProgress !== false;
    const title = resolveTitle(type, options?.title);

    const titleHtml = showTitle
      ? `<div class="toast__title">${escapeHtml(title)}<span class="toast__count"></span></div>`
      : '';

    const progressHtml = showProgress
      ? `<div class="toast__progress"><div class="toast__progress-bar toast__progress-bar--${type}"></div></div>`
      : '';

    const container = this.container;
    if (!container) return;

    const toast = document.createElement('div');
    const enterClass = getAnimationClass('enter', this._enterAnimation);
    toast.className = `toast toast--${type} ${enterClass}`;
    toast.dataset.exitAnim = this._exitAnimation;
    toast.dataset.count = '1';
    toast.innerHTML = this.createToastHtml({
      type,
      titleHtml,
      messageHtml: escapeHtml(message),
      iconHtml,
      progressHtml,
    });

    if (this._position.includes('top')) {
      container.prepend(toast);
    } else {
      container.appendChild(toast);
    }
    this.toastMap.set(key, toast);

    // 진입 애니메이션 제거(rAF)
    requestAnimationFrame(() => {
      toast.classList.remove(enterClass);
    });

    // DOM 이벤트/타이머/진행바 등 “행동 로직”은 core/interactions.ts로 위임
    wireToastInteractions({
      toastEl: toast,
      key,
      message,
      type,
      closeTime,
      ...(showTitle ? { title } : {}),
      showProgress,
      onFinalize: (k) => {
        this.messageCache.delete(k);
        this.toastMap.delete(k);
      },
    });
  }

  // --- 정적 전역 인스턴스 관리 ---
  private static globalInstance: SeoToast | null = null;

  static getInstance(config?: ToastConfig): SeoToast {
    if (!SeoToast.globalInstance) {
      SeoToast.globalInstance = new SeoToast();
      document.body.appendChild(SeoToast.globalInstance);
    }
    if (config) {
      if (config.position) SeoToast.globalInstance.position = config.position;
      if (config.enterAnimation) SeoToast.globalInstance.enterAnimation = config.enterAnimation;
      if (config.exitAnimation) SeoToast.globalInstance.exitAnimation = config.exitAnimation;
    }
    return SeoToast.globalInstance;
  }

  static show(message: string, type: ToastType = 'info', options?: ToastOptions): void {
    SeoToast.getInstance().showToast(message, type, options);
  }
  static success(m: string, o?: ToastOptions) { SeoToast.show(m, 'success', o); }
  static error(m: string, o?: ToastOptions) { SeoToast.show(m, 'error', o); }
  static warning(m: string, o?: ToastOptions) { SeoToast.show(m, 'warning', o); }
  static info(m: string, o?: ToastOptions) { SeoToast.show(m, 'info', o); }
}

// define
if (!customElements.get('seo-toast')) {
  customElements.define('seo-toast', SeoToast);
}
