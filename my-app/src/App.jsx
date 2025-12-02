import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import { getTasks, saveTasks } from "./utils/localStorage.js";
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

  const handleSignIn = (username) => {
    setUser(username);
    if (username !== "Guest") {
      localStorage.setItem("currentUser", username);
    }
  };

  // загрузить задачи при входе
  const [todos, setTodos] = useState(() => getTasks(user));
  const [isModalOpen, setIsModalOpen] = useState(false);

  // save only of Not a Guest
  useEffect(() => {
    if (!isGuest) saveTasks(user, todos);
  }, [todos, user, isGuest]);

  // form without SignIn
  if (!user) {
    return <SignInForm onSignIn={handleSignIn} />;
  }

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
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
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
          <h2>Welcome, {user}!</h2>
          <p className={styles.date}>{formattedDate}</p>
          <hr className={styles.divider} />

          {!isModalOpen && (
            <>
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
