import state, { subscribe, setState } from './store.js';
import { initElements, elements } from './dom-elements.js';
import { renderApp } from './ui/renderer.js';
import { init as initHeader } from './components/header/header.js';
import { init as initSidebar } from './components/sidebar/sidebar.js';
import { init as initMetrics } from './components/metrics/metrics.js';
import { init as initControls } from './components/controls/controls.js';
import { init as initKanban } from './components/kanban/kanban.js';
import { init as initBottomNav } from './components/bottom-nav/bottom-nav.js';

let selectedPriority = 'high';

export async function initializeApp() {
  initElements();

  initHeader();
  initSidebar();
  initMetrics();
  initControls();
  initKanban();
  initBottomNav();

  const priorityBtns = document.querySelectorAll('.priority-btn');
  priorityBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      selectedPriority = btn.getAttribute('data-priority');
      priorityBtns.forEach(b => {
        const isSel = b.getAttribute('data-priority') === selectedPriority;
        b.classList.toggle('bg-[var(--md-sys-color-primary-container)]', isSel);
        b.classList.toggle('text-[var(--md-sys-color-on-primary-container)]', isSel);
      });
    });
  });

  if (elements.btnDialogCancel) {
    elements.btnDialogCancel.addEventListener('click', () => {
      setState({ dialog: { isOpen: false } });
    });
  }

  if (elements.btnDialogSave) {
    elements.btnDialogSave.addEventListener('click', () => {
      const title = elements.inputTaskTitle?.value?.trim();
      const tag = elements.inputTaskTag?.value?.trim() || 'General';
      const due = elements.inputTaskDue?.value?.trim() || 'Pronto';

      if (!title) return;

      const newTask = {
        id: `task-${Date.now()}`,
        title,
        status: 'todo',
        priority: selectedPriority,
        tag,
        dueDate: due
      };

      setState({
        tasks: [newTask, ...state.tasks],
        dialog: { isOpen: false }
      });
    });
  }

  subscribe(renderApp);
  renderApp();

  console.log("💜 Lavender Tasks Suite initialized successfully.");
}
