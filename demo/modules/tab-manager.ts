/**
 * Tab switching manager for demo page
 */

/**
 * Setup tab switching functionality
 */
export function setupTabSwitching(): void {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = (btn as HTMLElement).dataset.tab;

      // Update tab buttons
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update tab contents
      tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === `tab-${targetTab}`) {
          content.classList.add('active');
        }
      });
    });
  });
}

/**
 * Programmatically switch to a specific tab
 */
export function switchToTab(tabName: string): void {
  const tabBtn = document.querySelector(`.tab-btn[data-tab="${tabName}"]`) as HTMLElement;
  if (tabBtn) {
    tabBtn.click();
  }
}

/**
 * Get current active tab name
 */
export function getActiveTab(): string | null {
  const activeBtn = document.querySelector('.tab-btn.active') as HTMLElement;
  return activeBtn?.dataset.tab || null;
}
