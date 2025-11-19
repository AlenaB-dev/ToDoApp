import { useState } from "react";
import "./App.css";
import Button from "./components/UI/Button.jsx";

function App() {
  // showing current date and day
  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  // handle button actions
  const handleClear = () => {
    console.log("Clear completed task");
  };

  const handleAdd = () => {
    console.log("Add new task");
  };

  return (
    <>
      <p className="date">{formattedDate}</p>
      <h1>My ToDos</h1>
      <p>tasks</p>

      <h2>Completed</h2>

      <p>tasks</p>

      <Button onClick={handleClear} className="clear-btn">
        Clear
      </Button>

      <Button onClick={handleAdd} className="add-btn">
        Add new task
      </Button>
    </>
  );
}

export default App;
