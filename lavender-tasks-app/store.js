const state = {
  appName: "Lavender Tasks Suite",
  palette: "Lavender Breeze (#6750A4)",
  surfaceMode: "Escala de Grises / Neutro",
  isDarkMode: false,
  activeFilter: "all",
  searchQuery: "",
  activeTab: "kanban",

  tasks: [
    { id: 'task-1', title: 'Diseñar especificación de arquitectura M3', status: 'done', priority: 'high', tag: 'Arquitectura', dueDate: 'Hoy' },
    { id: 'task-2', title: 'Integrar bundle offline de Web Components', status: 'in-progress', priority: 'high', tag: 'Core', dueDate: 'Mañana' },
    { id: 'task-3', title: 'Auditar contrastes WCAG AAA en botones y badges', status: 'in-progress', priority: 'medium', tag: 'Accesibilidad', dueDate: 'Jueves' },
    { id: 'task-4', title: 'Implementar Focus Guard en inputs de búsqueda', status: 'todo', priority: 'medium', tag: 'Estabilidad', dueDate: 'Viernes' },
    { id: 'task-5', title: 'Generar release 1.3.0 en GitHub y NPM', status: 'done', priority: 'high', tag: 'DevOps', dueDate: 'Completado' },
    { id: 'task-6', title: 'Configurar previsualización interactiva en browser', status: 'todo', priority: 'low', tag: 'CLI Tool', dueDate: 'Próxima sem.' }
  ],

  dialog: {
    isOpen: false,
    taskId: null
  }
};

const subscribers = [];

export function subscribe(callback) {
  if (typeof callback !== 'function') throw new Error('Subscriber must be a function.');
  subscribers.push(callback);
}

export function setState(newState) {
  Object.assign(state, newState);
  console.log("📢 STATE CHANGE PUBLISHED:", newState);
  subscribers.forEach(cb => cb());
}

export default state;
