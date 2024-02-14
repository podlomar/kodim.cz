import { KodimCms } from 'kodim-cms/esm/index.js';
import { fetchTopics } from './directus';
import { CoursesDivision, CoursesDivisionSource } from 'kodim-cms/esm/content/division';

// const rootSource: RootSource = {
//   topics: [
//     {
//       name: 'vyvoj-webu',
//       title: 'Webové aplikace',
//       heading: 'Kurzy vývoje webových aplikací',
//       lead: 'Získáte důkladné porozumění moderním programovacím jazykům jako HTML, CSS a JavaScript nebo React a naučíte se vytvářet interaktivní a uživatelsky přívětivé webové stránky. Naučíme vás úplné základy i pokročilejší techniky a provedeme vás aktuálními trendy v oboru.',
//       courses: [],
//     },
//     {
//       name: 'programovani',
//       title: 'Programování',
//       heading: 'Kurzy programování',
//       lead: 'Principy programování od základních konceptů a algoritmů až po pokročilé programovací jazyky a frameworky. Rozvinete vaše dovednosti a stanete se sebejistými programátory.',
//       courses: [],
//     },
//     {
//       name: 'analyza-dat',
//       title: 'Datová analýza',
//       heading: 'Kurzy pro analýzu dat',
//       lead: 'Otevřeme dveře do světa datové analýzy a vědeckého zkoumání informací. Naše kurzy vás provedou klíčovými metodami a nástroji pro sběr, vyhodnocení a interpretaci dat, což vám umožní odhalovat cenné poznatky a trendy.',
//       courses: [],
//     },
//     {
//       name: 'devops',
//       title: 'DevOps',
//       heading: 'Kurzy DevOps',
//       lead: 'DevOps se stará o nasazení nových softwarových funkcí do provozu, monitorování jejich běhu, zabezpečení a správu infrastruktury a řešení problémů na produkčním prostředí.',
//       courses: [],
//     },
//   ],
// };

export const initiateCms = async () => {
  const topics = await fetchTopics();
  const kodimDivision: CoursesDivisionSource = {
    type: 'courses',
    name: 'kurzy',
    title: 'Kurzy',
    topics: [],
  };
  const czechitasDivision: CoursesDivisionSource = {
    type: 'courses',
    name: 'czechitas',
    title: 'Czechitas',
    topics: [],
  };

  for (const topic of topics) {
    const kodimTopic = {
      ...topic,
      courses: topic.courses.filter(course => course.organization === 'kodim'),
    };
    
    const czechitasTopic = {
      ...topic,
      courses: topic.courses.filter(course => course.organization === 'czechitas'),
    };

    if (kodimTopic.courses.length > 0) {
      kodimDivision.topics.push(kodimTopic);
    }

    if (czechitasTopic.courses.length > 0) {
      czechitasDivision.topics.push(czechitasTopic);
    }
  }
  
  return KodimCms.load({ 
    divisions: [kodimDivision, czechitasDivision],
  });
}

export const cms = () => (global as any).cms as KodimCms;

export const agnosticAgent = {
  name: 'Agnostic',
  getPermission: () => 'open',
};
