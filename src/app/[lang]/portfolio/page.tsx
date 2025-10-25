import { getProjects } from "@/lib/api/api";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { i18n, Locale } from "@/lib/i18n/i18n-config";
import PortfolioClient from "./Portfolio.client";


export default async function Portfolio(props: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await props.params;
  const safeLang = (i18n.locales as readonly string[]).includes(lang) ? lang : i18n.defaultLocale;
  const dict = await getDictionary(safeLang as Locale);
  const initialPage = 1;
  const initialPerPage = 6;

  const data = await getProjects({
        page: initialPage, perPage: initialPerPage, sortOrder: "desc" },
      );

  return (
    <PortfolioClient
      initialData={data}
      initialPage={initialPage}
      initialPerPage={initialPerPage}
      lang={lang}
      dict={dict}
    />
  );
}