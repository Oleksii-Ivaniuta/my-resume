"use client";
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikHelpers,
  useFormikContext,
} from "formik";
import css from "./ContactForm.module.css";
import { useEffect, useId } from "react";
import * as Yup from "yup";
import { Dictionary } from "@/types/dictionary";
import toast, { Toaster } from "react-hot-toast";
import { sendMessage } from "@/lib/api/api";

type ContactFormValues = {
  name: string;
  email: string;
  message: string;
};

function getInitialValues(): ContactFormValues {
  if (typeof window === "undefined") return { name: "", email: "", message: "" };
  try {
    const saved = localStorage.getItem("contactForm");
    if (!saved) return { name: "", email: "", message: "" };
    const parsed = JSON.parse(saved);
    return {
      name: typeof parsed?.name === "string" ? parsed.name : "",
      email: typeof parsed?.email === "string" ? parsed.email : "",
      message: typeof parsed?.message === "string" ? parsed.message : "",
    };
  } catch {
    return { name: "", email: "", message: "" };
  }
}

function AutoSave({ storageKey }: { storageKey: string }) {
  const { values } = useFormikContext<ContactFormValues>();
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(values));
    } catch {}
  }, [values, storageKey]);
  return null;
}

export default function ContactForm({ dict }: { dict: Dictionary }) {
  const t = dict.contact.form;
  const NAME_MIN = 2;
  const NAME_MAX = 30;
  const MSG_MIN = 5;
  const MSG_MAX = 300;

  const ContactFormSchema = Yup.object({
    name: Yup.string()
      .min(NAME_MIN, t.validation.name.min.replace("{min}", String(NAME_MIN)))
      .max(NAME_MAX, t.validation.name.max)
      .required(t.validation.name.required),
    email: Yup.string()
      .email(t.validation.email.invalid)
      .required(t.validation.email.required),
    message: Yup.string()
      .min(MSG_MIN, t.validation.message.min.replace("{min}", String(MSG_MIN)))
      .max(MSG_MAX, t.validation.message.max.replace("{max}", String(MSG_MAX)))
      .required(t.validation.message.required),
  });

  const fieldId = useId();
  const initialValues = getInitialValues();

  const handleSubmit = async (
    values: ContactFormValues,
    actions: FormikHelpers<ContactFormValues>
  ) => {
    console.log("Submit:", values);
    try {
      const res = await sendMessage(values);
      localStorage.removeItem("contactForm");
      if (res.status === 200) {
        toast.success(dict.contact.form.feedback.success);
        actions.resetForm({ values: { name: "", email: "", message: "" } });
      }
      else {
   toast.error(dict.contact.form.feedback.error);
      }
    } catch {
      toast.error(dict.contact.form.feedback.error);
    }
  };

  return (
      <div className={css.form_wrapper}>
          <Toaster
  position="top-center"
  reverseOrder={false}
  gutter={8}
  containerClassName=""
  containerStyle={{}}
  toasterId="default"
  toastOptions={{

    className: "toast",
    duration: 5000,
    removeDelay: 1000,


    success: {
      duration: 3000,
      iconTheme: {
        primary: 'green',
        secondary: 'black',
      },
    },
  }}
/>
      <Formik
        initialValues={initialValues}
        validationSchema={ContactFormSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <AutoSave storageKey="contactForm" />

          <fieldset className={css.fieldset}>
            <legend className={css.legend}>{t.legend}</legend>

            <label className={css.label} htmlFor={`${fieldId}-name`}>
              {t.nameLabel}
              <Field
                className={css.input}
                type="text"
                id={`${fieldId}-name`}
                name="name"
                autoComplete="name"
              />
              <ErrorMessage name="name" component="span" className={css.error} />
            </label>

            <label className={css.label} htmlFor={`${fieldId}-email`}>
              {t.emailLabel}
              <Field
                className={css.input}
                type="email"
                id={`${fieldId}-email`}
                name="email"
                autoComplete="email"
              />
              <ErrorMessage name="email" component="span" className={css.error} />
            </label>

            <label className={css.label} htmlFor={`${fieldId}-message`}>
              {t.messageLabel}
              <Field
                className={`${css.input} ${css.textarea}`}
                as="textarea"
                rows={6}
                id={`${fieldId}-message`}
                name="message"
              />
              <ErrorMessage name="message" component="span" className={css.error} />
            </label>

            <button type="submit" className={css.btn}>
              {t.submit}
            </button>
          </fieldset>
        </Form>
      </Formik>
    </div>
  );
}