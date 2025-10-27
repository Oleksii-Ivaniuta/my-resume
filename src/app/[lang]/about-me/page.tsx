import Link from "next/link";
import css from "./AboutMe.module.css";
import Image from "next/image";
import { Locale, i18n } from "@/lib/i18n/i18n-config";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export default async function AboutMe(props: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await props.params;
  const safeLang = (i18n.locales as readonly string[]).includes(lang) ? lang : i18n.defaultLocale;
  const dict = await getDictionary(safeLang as Locale);

  return (
    <section className={css.about_me}>
      <h2 className={css.sect_header}>
        {dict.about.heading.a} <span>{dict.about.heading.b}</span>
      </h2>

      {/* Intro / Motivation */}
      <p className={css.intro}>{dict.about.intro}</p>

      {/* Education */}
      <article className={css.article}>
        <h3 className={css.article_header}>{dict.about.education.title}</h3>
        <div className={css.edu_wrapper}>
          <div className={css.edu_pict_thumb}>
            <Image
              loading="lazy"
              alt="education image"
              width={1024}
              height={1024}
              src="/education.jpg"
              className={css.edu_pict}
            />
          </div>
          <div className={css.text_wrapper}>
            <ul className={css.list}>
              {dict.about.education.items.map((it) => (
                <li key={it.name + it.years}>
                  <Link href={it.url} target="_blank">{it.name}</Link> — <span>{it.degree}</span>
                  <br />
                  <span>{it.years}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>

      {/* Experience */}
      <article className={css.article}>
        <h3 className={css.article_header}>{dict.about.experience.title}</h3>

        <div className={css.work_wrapper}>
          <div className={css.work_pict_thumb}>
            <Image
              loading="lazy"
              alt="work image"
              width={1536}
              height={1024}
              src="/work.jpg"
              className={css.work_pict}
            />
          </div>

          <ul className={css.list}>
            {dict.about.experience.summary.map((s) => (
              <li key={s.role + s.years}>
                <strong>{s.role}</strong> — <span>{s.org}</span>
                <br />
                <span>{s.years}</span>
              </li>
            ))}
          </ul>

          <div className={css.work_articles_wrapper}>
            {dict.about.experience.details.map((art) => (
              <article className={css.work_article} key={art.title}>
                <h4>{art.title}</h4>
                {art.paragraphs.map((p, i) => (
                  <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
                ))}
              </article>
            ))}
          </div>
        </div>
      </article>
    </section>
  );
}