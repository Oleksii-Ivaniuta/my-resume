"use client";

import Link from "next/link";
import css from "./MobileMenu.module.css";
import { SocialMedia } from "../SocialMedia/SocialMedia";
import LanguageSelect from "../LanguageSelect/LanguageSelect";
import { useState } from "react";

export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const openMenu = () => { setIsOpen(true) };
    const closeMenu = () => { setIsOpen(false) };

  return (
    <div className={css.container}>
      <div className={css.container}>
        <button className={css.mobile_menu_btn} onClick={openMenu}>
          <svg width="32" height="32" className={css.burger}>
            <use href="/icons.svg#burger-btn" />
          </svg>
        </button>
      </div>
          <div className={`${css.overlay} ${isOpen && css.active}`}>
        <div className={css.content}>
                  <button className={css.close_btn}
                  onClick={closeMenu}>
            <svg width="32" height="32" className={css.cross}>
              <use href="/icons.svg#cross" />
            </svg>
          </button>
          <ul className={css.nav_list}>
            <li className={css.nav_item}>
              <Link href="/" className={css.nav_link}>
                Home
              </Link>
            </li>
            <li className={css.nav_item}>
              <Link href="/about-me" className={css.nav_link}>
                About me
              </Link>
            </li>
            <li className={css.nav_item}>
              <Link href="/portfolio" className={css.nav_link}>
                Portfolio
              </Link>
            </li>
            <li className={css.nav_item}>
              <Link href="/contacts" className={css.nav_link}>
                Contacts
              </Link>
            </li>
            <li className={css.lang}>
              <LanguageSelect />
            </li>
          </ul>
          <SocialMedia />
        </div>
      </div>
    </div>
  );
}
