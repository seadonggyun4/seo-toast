# Copilot Instructions for seo-toast

## Overview
- **seo-toast** is a zero-dependency, SSR-safe, lightweight toast notification library built with native Web Components (no Shadow DOM).
- Supports React, Vue, Angular, Solid, Qwik via wrappers in `src/wrappers/`.
- Follows the structure and conventions of [seo-select](https://github.com/seadonggyun4/seo-select).

## Key Architecture
- **Core**: `src/components/seo-toast/` (main component logic)
- **Type Definitions**: `src/components/seo-toast/core/types.ts`, `src/types/`
- **Custom Events**: `src/event/index.ts` (all events use kebab-case, e.g., `toast-close`)
- **Utilities**: `src/utils/environment.ts` (SSR/browser checks)
- **Styles**: `src/styles/components/style.scss` (Light DOM, global CSS)
- **Wrappers**: `src/wrappers/` (framework-specific entrypoints)
- **Demo**: `demo/` (usage examples, not for production)

## Critical Patterns & Conventions
- **SSR Safety**: Always check `typeof window !== 'undefined'` and `typeof customElements !== 'undefined'` before using browser APIs or registering components.
  ```ts
  if (typeof window !== 'undefined' && typeof customElements !== 'undefined') {
    if (!customElements.get('seo-toast')) {
      customElements.define('seo-toast', SeoToast);
    }
  }
  ```
- **No Shadow DOM**: Use Light DOM for global CSS theming.
- **Zero Dependencies**: Do not add external libraries.
- **Duplicate Toasts**: Identical messages are grouped and counted, not re-created.
- **Progress Bar**: Pauses on hover, resumes on mouse leave.
- **Custom Events**: Use `toast-close` etc. for event names.
- **Animation/Position/Type**: See `README.md` for valid values.

## Developer Workflows
- **Build**: `npm run build` (production), `npm run build:min` (standalone/minified)
- **Dev Server**: `npm run dev`
- **Type Check**: `npm run type-check`
- **Release**: `npm run release:patch|minor|major` (see `release.sh`)
- **Demo**: `demo/` folder, run with dev server

## Integration Points
- **Exports**: Managed in `package.json` and `src/index.ts`
- **Framework Wrappers**: Each in `src/wrappers/{react,vue,angular,solid,qwik}/`
- **No Lit**: Remove any legacy Lit references from configs.

## References
- [README.md](../README.md) for API, usage, and configuration
- [CLAUDE.md](../CLAUDE.md) for additional agent instructions

---

**When in doubt, prefer SSR-safe, zero-dependency, and framework-agnostic solutions.**
