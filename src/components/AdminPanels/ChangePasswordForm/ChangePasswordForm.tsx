"use client";

import { useState, FormEvent } from "react";
import css from "./ChangePasswordForm.module.css";
import { ChangePasswordRequest } from "@/types/apiTypes";

interface ChangePasswordFormProps {
  onSubmit: (data: ChangePasswordRequest) => void;
}

export default function ChangePasswordForm({onSubmit}: ChangePasswordFormProps) {
  const [email, setEmail] = useState<string>("");
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await onSubmit({
        email,
        password: oldPassword,
        newPassword,
      });
      setSuccess(true);
      setEmail("");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
      setError("Password change failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={css.form_wrapper}>
      <form onSubmit={handleSubmit}>
        <fieldset className={css.fieldset}>
          <legend className={css.legend}>Change Password</legend>

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
            Old Password
            <input
              type="password"
              className={css.input}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </label>

          <label className={css.label}>
            New Password
            <input
              type="password"
              className={css.input}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </label>

          <label className={css.label}>
            Confirm New Password
            <input
              type="password"
              className={css.input}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              Password changed successfully!
            </p>
          )}

          <button type="submit" className={css.btn} disabled={loading}>
            {loading ? "Loading..." : "Change"}
          </button>
        </fieldset>
      </form>
    </div>
  );
}