/**
 * Interactive Toaster SVG Animation
 * Custom implementation inspired by Moody Foodies style
 */

import { SeoToast } from '../../src/main';

interface ToastType {
  name: 'success' | 'error' | 'warning' | 'info';
  color: string;
  darkenColor: string;
  message: string;
  emoji: string;
}

const TOAST_TYPES: ToastType[] = [
  { name: 'success', color: '#FFDE32', darkenColor: '#E5C42D', message: 'Perfect golden toast!', emoji: '🍞' },
  { name: 'error', color: '#8B7355', darkenColor: '#5C4A3D', message: 'Oops! Burnt toast!', emoji: '🔥' },
  { name: 'warning', color: '#DEB887', darkenColor: '#C4A06A', message: 'Slightly crispy!', emoji: '⚠️' },
  { name: 'info', color: '#F5DEB3', darkenColor: '#D4C4A0', message: 'Fresh bread ready!', emoji: '📢' }
];

export class ToasterCanvas {
  private container: HTMLElement;
  private svg: SVGSVGElement | null = null;
  private currentToastType: ToastType = TOAST_TYPES[0];

  // Animation state
  private isAnimating: boolean = false;
  private animationId: number | null = null;
  private startTime: number = 0;

  // Elements
  private toasterBody: SVGGElement | null = null;
  private bread: SVGGElement | null = null;
  private lever: SVGGElement | null = null;
  private toasterFace: SVGGElement | null = null;
  private normalEyes: SVGGElement | null = null;
  private surprisedEyes: SVGGElement | null = null;
  private breadFace: SVGGElement | null = null;

  constructor(container: HTMLElement) {
    this.container = container;
    this.createSVG();
    this.setupEventListeners();
  }

  private createSVG(): void {
    this.container.innerHTML = `
      <svg viewBox="0 -30 300 250" width="100%" height="100%" style="display: block; cursor: pointer; overflow: visible;">
        <!-- 빵 (토스터 뒤에 위치, 초기에는 투명) -->
        <g id="bread" transform="translate(100, 95)" style="opacity: 0;">
          <!-- 빵 그림자 -->
          <path d="M0,25 C0,11 11,0 25,0 L75,0 C89,0 100,11 100,25 L100,85 C100,92 94,98 87,98 L13,98 C6,98 0,92 0,85 Z"
                fill="${this.currentToastType.darkenColor}" id="bread-shadow"/>
          <!-- 빵 본체 -->
          <path d="M8,25 C8,14 17,5 28,5 L80,5 C91,5 100,14 100,25 L100,85 C100,92 94,98 87,98 L21,98 C14,98 8,92 8,85 Z"
                fill="${this.currentToastType.color}" id="bread-main"/>
          <!-- 빵 텍스처 라인 -->
          <g stroke="${this.currentToastType.darkenColor}" stroke-width="3" stroke-linecap="round" fill="none" class="bread-lines">
            <path d="M25,15 L35,8"/>
            <path d="M50,18 L65,8"/>
            <path d="M70,20 L82,12"/>
            <path d="M25,75 L35,68"/>
            <path d="M50,78 L65,68"/>
            <path d="M70,80 L82,72"/>
          </g>
          <!-- 빵 얼굴 -->
          <g id="bread-face" transform="translate(30, 35)">
            <!-- 눈 -->
            <circle cx="12" cy="12" r="7" fill="white"/>
            <circle cx="12" cy="12" r="4" fill="#333"/>
            <circle cx="10" cy="9" r="2" fill="white"/>
            <circle cx="48" cy="12" r="7" fill="white"/>
            <circle cx="48" cy="12" r="4" fill="#333"/>
            <circle cx="46" cy="9" r="2" fill="white"/>
            <!-- 미소 -->
            <path d="M22,28 Q30,36 38,28" stroke="#333" stroke-width="3" fill="none" stroke-linecap="round"/>
          </g>
        </g>

        <!-- 테이블 -->
        <rect x="30" y="185" width="240" height="35" fill="#FDFDF2"/>

        <!-- 토스터 본체 -->
        <g id="toaster-body" transform="translate(50, 75)">
          <!-- 다리 -->
          <rect x="25" y="105" width="12" height="18" rx="3" fill="#555"/>
          <rect x="163" y="105" width="12" height="18" rx="3" fill="#555"/>

          <!-- 토스터 몸체 그림자 -->
          <path d="M100,0 L200,0 C200,0 200,95 200,100 L0,100 L0,20 C0,9 9,0 20,0 L100,0 Z"
                fill="#D5D0C0"/>

          <!-- 토스터 몸체 -->
          <path d="M0,100 L0,20 C0,9 9,0 20,0 L180,0 C191,0 200,9 200,20 L200,100 Z"
                fill="#EAE6D8"/>

          <!-- 슬롯 (빵이 나오는 곳) -->
          <rect x="50" y="5" width="100" height="12" rx="4" fill="#494641"/>

          <!-- 레버 트랙 -->
          <rect x="15" y="35" width="8" height="50" rx="4" fill="#494641"/>

          <!-- 레버 -->
          <g id="lever" transform="translate(10, 75)">
            <rect x="0" y="0" width="18" height="10" rx="3" fill="#BCB993"/>
          </g>

          <!-- 토스터 얼굴 -->
          <g id="toaster-face" transform="translate(85, 45)">
            <!-- 일반 눈 (> <) -->
            <g id="normal-eyes">
              <polyline points="0,0 12,6 0,12" stroke="#494641" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
              <polyline points="60,0 48,6 60,12" stroke="#494641" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <!-- 놀란 눈 (숨김) -->
            <g id="surprised-eyes" style="opacity: 0;">
              <circle cx="6" cy="6" r="8" fill="white"/>
              <circle cx="6" cy="6" r="5" fill="#494641"/>
              <circle cx="4" cy="3" r="2" fill="white"/>
              <circle cx="54" cy="6" r="8" fill="white"/>
              <circle cx="54" cy="6" r="5" fill="#494641"/>
              <circle cx="52" cy="3" r="2" fill="white"/>
            </g>
            <!-- 입 -->
            <line x1="10" y1="30" x2="50" y2="30" stroke="#494641" stroke-width="3" stroke-linecap="round"/>
          </g>

          <!-- 오른쪽 다이얼 -->
          <circle cx="185" cy="70" r="8" fill="#BCB993"/>
          <circle cx="185" cy="70" r="4" fill="#494641"/>
        </g>

      </svg>
    `;

    this.svg = this.container.querySelector('svg');
    this.toasterBody = this.container.querySelector('#toaster-body');
    this.bread = this.container.querySelector('#bread');
    this.lever = this.container.querySelector('#lever');
    this.toasterFace = this.container.querySelector('#toaster-face');
    this.normalEyes = this.container.querySelector('#normal-eyes');
    this.surprisedEyes = this.container.querySelector('#surprised-eyes');
    this.breadFace = this.container.querySelector('#bread-face');
  }

