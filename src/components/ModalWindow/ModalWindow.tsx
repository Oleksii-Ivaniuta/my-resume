"use client";
import { ReactNode, useEffect, useState } from "react";
import css from "./ModalWindow.module.css";

interface ModalWindowProps {
  children: ReactNode;
  onClose: () => void;
  isOpen: boolean;
}

export default function ModalWindow({ children, onClose, isOpen }: ModalWindowProps) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setIsModalOpen(true);

      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", onKey);
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        window.removeEventListener("keydown", onKey);
        document.body.style.overflow = prevOverflow;
      };
    } else {
      const timer = setTimeout(() => setIsModalOpen(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className={`${css.overlay} ${isModalOpen ? css.active : ""}`}
      onClick={handleBackdropClick}
      aria-hidden={!isOpen}
    >
      <div className={css.window} role="dialog" aria-modal="true">
        <button className={css.btn_close} onClick={onClose} aria-label="Close dialog">
          <svg width="32" height="32" className={css.cross}>
            <use href="/icons.svg#cross" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}