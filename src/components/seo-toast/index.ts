export interface ToastOptions {
  closeTime?: number;
  customIcon?: string; // 이미지 URL 또는 SVG 문자열
}

export type ToastType = 'success' | 'error' | 'info' | 'warning';
export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
export type AnimationType = 'slide' | 'fade' | 'scale' | 'bounce';

export interface ToastConfig {
  position?: ToastPosition;
  enterAnimation?: AnimationType;
  exitAnimation?: AnimationType;
}

interface ToastEventDetail {
  message: string;
  type: ToastType;
  count: number;
}

export class SeoToast extends HTMLElement {
  private messageCache = new Map<string, { timestamp: number; count: number }>();
  private toastMap = new Map<string, HTMLDivElement>();
  private readonly CACHE_EXPIRATION = 10000;
  private cleanupInterval!: number;
  private _closeTime: number = 2000;
  private _position: ToastPosition = 'top-right';
  private _enterAnimation: AnimationType = 'slide';
  private _exitAnimation: AnimationType = 'slide';

  // 기본 SVG 아이콘들
  private readonly defaultIcons = {
    success: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-2 15l-5-5 1.414-1.414L10 14.172l7.586-7.586L19 8l-9 9z"/></svg>`,
    error: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm4.207 12.793l-1.414 1.414L12 13.414l-2.793 2.793-1.414-1.414L10.586 12 7.793 9.207l1.414-1.414L12 10.586l2.793-2.793 1.414 1.414L13.414 12l2.793 2.793z"/></svg>`,
    warning: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 16h2v2h-2v-2zm0-6h2v4h-2v-4z"/></svg>`,
    info: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 15c-.553 0-1-.448-1-1v-4c0-.552.447-1 1-1s1 .448 1 1v4c0 .552-.447 1-1 1zm1-8h-2V7h2v2z"/></svg>`
  };

