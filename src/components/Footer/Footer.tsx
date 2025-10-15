import { Dictionary } from "@/types/dictionary";
import { SocialMedia } from "../SocialMedia/SocialMedia";
import css from "./Footer.module.css";

interface FooterProps {
  dict: Dictionary;
};

export default function Footer({dict}: FooterProps) {
  return (
    <footer className={css.footer_wraper}>
      <p className={css.copyright}>{dict.footer.copyright}</p>
      <div className={css.sm}>
      <SocialMedia/>
      </div>
    </footer>
  );
}
