// get tasks
export function getTasks(username) {
  if (username === "Guest") return [];
  const saved = localStorage.getItem(`todos_${username}`);
  return saved ? JSON.parse(saved) : [];
}

// save tasks
export function saveTasks(username, tasks) {
  if (username === "Guest") return;
  localStorage.setItem(`todos_${username}`, JSON.stringify(tasks));
}

// clear tasks
export function clearTasks() {
  const key = `todos_${username}`;
  localStorage.removeItem(key);
}
