'use client'
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import css from './Portfolio.module.css';
import { getProjects } from '@/lib/api/api';
import { useAuthStore } from '@/lib/store/authStore';
import PortfolioPanel from '@/components/AdminPanels/PortfolioPanel/PortfolioPanel';

export default function Portfolio() {
    const fetchProjects = useQuery({
    queryKey: ['Projects'],
        queryFn: () => getProjects({ params: { page: 1, perPage: 6, sortOrder: "desc"} }),
    placeholderData: keepPreviousData,
    refetchOnMount: true,
    });
const result = fetchProjects.data?.data.data
 console.log(result);
 

    return (<section className={css.portfolio}>
        {useAuthStore.getState().isAuthenticated && <PortfolioPanel/>}
        Portfolio</section>)
}