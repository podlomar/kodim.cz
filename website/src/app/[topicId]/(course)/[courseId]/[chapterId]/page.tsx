import { cache } from 'react';
import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next'
import { openGraph } from 'app/open-graph';
import { cms } from 'lib/cms';
import Breadcrumbs from 'components/Breadcrumbs';
import ChapterOverview from 'components/ChapterOverview';
import Menu from 'components/Menu';
import { Course } from 'kodim-cms/esm/content/course';
import styles from './styles.module.scss';
import { session } from 'app/session';
import { CmsAgent } from 'kodim-cms/esm/access-control/claim-agent';

export const dynamic = 'force-dynamic';

interface Props {
  params: {
    topicId: string;
    courseId: string;
    chapterId: string;
  }
}

const getCourse = cache(
  async (agent: CmsAgent, topicId: string, courseId: string): Promise<Course | null> => (
    cms().loadCourse(agent, topicId, courseId)
  )
);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topicId, courseId } = params;
  const { cmsAgent } = await session();
  const course = await getCourse(cmsAgent, topicId, courseId);
 
  if (course === null) {
    notFound();
  }

  return {
    title: course.title,
    description: course.lead,
    openGraph: {
      ...openGraph,
      type: 'article',
      title: course.title,
      description: course.lead,
      url: course.path,
    },
  }
}

const ChapterPage = async ({ params }: Props): Promise<JSX.Element> => {
  const { topicId, courseId, chapterId } = params;
  const { cmsAgent } = await session();
  const course = await getCourse(cmsAgent, topicId, courseId);
  if (course === null) {
    notFound();
  }

  const chapter = await cms().loadChapter(cmsAgent, topicId, courseId, chapterId);
  if (chapter === null) {
    notFound();
  }

  return (
    <div className="container">
      <Breadcrumbs crumbs={course.crumbs} />
      <div 
        className={styles.courseBanner}
        style={{ backgroundImage: `url(/img/${course.topic}-mask.svg)` }}
      >
        <img
          className={styles.icon}
          src={course.image}
          alt="Course icon"
        />
        <div className={styles.intro}>
          <h1 className={styles.title}>{course.title}</h1>
          <p className={styles.lead}>{course.lead}</p>
        </div>
      </div>
      { course.name === 'zaklady-ts' && (
        <>
          <div className={styles.courseInfo}>
            <div>
              <h2>Obsah kurzu</h2>
              <p>Typescript je jeden z nejpoužívanějších jazyků pro vývoj webových aplikací jak na frontendu, tak na backendu. Jde o rozšíření jazyka JavaScript o možnost definovat a kontrolovat datové typy podobně jako v jazycích C# nebo Java.</p>

              <p>V kurzu se naučíte:</p>
              <ul>
                <li>základy jazyka Typescript a jeho typového systému,</li>
                <li>doporučené postupy pro vývoj webových aplikací v Typescriptu,</li>
                <li>základy parametrických typů (generik),</li>
                <li>nastavení Typescriptového projektu,</li>
                <li>jak použít Typescript v Reactu.</li>
              </ul>

              <h2>Průběh</h2>
              <p>Kurz probíhá <strong>on-line</strong>. Je rozdělen do 6 lekcí, každá lekce probíhá jednou týdně, vždy od 18:00 do 20:00. V průběhu každé lekce se budeme věnovat jak výkladu tak praktickým cvičením.</p>

              <p>Kapacita kurzu je 12 účastníků abychom i v on-line odkázali udržet příjemné prostředí.</p>
            </div>
            <div className={styles.courseRuns}>
              <h2>Cena: 3 000 kč</h2>
              
              <p>Cena zahrnuje:</p>
              <ul>
                <li>6 on-line lekcí po 2 hodinách,</li>
                <li>přístup k podrobným materiálům na webu,</li>
                <li>přístup na společný Slack s možností klást dotazy.</li>
              </ul>

              <h2>Přihlášky</h2>
              <p>Aktuální termíny kurzu:</p>
              <ul>
                <li><strong>vyprodáno</strong>: čtvrtky od 15. února 2024, lektoruje Martin Podloucký</li>
                <li>úterky od 20. února, lektoruje Eva Machová</li>
              </ul>

              <p>
                <a href="https://forms.gle/2vDy6sYrrhTioEP89" className={styles.register}>Přihlásit se na kurz</a>
              </p>
            </div>
          </div>
          <div className={styles.lessonsHeading}>
            <h2>Lekce</h2>
          </div>
        </>
      )}
      {
        chapter.name === 'lekce'
          ? (
            <ChapterOverview lessons={chapter.lessons} />
          ) : (
            <>
              <Menu
                items={course.chapters.map((chapter) => ({
                  label: chapter.title,
                  href: chapter.path,
                  key: chapter.name,
                }))}
                activeKey={chapter.name}
              />
              <ChapterOverview
                key={chapter.name}
                title={chapter.title}
                lead={chapter.lead}
                lessons={chapter.lessons}
              />
            </>
          )
      }
    </div>      
  );
};

export default ChapterPage