  private setupEventListeners(): void {
    // 클릭 이벤트는 외부에서 triggerToast로 제어
  }

  /**
   * 외부에서 특정 타입의 토스트 애니메이션을 트리거
   */
  public triggerToast(type: 'success' | 'error' | 'warning' | 'info'): void {
    if (this.isAnimating) return;

    // 지정된 토스트 타입 찾기
    const toastType = TOAST_TYPES.find(t => t.name === type);
    if (toastType) {
      this.currentToastType = toastType;
      this.updateBreadColors();
      this.startAnimation();
    }
  }

  private updateBreadColors(): void {
    const breadMain = this.container.querySelector('#bread-main');
    const breadShadow = this.container.querySelector('#bread-shadow');
    const breadLines = this.container.querySelectorAll('.bread-lines path');

    if (breadMain) breadMain.setAttribute('fill', this.currentToastType.color);
    if (breadShadow) breadShadow.setAttribute('fill', this.currentToastType.darkenColor);
    breadLines.forEach(line => line.setAttribute('stroke', this.currentToastType.darkenColor));
  }

  private startAnimation(): void {
    this.isAnimating = true;
    this.startTime = performance.now();
    this.animate();
  }

  private animate(): void {
    const elapsed = performance.now() - this.startTime;
    const duration = 1200; // 1.2초
    const progress = Math.min(elapsed / duration, 1);

    // 이징 함수들
    const easeOutBack = (t: number): number => {
      const c1 = 1.70158;
      const c3 = c1 + 1;
      return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    };

    const easeOutElastic = (t: number): number => {
      if (t === 0 || t === 1) return t;
      return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * (2 * Math.PI) / 3) + 1;
    };

    // 애니메이션 페이즈 계산 (0-0.5: 올라감, 0.5-1: 내려감)
    let animProgress: number;
    let isPopping: boolean;

    if (progress < 0.5) {
      animProgress = progress * 2; // 0 -> 1
      isPopping = true;
    } else {
      animProgress = (progress - 0.5) * 2; // 0 -> 1
      isPopping = false;
    }

