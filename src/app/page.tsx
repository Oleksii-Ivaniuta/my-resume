import css from "./Main.module.css";
import Image from "next/image";
import ButtonContactMe from "../components/ButtonContactMe/ButtonContactMe";

export default function Home() {
  return (
    <section className="container">
      <div className={css.main}>
  <h1 className={css.hero_header}>
        HELLO,<br className={css.br}></br> I AM <br />
        <span>FULLSTACK DEVELOPER</span>
      </h1>
      <div className={css.thumb}>
        <Image
          className={css.photo}
          src="/oleksii-photo.webp"
          width="1800"
          height="1200"
          alt="oleksii-photo"
        />
      </div>

        <div className={css.btn}>
  <ButtonContactMe/>
        </div>
      <p className={css.hero_text}>
        I create <span>modern</span> and <span>responsive</span> web
        applications that combine <span>functionality</span> with{" "}
        <span>clean design</span>.
      </p>
      </div>
    


    </section>
  );
}
