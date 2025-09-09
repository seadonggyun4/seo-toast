// seo-toast/index.ts
import { AnimationType, ToastConfig, ToastOptions, ToastPosition, ToastType, ToastEventDetail } from './core/types';
import { DEFAULT_CLOSE_TIME, DEFAULT_ICONS, DEFAULT_TITLES } from './core/constants';

export class SeoToast extends HTMLElement {
  private toastMap = new Map<string, HTMLDivElement>();
  private messageCache = new Map<string, { timestamp: number; count: number }>();
  private cleanupInterval: number | null = null;

  private _closeTime: number = DEFAULT_CLOSE_TIME;
  private _position: ToastPosition = 'top-right';
  private _enterAnimation: AnimationType = 'slide';
  private _exitAnimation: AnimationType = 'slide';

  static get observedAttributes() {
    return ['close-time', 'position', 'enter-animation', 'exit-animation'];
  }

  constructor() {
    super();
    this.startCleanup();
    this.render();
  }

  disconnectedCallback(): void {
    this.stopCleanup();
  }

  attributeChangedCallback(name: string, _: string, newValue: string) {
    switch (name) {
      case 'close-time':
        this._closeTime = parseInt(newValue) || DEFAULT_CLOSE_TIME;
        break;
      case 'position':
        this._position = (newValue as ToastPosition) || 'top-right';
        this.updateContainerPosition();
        break;
      case 'enter-animation':
        this._enterAnimation = (newValue as AnimationType) || 'slide';
        break;
      case 'exit-animation':
        this._exitAnimation = (newValue as AnimationType) || 'slide';
        break;
    }
  }

  // Getters/Setters
  get closeTime() { return this._closeTime; }
  set closeTime(v: number) { this.setAttribute('close-time', String(v)); }

  get position() { return this._position; }
  set position(v: ToastPosition) { this.setAttribute('position', v); }

  get enterAnimation() { return this._enterAnimation; }
  set enterAnimation(v: AnimationType) { this.setAttribute('enter-animation', v); }

  get exitAnimation() { return this._exitAnimation; }
  set exitAnimation(v: AnimationType) { this.setAttribute('exit-animation', v); }

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

  // 단순화된 캐싱
  private startCleanup(): void {
    this.cleanupInterval = window.setInterval(() => {
      const now = Date.now();
      for (const [key, value] of this.messageCache.entries()) {
        if (now - value.timestamp > 10000) { // 10초 후 정리
          this.messageCache.delete(key);
        }
      }
    }, 5000);
  }

  private stopCleanup(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
  }

  // 메시지 키 생성
  private createKey(type: ToastType, message: string, title?: string): string {
    return `${type}:${message}:${title || ''}`;
  }

  // HTML 이스케이프 (인라인)
  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // 아이콘 처리 (인라인)
  private resolveIcon(type: ToastType, customIcon?: string): string {
    if (customIcon) {
      if (customIcon.startsWith('http') || customIcon.startsWith('/') || customIcon.startsWith('./')) {
        return `<img src="${customIcon}" alt="${type} icon" />`;
      }
      return customIcon;
    }
    return DEFAULT_ICONS[type] || DEFAULT_ICONS.info;
  }

  // 애니메이션 클래스 (인라인)
  private getAnimationClass(phase: 'enter' | 'exit', animation: AnimationType): string {
    return `toast--${phase}-${animation}`;
  }

  // Toast HTML 생성
  private createToastHtml(type: ToastType, message: string, options?: ToastOptions): string {
    const showTitle = options?.showTitle !== false;
    const showProgress = options?.showProgress !== false;
    const title = options?.title || DEFAULT_TITLES[type];
    const iconHtml = this.resolveIcon(type, options?.customIcon);

    const titleHtml = showTitle 
      ? `<div class="toast__title">${this.escapeHtml(title)}<span class="toast__count"></span></div>`
      : '';

    const progressHtml = showProgress
      ? `<div class="toast__progress"><div class="toast__progress-bar toast__progress-bar--${type}"></div></div>`
      : '';

    return `
      <div class="toast__icon-wrapper">${iconHtml}</div>
      <div class="toast__message" role="alert">
        ${titleHtml}
        <div class="toast__desc">${this.escapeHtml(message)}</div>
      </div>
      <button class="toast__close" type="button" aria-label="close">
        <span class="toast__close-icon">✕</span>
      </button>
      ${progressHtml}
    `;
  }

