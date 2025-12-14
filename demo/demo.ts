/**
 * SeoToast Demo Entry Point
 *
 * This file initializes the demo page functionality using modular components.
 * All functionality is split into separate modules under ./modules/
 */

// Import SeoToast component
import { SeoToast } from '../src/main';

// Import modules
import {
  DemoManager,
  PageLoaderManager,
  initializeLoaderSafety,
  printWelcomeMessage
} from './modules';

/**
 * 전체 애플리케이션 초기화 함수
 */
function initializeApp(): void {
  console.log('🍞 Initializing SEO Toast Demo App...');

  // Demo Manager 초기화
  new DemoManager();
  console.log('✅ Demo Manager initialized');
}

// 페이지 로더 안전 장치 초기화 (즉시 실행)
initializeLoaderSafety();

// 페이지 로더 초기화 (즉시 실행)
const pageLoader = new PageLoaderManager();
pageLoader.initialize();

// 콘솔 환영 메시지 출력
printWelcomeMessage();

// DOM 준비 상태에 따른 초기화
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOM Content Loaded');
    setTimeout(() => {
      try {
        initializeApp();
      } catch (error) {
        console.error('❌ Failed to initialize app:', error);
        const loader = document.querySelector('.page-loder') as HTMLElement | null;
        if (loader) {
          loader.style.display = 'none';
        }
      }
    }, 100);
  });
} else {
  console.log('📄 DOM already loaded');
  setTimeout(() => {
    try {
      initializeApp();
    } catch (error) {
      console.error('❌ Failed to initialize app:', error);
      const loader = document.querySelector('.page-loder') as HTMLElement | null;
      if (loader) {
        loader.style.display = 'none';
      }
    }
  }, 100);
}

// Export for potential external use
export { DemoManager };
