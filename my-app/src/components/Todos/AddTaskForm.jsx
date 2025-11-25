import { useState } from "react";
import moduleStyle from "./AddTaskForm.module.css";
import TodoActions from "./TodoActions.jsx";

const AddTaskForm = ({ onSubmit, onClose }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = () => {
    onSubmit({ title, text, category, dueDate });
    onClose();
  };

  return (
    <div>
      <h2>New Task</h2>
      <label>
        Title:{" "}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
        />
      </label>
      <label>
        Note:{" "}
        <textarea value={text} onChange={(e) => setText(e.target.value)} />
      </label>

      <TodoActions selected={category} onSelect={setCategory} />

      <label>
        Due date:{" "}
        <input
          type="datetime-local"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </label>

      <button onClick={handleSubmit}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default AddTaskForm;
