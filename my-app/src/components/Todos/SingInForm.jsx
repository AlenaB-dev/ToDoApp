import { useState } from "react";
import singInStyle from "./SingInForm.module.css";

export default function SingInForm({ onSingIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
}

const handleSubmit = (e) => {
  e.preventDefault();
  if (!username.trim()) return;

  // safeusername to localStorage
  localStorage.setItem("currentUset", username);

  // callback in App
  onSingIn(username);

  //clear form
  setUsername("");
  setPassword("");

  return (
    <form onSubmit={handleSubmit} className={singInStyle.form}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className={singInStyle.userName}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={singInStyle.password}
      />
      <button type="submit">Sing In</button>
    </form>
  );
};
