/**
 * Clipboard utility functions
 */

/**
 * Copy text to clipboard with fallback for older browsers
 */
export function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text).then(() => {
      console.log('Code copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy: ', err);
      fallbackCopy(text);
    });
  } else {
    fallbackCopy(text);
    return Promise.resolve();
  }
}

/**
 * Fallback copy method for older browsers
 */
function fallbackCopy(text: string): void {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-9999px';
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
    console.log('Code copied to clipboard (fallback)');
  } catch (err) {
    console.error('Fallback copy failed:', err);
  }
  document.body.removeChild(textArea);
}

/**
 * Setup copy button functionality
 */
export function setupCopyButton(
  button: HTMLElement,
  getText: () => string,
  successText: string = 'Copied!',
  defaultText: string = 'Copy',
  timeout: number = 2000
): void {
  button.addEventListener('click', async () => {
    const text = getText();
    if (!text) return;

    await copyToClipboard(text);

    button.textContent = successText;
    button.classList.add('copied');

    setTimeout(() => {
      button.textContent = defaultText;
      button.classList.remove('copied');
    }, timeout);
  });
}
