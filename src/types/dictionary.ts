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
  footer: {
    copyright: string;
  };
  common: {
    getResume: string;
  };
}
