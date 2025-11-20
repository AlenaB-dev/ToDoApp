import { useState } from "react";
import { categories } from "../utils/categories";
import TodoActions from "./TodoActions";

const AddTaskForm = ({ onSubmit, onClose }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = () => {
    onSubmit({ title, text, category, dueDate });
  };
  onClose();
};
return (
  <div>
    <h2>Add New Task</h2>
    <label>
      Title:{" "}
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
      />
    </label>
    <label>
      Note: <textarea value={text} onChange={(e) => setText(e.target.value)} />
    </label>
    <TodoActions selected={category} onSelect={(cat) => setCategory(cat)} />
    <label>
      Due date:{" "}
      <input
        type="datetime-local"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
    </label>
    <button onClick={handleSubmit}>Save</button>
  </div>
);

export default AddTaskForm;
