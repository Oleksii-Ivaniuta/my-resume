"use client";

import { useEffect, useMemo, useState, FormEvent, ChangeEvent } from "react";
import css from "./EditProjectForm.module.css";
import Image from "next/image";

type InitialProject = {
  name: string;
  order: number;
  descriptionEn: string;
  descriptionUk: string;
  descriptionPt: string;
  photoUrl?: string;
  liveUrl: string;
  frontCodeUrl?: string;
  backCodeUrl?: string;
  techStack: string;
  typeEn: string;
  typeUk: string;
  typePt: string;
  roleEn: string;
  roleUk: string;
  rolePt: string;
};

interface UpdateProjectFormProps {
  initial: InitialProject;
  onSubmit: (data: FormData) => Promise<void> | void;
}

export default function UpdateProjectForm({
  initial,
  onSubmit,
}: UpdateProjectFormProps) {
  const [formData, setFormData] = useState(() => ({
    name: initial.name ?? "",
    order: String(initial.order ?? ""),
    descriptionEn: initial.descriptionEn ?? "",
    descriptionUk: initial.descriptionUk ?? "",
    descriptionPt: initial.descriptionPt ?? "",
    liveUrl: initial.liveUrl ?? "",
    frontCodeUrl: initial.frontCodeUrl ?? "",
    backCodeUrl: initial.backCodeUrl ?? "",
    techStack: initial.techStack ?? "",
    typeEn: initial.typeEn ?? "",
    typeUk: initial.typeUk ?? "",
    typePt: initial.typePt ?? "",
    roleEn: initial.roleEn ?? "",
    roleUk: initial.roleUk ?? "",
    rolePt: initial.rolePt ?? "",
  }));

   useEffect(() => {
    setFormData({
      name: initial.name ?? "",
      order: String(initial.order ?? ""),
      descriptionEn: initial.descriptionEn ?? "",
      descriptionUk: initial.descriptionUk ?? "",
      descriptionPt: initial.descriptionPt ?? "",
      liveUrl: initial.liveUrl ?? "",
      frontCodeUrl: initial.frontCodeUrl ?? "",
      backCodeUrl: initial.backCodeUrl ?? "",
      techStack: initial.techStack ?? "",
      typeEn: initial.typeEn ?? "",
      typeUk: initial.typeUk ?? "",
      typePt: initial.typePt ?? "",
      roleEn: initial.roleEn ?? "",
      roleUk: initial.roleUk ?? "",
      rolePt: initial.rolePt ?? "",
    });
  }, [initial]);

  const [photo, setPhoto] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

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

  const labelMap = useMemo<Record<string, string>>(
    () => ({
      name: "Name",
      order: "Order",
      descriptionEn: "Description (EN)",
      descriptionUk: "Description (UK)",
      descriptionPt: "Description (PT)",
      liveUrl: "Live URL",
      frontCodeUrl: "Frontend Code URL",
      backCodeUrl: "Backend Code URL",
      techStack: "Tech Stack",
      typeEn: "Type (EN)",
      typeUk: "Type (UK)",
      typePt: "Type (PT)",
      roleEn: "Role (EN)",
      roleUk: "Role (UK)",
      rolePt: "Role (PT)",
    }),
    []
  );


  function buildPatchFormData(): FormData {
    const fd = new FormData();


    const entries = Object.entries(formData) as Array<
      [keyof typeof formData, string]
    >;

    for (const [key, value] of entries) {
      const normalized = key === "order" ? String(Number(value || 0)) : value;
      const prevValue =
        key === "order"
          ? String(initial.order ?? "")
          : String((initial)[key] ?? "");

      if (normalized !== prevValue) {
        fd.append(key, normalized);
      }
    }

    if (photo) {
      fd.append("photo", photo);
    }

    return fd;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = buildPatchFormData();
      if ([...data.keys()].length === 0) {
        setLoading(false);
        return;
      }

      await onSubmit(data);
    } catch (err) {
      console.error(err);
      setError("Failed to update project");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={css.form_wrapper}>
      <form onSubmit={handleSubmit}>
        <fieldset className={css.fieldset}>
          <legend className={css.legend}>Update Project</legend>

          {initial.photoUrl && (
            <div style={{ marginBottom: 8 }}>
              <Image
                src={initial.photoUrl}
                alt="Current project image"
                width={320}
                height={240}
              />
            </div>
          )}

          {Object.entries(formData).map(([key, value]) => {
            const isDescription = key.startsWith("description");
            const isOrder = key === "order";
            const isOptionalUrl = key.includes("CodeUrl");

            return (
              <label key={key} className={css.label}>
                {labelMap[key] ?? key}
                {isDescription ? (
                  <textarea
                    name={key}
                    className={`${css.input} ${css.textarea}`}
                    rows={3}
                    value={value}
                    onChange={handleChange}
                    required={!isOptionalUrl}
                  />
                ) : (
                  <input
                    type={isOrder ? "number" : "text"}
                    name={key}
                    className={css.input}
                    value={value}
                    onChange={handleChange}
                    required={!isOptionalUrl}
                  />
                )}
              </label>
            );
          })}

          <label className={css.label}>
            Replace Image (optional)
            <input
              type="file"
              className={css.input}
              onChange={handleFileChange}
              accept="image/*"
            />
          </label>

          {error && (
            <p
              className={`${css.message_warning} ${css.message_warning_error}`}
            >
              {error}
            </p>
          )}

          <button type="submit" className={css.btn} disabled={loading}>
            {loading ? "Loading..." : "Update"}
          </button>
        </fieldset>
      </form>
    </div>
  );
}
