# Claude Code Instructions for seo-toast

> Claude Code가 이 프로젝트를 수정할 때 참고해야 할 지침

## 프로젝트 개요

- **이름**: seo-toast
- **설명**: 순수 Web Components 기반 경량 토스트 알림 라이브러리
- **버전**: 0.0.x (개발 중)
- **빌드 도구**: Vite
- **언어**: TypeScript
- **의존성**: 없음 (Zero Dependencies)

## 주요 파일 구조

```
src/
├── index.ts                    # 메인 진입점 (re-export)
├── main.ts                     # 데모용 진입점
├── components/
│   └── seo-toast/
│       ├── index.ts            # SeoToast 컴포넌트
│       └── core/
│           ├── types.ts        # TypeScript 타입 정의
│           └── constants.ts    # 기본값, 아이콘, 타이틀
├── event/
│   └── index.ts                # 커스텀 이벤트 시스템
├── types/
│   └── index.ts                # 외부 노출 타입
├── utils/
│   └── environment.ts          # SSR 안전 유틸리티
├── wrappers/                   # 프레임워크 래퍼
│   ├── react/index.ts
│   ├── vue/index.ts
│   ├── angular/index.ts
│   ├── solid/index.ts
│   └── qwik/index.ts
└── styles/
    └── components/style.scss   # 컴포넌트 스타일
```

## 현재 수정 필요 사항

### 우선순위 높음 (필수)

1. **Lit 의존성 제거**: 현재 vite.config.ts에 lit external 설정이 있으나, 코드는 순수 Web Components로 작성됨 - 설정 정리 필요
2. **프레임워크 래퍼 생성**: React, Vue, Angular, Solid, Qwik 래퍼 생성 (seo-select 구조 참고)
3. **release.sh 수정**: seo-select에서 복사된 내용 → seo-toast로 변경

### 우선순위 중간 (권장)

4. **SSR 호환성**: `customElements.define()` 호출 시 브라우저 환경 체크
5. **브라우저 API 보호**: `window`, `document` 접근 전 환경 체크
6. **package.json exports 정리**: 올바른 경로로 exports 설정

### 우선순위 낮음 (선택)

7. **데모 사이트 개선**: 더 나은 데모 페이지 구성
8. **테스트 추가**: 유닛 테스트 및 E2E 테스트

## 코드 작성 규칙

### SSR-Safe 코드 패턴

```typescript
// GOOD
if (typeof window !== 'undefined') {
  window.addEventListener('click', handler);
}

// BAD
window.addEventListener('click', handler);
```

### 컴포넌트 등록 패턴

```typescript
// GOOD
if (typeof window !== 'undefined' && typeof customElements !== 'undefined') {
  if (!customElements.get('seo-toast')) {
    customElements.define('seo-toast', SeoToast);
  }
}

// BAD
customElements.define('seo-toast', SeoToast);
```

### requestAnimationFrame 사용

```typescript
// GOOD - 환경 체크 후 사용
const safeRAF = (callback: FrameRequestCallback) => {
  if (typeof requestAnimationFrame !== 'undefined') {
    return requestAnimationFrame(callback);
  }
  return setTimeout(callback, 16);
};

// BAD
requestAnimationFrame(() => { /* ... */ });
```

## 테스트 명령어

```bash
# 타입 체크
npm run type-check

# 개발 서버
npm run dev

# 프로덕션 빌드
npm run build

# 미니파이 빌드 (standalone)
npm run build:min
```

## 배포 프로세스

```bash
# 패치 버전 릴리즈 (0.0.1 → 0.0.2)
npm run release:patch

# 마이너 버전 릴리즈 (0.0.1 → 0.1.0)
npm run release:minor

# 메이저 버전 릴리즈 (0.0.1 → 1.0.0)
npm run release:major
```

## Toast 타입 및 API

### Toast Types
- `success`: 성공 알림 (녹색)
- `error`: 에러 알림 (빨간색)
- `warning`: 경고 알림 (노란색)
- `info`: 정보 알림 (파란색)

### Position Options
- `top-left`, `top-center`, `top-right`
- `bottom-left`, `bottom-center`, `bottom-right`

### Animation Types
- `slide`: 슬라이드 인/아웃
- `fade`: 페이드 인/아웃
- `scale`: 스케일 인/아웃
- `bounce`: 바운스 효과
- `flip`: 플립 효과

### 정적 메서드
```typescript
SeoToast.success(message, options?)
SeoToast.error(message, options?)
SeoToast.warning(message, options?)
SeoToast.info(message, options?)
SeoToast.show(message, type?, options?)
SeoToast.getInstance(config?)
```

## 주의사항

1. **Zero Dependencies**: 외부 라이브러리 의존성 없이 순수 Web Components로 구현
2. **Shadow DOM 미사용**: 글로벌 CSS 스타일링 가능하도록 Light DOM 사용
3. **이벤트 네이밍**: 커스텀 이벤트는 `toast-close` 형식 사용
4. **중복 메시지 처리**: 동일 메시지는 카운터로 표시 (재생성하지 않음)
5. **Progress Bar**: hover 시 일시정지, 떠나면 재개

## seo-select 참고 사항

seo-toast는 seo-select의 구조를 따릅니다:
- 동일한 Vite 빌드 설정
- 동일한 프레임워크 래퍼 구조
- 동일한 배포 스크립트 패턴

## 관련 문서

- [README.md](./README.md) - 사용자 문서
- [seo-select](https://github.com/seadonggyun4/seo-select) - 참고 프로젝트
