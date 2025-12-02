import { useState, useEffect, useRef } from "react";
import signInStyle from "./SignInForm.module.css";
import { registerUser, loginUser } from "../../utils/localStorage";

export default function SignInForm({ onSignIn }) {
  const [mode, setMode] = useState("login"); // login / register
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const emailRef = useRef(null);

  useEffect(() => {
    emailRef.current?.focus();
  }, [mode]);

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
      onSignIn(email, result.username);
    }
    setEmail("");
    setUsername("");
    setPassword("");
    setError("");
  };

  const handleGuest = () => {
    onSignIn("Guest");
  };

  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => setError(""), 4000);
    return () => clearTimeout(timer);
  }, [error]);

  return (
    <div className={signInStyle.container}>
      <form onSubmit={handleSubmit} className={signInStyle.form}>
        <h2>{mode === "login" ? "Sign In" : "Register"}</h2>

        {error && <p className={signInStyle.error}>{error}</p>}

        <input
          ref={emailRef}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={signInStyle.email}
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
          {mode === "login" ? "Log In" : "Register"}
        </button>
        <button
          onClick={handleGuest}
          className={signInStyle.guestBtn}
          type="button"
        >
          Continue as Guest
        </button>

        <div className={signInStyle.switchMode}>
          {mode === "login" ? (
            <p>
              No account?{""}
              <button
                type="button"
                onClick={() => setMode("register")}
                className={signInStyle.switchBtn}
              >
                Register
              </button>
            </p>
          ) : (
            <p>
              Already have an account?
              <button type="button" onClick={() => setMode("login")}>
                Log In{" "}
              </button>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
