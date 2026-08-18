import { setState } from '../../store.js';

export function init() {
  const navItems = document.querySelectorAll('.m3-nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const tab = item.getAttribute('data-tab');
      setState({ activeTab: tab });
    });
  });
}
