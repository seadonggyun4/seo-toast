// core/icons.ts
import { ToastType } from './types';
import { defaultIcons } from './constants';

export function resolveIcon(type: ToastType, customIcon?: string): string {
  if (customIcon) {
    // URL or relative path
    if (
      customIcon.startsWith('http') ||
      customIcon.startsWith('/') ||
      customIcon.startsWith('./')
    ) {
      return `<img src="${customIcon}" alt="${type} icon" />`;
    }
    // Inline SVG as string
    return customIcon;
  }
  return defaultIcons[type] ?? defaultIcons.info;
}
