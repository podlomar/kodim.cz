import MainLayout from 'app/components/MainLayout';
import Panel from 'app/components/Panel';

const CopyrightPage = (): JSX.Element => {
  return (
    <MainLayout>
      <div className="container">
        <Panel title="Copyright" wide transparent>
          <p>Veškerý obsah zveřejněný na této webové stránce, včetně textů, grafiky, log, ikon, obrazového materiálu, zvukových záznamů, videí, programového kódu a dalšího obsahu, je chráněn autorským právem a jinými právy duševního vlastnictví. Tento obsah nesmí být kopírován, reprodukován, distribuován nebo přenášen bez předchozího písemného souhlasu Kódím.cz.</p>

          <p>Všechny studijní materiály jsou vlastnictvím příslušných autorů a jsou chráněny autorskými právy a dalšími právy duševního vlastnictví. Na těchto webových stránkách jsou zveřejněny s výslovným souhlasem jejich autorů.</p>

          <p>Uživatelé webu mají povolen přístup k materiálům na této stránce pouze pro osobní, nekomerční použití. Jakékoliv jiné použití, včetně kopírování, distribuce, reprodukce, úpravy, publikování nebo vytváření odvozených prací, je zakázáno bez předchozího písemného souhlasu.</p>
        </Panel>
      </div>
    </MainLayout>
  );
};

export default CopyrightPage;
