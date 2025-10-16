import Link from "next/link";
import css from "./AboutMe.module.css";
import Image from "next/image";
import { Locale } from "@/lib/i18n/i18n-config";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export default async function AboutMe(props: {
  params: Promise<{ lang: Locale }>
}) {
    const params = await props.params;
    const dict = await getDictionary(params.lang);

  return (
    <section className={css.about_me}>
      <h2 className={css.sect_header}>
        About <span>me</span>
      </h2>
      <article className={css.article}>
        <h3 className={css.article_header}>Education</h3>
        <div className={css.edu_wrapper}>
          {" "}
          <div className={css.edu_pict_thumb}>
            <Image
              loading="lazy"
              alt="education image"
              width="1024"
              height="1024"
              src="/education.jpg"
            />
          </div>
          <div className={css.text_wrapper}>
            <ul className={css.list}>
              <li>
                <Link href="https://goit.global" target="_blank">
                  IT School GoIT
                </Link>{" "}
                — <span>Fullstack Developer</span>
                <br />
                <span>2024 - 2025</span>
              </li>
              <li>
                <Link href="https://zu.edu.ua/en_index.html" target="_blank">
                  Ivan Franko Zhytomyr State University
                </Link>{" "}
                — <span>PhD in Theory and Methods of Vocational Training</span>
                <br />
                <span>2011 - 2018</span>
              </li>
              <li>
                <Link href="https://nubip.edu.ua" target="_blank">
                  National University of Life and Environmental Sciences of
                  Ukraine
                </Link>{" "}
                — <span>Master’s in Public Administration</span>
                <br />
                <span>2012 - 2014</span>
              </li>
              <li>
                <Link href="https://nubip.edu.ua" target="_blank">
                  National University of Life and Environmental Sciences of
                  Ukraine
                </Link>{" "}
                — <span>Master’s in Land Management</span>
                <br />
                <span>2004 - 2009</span>
              </li>
            </ul>
          </div>
        </div>
      </article>
      <article className={css.article}>
        <h3 className={css.article_header}>Professional Experience</h3>
        <div className={css.work_wrapper}>
          <div className={css.work_pict_thumb}>
            <Image
              loading="lazy"
              alt="education image"
              width="1536"
              height="1024"
              src="/work.jpg"
            />
          </div>

          <ul className={css.list}>
            <li>
              <strong>Assistant Professor</strong> —{" "}
              <span>
                National University of Life and Environmental Sciences of
                Ukraine
              </span>
              <br />
              <span>2010 - 2015</span>
            </li>
            <li>
              <strong>Entrepreneur / Business Owner</strong> —{" "}
              <span>Food and Craft Brewery Industry</span>
              <br />
              <span>2015 - 2025</span>
            </li>
          </ul>

          <div className={css.work_articles_wrapper}>
            <article className={css.work_article}>
              <h4>Assistant Professor</h4>
              <p>
                Conducted laboratory classes and practical training in{" "}
                <strong>Geographic Information Systems (GIS)</strong>,
                <strong> digital cartography</strong>, and{" "}
                <strong>Earth remote sensing</strong>. Guided students in
                mastering spatial data processing, geospatial analysis, and
                cartographic visualization using modern software tools.
              </p>
              <p>
                Actively participated in{" "}
                <strong>scientific research projects</strong> and contributed to
                academic publications. During this period, completed part-time
                PhD studies in pedagogy and developed my own
                <strong>
                  {" "}
                  research on the theory and methods of vocational training
                </strong>
                . In 2018, successfully defended my
                <strong> PhD dissertation in Pedagogical Sciences</strong>.
              </p>
            </article>

            <article className={css.work_article}>
              <h4>Entrepreneur / Business Owner</h4>
              <p>
                Founded and managed several ventures in the hospitality and
                craft beer industry, including{" "}
                <strong>three restaurant establishments</strong> and a{" "}
                <strong>private brewery</strong>. Oversaw all aspects of
                business development — from concept creation and interior design
                to supply chain organization and staff management.
              </p>
              <p>
                Implemented process optimization and introduced elements of
                automation in production and logistics. Combined creativity with
                a systematic approach, ensuring high-quality standards, customer
                satisfaction, and long-term business growth. This
                entrepreneurial path strengthened my leadership, organizational,
                and strategic decision-making skills.
              </p>
            </article>
          </div>
        </div>
      </article>
    </section>
  );
}
