import { useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import enGB from "date-fns/locale/en-GB"; // английская локаль

import moduleStyle from "./AddTaskForm.module.css";
import "../UI/datepicker.css";
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

      <label className={moduleStyle.datelabel}>
        <div className={moduleStyle.dateIcon}>
          Due date <FaRegCalendarAlt className={moduleStyle.calenderIcon} />
        </div>

        <DatePicker
          className={moduleStyle.input}
          selected={dueDate}
          onChange={(date) => setDueDate(date)}
          showTimeSelect
          dateFormat="Pp"
          locale={enGB}
        />
      </label>

      <div className={moduleStyle.buttons}>
        <button onClick={handleSubmit}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default AddTaskForm;
