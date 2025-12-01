// get tasks
export function getTasks(username) {
  const key = `todos_${username}`;
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : [];
}

// save tasks
export function saveTasks(username, tasks) {
  const key = `todos_${username}`;
  localStorage.setItem(key, JSON.stringify(tasks));
}

// clear tasks
export function clearTasks() {
  const key = `todos_${username}`;
  localStorage.removeItem(key);
}
