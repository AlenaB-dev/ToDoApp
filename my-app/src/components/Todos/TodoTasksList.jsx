import TodoOneTask from "./TodoOneTask";
import styles from "./TodoTasksList.module.css";

function TodoTasksList({ todos, deleteTodo, toggleTodo }) {
  return (
    <div className={styles.todoListContainer}>
      {!todos.length && (
        <h2 className={styles.todoTaskEmpty}>ToDo list is empty</h2>
      )}
      {todos.map((todo) => (
        <TodoOneTask
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          toggleTodo={toggleTodo}
        />
      ))}
    </div>
  );
}

export default TodoTasksList;
