import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import styles from "./App.module.css";
import styles from "./components/UI/Modal.module.css";
import TodoTasksList from "./components/Todos/TodoTasksList.jsx";
import AddTaskForm from "./components/Todos/AddTaskForm.jsx";
import Button from "./components/UI/Button.jsx";

function App() {
  // showing current date and day
  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  // tasks list
  const [todos, setTodos] = useState([]);

  // add task
  const addTodoHandler = ({ text, title, category, dueDate }) => {
    const newTodo = {
      title,
      text,
      category,
      dueDate,
      isComplited: false,
      id: uuidv4(),
    };
    setTodos([...todos, newTodo]);
  };

  // delete task
  const deleteTodoHandler = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isComplited: !todo.isCompleted } : todo
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

  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeTodos = todos.filter((t) => !t.isCompleted);
  const completedTodos = todos.filter((t) => t.isCompleted);

  return (
    <>
      <p className={styles.date}>{formattedDate}</p>

      {!isModalOpen && (
        <>
          <h1>My ToDos</h1>

          {/* ACTIVE */}

          <TodoTasksList
            todos={activeTodos}
            deleteTodo={deleteTodoHandler}
            toggleTodo={toggleTodoHandler}
          />

          <hr className={styles.divider} />

          {/* COMPLETED */}

          <h2>Completed</h2>
          <TodoTasksList
            todos={completedTodos}
            deleteTodo={deleteTodoHandler}
            toggleTodo={toggleTodoHandler}
            emptyMessage="No completed tasks"
          />

          <Button onClick={clearCompletedHandler} className="clear-btn">
            Clear
          </Button>

          <Button onClick={() => setIsModalOpen(true)} className="add-btn">
            Add new task
          </Button>
        </>
      )}

      {isModalOpen && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className={styles.modalWindow}
            onClick={(e) => e.stopPropagation()}
          >
            <AddTaskForm
              onSubmit={addTodoHandler}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
