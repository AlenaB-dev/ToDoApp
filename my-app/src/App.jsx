import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
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

  // handle tasks list
  const [todos, setTodos] = useState([]);

  const addTodoHandler = (text) => {
    const newTodo = {
      text,
      isComplited: false,
      id: uuidv4(),
    };
    setTodos([...todos, newTodo]);
  };

  // handle button actions
  const handleClear = () => {
    console.log("Clear completed task");
  };

  // add new task btn
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleAdd = () => {
    setIsModalOpen(true);
  };

  // delete todo

  // mark todo completed

  //

  return (
    <>
      <p className="date">{formattedDate}</p>
      {!isModalOpen && (
        <>
          <h1>My ToDos</h1>
          <TodoTasksList todos={todos} />

          <h2>Completed</h2>

          <p>tasks</p>

          <Button onClick={handleClear} className="clear-btn">
            Clear
          </Button>

          <Button onClick={handleAdd} className="add-btn">
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
            <AddTaskForm onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
