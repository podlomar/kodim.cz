export interface Topic {
  name: string;
  title: string;
  heading: string;
  lead: string;
  image: string;
}

const topics: Topic[] = [
  {
    name: 'vyvoj-webu',
    title: 'Webové aplikace',
    heading: 'Kurzy vývoje webových aplikací',
    lead: 'Tvorba webových stránek a aplikací v moderních technologiích',
    image: '/img/vyvoj-webu.svg',
  },
  {
    name: 'programovani',
    title: 'Programování',
    heading: 'Kurzy programování',
    lead: 'Programátorské dovednosti důležité pro kariéru v IT',
    image: '/img/programovani.svg',
  },
  {
    name: 'analyza-dat',
    title: 'Datová analýza',
    heading: 'Kurzy pro analýzu dat',
    lead: 'Nástroje a jazyky pro profesionální datové analytiky',
    image: '/img/analyza-dat.svg',
  },
  {
    name: 'devops',
    title: 'DevOps',
    heading: 'Kurzy DevOps',
    lead: 'Automatizace procesů a postupů ve vývojových týmech',
    image: '/img/devops.png',
  },
];

export const getTopic = (
  name: string
): Topic | null => topics.find((topic) => topic.name === name) ?? null;
