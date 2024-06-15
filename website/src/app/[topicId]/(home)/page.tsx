import { cms } from 'lib/cms';
import { notFound } from 'next/navigation';
import heroImg from './img/hero.svg';
import Brand from 'app/components/Brand';
import Menu, { MenuItem } from 'app/components/Menu';
import MainLayout from 'app/components/MainLayout';
import styles from './styles.module.scss';
import { session } from  'app/session';
import CoursesOverview from 'app/components/CoursesOverview';
import BlogOverview from 'app/components/BlogOverview';
import InfoBox from 'app/components/InfoBox';

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

  const menuItems: MenuItem[] = [
    { key: 'kurzy', label: 'Kurzy', href: '/kurzy' },
    { key: 'czechitas', label: 'Czechitas', href: '/czechitas' },
    { key: 'blog', label: 'Blog', href: '/blog' },
  ];

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
          items={menuItems}
          activeKey={division.name}
          centered
        />
        
        { division.type === 'courses' && <CoursesOverview division={division} /> }
        { division.type === 'blog' && <BlogOverview division={division} /> }
        
        <InfoBox icon="newsletter">
          <p>
            Přihlaste se k odběru novinek a nezmeškejte žádný nový kurz, článek nebo akci.
          </p>
          <a href={`/odber?topic=${division.interest}`} className="btnBig">Přihlásit k odběru</a>
        </InfoBox>
      </div>
    </MainLayout>
  );
};

export default HomePage;
