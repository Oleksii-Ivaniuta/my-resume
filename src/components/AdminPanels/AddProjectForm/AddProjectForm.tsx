"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import css from "./AddProjectForm.module.css";

interface AddProjectFormProps {
  onSubmit: (data: FormData) => void;
}

export default function AddProjectForm({onSubmit} : AddProjectFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    order: "",
    descriptionEn: "",
    descriptionUk: "",
    descriptionPt: "",
    liveUrl: "",
    frontCodeUrl: "",
    backCodeUrl: "",
    techStack: "",
    typeEn: "",
    typeUk: "",
    typePt: "",
    roleEn: "",
    roleUk: "",
    rolePt: "",
  });

  const [photo, setPhoto] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setPhoto(e.target.files[0]);
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const {
      name,
      order,
      descriptionEn,
      descriptionUk,
      descriptionPt,
      liveUrl,
      techStack,
      typeEn,
      typeUk,
      typePt,
      roleEn,
      roleUk,
      rolePt,
    } = formData;

    if (
      !name ||
      !order ||
      !descriptionEn ||
      !descriptionUk ||
      !descriptionPt ||
      !liveUrl ||
      !techStack ||
      !typeEn ||
      !typeUk ||
      !typePt ||
      !roleEn ||
      !roleUk ||
      !rolePt
    ) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        data.append(key, value)
      );
      if (photo) data.append("photo", photo);

      await onSubmit(data);
      setSuccess(true);
      setFormData({
        name: "",
        order: "",
        descriptionEn: "",
        descriptionUk: "",
        descriptionPt: "",
        liveUrl: "",
        frontCodeUrl: "",
        backCodeUrl: "",
        techStack: "",
        typeEn: "",
        typeUk: "",
        typePt: "",
        roleEn: "",
        roleUk: "",
        rolePt: "",
      });
      setPhoto(null);
    } catch (err) {
      console.error(err);
      setError("Failed to create project. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={css.form_wrapper}>
      <form onSubmit={handleSubmit}>
        <fieldset className={css.fieldset}>
          <legend className={css.legend}>Add New Project</legend>

          {/* --- Text fields --- */}
          {Object.entries(formData).map(([key, value]) => (
            <label key={key} className={css.label}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
              {key.startsWith("description") ? (
                <textarea
                  name={key}
                  className={`${css.input} ${css.textarea}`}
                  rows={3}
                  value={value}
                  onChange={handleChange}
                  required={!key.includes("CodeUrl")}
                />
              ) : (
                <input
                  type={key === "order" ? "number" : "text"}
                  name={key}
                  className={css.input}
                  value={value}
                  onChange={handleChange}
                  required={!key.includes("CodeUrl")}
                />
              )}
            </label>
          ))}

          {/* --- Photo upload --- */}
          <label className={css.label}>
            Project Image
            <input
              type="file"
              className={css.input}
              onChange={handleFileChange}
              accept="image/*"
            />
          </label>

          {/* --- Messages --- */}
          {error && (
            <p className={`${css.message_warning} ${css.message_warning_error}`}>
              {error}
            </p>
          )}
          {success && (
            <p className={`${css.message_warning} ${css.message_warning_ok}`}>
              Project created successfully!
            </p>
          )}

          {/* --- Button --- */}
          <button type="submit" className={css.btn} disabled={loading}>
            {loading ? "Loading..." : "Create"}
          </button>
        </fieldset>
      </form>
    </div>
  );
}