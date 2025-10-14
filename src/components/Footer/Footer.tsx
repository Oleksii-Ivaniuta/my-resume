import { SocialMedia } from "../SocialMedia/SocialMedia";
import css from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={css.footer_wraper}>
      <p className={css.copyright}>© 2025 Oleksii Ivaniuta. All rights reserved.</p>
      <div className={css.sm}>
      <SocialMedia/>
      </div>
    </footer>
  );
}
