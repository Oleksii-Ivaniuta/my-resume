"use client";
import { useRouter } from "next/navigation";
import css from "./ButtonGetResume.module.css";

export default function ButtonContactMe() {
  const router = useRouter();
  const downloadResume = async () => {
    const getResume = () => {
      window.open("/Oleksii_Ivaniuta_Fullstack_Developer.pdf", "_blank");
      router.push('/');
    }
    setTimeout(getResume, 500);
  };

  return (
    <div className={css.link_wraper}>
      <button onClick={downloadResume} className={css.link}>
        <span className={css.link_span}>Get resume</span>
      </button>
    </div>
  );
}
