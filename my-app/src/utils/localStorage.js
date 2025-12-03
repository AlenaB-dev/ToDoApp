// USER DB
export function getUsersDB() {
  const raw = localStorage.getItem("userDB");
  return raw ? JSON.parse(raw) : {};
}

export function saveUsersDB(db) {
  localStorage.setItem("userDB", JSON.stringify(db));
}

// REGISTER USER
export function registerUser(email, username, password) {
  const db = getUsersDB();

  if (db[email]) {
    return { success: false, message: "User already exists" };
  }

  db[email] = { username, password };
  saveUsersDB(db);

  return { success: true };
}

// LOGIN USER
export function loginUser(email, password) {
  const db = getUsersDB();

  if (!db[email]) {
    return { success: false, message: "User not found" };
  }

  if (db[email].password !== password) {
    return { success: false, message: "Invalid password" };
  }

  return { success: true, username: db[email].username };
}

// TASKS
export function getTasks(userEmail) {
  if (!userEmail || userEmail === "Guest") return [];
  const saved = localStorage.getItem(`todos_${userEmail}`);
  return saved ? JSON.parse(saved) : [];
}

// save tasks
export function saveTasks(userEmail, tasks) {
  if (!userEmail || userEmail === "Guest") return;
  localStorage.setItem(`todos_${userEmail}`, JSON.stringify(tasks));
}

// clear tasks
export function clearTasks(userEmail) {
  localStorage.removeItem(`todos_${userEmail}`);
}
