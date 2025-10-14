import Link from "next/link";
import css from "./Header.module.css";
import LanguageSelect from "../LanguageSelect/LanguageSelect";
import MobileMenu from "../MobileMenu/MobileMenu";

export default function Header() {
  return (
    <header className={css.header_wraper}>
      <Link href="/" className={css.logo}>
        Oleks<span className={css.logo_span}>11.Ivaniuta</span>
      </Link>
      <nav className={css.nav_container}>
        <ul className={css.nav_list}>
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
        <div className={css.mobile_menu}>
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}
