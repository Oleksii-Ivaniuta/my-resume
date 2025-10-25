import { getProjectById } from "@/lib/api/api";
import {
    QueryClient,
    HydrationBoundary,
    dehydrate,
  } from "@tanstack/react-query";
import ProjectClient from "./Project.Client";

  
  interface  ProjectProps {
    params: Promise<{ projectId: string }>;
};
  

  export default async function Project({params} : ProjectProps) {
    const { projectId } = await params;
    const queryClient = new QueryClient();
  
    await queryClient.prefetchQuery({
      queryKey: ["Project", projectId],
      queryFn: () => getProjectById(projectId),
    });
        
  
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProjectClient />
      </HydrationBoundary>
    );
  };
  