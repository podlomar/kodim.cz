import { cms } from 'lib/cms';
import { notFound } from 'next/navigation';
import heroImg from './img/hero.svg';
import Brand from 'app/components/Brand';
import Menu, { MenuItem } from 'app/components/Menu';
import MainLayout from 'app/components/MainLayout';
import { session } from  'app/session';
import CoursesOverview from 'app/components/CoursesOverview';
import BlogOverview from 'app/components/BlogOverview';
import InfoBox from 'app/components/InfoBox';
import styles from './styles.module.scss';

export const dynamic = 'force-dynamic';

interface Props {
  params: {
    topicId?: string;
  }
}

const HomePage = async ({ params }: Props): Promise<JSX.Element> => {
  const { cmsAgent } = await session();
  const topicId = params.topicId ?? 'kurzy';
  const site = await cms().loadSite(`/${topicId}`);
  if (site === 'not-found') {
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
          activeKey={topicId}
          centered
        />
        
        { site.type === 'courses' && <CoursesOverview site={site} /> }
        { site.type === 'blog' && <BlogOverview site={site} /> }
        
        <InfoBox icon="newsletter">
          <p>
            Přihlaste se k odběru novinek a nezmeškejte žádný nový kurz, článek nebo akci.
          </p>
          <a href={`/odber?topic=${site.interest}`} className="btnBig">Přihlásit k odběru</a>
        </InfoBox>
      </div>
    </MainLayout>
  );
};

export default HomePage;
