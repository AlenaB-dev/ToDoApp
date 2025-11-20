import { categories } from "../utils/categories";
import styles from "./TodoActions.module.css";

const TodoActions = ({ onSelect }) => {
  return (
    <div className={styles.wrapper}>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`${styles.button} ${
            selected === cat.id ? styles.active : ""
          }`}
          title={cat.label}
        >
          {cat.icon}
        </button>
      ))}
    </div>
  );
};

export default TodoActions;
