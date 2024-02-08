import MainLayout from 'app/components/MainLayout';
import Panel from 'app/components/Panel';

const GdprPage = (): JSX.Element => {
  return (
    <MainLayout>
      <div className="container">
        <Panel title="Správa osobních údajů" wide transparent>
          <p>
            Vaše osobní údaje jsou shromažďovány a zpracovávány organizcí Kódím.cz v souladu se směrnicí GDPR a to pouze k účelům uvedeným níže. Zpracováváme pouze osobní údaje, které nám sdělíte v souvislosti s registrací a účastí na našich kurzech a jiných akcích
          </p>
          
          <h2>Jaké údaje zpracováváme</h2>
        
          <ul>
            <li>Jméno a příjmení: za účelem identifikace uživatele</li>
            <li>E-mail: za účelem identifikace uživatele a informování o nových kurzech a akcích</li>
            <li>Adresa bydliště: pouze za účelem vystavení faktury za účast na kurzu či jiné akci</li>
          </ul>

          <h2>Přístup k údajům</h2>
          <p>Kódím.cz zajišťuje bezpečnost a důvěrnost vašich údajů. Žádné ze zpracovávaných údajů nebudou zveřejněny nikde na webu Kódím.cz ani nebudou poskytovány třetím stranám.</p>

          <h2>Délka zpracování</h2>
          <p>Vaše osobní údaje zpracováváme po dobu trvání vašeho souhlasu vyjádřeného při registraci na webové stránky nebo při prihlášení na kurz nebo jinou akci. Svůj souhlas můžete kdykoliv odvolat odesláním požadavku na e-mail <a href="mailto:sprava@kodim.cz">sprava@kodim.cz</a>.</p>
        </Panel>
      </div>
    </MainLayout>
  );
};

export default GdprPage;