  // 단순화된 이벤트 디스패치
  private dispatchToastEvent(type: string, detail: ToastEventDetail): void {
    const event = new CustomEvent(type, {
      detail,
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  // Toast 닫기 처리 (인라인)
  private closeToast(toastEl: HTMLDivElement, key: string, detail: ToastEventDetail): void {
    const exitClass = this.getAnimationClass('exit', this._exitAnimation);
    toastEl.classList.add(exitClass);

    const finalize = () => {
      toastEl.remove();
      this.messageCache.delete(key);
      this.toastMap.delete(key);
      this.dispatchToastEvent('toast-close', detail);
    };

    toastEl.addEventListener('transitionend', finalize, { once: true });
    setTimeout(finalize, 500); // 안전장치
  }

  // 메인 API
  public showToast(message: string, type: ToastType = 'info', options?: ToastOptions): void {
    if (!message.trim()) return;

    const key = this.createKey(type, message, options?.title);
    const now = Date.now();
    const closeTime = options?.closeTime ?? this._closeTime;

    // 중복 처리 (단순화)
    const existing = this.messageCache.get(key);
    if (existing && now - existing.timestamp < closeTime) {
      existing.count += 1;
      existing.timestamp = now;

      const toastEl = this.toastMap.get(key);
      if (toastEl) {
        const counter = toastEl.querySelector('.toast__count');
        if (counter) counter.textContent = `(${existing.count})`;
      }
      return;
    }

    // 새 Toast 생성
    this.messageCache.set(key, { timestamp: now, count: 1 });

    const container = this.container;
    if (!container) return;

    const toast = document.createElement('div');
    const enterClass = this.getAnimationClass('enter', this._enterAnimation);
    toast.className = `toast toast--${type} ${enterClass}`;
    toast.innerHTML = this.createToastHtml(type, message, options);

    if (this._position.includes('top')) {
      container.prepend(toast);
    } else {
      container.appendChild(toast);
    }
    this.toastMap.set(key, toast);

    // 애니메이션 시작
    requestAnimationFrame(() => {
      toast.classList.remove(enterClass);
    });

    // 이벤트 처리 (인라인)
    const detail: ToastEventDetail = {
      message,
      type,
      count: 1,
      ...(options?.title && { title: options.title })
    };

    let timeoutId: number;
    let isPaused = false;
    let remaining = closeTime;
    let startTime = Date.now();

    const progressBar = toast.querySelector('.toast__progress-bar') as HTMLElement | null;

    const close = () => this.closeToast(toast, key, detail);

    const startProgress = () => {
      if (progressBar && options?.showProgress !== false) {
        startTime = Date.now();
        progressBar.style.animationDuration = `${remaining}ms`;
        progressBar.style.animationPlayState = 'running';
      }
    };

    const pauseProgress = () => {
      if (!isPaused && progressBar) {
        isPaused = true;
        const elapsed = Date.now() - startTime;
        remaining = Math.max(0, remaining - elapsed);
        progressBar.style.animationPlayState = 'paused';
        clearTimeout(timeoutId);
      }
    };

    const resumeProgress = () => {
      if (isPaused && progressBar) {
        isPaused = false;
        startProgress();
        timeoutId = window.setTimeout(close, remaining);
      }
    };

    // 이벤트 리스너
    toast.addEventListener('mouseenter', pauseProgress);
    toast.addEventListener('mouseleave', resumeProgress);
    toast.querySelector('.toast__close')?.addEventListener('click', close);

    // 진행바 시작
    setTimeout(startProgress, 100);
    timeoutId = window.setTimeout(close, closeTime);
  }

  // 정적 인스턴스 관리
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

  // 정적 메서드들
  static show(message: string, type: ToastType = 'info', options?: ToastOptions): void {
    SeoToast.getInstance().showToast(message, type, options);
  }
  
  static success(message: string, options?: ToastOptions): void {
    SeoToast.show(message, 'success', options);
  }
  
  static error(message: string, options?: ToastOptions): void {
    SeoToast.show(message, 'error', options);
  }
  
  static warning(message: string, options?: ToastOptions): void {
    SeoToast.show(message, 'warning', options);
  }
  
  static info(message: string, options?: ToastOptions): void {
    SeoToast.show(message, 'info', options);
  }
}

// 컴포넌트 등록
if (!customElements.get('seo-toast')) {
  customElements.define('seo-toast', SeoToast);
}