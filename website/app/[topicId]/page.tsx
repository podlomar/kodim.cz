import heroImg from './img/hero.svg';
import { cms } from 'lib/cms';
import TopicBanner from 'components/TopicBanner';
import CourseCard from 'components/CourseCard';
import Brand from 'components/Brand';
import Menu from 'components/Menu';
import styles from './styles.module.scss';

interface Props {
  params: {
    topicId?: string;
  }
}

const HomePage = async ({ params }: Props): Promise<JSX.Element> => {
  const root = await cms.loadRoot();

  if (root === null) {
    return <div>Failed to load root</div>;
  }

  const { topicId } = params;

  const activeTopic = topicId === undefined
    ? root.topics[0]
    : root.topics.find((topic) => topic.name === topicId);

  if (activeTopic === undefined) {
    return <div>Failed to load content</div>;
  }

  return (
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
  );
};

export default HomePage;
