import { categories } from "../utils/categories";

const TodoActions = ({ onSelect }) => {
  return (
    <div style={{ display: "flex", gap: "12px", padding: "10px" }}>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          style={{
            border: "none",
            background: "transparent",
            fontSize: "24px",
            cursor: "pointer",
          }}
          title={cat.label}
        >
          {cat.icon}
        </button>
      ))}
    </div>
  );
};

export default TodoActions;
