const STORAGE_KEY = window.location.hostname.includes("localhost")
  ? "tasks_dev"
  : "tasks";

// get tasks
export function getTasks() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

// save tasks
export function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// clear tasks
export function clearTasks() {
  localStorage.removeItem(STORAGE_KEY);
}
