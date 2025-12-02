import { useState } from "react";
import signInStyle from "./SignInForm.module.css";
import { registerUser, loginUser } from "../../utils/localStorage";

export default function SignInForm({ onSignIn }) {
  const [mode, setMode] = useState("login"); // login / register
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail("");

    if (mode === "register") {
      const result = registerUser(email, username, password);
      if (!result.success) {
        setError(result.message);
        return;
      }
      onSignIn(email);
      return;
    }
    if (mode === "login") {
      const result = loginUser(email, password);
      if (!result.success) {
        setError(result.message);
        return;
      }
      onSignIn(email);
    }
  };

  const handleGuest = () => {
    onSignIn("Guest");
  };

  return (
    <div className={signInStyle.container}>
      <form onSubmit={handleSubmit} className={signInStyle.form}>
        <h2>{mode === "login" ? "Sign In" : "Register"}</h2>

        {error && <p className={signInStyle.error}>{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {mode === "register" && (
          <input
            type="text"
            placeholder="Your name"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
            className={signInStyle.userName}
          />
        )}

        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className={signInStyle.password}
        />

        <button type="submit" className={signInStyle.signInBtn}>
          {mode === "login" ? "Sign In" : "Register"}
        </button>
        <button
          onClick={handleGuest}
          className={signInStyle.guestBtn}
          type="button"
        >
          Continue as Guest
        </button>

        <p className={signInStyle.switchMode}>
          {mode === "login" ? (
            <>
              No account?
              <span onClick={() => setMode("register")}>Register</span>
            </>
          ) : (
            <>
              Already have an account?
              <span onClick={() => setMode("login")}>Sign in</span>
            </>
          )}
        </p>
      </form>
    </div>
  );
}
