import { RootSource } from 'kodim-cms/esm/content/root';
import { KodimCms } from 'kodim-cms/esm/index.js';
import { fetchCourses } from './directus';

const rootSource: RootSource = {
  topics: [
    {
      name: 'vyvoj-webu',
      title: 'Webové aplikace',
      heading: 'Kurzy vývoje webových aplikací',
      lead: 'Získáte důkladné porozumění moderním programovacím jazykům jako HTML, CSS a JavaScript nebo React a naučíte se vytvářet interaktivní a uživatelsky přívětivé webové stránky. Naučíme vás úplné základy i pokročilejší techniky a provedeme vás aktuálními trendy v oboru.',
      courses: [],
    },
    {
      name: 'programovani',
      title: 'Programování',
      heading: 'Kurzy programování',
      lead: 'Principy programování od základních konceptů a algoritmů až po pokročilé programovací jazyky a frameworky. Rozvinete vaše dovednosti a stanete se sebejistými programátory.',
      courses: [],
    },
    {
      name: 'analyza-dat',
      title: 'Datová analýza',
      heading: 'Kurzy pro analýzu dat',
      lead: 'Otevřeme dveře do světa datové analýzy a vědeckého zkoumání informací. Naše kurzy vás provedou klíčovými metodami a nástroji pro sběr, vyhodnocení a interpretaci dat, což vám umožní odhalovat cenné poznatky a trendy.',
      courses: [],
    },
    {
      name: 'devops',
      title: 'DevOps',
      heading: 'Kurzy DevOps',
      lead: 'DevOps se stará o nasazení nových softwarových funkcí do provozu, monitorování jejich běhu, zabezpečení a správu infrastruktury a řešení problémů na produkčním prostředí.',
      courses: [],
    },
  ],
};

export const initiateCms = async () => {
  const courses = await fetchCourses();

  for (const course of courses) {
    const topic = rootSource.topics.find((topic) => topic.name === course.topic);
    if (topic !== undefined) {
      topic.courses.push(course);
    }
  }

  return KodimCms.load(rootSource);
}

export const cms = () => (global as any).cms as KodimCms;

export const agnosticAgent = {
  name: 'Agnostic',
  getPermission: () => 'open',
};
