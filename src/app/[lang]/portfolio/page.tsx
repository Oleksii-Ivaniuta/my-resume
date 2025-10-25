"use client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import css from "./Portfolio.module.css";
import { getProjects } from "@/lib/api/api";
import { useAuthStore } from "@/lib/store/authStore";
import PortfolioPanel from "@/components/AdminPanels/PortfolioPanel/PortfolioPanel";
import ProjectBox from "@/components/ProjectBox/ProjectBox";
import Pagination from "@/components/Pagination/Pagination";
import { useEffect, useState } from "react";

export default function Portfolio() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(6);
  
  useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setPerPage(6);
    } else {
      setPerPage(4);
    }
  };

  handleResize();
  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
  }, []);
  
    const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["projects", currentPage, perPage, "desc"],
    queryFn: () =>
      getProjects({ params: { page: currentPage, perPage: perPage, sortOrder: "desc" } }),
    placeholderData: keepPreviousData,
    refetchOnMount: true,
  });



  return (
    <section className={css.portfolio}>
      {useAuthStore.getState().isAuthenticated && <PortfolioPanel />}
      <h2 className={css.sect_header}>
        My <span>projects</span>
      </h2>
      {isLoading ? <div className={css.loader}></div> : <div>
        {isSuccess && data.totalPages > 1 && <Pagination currentPage={currentPage} onPageChange={handlePageChange} pageCount={data.totalPages}/>}
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
         {isSuccess && data.totalPages > 1 && <Pagination currentPage={currentPage} onPageChange={handlePageChange} pageCount={data.totalPages}/>}
      </div>
      }
     
    </section>
  );
}
