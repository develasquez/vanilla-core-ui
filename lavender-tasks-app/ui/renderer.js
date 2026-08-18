import state from '../store.js';
import { elements } from '../dom-elements.js';
import { renderMetrics } from './metrics-renderer.js';
import { renderKanban } from './kanban-renderer.js';

export function renderApp() {
  document.body.classList.toggle('dark-theme', state.isDarkMode);

  renderMetrics();
  renderKanban();

  document.querySelectorAll('.filter-chip').forEach(chip => {
    const f = chip.getAttribute('data-filter');
    const isActive = f === state.activeFilter;
    chip.classList.toggle('bg-[var(--md-sys-color-primary-container)]', isActive);
    chip.classList.toggle('text-[var(--md-sys-color-on-primary-container)]', isActive);
  });

  document.querySelectorAll('.view-btn').forEach(btn => {
    const t = btn.getAttribute('data-tab');
    const isActive = t === state.activeTab;
    btn.classList.toggle('bg-[var(--md-sys-color-primary-container)]', isActive);
    btn.classList.toggle('text-[var(--md-sys-color-on-primary-container)]', isActive);
  });

  document.querySelectorAll('.m3-nav-item').forEach(item => {
    const tab = item.getAttribute('data-tab');
    item.classList.toggle('active', tab === state.activeTab);
  });

  if (elements.taskDialog) {
    if (state.dialog.isOpen && !elements.taskDialog.open) {
      if (elements.inputTaskTitle) elements.inputTaskTitle.value = '';
      elements.taskDialog.show();
    } else if (!state.dialog.isOpen && elements.taskDialog.open) {
      elements.taskDialog.close();
    }
  }
}
