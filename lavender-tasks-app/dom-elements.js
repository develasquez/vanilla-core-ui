export const elements = {};

export function initElements() {
  const ids = {
    headerContainer: 'header-container',
    sidebarContainer: 'sidebar-container',
    mainContent: 'main-content',
    metricsContainer: 'metrics-container',
    controlsContainer: 'controls-container',
    kanbanContainer: 'kanban-container',
    bottomNavContainer: 'bottom-nav-container',
    taskDialog: 'task-dialog',
    taskDialogTitle: 'task-dialog-title',
    inputTaskTitle: 'input-task-title',
    inputTaskTag: 'input-task-tag',
    inputTaskDue: 'input-task-due',
    btnDialogCancel: 'btn-dialog-cancel',
    btnDialogSave: 'btn-dialog-save'
  };

  for (const key in ids) {
    const el = document.getElementById(ids[key]);
    if (!el) {
      console.warn(`Element with ID '${ids[key]}' not found.`);
    }
    elements[key] = el;
  }
}
