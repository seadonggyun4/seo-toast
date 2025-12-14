/**
 * Angular Component Wrapper for seo-toast
 */

import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';

import type {
  ToastType,
  ToastPosition,
  AnimationType,
  ToastOptions,
  ToastCloseEventDetail,
} from '../../types/index';

@Component({
  selector: 'seo-toast-wrapper',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <seo-toast
      #toastElement
      [attr.close-time]="closeTime"
      [attr.position]="position"
      [attr.enter-animation]="enterAnimation"
      [attr.exit-animation]="exitAnimation"
    ></seo-toast>
  `,
})
export class SeoToastComponent implements OnInit, OnDestroy {
  @ViewChild('toastElement', { static: true })
  toastElementRef!: ElementRef<HTMLElement>;

  @Input() closeTime?: number;
  @Input() position?: ToastPosition;
  @Input() enterAnimation?: AnimationType;
  @Input() exitAnimation?: AnimationType;

  @Output() close = new EventEmitter<ToastCloseEventDetail>();

  private closeHandler = (e: Event) => {
    this.close.emit((e as CustomEvent<ToastCloseEventDetail>).detail);
  };

  ngOnInit(): void {
    const el = this.toastElementRef?.nativeElement;
    if (el) {
      el.addEventListener('toast-close', this.closeHandler);
    }
  }

  ngOnDestroy(): void {
    const el = this.toastElementRef?.nativeElement;
    if (el) {
      el.removeEventListener('toast-close', this.closeHandler);
    }
  }

  get element(): HTMLElement | null {
    return this.toastElementRef?.nativeElement || null;
  }

  showToast(message: string, type?: ToastType, options?: ToastOptions): void {
    const el = this.toastElementRef?.nativeElement;
    if (el) {
      (el as any).showToast(message, type, options);
    }
  }

  success(message: string, options?: ToastOptions): void {
    this.showToast(message, 'success', options);
  }

  error(message: string, options?: ToastOptions): void {
    this.showToast(message, 'error', options);
  }

  warning(message: string, options?: ToastOptions): void {
    this.showToast(message, 'warning', options);
  }

  info(message: string, options?: ToastOptions): void {
    this.showToast(message, 'info', options);
  }
}
