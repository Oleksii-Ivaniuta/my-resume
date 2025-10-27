'use client';

import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { getProjectById } from '@/lib/api/api';
import css from './Project.module.css';

export default function ProjectClient() {
  const { projectId } = useParams<{ projectId: string }>();
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProjectById(projectId),
    refetchOnMount: false,
  });

  if (isLoading) return (<section className={css.project}><div className={css.loader} /></section>);
  if (error || !data) return (<section className={css.project}><div className={css.error}>Failed to load project.</div></section>);

  return (
    <section className={css.project}>
      <h2 className={css.sect_header}>
        Project <span>details</span>
      </h2>

      <div className={css.content}>
        <div className={css.media}>
          {data.data.photoUrl ? (
            <Image
              src={data.data.photoUrl}
              alt={data.data.name}
              width={1200}
              height={800}
              className={css.image}
            />
          ) : (
            <div className={css.image_placeholder}>No preview</div>
          )}
        </div>

        <div className={css.info}>
          <h3 className={css.title}>{data.data.name}</h3>

          <ul className={css.meta}>
            <li>
              <span className={css.meta_name}>Type:</span>{' '}
              <span className={css.meta_value}>{data.data.typeEn}</span>
            </li>
            <li>
              <span className={css.meta_name}>Role:</span>{' '}
              <span className={css.meta_value}>{data.data.roleEn}</span>
            </li>
            <li>
              <span className={css.meta_name}>Tech stack:</span>{' '}
              <span className={css.meta_value}>{data.data.techStack}</span>
            </li>
          </ul>

          <p className={css.description}>{data.data.descriptionEn}</p>

          <div className={css.links}>
            {data.data.liveUrl && (
              <a className={css.link_btn} href={data.data.liveUrl} target="_blank" rel="noopener noreferrer">
                Live
              </a>
            )}
            {data.data.frontCodeUrl && (
              <a className={css.link_btn} href={data.data.frontCodeUrl} target="_blank" rel="noopener noreferrer">
                Frontend code
              </a>
            )}
            {data.data.backCodeUrl && (
              <a className={css.link_btn} href={data.data.backCodeUrl} target="_blank" rel="noopener noreferrer">
                Backend code
              </a>
            )}
          </div>
          <button type="button" className={css.back_btn} onClick={() => router.back()}>
            ← Back
          </button>
        </div>
      </div>
    </section>
  );
}