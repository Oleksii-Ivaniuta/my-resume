"use client";
import css from "./ServerWarmup.module.css";
import { getProjects } from "@/lib/api/api";
import { useQuery } from "@tanstack/react-query";

export default function ServerWarmup() {
  const warmup = useQuery({
    queryKey: ["Projects"],
    queryFn: () =>
      getProjects({
        page: 1,
        perPage: 6,
        sortOrder: "desc",
      }),
    refetchOnMount: true,
  });
  return <div className={css.warmup}>{JSON.stringify(warmup.data)}</div>;
}
