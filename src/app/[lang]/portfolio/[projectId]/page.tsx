import { getProjectById } from "@/lib/api/api";
import {
    QueryClient,
    HydrationBoundary,
    dehydrate,
  } from "@tanstack/react-query";
import ProjectClient from "./Project.Client";
import { i18n, Locale } from "@/lib/i18n/i18n-config";
import { getDictionary } from "@/lib/i18n/get-dictionary";

  
  interface  ProjectProps {
    params: Promise<{ projectId: string, lang: Locale }>;
};
  

  export default async function Project({params} : ProjectProps) {
    const { projectId, lang } = await params;
    const queryClient = new QueryClient();
    const safeLang = (i18n.locales as readonly string[]).includes(lang) ? lang : i18n.defaultLocale;
  const dict = await getDictionary(safeLang as Locale);
  
    await queryClient.prefetchQuery({
      queryKey: ["Project", projectId],
      queryFn: () => getProjectById(projectId),
    });
        
  
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProjectClient dict={dict} lang={lang} />
      </HydrationBoundary>
    );
  };
  