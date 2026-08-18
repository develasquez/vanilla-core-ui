import { setState } from '../../store.js';
import state from '../../store.js';

export function init() {
  const searchInput = document.getElementById('header-search-input');
  const themeToggle = document.getElementById('header-theme-toggle');
  const newTaskBtn = document.getElementById('header-btn-new-task');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      setState({ searchQuery: e.target.value });
    });
  }

  if (themeToggle) {
    themeToggle.selected = state.isDarkMode;
    themeToggle.addEventListener('change', (e) => {
      setState({ isDarkMode: e.target.selected });
    });
  }

  if (newTaskBtn) {
    newTaskBtn.addEventListener('click', () => {
      setState({ dialog: { isOpen: true, taskId: null } });
    });
  }
}