  private readonly closeIcon = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`;

  static get observedAttributes() {
    return ['close-time', 'position', 'enter-animation', 'exit-animation'];
  }

  constructor() {
    super();
    this.setupCleanupInterval();
    this.render();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    switch (name) {
      case 'close-time':
        this._closeTime = parseInt(newValue) || 2000;
        break;
      case 'position':
        this._position = newValue as ToastPosition || 'top-right';
        this.updateContainerPosition();
        break;
      case 'enter-animation':
        this._enterAnimation = newValue as AnimationType || 'slide';
        break;
      case 'exit-animation':
        this._exitAnimation = newValue as AnimationType || 'slide';
        break;
    }
  }

  get closeTime(): number {
    return this._closeTime;
  }

  set closeTime(value: number) {
    this._closeTime = value;
    this.setAttribute('close-time', value.toString());
  }

  get position(): ToastPosition {
    return this._position;
  }

  set position(value: ToastPosition) {
    this._position = value;
    this.setAttribute('position', value);
  }

  get enterAnimation(): AnimationType {
    return this._enterAnimation;
  }

  set enterAnimation(value: AnimationType) {
    this._enterAnimation = value;
    this.setAttribute('enter-animation', value);
  }

  get exitAnimation(): AnimationType {
    return this._exitAnimation;
  }

  set exitAnimation(value: AnimationType) {
    this._exitAnimation = value;
    this.setAttribute('exit-animation', value);
  }

  private setupCleanupInterval(): void {
    this.cleanupInterval = window.setInterval(() => {
      const now = Date.now();
      for (const [key, value] of this.messageCache.entries()) {
        if (now - value.timestamp > this.CACHE_EXPIRATION) {
          this.messageCache.delete(key);
          this.toastMap.delete(key);
        }
      }
    }, 5000);
  }

  disconnectedCallback(): void {
    clearInterval(this.cleanupInterval);
  }

  private render(): void {
    this.innerHTML = '<div class="toast-container"></div>';
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

  private getAnimationClass(type: 'enter' | 'exit', animation: AnimationType): string {
    return `toast--${type}-${animation}`;
  }

  private getIcon(type: ToastType, customIcon?: string): string {
    if (customIcon) {
      // 이미지 URL인지 확인
      if (customIcon.startsWith('http') || customIcon.startsWith('/') || customIcon.startsWith('./')) {
        return `<img src="${customIcon}" alt="${type} icon" />`;
      }
      // SVG 문자열로 간주
      return customIcon;
    }
    
    return this.defaultIcons[type] || this.defaultIcons.info;
  }

  public showToast(
    message: string,
    type: ToastType = 'info',
    options?: ToastOptions
  ): void {
    if (!message.trim()) return;

    const key = `${type}:${message}`;
    const now = Date.now();
    const cached = this.messageCache.get(key);
    const closeTime = options?.closeTime ?? this._closeTime;

    // 중복 메시지 처리
    if (cached && now - cached.timestamp < closeTime) {
      cached.count += 1;
      cached.timestamp = now;

      const existingToast = this.toastMap.get(key);
      if (existingToast) {
        const counterEl = existingToast.querySelector('.toast__count');
        if (counterEl) {
          counterEl.textContent = `${cached.count}회 발생`;
        }
      }
      return;
    }

    this.messageCache.set(key, { timestamp: now, count: 1 });
    this.createToast(message, type, key, closeTime, options);
  }

  private createToast(
    message: string,
    type: ToastType,
    key: string,
    closeTime: number,
    options?: ToastOptions
  ): void {
    const container = this.container;
    if (!container) return;

    const toast = document.createElement('div');
    const enterClass = this.getAnimationClass('enter', this._enterAnimation);
    toast.className = `toast toast--${type} ${enterClass}`;

    const icon = this.getIcon(type, options?.customIcon);

    toast.innerHTML = `
      <div class="toast__icon-wrapper">
        ${icon}
      </div>
      <div class="toast__message" role="alert">
        <div class="toast__title">
          알림
          <span class="toast__count"></span>
        </div>
        <div class="toast__desc">${this.escapeHtml(message)}</div>
      </div>
      <button class="toast__close" type="button" aria-label="닫기">
        ${this.closeIcon}
      </button>
    `;

    // 위치에 따라 삽입 위치 결정
    if (this._position.includes('top')) {
      container.prepend(toast);
    } else {
      container.appendChild(toast);
    }

    this.toastMap.set(key, toast);

    // 진입 애니메이션 시작
    requestAnimationFrame(() => {
      toast.classList.remove(enterClass);
    });

    // 이벤트 리스너 및 자동 닫기 설정
    this.setupToastInteractions(toast, key, message, type, closeTime);
  }

  private setupToastInteractions(
    toast: HTMLDivElement,
    key: string,
    message: string,
    type: ToastType,
    closeTime: number
  ): void {
    const closeToast = () => {
      const exitClass = this.getAnimationClass('exit', this._exitAnimation);
      toast.classList.add(exitClass);
      
      toast.addEventListener(
        'transitionend',
        () => {
          toast.remove();
          this.dispatchCloseEvent(message, type, key);
          this.messageCache.delete(key);
          this.toastMap.delete(key);
        },
        { once: true }
      );
    };

    const closeButton = toast.querySelector('.toast__close');
    closeButton?.addEventListener('click', closeToast);

    setTimeout(closeToast, closeTime);
  }

  private dispatchCloseEvent(message: string, type: ToastType, key: string): void {
    const detail: ToastEventDetail = {
      message,
      type,
      count: this.messageCache.get(key)?.count ?? 1,
    };

    this.dispatchEvent(
      new CustomEvent('toast-close', {
        detail,
        bubbles: true,
        composed: true,
      })
    );
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // 정적 메서드로 전역 토스트 인스턴스 관리
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
    const instance = SeoToast.getInstance();
    instance.showToast(message, type, options);
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

// 웹컴포넌트 등록
if (!customElements.get('seo-toast')) {
  customElements.define('seo-toast', SeoToast);
}