import Link from 'next/link';
import css from './SocialMedia.module.css';

export function SocialMedia() {
    return (<ul className={css.sm_list}>
        <li className={css.sm_item}>
            <Link href='https://www.linkedin.com/in/oleksii-ivaniuta/' target="_blank">
                <svg width="32" height="32" className={css.sm_icon}>
                    <use href='/icons.svg#linkedin'/>
                </svg>
            </Link>
        </li>
        <li className={css.sm_item}>
            <Link href="https://t.me/oivaniuta" target="_blank">
                <svg width="32" height="32" className={css.sm_icon}>
                    <use href='/icons.svg#telegram'/>
                </svg>
            </Link>
        </li>
        <li className={css.sm_item}>
            <Link href='https://www.facebook.com/oleksii.ivaniuta' target="_blank">
                <svg width="32" height="32" className={css.sm_icon}>
                    <use href='/icons.svg#facebook'/>
                </svg>
            </Link>
        </li>
    </ul>)
}