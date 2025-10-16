// src/lib/i18n/types.ts
export interface Dictionary {
  metadata: {
    title: string;
    description: string;
  };
  nav: {
    home: string;
    aboutMe: string;
    portfolio: string;
    contacts: string;
  };
  home: {
    hero: {
      hi: string;
      iAm: string;
      role: string;
      text: {
        prefix: string;
        modern: string;
        and: string;
        responsive: string;
        webApps: string;
        functionality: string;
        with: string;
        cleanDesign: string;
        period: string;
      };
    };
  };
  about: {
    heading: { a: string; b: string };
    education: {
      title: string;
      items: Array<{
        name: string;
        url: string;
        degree: string;
        years: string;
      }>;
    };
    experience: {
      title: string;
      summary: Array<{
        role: string;
        org: string;
        years: string;
      }>;
      details: Array<{
        title: string;
        paragraphs: string[];
      }>;
    };
  };
  footer: {
    copyright: string;
  };
  common: {
    getResume: string;
  };
}