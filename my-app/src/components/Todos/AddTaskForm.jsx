import { useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import moduleStyle from "./AddTaskForm.module.css";
import "../UI/daypicker.css";
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
          className={moduleStyle.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
        />
      </label>
      <label>
        Note:{" "}
        <textarea
          className={moduleStyle.textarea}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </label>

      <TodoActions selected={category} onSelect={setCategory} />

      <div className={moduleStyle.dateIcon}>
        Due date <FaRegCalendarAlt className={moduleStyle.calenderIcon} />
      </div>

      <DayPicker mode="single" selected={dueDate} onSelect={setDueDate} />

      <div className={moduleStyle.buttons}>
        <button onClick={handleSubmit}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default AddTaskForm;
