import css from "./Main.module.css";
import Image from "next/image";

export default function Home() {
  return (
    <section className={css.main}>
      <div className={css.herowraper}>
        <h1 className={css.heroheader}>HELLO, I AM <span className={css.fsspan}>FULLSTACK DEVELOPER</span></h1>
        <p>My name is Oleksii Ivaniuta</p>
      </div>
      <div className={css.thumb}>
        <Image
          className={css.photo}
          src="/photo-oleksii.jpg"
          width="1110"
          height="1400"
          alt="oleksii-photo"
        />
      </div>
    </section>
  );
}
