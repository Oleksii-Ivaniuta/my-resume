import Link from "next/link";
import css from "./Header.module.css";
import LanguageSelect from "../LanguageSelect/LanguageSelect";

export default function Header() {
  return (
    <header className={css.header_wraper}>
      <Link href="/" className={css.logo}>
        Oleks<span className={css.logo_span}>11.Ivaniuta</span>
      </Link>
      <nav className={css.nav_container}>
        <ul className={css.nav_list}>
          <li className={css.nav_item}>
            <Link href="/bio" className={css.nav_link}>
              Bio
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
        </ul>
        <div className={css.lang}>
          <LanguageSelect />
        </div>
              <button className={css.mobile_menu_btn}><svg width='32' height='32' className={css.burger}><use href="/icons.svg#burger-btn"/></svg></button>
      </nav>
    </header>
  );
}
