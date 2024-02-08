import { cms } from 'lib/cms';
import { notFound } from 'next/navigation';
import heroImg from './img/hero.svg';
import TopicView from 'app/components/TopicView';
import CourseCard from 'app/components/CourseCard';
import Brand from 'app/components/Brand';
import Menu from 'app/components/Menu';
import MainLayout from 'app/components/MainLayout';
import styles from './styles.module.scss';
import { session } from  'app/session';

export const dynamic = 'force-dynamic';

const HomePage = async (): Promise<JSX.Element> => {
  const { user, cmsAgent } = await session();
  const root = await cms().loadRoot(cmsAgent);
  if (root === null) {
    notFound();
  }

  return (
    <MainLayout showBrand={false}>
      <div className="container">
        <div className={styles.landingBanner}>
          <div className={styles.heroIntro}>
            <Brand size="large" />
            <p className={styles.heroLead}>
              Programování hravě i vážně pro nováčky i pokročilé.
            </p>
          </div>
          <img src={heroImg.src} alt="Hero image" className={styles.heroImage} />
        </div>

        {root.topics.map((topic) => (
          <TopicView key={topic.name} topic={topic} />
        ))}
      </div>
    </MainLayout>
  );
};

export default HomePage;
