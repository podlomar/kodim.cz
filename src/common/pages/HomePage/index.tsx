import Layout from '../../Layout';
import LandingBanner from '../../LandingBanner';
import DivisionView from '../../DivisionView';
import Navbar from '../../Navbar';
import { ServerAppContext, useData } from '../../AppContext';
import './styles.scss';
import CodexCard from '../../CodexCard';

const HomePage = () => {
  const coursesRoot = useData(
    ['root'], async ({ cms, accessCheck }: ServerAppContext) => {
      return cms.getRoot(accessCheck).fetch();
    }
  );

  if (coursesRoot.status === 'forbidden') {
    return <h1>Forbidden</h1>;
  }

  return (
    <Layout>
      <Navbar showBrand={false} />
      <LandingBanner />
      <section className="stripe">
        <div className="container codex">
          <CodexCard
            image="playfulness"
            title="Hravost"
            text="Většina programátorů umí dobře svoje řemeslo, protože je baví si hrát a tvořit."
          />
          <CodexCard
            image="warmth"
            title="Vstřícnost"
            text="Naše kurzy si můžete číst jako pohádku před spaním. Vše vysvětlíme s ohledem na začátečníky."
          />
          <CodexCard
            image="knowledge"
            title="Znalosti"
            text="Získáte skutečně praktické znalosti a budete věcem opravdu rozumět."
          />
        </div>
      </section>

      <section className="container divisions-section">
        {coursesRoot.content.type === 'broken'
          ? null
          : coursesRoot.content.divisions.map(
            (division) => <DivisionView key={division.title} segment={division} />
          )
        }
      </section>
    </Layout>
  );
};

export default HomePage;