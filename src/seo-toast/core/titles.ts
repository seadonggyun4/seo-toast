// core/titles.ts
import { ToastType } from './types';
import { defaultTitles } from './constants';

export function resolveTitle(type: ToastType, customTitle?: string): string {
  return customTitle ?? defaultTitles[type];
}
