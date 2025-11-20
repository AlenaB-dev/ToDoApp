import { categories } from "../../utils/categories.jsx";
import styles from "./TodoActions.module.css";

const TodoActions = ({ selected, onSelect }) => {
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
