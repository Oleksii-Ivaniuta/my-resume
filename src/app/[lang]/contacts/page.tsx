import ContactForm from "@/components/ContactForm/ContactForm";
import css from "./Contacts.module.css";
import { i18n, Locale } from "@/lib/i18n/i18n-config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import Link from "next/link";

export default async function Contacts(props: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await props.params;
  const safeLang = (i18n.locales as readonly string[]).includes(lang)
    ? lang
    : i18n.defaultLocale;
  const dict = await getDictionary(safeLang as Locale);
  return (
    <section className={css.contacts}>
      <div className={css.form}>
        {" "}
        <ContactForm dict={dict} />{" "}
      </div>
      <address className={css.my_contacts}>
        <h2 className={css.header}>{dict.contact.info.title}</h2>
        <ul className={css.list}>
          <li className={css.item}>
            <span className={css.item_name}>{dict.contact.info.location}</span>{" "}
            <Link
              href="https://www.google.com/maps/place/%D0%9B%D1%96%D1%81%D0%B0%D0%B1%D0%BE%D0%BD/@38.7440795,-9.1597358,12z/data=!3m1!4b1!4m6!3m5!1s0xd19331a61e4f33b:0x400ebbde49036d0!8m2!3d38.7222524!4d-9.1393366!16zL20vMDRsbGI?entry=ttu&g_ep=EgoyMDI1MTAxNC4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
            >
              Lisbon, Portugal
            </Link>
          </li>
          <li className={css.item}>
            <span className={css.item_name}>{dict.contact.info.email}</span>{" "}
            <Link href="mailto:11.ivaniuta@gmail.com" target="_blank">
              11.ivaniuta@gmail.com
            </Link>
          </li>
          <li className={css.item}>
            <span className={css.item_name}>{dict.contact.info.phone}</span>{" "}
            <Link href="callto:+351960271199" target="_blank">
              +351 960 271 199
            </Link>
          </li>
          <li className={css.item}>
            <span className={css.item_name}>LinkedIn:</span>{" "}
            <Link
              target="_blank"
              href="https://www.linkedin.com/in/oleksii-ivaniuta/"
            >
              https://www.linkedin.com/in/oleksii-ivaniuta/
            </Link>
          </li>
          <li className={css.item}>
            <span className={css.item_name}>GitHub:</span>{" "}
            <Link href="https://github.com/Oleksii-Ivaniuta">
              https://github.com/Oleksii-Ivaniuta
            </Link>
          </li>
        </ul>
      </address>
    </section>
  );
}
