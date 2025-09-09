// core/animations.ts
import { AnimationType } from './types';

export function getAnimationClass(
  phase: 'enter' | 'exit',
  animation: AnimationType
): string {
  return `toast--${phase}-${animation}`;
}
