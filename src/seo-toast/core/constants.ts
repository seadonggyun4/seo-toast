// seo-toast/constants.ts
export const DEFAULT_CLOSE_TIME = 2000;

export const DEFAULT_TITLES = {
  success: 'Success',
  error: 'Error',
  warning: 'Warning',
  info: 'Information',
} as const;

export const DEFAULT_ICONS = {
  success: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-2 15l-5-5 1.414-1.414L10 14.172l7.586-7.586L19 8l-9 9z"/></svg>`,
  error: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm4.207 12.793l-1.414 1.414L12 13.414l-2.793 2.793-1.414-1.414L10.586 12 7.793 9.207l1.414-1.414L12 10.586l2.793-2.793 1.414 1.414L13.414 12l2.793 2.793z"/></svg>`,
  warning: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 16h2v2h-2v-2zm0-6h2v4h-2v-4z"/></svg>`,
  info: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 15c-.553 0-1-.448-1-1v-4c0-.552.447-1 1-1s1 .448 1 1v4c0 .552-.447 1-1 1zm1-8h-2V7h2v2z"/></svg>`,
} as const;