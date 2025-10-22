"use client";

import { useState, FormEvent } from "react";
import css from "./LoginForm.module.css";
import { login } from "@/lib/api/api";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);
    try {
      await login({ email, password });
      setSuccess(true);
    useAuthStore.getState().setIsAuthenticated(true);
        router.push('/portfolio');
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={css.form_wrapper}>
      <form onSubmit={handleSubmit}>
        <fieldset className={css.fieldset}>
          <legend className={css.legend}>Admin Login</legend>

          <label className={css.label}>
            Email
            <input
              type="email"
              className={css.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className={css.label}>
            Password
            <input
              type="password"
              className={css.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          {error && (
            <p className={`${css.message_warning} ${css.message_warning_error}`}>
              {error}
            </p>
          )}
          {success && (
            <p className={`${css.message_warning} ${css.message_warning_ok}`}>
              Login successful!
            </p>
          )}

          <button type="submit" className={css.btn} disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </button>
        </fieldset>
      </form>
    </div>
  );
}