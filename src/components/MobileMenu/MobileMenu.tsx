"use client";

import Link from "next/link";
import css from "./MobileMenu.module.css";
import { SocialMedia } from "../SocialMedia/SocialMedia";
import LanguageSelect from "../LanguageSelect/LanguageSelect";
import { useState } from "react";
import { Dictionary } from "@/types/dictionary";


interface MobileMenuProps {
  dict: Dictionary
}

export default function MobileMenu({dict}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const openMenu = () => {
    setIsOpen(true);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeMenu();
    }
  };

  return (
    <div className={css.container}>
      <div className={css.container}>
        <button className={css.mobile_menu_btn} onClick={openMenu}>
          <svg width="32" height="32" className={css.burger}>
            <use href="/icons.svg#burger-btn" />
          </svg>
        </button>
      </div>
      <div onClick={handleBackdropClick} className={`${css.overlay} ${isOpen && css.active}`}>
        <div className={css.content}>
          <button className={css.close_btn} onClick={closeMenu}>
            <svg width="32" height="32" className={css.cross}>
              <use href="/icons.svg#cross" />
            </svg>
          </button>
          <ul className={css.nav_list}>
            <li className={css.nav_item}>
              <Link href="/" className={css.nav_link}>
                {dict.nav.home}
              </Link>
            </li>
            <li className={css.nav_item}>
              <Link href="/about-me" className={css.nav_link}>
                {dict.nav.aboutMe}
              </Link>
            </li>
            <li className={css.nav_item}>
              <Link href="/portfolio" className={css.nav_link}>
                {dict.nav.portfolio}
              </Link>
            </li>
            <li className={css.nav_item}>
              <Link href="/contacts" className={css.nav_link}>
                {dict.nav.contacts}
              </Link>
            </li>
            <li className={css.lang}>
              <LanguageSelect />
            </li>
          </ul>
          <div className={css.sm}>
            <SocialMedia />
          </div>
        </div>
      </div>
    </div>
  );
}
