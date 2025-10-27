'use client';

import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { getProjectById } from '@/lib/api/api';
import css from './Project.module.css';
import { Dictionary } from '@/types/dictionary';
import { Locale } from '@/lib/i18n/i18n-config';
import { pickDescription, pickRole, pickType } from '@/lib/i18n/pick';

interface ProjectClientProps {
  dict: Dictionary;
  lang: Locale;
}

export default function ProjectClient({ dict, lang }: ProjectClientProps) {
  const { projectId } = useParams<{ projectId: string }>();
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProjectById(projectId),
    refetchOnMount: false,
  });

  if (isLoading) {
    return (
      <section className={css.project}>
        <div className={css.loader} />
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className={css.project}>
        <div className={css.error}>Failed to load project.</div>
      </section>
    );
  }

  const p = data.data;
  const t = dict.project;

  const type = pickType(p, lang);
  const role = pickRole(p, lang);
  const description = pickDescription(p, lang);

  return (
    <section className={css.project}>
      <h2 className={css.sect_header}>
        {t.heading.a} <span>{t.heading.b}</span>
      </h2>

      <div className={css.content}>
        <div className={css.media}>
          {p.photoUrl ? (
            <Image
              src={p.photoUrl}
              alt={p.name}
              width={1200}
              height={800}
              className={css.image}
            />
          ) : (
            <div className={css.image_placeholder}>{t.placeholders.noPreview}</div>
          )}
        </div>

        <div className={css.info}>
          <h3 className={css.title}>{p.name}</h3>

          <ul className={css.meta}>
            <li>
              <span className={css.meta_name}>{t.labels.type}</span>{' '}
              <span className={css.meta_value}>{String(type)}</span>
            </li>
            <li>
              <span className={css.meta_name}>{t.labels.role}</span>{' '}
              <span className={css.meta_value}>{String(role)}</span>
            </li>
            <li>
              <span className={css.meta_name}>{t.labels.tech}</span>{' '}
              <span className={css.meta_value}>{p.techStack}</span>
            </li>
          </ul>

          <p className={css.description}>{String(description)}</p>

          <div className={css.links}>
            {p.liveUrl && (
              <a className={css.link_btn} href={p.liveUrl} target="_blank" rel="noopener noreferrer">
                {t.links.live}
              </a>
            )}
            {p.frontCodeUrl && (
              <a className={css.link_btn} href={p.frontCodeUrl} target="_blank" rel="noopener noreferrer">
                {t.links.frontend}
              </a>
            )}
            {p.backCodeUrl && (
              <a className={css.link_btn} href={p.backCodeUrl} target="_blank" rel="noopener noreferrer">
                {t.links.backend}
              </a>
            )}
          </div>

          <button type="button" className={css.back_btn} onClick={() => router.back()}>
            {t.links.back}
          </button>
        </div>
      </div>
    </section>
  );
}