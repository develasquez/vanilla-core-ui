import state from '../store.js';

export function renderMetrics() {
  const container = document.getElementById('task-metrics-grid');
  if (!container) return;

  const total = state.tasks.length;
  const done = state.tasks.filter(t => t.status === 'done').length;
  const inProgress = state.tasks.filter(t => t.status === 'in-progress').length;
  const highPriority = state.tasks.filter(t => t.priority === 'high' && t.status !== 'done').length;
  const completionRate = total > 0 ? Math.round((done / total) * 100) : 0;

  const metrics = [
    { title: 'Total Tareas', value: total.toString(), trend: 'Sprint 42', type: 'neutral', progress: 1.0 },
    { title: 'En Progreso', value: inProgress.toString(), trend: `${inProgress} activas`, type: 'neutral', progress: inProgress / (total || 1) },
    { title: 'Prioridad Crítica', value: highPriority.toString(), trend: highPriority > 0 ? 'Atención' : 'Controlado', type: highPriority > 0 ? 'warning' : 'positive', progress: highPriority / (total || 1) },
    { title: 'Tasa de Éxito', value: `${completionRate}%`, trend: '+14.2%', type: 'positive', progress: completionRate / 100 }
  ];

  container.innerHTML = metrics.map(m => `
    <div class="m3-card p-4 lg:p-5 flex flex-col justify-between space-y-3">
      <div class="flex items-center justify-between">
        <span class="text-xs font-semibold text-[var(--md-sys-color-on-surface-variant)]">${m.title}</span>
        <span class="${m.type === 'positive' ? 'm3-badge-success' : m.type === 'warning' ? 'm3-badge-warning' : 'm3-badge-neutral'}">
          ${m.trend}
        </span>
      </div>
      <div class="text-2xl font-bold text-[var(--md-sys-color-on-surface)]">
        ${m.value}
      </div>
      <div class="w-full bg-[var(--md-sys-color-surface-container-high)] h-1.5 rounded-full overflow-hidden">
        <div class="bg-[var(--md-sys-color-primary)] h-full rounded-full transition-all duration-300" style="width: ${Math.round(m.progress * 100)}%"></div>
      </div>
    </div>
  `).join('');
}
