'use client'

import { useRouter } from "next/navigation"
import css from "./ButtonContactMe.module.css"

export default function ButtonContactMe() {
    const router = useRouter();

    const contactMe = async () => {
        const goToLink = () => router.push('/contacts');
        setTimeout(goToLink, 400);
    }

    return (      <div className={css.link_wraper}>
        <button onClick={contactMe} className={css.link}>
          <span className={css.link_span}>Contact me</span>
        </button>
      </div>)
}