    // 부드러운 이징 함수
    const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);
    const easeInOutCubic = (t: number): number =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const easedPop = easeOutBack(animProgress);
    const easedReturn = easeOutCubic(animProgress);

    if (isPopping) {
      // 빵 opacity: 애니메이션 시작 시 페이드인
      const breadOpacity = Math.min(1, animProgress * 3);
      if (this.bread) {
        this.bread.style.opacity = String(breadOpacity);
      }

      // 빵이 튀어나오는 애니메이션 (더 부드럽게)
      const breadY = -120 * easedPop;
      // 빵 기울기: 살짝 오른쪽으로 기울임 (최대 8도)
      const breadRotation = 8 * Math.sin(animProgress * Math.PI);
      if (this.bread) {
        this.bread.style.transform = `translate(100px, ${95 + breadY}px) rotate(${breadRotation}deg)`;
        this.bread.style.transformOrigin = '50px 50px';
      }

      // 레버 올라감
      const leverY = -40 * easedPop;
      if (this.lever) {
        this.lever.style.transform = `translate(10px, ${75 + leverY}px)`;
      }

      // 토스터 살짝 흔들림 (더 부드럽게)
      const shake = Math.sin(animProgress * Math.PI * 3) * 1.5 * (1 - animProgress);
      if (this.toasterBody) {
        this.toasterBody.style.transform = `translate(${50 + shake}px, 75px)`;
      }

      // 눈 전환 (30% 이후 놀란 눈)
      if (animProgress > 0.3) {
        if (this.normalEyes) this.normalEyes.style.opacity = '0';
        if (this.surprisedEyes) this.surprisedEyes.style.opacity = '1';
      }

      // 빵 얼굴 페이드인
      if (this.breadFace) {
        this.breadFace.style.opacity = String(Math.min(1, animProgress * 2.5));
      }

    } else {
      // 빵이 내려가는 애니메이션
      const breadY = -120 * (1 - easedReturn);
      // 빵 기울기: 돌아오면서 정상으로
      const breadRotation = 8 * (1 - easedReturn) * Math.sin((1 - animProgress) * Math.PI);
      if (this.bread) {
        this.bread.style.transform = `translate(100px, ${95 + breadY}px) rotate(${breadRotation}deg)`;
        this.bread.style.transformOrigin = '50px 50px';
      }

      // 빵 opacity: 내려가면서 페이드아웃
      const breadOpacity = 1 - easeInOutCubic(animProgress);
      if (this.bread) {
        this.bread.style.opacity = String(breadOpacity);
      }

      // 레버 내려감
      const leverY = -40 * (1 - easedReturn);
      if (this.lever) {
        this.lever.style.transform = `translate(10px, ${75 + leverY}px)`;
      }

      // 토스터 안정화
      if (this.toasterBody) {
        this.toasterBody.style.transform = `translate(50px, 75px)`;
      }

      // 눈 원래대로
      if (animProgress > 0.5) {
        if (this.normalEyes) this.normalEyes.style.opacity = '1';
        if (this.surprisedEyes) this.surprisedEyes.style.opacity = '0';
      }
    }

    // 애니메이션 중간 지점에서 토스트 알림
    if (progress >= 0.5 && progress < 0.52) {
      this.triggerNotification();
    }

    if (progress < 1) {
      this.animationId = requestAnimationFrame(() => this.animate());
    } else {
      this.resetAnimation();
    }
  }

  private resetAnimation(): void {
    this.isAnimating = false;

    // 모든 요소 초기 상태로
    if (this.bread) {
      this.bread.style.transform = 'translate(100px, 95px)';
      this.bread.style.opacity = '0'; // 빵은 투명하게
    }
    if (this.lever) this.lever.style.transform = 'translate(10px, 75px)';
    if (this.toasterBody) this.toasterBody.style.transform = 'translate(50px, 75px)';
    if (this.normalEyes) this.normalEyes.style.opacity = '1';
    if (this.surprisedEyes) this.surprisedEyes.style.opacity = '0';
    if (this.breadFace) this.breadFace.style.opacity = '1';
  }

  private triggerNotification(): void {
    const toast = this.currentToastType;
    SeoToast[toast.name](`${toast.emoji} ${toast.message}`, {
      duration: 4000
    });
  }

  public destroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    this.container.innerHTML = '';
  }
}

export function initializeToasterCanvas(): ToasterCanvas | null {
  const container = document.getElementById('toaster-canvas') as HTMLElement | null;
  if (!container) {
    return null;
  }
  return new ToasterCanvas(container);
}
