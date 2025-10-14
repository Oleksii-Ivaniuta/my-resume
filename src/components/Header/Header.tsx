import Link from "next/link";
import css from "./Header.module.css";

export default function Header() {
    return (<header className={css.header_wraper}>
        <Link href='/' className={css.logo}>Oleks<span className={css.logo_span}>11.Ivaniuta</span></Link>
        <nav className={css.nav_container}>
            <ul className={css.nav_list}>
                <li className={css.nav_item}>
                    <Link href='/bio' className={css.nav_link}>bio</Link>
                </li>
                <li className={css.nav_item}>
                    <Link href='/portfolio' className={css.nav_link}>portfolio</Link>
                </li>
                <li className={css.nav_item}>
                    <Link href='/contacts' className={css.nav_link}>contacts</Link>
                </li>
            </ul>
            <button className={css.mobile_menu_btn}>btn</button>
        </nav>
        
    </header>)
}