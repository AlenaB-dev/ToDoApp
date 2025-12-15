import { useRef, useState } from "react";
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
  const [shakeTitle, setShakeTitle] = useState("");
  const [shakeText, setShakeText] = useState("");

  const titleRef = useRef(null);
  const textRef = useRef(null);

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
      setShakeTitle(true);
      setTimeout(() => setShakeTitle(false), 350);
      titleRef.current?.focus();
      return;
    }

    if (titleError) {
      titleRef.current?.focus();
      titleRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    if (textError) {
      textError.current?.focus();
      textRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

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
          ref={titleRef}
          className={`${moduleStyle.input} ${
            titleError && shakeTitle ? moduleStyle.shake : ""
          }`}
          type="text"
          value={title}
          onChange={(e) => {
            const value = e.target.value;
            const error = validateEnglish(value, 40);

            if (error) {
              setTitleError(error);
              setShakeTitle(true);
              setTimeout(() => setShakeTitle(false), 350);
              return;
            }
            setTitle(value);
            setTitleError("");
          }}
        />
        <small className={moduleStyle.counter}>{title.length}/40</small>
        {titleError && <p className={moduleStyle.error}>{titleError}</p>}
      </label>
      <label>
        Note:{" "}
        <textarea
          ref={textRef}
          className={`${moduleStyle.textarea} ${
            textError && shakeText ? moduleStyle.shake : ""
          }`}
          value={text}
          onChange={(e) => {
            const value = e.target.value;
            const error = validateEnglish(value, 200);

            if (error) {
              setTextError(error);
              setShakeText(true);
              setTimeout(() => setShakeText(false), 350);
              return;
            }

            setText(value);
            setTextError("");
          }}
        />
        <small className={moduleStyle.counter}>{text.length}/200</small>
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
