import { setState } from '../../store.js';

export function init() {
  const sidebarItems = document.querySelectorAll('.m3-sidebar-item');
  sidebarItems.forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.getAttribute('data-view');
      setState({ activeFilter: view });
    });
  });
}
