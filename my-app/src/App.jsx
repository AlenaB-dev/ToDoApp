import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import {
  getUsersDB,
  loginUser,
  registerUser,
  getTasks,
  saveTasks,
} from "./utils/localStorage.js";
import styles from "./App.module.css";
import modalStyles from "./components/UI/Modal.module.css";
import TodoTasksList from "./components/Todos/TodoTasksList.jsx";
import AddTaskForm from "./components/Todos/AddTaskForm.jsx";
import Button from "./components/UI/Button.jsx";
import SignInForm from "./components/Todos/SignInForm.jsx";

function App() {
  // singIn form
  const [user, setUser] = useState(() => localStorage.getItem("currentUser"));
  const isGuest = user === "Guest";

  const handleSignIn = (email, username) => {
    setUser(email);
    if (email !== "Guest") {
      localStorage.setItem("currentUser", email);
      localStorage.setItem("currentUsername", username);
    }
  };

  //user DB
  const db = getUsersDB();
  const storedUsername = localStorage.getItem("currentUsername");

  // загрузить задачи при входе
  const [todos, setTodos] = useState(() => getTasks(user));
  const [isModalOpen, setIsModalOpen] = useState(false);

  // save only of Not a Guest
  useEffect(() => {
    if (isGuest) {
      setTodos([]); // гость всегда начинает с пустого списка
      return;
    }
    setTodos(getTasks(user)); // обычный пользователь — загрузить задачи
  }, [user]);

  // form without SignIn
  if (!user) {
    return <SignInForm onSignIn={handleSignIn} />;
  }

  // log out
  const handleLogout = () => {
    localStorage.removeItem("currentUser"); // выход из аккаунта
    setUser(null); // сброс состояния
    setTodos([]); // очищаем задачи
  };

  // add task
  const addTodoHandler = ({ text, title, category, dueDate }) => {
    const newTodo = {
      title,
      text,
      category,
      dueDate,
      isCompleted: false,
      id: uuidv4(),
    };
    setTodos([...todos, newTodo]);
  };

  // delete task
  const deleteTodoHandler = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // toggle completed / active
  const toggleTodoHandler = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  // clear completed
  const clearCompletedHandler = () => {
    setTodos(todos.filter((todo) => !todo.isCompleted));
  };

  const activeTodos = todos.filter((t) => !t.isCompleted);
  const completedTodos = todos.filter((t) => t.isCompleted);

  // showing current date
  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      {!user ? (
        <SignInForm onSignIn={handleSignIn} />
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.topBar}>
            <span className={styles.smallGreeting}>
              {isGuest ? "Welcome, Guest!" : `Welcome, ${storedUsername}!`}
            </span>
            <Button onClick={handleLogout} className={styles.logoutBtn}>
              Log out
            </Button>
          </div>

          <p className={styles.date}>{formattedDate}</p>
          <hr className={styles.divider} />

          {!isModalOpen && (
            <>
              <div className={styles.content}>
                <h1>My ToDos</h1>

                {/* ACTIVE */}
                <TodoTasksList
                  todos={activeTodos}
                  deleteTodo={deleteTodoHandler}
                  toggleTodo={toggleTodoHandler}
                />

                {/* COMPLETED */}
                <h2 className={styles.completedHeader}>Completed tasks</h2>
                <TodoTasksList
                  todos={completedTodos}
                  deleteTodo={deleteTodoHandler}
                  toggleTodo={toggleTodoHandler}
                  emptyMessage="No completed tasks"
                />
              </div>

              <div className={styles.bottomActions}>
                <Button
                  onClick={clearCompletedHandler}
                  className={styles.clearBtn}
                >
                  Clear
                </Button>

                <Button
                  onClick={() => setIsModalOpen(true)}
                  className={styles.addBtn}
                >
                  Add new task
                </Button>
              </div>
            </>
          )}

          {isModalOpen && (
            <div
              className={modalStyles.modalBackdrop}
              onClick={() => setIsModalOpen(false)}
            >
              <div
                className={modalStyles.modalWindow}
                onClick={(e) => e.stopPropagation()}
              >
                <AddTaskForm
                  onSubmit={addTodoHandler}
                  onClose={() => setIsModalOpen(false)}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
export default App;
