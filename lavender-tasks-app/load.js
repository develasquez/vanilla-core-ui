import { initializeApp } from "./main.js";

async function loadComponent(url, elementId) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to load ${url}`);
    const html = await response.text();
    const element = document.getElementById(elementId);
    if (element) element.innerHTML = html;
  } catch (error) {
    if (!error.message.includes('404')) console.error(`Component load error: ${error}`);
  }
}

async function main() {
  await Promise.all([
    loadComponent("/components/header/header.html", "header-container"),
    loadComponent("/components/sidebar/sidebar.html", "sidebar-container"),
    loadComponent("/components/metrics/metrics.html", "metrics-container"),
    loadComponent("/components/controls/controls.html", "controls-container"),
    loadComponent("/components/kanban/kanban.html", "kanban-container"),
    loadComponent("/components/bottom-nav/bottom-nav.html", "bottom-nav-container")
  ]);

  setTimeout(initializeApp, 0);
}

main();
