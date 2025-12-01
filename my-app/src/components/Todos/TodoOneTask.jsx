import { RiDeleteBin2Line, RiTodoFill } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";
import { format } from "date-fns";

import styles from "./TodoOneTask.module.css";

const TodoOneTask = ({ todo, deleteTodo, toggleTodo }) => {
  return (
    <div
      className={`${styles.todo} ${
        todo.isCompleted ? styles.completedTodo : ""
      }`}
    >
      <RiTodoFill className={styles.todoIcon} />

      <div className={styles.todoContent}>
        <h3 className={styles.todoTitle}>{todo.title}</h3>

        {todo.text && <p className={styles.todoText}>{todo.text}</p>}

        <div className={styles.todoMeta}>
          {todo.category && (
            <span className={styles.todoCategory}>{todo.category}</span>
          )}

          {todo.dueDate && (
            <span className={styles.todoDate}>
              {format(new Date(todo.dueDate), "dd/MM/yyyy HH:mm")}
            </span>
          )}
        </div>
      </div>

      <FaCheck
        className={styles.checkIcon}
        onClick={() => toggleTodo(todo.id)}
      />

      <RiDeleteBin2Line
        className={styles.deleteIcon}
        onClick={() => deleteTodo(todo.id)}
      />
    </div>
  );
};

export default TodoOneTask;
