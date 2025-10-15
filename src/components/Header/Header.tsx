import Link from "next/link";
import css from "./Header.module.css";
import LanguageSelect from "../LanguageSelect/LanguageSelect";
import MobileMenu from "../MobileMenu/MobileMenu";
import { Dictionary } from "@/types/dictionary";

interface HeaderProps {
  dict: Dictionary;
};

export default function Header({dict}: HeaderProps) {
  return (
    <header className={css.header_wraper}>
      <Link href="/" className={css.logo}>
        Oleks<span className={css.logo_span}>11.Ivaniuta</span>
      </Link>
      <nav className={css.nav_container}>
        <ul className={css.nav_list}>
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
        <div className={css.mobile_menu}>
          <MobileMenu dict={dict}/>
        </div>
      </nav>
    </header>
  );
}
