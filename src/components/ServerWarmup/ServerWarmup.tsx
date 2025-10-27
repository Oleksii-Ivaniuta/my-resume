"use client";
import css from "./ServerWarmup.module.css";
import { getProjects } from "@/lib/api/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function ServerWarmup() {
  const warmupThis = useQuery({
    queryKey: ["Projects"],
    queryFn: () =>
      getProjects({
        page: 1,
        perPage: 6,
        sortOrder: "desc",
      }),
    refetchOnMount: true,
  });
 
  const warmupContacts = async () => {
   const res = await axios.get(
    "https://nodejs-hw-mongodb-voqb.onrender.com/api-docs"
   )
    return res.data;
  };

    const warmupLehleka = async () => {
   const res = await axios.get(
    "https://project-teamsurvivors.onrender.com/api/weeks/my-day-demo"
  )
      return res.data;
  };

  const warmupAll = async () => {
    await warmupLehleka();
    await warmupContacts();
  }

  warmupAll()
  
  return null;
}
