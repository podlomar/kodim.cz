import { cms } from 'lib/cms';
import { notFound } from 'next/navigation';
import heroImg from './img/hero.svg';
import TopicBanner from 'components/TopicBanner';
import CourseCard from 'components/CourseCard';
import Brand from 'components/Brand';
import Menu from 'components/Menu';
import MainLayout from 'components/MainLayout';
import styles from './styles.module.scss';
import { session } from  'app/session';

export const dynamic = 'force-dynamic';

interface Props {
  params: {
    topicId?: string;
  }
}

const HomePage = async ({ params }: Props): Promise<JSX.Element> => {
  const { user, cmsAgent } = await session();
  const root = await cms().loadRoot(cmsAgent);
  if (root === null) {
    notFound();
  }

  const { topicId: topicName } = params;

  const activeTopic = topicName === undefined
    ? root.topics[0]
    : root.topics.find((topic) => topic.name === topicName);

  if (activeTopic === undefined) {
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

        <Menu 
          items={root.topics.map((topic) => ({
            label: topic.title,
            href: `/${topic.name}`,
            key: topic.name,
          }))}
          activeKey={activeTopic.name}
        />

        <TopicBanner topic={activeTopic} />

        <div className={styles.courses}>
          { activeTopic.courses.map((course) => (
            <CourseCard
              key={course.name}
              course={course}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;
