"use client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import css from "./Portfolio.module.css";
import { getProjects } from "@/lib/api/api";
import { useAuthStore } from "@/lib/store/authStore";
import PortfolioPanel from "@/components/AdminPanels/PortfolioPanel/PortfolioPanel";
import ProjectBox from "@/components/ProjectBox/ProjectBox";
import Pagination from "@/components/Pagination/Pagination";
import { useEffect, useState } from "react";
import { GetProjectsResponse } from "@/types/apiTypes";
import { Lang } from "@/types/types";
import { Dictionary } from "@/types/dictionary";

interface PortfolioClientProps {
  initialData: GetProjectsResponse;
  initialPage: number;
  initialPerPage: number;
  lang: Lang;
  dict: Dictionary;
}

export default function PortfolioClient({ initialData, initialPage, initialPerPage, lang, dict }: PortfolioClientProps) {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [perPage, setPerPage] = useState<number>(initialPerPage);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767.98px)");
    const apply = () => setPerPage(mq.matches ? 4 : 6);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["projects", currentPage, perPage, "desc"],
    queryFn: () =>
      getProjects({
        page: currentPage, perPage: perPage, sortOrder: "desc" ,
      }),
    initialData: initialData,
    placeholderData: keepPreviousData,
    refetchOnMount: true,
  });

  return (
    <section className={css.portfolio}>
      {useAuthStore.getState().isAuthenticated && <PortfolioPanel />}
      <h2 className={css.sect_header}>
        My <span>projects</span>
      </h2>
      {isLoading ? (
        <div className={css.loader}></div>
      ) : (
        <div>
          {isSuccess && data.data.totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              onPageChange={handlePageChange}
              pageCount={data.data.totalPages}
            />
          )}
          <ul className={css.list}>
            {isSuccess &&
              data.data.data.map((proj) => {
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
          {isSuccess && data.data.totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              onPageChange={handlePageChange}
              pageCount={data.data.totalPages}
            />
          )}
        </div>
      )}
    </section>
  );
}
