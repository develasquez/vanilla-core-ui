import state, { setState } from '../store.js';

export function renderKanban() {
  const container = document.getElementById('board-content-wrapper');
  if (!container) return;

  const query = (state.searchQuery || '').toLowerCase().trim();
  
  const filteredTasks = state.tasks.filter(t => {
    const matchesQuery = !query || t.title.toLowerCase().includes(query) || t.tag.toLowerCase().includes(query);
    if (!matchesQuery) return false;

    if (state.activeFilter === 'todo') return t.status === 'todo';
    if (state.activeFilter === 'in-progress') return t.status === 'in-progress';
    if (state.activeFilter === 'done') return t.status === 'done';
    if (state.activeFilter === 'high-priority') return t.priority === 'high';
    return true;
  });

  if (state.activeTab === 'list') {
    renderListView(container, filteredTasks);
  } else {
    renderKanbanBoardView(container, filteredTasks);
  }

  attachCardActionEvents(container);
}

function renderKanbanBoardView(container, tasks) {
  const columns = [
    { id: 'todo', title: 'Por Hacer', icon: 'pending', items: tasks.filter(t => t.status === 'todo') },
    { id: 'in-progress', title: 'En Progreso', icon: 'timelapse', items: tasks.filter(t => t.status === 'in-progress') },
    { id: 'done', title: 'Completadas', icon: 'task_alt', items: tasks.filter(t => t.status === 'done') }
  ];

  container.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      ${columns.map(col => `
        <div class="kanban-column p-4 flex flex-col space-y-3">
          <div class="flex items-center justify-between pb-2 border-b border-[var(--md-sys-color-outline-variant)]/60">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-[18px] text-[var(--md-sys-color-primary)]">${col.icon}</span>
              <h3 class="text-sm font-bold text-[var(--md-sys-color-on-surface)]">${col.title}</h3>
            </div>
            <span class="m3-badge-neutral text-[10px]">${col.items.length}</span>
          </div>

          <div class="space-y-3 flex-1 min-h-[160px]">
            ${col.items.length === 0 ? `
              <div class="text-center py-8 text-xs text-[var(--md-sys-color-on-surface-variant)] border border-dashed border-[var(--md-sys-color-outline-variant)] rounded-xl">
                Sin tareas en esta etapa
              </div>
            ` : col.items.map(t => renderTaskCard(t)).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderListView(container, tasks) {
  container.innerHTML = `
    <div class="m3-card p-4 lg:p-6 space-y-3">
      <div class="flex items-center justify-between pb-3 border-b border-[var(--md-sys-color-outline-variant)]">
        <h3 class="text-sm font-bold text-[var(--md-sys-color-on-surface)]">Listado Consolidado de Tareas</h3>
        <span class="text-xs text-[var(--md-sys-color-on-surface-variant)]">${tasks.length} tareas encontradas</span>
      </div>
      <div class="divide-y divide-[var(--md-sys-color-outline-variant)]/50">
        ${tasks.map(t => `
          <div class="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[var(--md-sys-color-surface-container)] px-3 rounded-xl transition-colors">
            <div class="flex items-center gap-3">
              <button class="btn-toggle-status w-6 h-6 rounded-full border-2 flex items-center justify-center ${t.status === 'done' ? 'bg-[var(--md-sys-color-primary)] border-[var(--md-sys-color-primary)] text-white' : 'border-[var(--md-sys-color-outline)]'}" data-task-id="${t.id}">
                ${t.status === 'done' ? '<span class="material-symbols-outlined text-[16px]">check</span>' : ''}
              </button>
              <div>
                <h4 class="text-sm font-semibold text-[var(--md-sys-color-on-surface)] ${t.status === 'done' ? 'line-through opacity-60' : ''}">${t.title}</h4>
                <div class="flex items-center gap-2 text-xs text-[var(--md-sys-color-on-surface-variant)] mt-0.5">
                  <span class="m3-badge-neutral text-[10px]">${t.tag}</span>
                  <span>·</span>
                  <span>Entrega: ${t.dueDate}</span>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-2 self-end sm:self-auto">
              ${renderPriorityBadge(t.priority)}
              <button class="btn-delete-task text-[var(--md-sys-color-on-surface-variant)] hover:text-red-500 p-1" data-task-id="${t.id}">
                <span class="material-symbols-outlined text-[18px]">delete</span>
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderTaskCard(t) {
  return `
    <div class="kanban-card p-3.5 space-y-2.5">
      <div class="flex items-center justify-between">
        <span class="m3-badge-neutral text-[10px]">${t.tag}</span>
        ${renderPriorityBadge(t.priority)}
      </div>
      <h4 class="text-xs font-semibold text-[var(--md-sys-color-on-surface)] leading-snug">${t.title}</h4>
      <div class="flex items-center justify-between pt-1 border-t border-[var(--md-sys-color-outline-variant)]/40 text-[11px] text-[var(--md-sys-color-on-surface-variant)]">
        <span class="flex items-center gap-1">
          <span class="material-symbols-outlined text-[14px]">calendar_today</span>
          ${t.dueDate}
        </span>
        <div class="flex items-center gap-1">
          ${t.status !== 'todo' ? `
            <button class="btn-move-left p-1 hover:bg-[var(--md-sys-color-surface-container-high)] rounded" data-task-id="${t.id}" title="Mover a etapa anterior">
              <span class="material-symbols-outlined text-[14px]">arrow_back</span>
            </button>
          ` : ''}
          ${t.status !== 'done' ? `
            <button class="btn-move-right p-1 hover:bg-[var(--md-sys-color-primary-container)] rounded" data-task-id="${t.id}" title="Mover a etapa siguiente">
              <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          ` : `
            <span class="m3-badge-success text-[10px] py-0 px-1.5">Listo</span>
          `}
        </div>
      </div>
    </div>
  `;
}

function renderPriorityBadge(priority) {
  if (priority === 'high') return `<span class="m3-badge-error text-[10px] py-0 px-2">Alta</span>`;
  if (priority === 'medium') return `<span class="m3-badge-warning text-[10px] py-0 px-2">Media</span>`;
  return `<span class="m3-badge-neutral text-[10px] py-0 px-2">Baja</span>`;
}

function attachCardActionEvents(container) {
  container.querySelectorAll('.btn-move-right').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-task-id');
      const updated = state.tasks.map(t => {
        if (t.id === id) {
          return { ...t, status: t.status === 'todo' ? 'in-progress' : 'done' };
        }
        return t;
      });
      setState({ tasks: updated });
    });
  });

  container.querySelectorAll('.btn-move-left').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-task-id');
      const updated = state.tasks.map(t => {
        if (t.id === id) {
          return { ...t, status: t.status === 'done' ? 'in-progress' : 'todo' };
        }
        return t;
      });
      setState({ tasks: updated });
    });
  });

  container.querySelectorAll('.btn-toggle-status').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-task-id');
      const updated = state.tasks.map(t => {
        if (t.id === id) {
          return { ...t, status: t.status === 'done' ? 'todo' : 'done' };
        }
        return t;
      });
      setState({ tasks: updated });
    });
  });

  container.querySelectorAll('.btn-delete-task').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-task-id');
      setState({ tasks: state.tasks.filter(t => t.id !== id) });
    });
  });
}
