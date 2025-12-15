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
  const [titleError, setTitleError] = useState("");
  const [textError, setTextError] = useState("");

  // const filterEnglish = (value, maxLength) => {
  //   return value.replace(/[^a-zA-Z0-9\s.,!?'"()-]/g, "").slice(0, maxLength);
  // };

  const validateEnglish = (value, maxLength) => {
    if (/[^a-zA-Z0-9\s.,!?'"()-]/.test(value)) {
      return "Only English characters are allowed";
    }

    if (value.length > maxLength) {
      return `Maximum ${maxLength} characters`;
    }

    return "";
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      setTitleError("Title is required");
      return;
    }

    if (titleError || textError) return;

    onSubmit({
      title: title.trim(),
      text: text.trim(),
      category,
      dueDate,
    });

    onClose();
  };

  return (
    <div>
      <h2>New Task</h2>
      <label>
        Title:{" "}
        <input
          className={moduleStyle.input}
          type="text"
          value={title}
          onChange={(e) => {
            const value = e.target.value;
            const error = validateEnglish(value, 40);
            if (!error) setTitle(value.slice(0, 40));
            setTitleError(error);
          }}
        />
        <small className={moduleStyle.counter}>{title.length}/40</small>
        {titleError && <p className={moduleStyle.error}>{titleError}</p>}
      </label>
      <label>
        Note:{" "}
        <textarea
          className={moduleStyle.textarea}
          value={text}
          onChange={(e) => {
            const value = e.target.value;
            const error = validateEnglish(value, 200);
            if (!error) setText(value.slice(0, 200));
            setTextError(error);
          }}
        />
        <small className={moduleStyle.counter}>{title.length}/200</small>
        {textError && <p className={moduleStyle.error}>{textError}</p>}
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
