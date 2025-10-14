import Link from 'next/link';
import css from './SocialMedia.module.css';

export function SocialMedia() {
    return (<ul className={css.sm_list}>
        <li className={css.sm_item}>
            <Link href='https://google.com'>
                <svg width="24" height="24" className={css.sm_icon}>
                    <use href='/icons.svg#linkedin'/>
                </svg>
            </Link>
        </li>
        <li className={css.sm_item}>
            <Link href='https://google.com'>
                <svg width="24" height="24" className={css.sm_icon}>
                    <use href='/icons.svg#telegram'/>
                </svg>
            </Link>
        </li>
        <li className={css.sm_item}>
            <Link href='https://google.com'>
                <svg width="24" height="24" className={css.sm_icon}>
                    <use href='/icons.svg#facebook'/>
                </svg>
            </Link>
        </li>
    </ul>)
}