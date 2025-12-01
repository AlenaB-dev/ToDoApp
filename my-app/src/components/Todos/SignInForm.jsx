import { useState } from "react";
import signInStyle from "./SignInForm.module.css";

export default function SignInForm({ onSignIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    // safe username to localStorage
    localStorage.setItem("currentUser", username);
    // callback in App
    onSignIn(username);
    //clear form
    setUsername("");
    setPassword("");
  };

  const handleGuest = () => {
    const guestName = "Guest";
    localStorage.setItem("currentUser", guestName);
    onSignIn(guestName);
  };

  return (
    <div className={signInStyle.container}>
      <form onSubmit={handleSubmit} className={signInStyle.form}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={signInStyle.userName}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={signInStyle.password}
        />
        <button
          onClick={handleGuest}
          className={signInStyle.guestBtn}
          type="submit"
        >
          Sign In as Guest
        </button>
      </form>
    </div>
  );
}
