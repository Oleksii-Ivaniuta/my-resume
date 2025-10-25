"use client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import css from "./Portfolio.module.css";
import { getProjects } from "@/lib/api/api";
import { useAuthStore } from "@/lib/store/authStore";
import PortfolioPanel from "@/components/AdminPanels/PortfolioPanel/PortfolioPanel";
import ProjectBox from "@/components/ProjectBox/ProjectBox";

export default function Portfolio() {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["Projects"],
    queryFn: () =>
      getProjects({ params: { page: 1, perPage: 6, sortOrder: "desc" } }),
    placeholderData: keepPreviousData,
    refetchOnMount: true,
  });

  return (
    <section className={css.portfolio}>
      {useAuthStore.getState().isAuthenticated && <PortfolioPanel />}
      <h2 className={css.sect_header}>
        My <span>projects</span>
      </h2>
      <ul className={css.list}>
        {isSuccess &&
          data.data.map((proj) => {
            return (
              <li className={css.item} key={proj._id}>
                <ProjectBox
                  projectId={proj._id}
                  projectDecription={proj.descriptionEn}
                  projectName={proj.name}
                  projectPhotoUrl={proj.photoUrl}
                  projectOrder={proj.order}
                  isAuth={useAuthStore.getState().isAuthenticated}
                />
              </li>
            );
          })}
      </ul>
    </section>
  );
}
