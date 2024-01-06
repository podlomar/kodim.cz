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
  ],
};

const courses = await fetchCourses();

for (const course of courses) {
  const topic = rootSource.topics.find((topic) => topic.name === course.topic);
  if (topic === undefined) {
    throw new Error(`Topic ${course.topic} not found`);
  }

  topic.courses.push(course);
}

export const cms = await KodimCms.load(rootSource);

export const agnosticAgent = {
  name: 'Agnostic',
  getPermission: () => 'open',
};
