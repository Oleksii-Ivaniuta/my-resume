import css from "./Main.module.css";
import Image from "next/image";
import ButtonContactMe from "../../components/ButtonGetResume/ButtonGetResume";
import { Locale } from "@/lib/i18n/i18n-config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import ServerWarmup from "@/components/ServerWarmup/ServerWarmup";

export default async function Home(props: {
  params: Promise<{ lang: Locale }>
}) {
    const params = await props.params;
    const dict = await getDictionary(params.lang);

  return (
    <section>
      <div className={css.main}>
        <h1 className={css.hero_header}>
          {dict.home.hero.hi}
          <br className={css.br} />
          {" "}
          {dict.home.hero.iAm}
          <br />
          <span>{dict.home.hero.role}</span>
        </h1>

        <div className={css.thumb}>
          <Image
            className={css.photo}
            src="/oleksii-photo.webp"
            width={1800}
            height={1200}
            alt="oleksii-photo"
            priority
          />
        </div>

        <div className={css.btn}>
  <ButtonContactMe dict={dict}/>
        </div>
      <p className={css.hero_text}>
          {dict.home.hero.text.prefix}{" "}
          <span>{dict.home.hero.text.modern}</span>{" "}
          {dict.home.hero.text.and}{" "}
          <span>{dict.home.hero.text.responsive}</span>{" "}
          {dict.home.hero.text.webApps}{" "}
          <span>{dict.home.hero.text.functionality}</span>{" "}
          {dict.home.hero.text.with}{" "}
          <span>{dict.home.hero.text.cleanDesign}</span>
          {dict.home.hero.text.period}
        </p>
      </div>
      <ServerWarmup/>
    </section>
  );
}