import { cms } from 'lib/cms';
import { notFound } from 'next/navigation';
import heroImg from './img/hero.svg';
import TopicView from 'app/components/TopicView';
import Brand from 'app/components/Brand';
import Menu from 'app/components/Menu';
import MainLayout from 'app/components/MainLayout';
import styles from './styles.module.scss';
import { session } from  'app/session';

export const dynamic = 'force-dynamic';

interface Props {
  params: {
    topicId?: string;
  }
}

const HomePage = async ({ params }: Props): Promise<JSX.Element> => {
  const { cmsAgent } = await session();
  const topicId = params.topicId ?? 'kurzy';
  const root = await cms().loadRoot(cmsAgent);
  if (root === null) {
    notFound();
  }
  
  const division = await cms().loadDivision(cmsAgent, topicId);
  if (division === null) {
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
          items={root.divisions.map((division) => ({
            key: division.name,
            label: division.title,
            href: division.path,
          }))}
          activeKey={division.name}
          centered
        />
        <div className={styles.divisionIntro} />
        
        {division.topics.map((topic) => (
          <TopicView key={topic.name} topic={topic} />
        ))}
      </div>
    </MainLayout>
  );
};

export default HomePage;
