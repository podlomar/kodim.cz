import type { JSX } from "react";
import MainLayout from 'app/components/MainLayout';
import Panel from 'app/components/Panel';

const GdprPage = (): JSX.Element => {
  return (
    <MainLayout>
      <div className="container">
        <Panel title="Ujednání o zpracování osobních údajů" wide transparent>
          <p>
            Toto ujednání popisuje, jakým způsobem jsou zpracovávány vaše osobní údaje poskytnuné skrze webové stránky Kódím.cz v souladu s obecným nařízením o ochraně osobních údajů (GDPR).
          </p>

          <h2>Správce osobních údajů</h2>
          <p>
            Správcem vašich osobních údajů je fyzická podnikající osoba Martin Podloucký, IČO: 88873706, prozovatel webu Kódím.cz.
          </p>

          <h2>Jaké údaje jsou zpracovávány a proč</h2>
          <p>
            Osobní údaje jsou shromažďovýny a zpracovávány pouze v nezbytném rozsahu pro níže uvedené účely:
          </p>
          
          <ul>
            <li><strong>Jméno a příjmení</strong>: za účelem identifikace uživatele (právní základ: plnění smlouvy)</li>
            <li><strong>E-mail</strong>: za účelem identifikace uživatele, komunikace a informování o nových kurzech a akcích (právní základ: oprávněný zájem nebo souhlas)</li>
            <li><strong>Adresa bydliště</strong>: pouze pro vystavení faktury (právní základ: zákonná povinnost)</li>
          </ul>

          <h2>Přístup k údajům</h2>
          <p>
            Osobní údaje nezveřejňuji (ani na webu Kódím.cz) a nepředávám třetím stranám s výjimkou případů, kdy je to nezbytné pro splnění zákonných povinností (např. účetnictví, fakturace). Web Kódím.cz zajišťuje bezpečnost a důvěrnost vašich údajů.
          </p>

          <h2>Doba uchování osobních údajů</h2>
          <p>
            Vaše údaje jsou uchovávány:
          </p>

          <ul>
            <li>po dobu trvání smluvního vztahu,</li>
            <li>po dobu 3 let od poslední interakce pro marketingové účely (pokud udělíte souhlas),</li>
            <li>fakturační údaje dle zákona minimálně 10 let.</li>
          </ul>

          <h2>Práva subjektu údajů</h2>
          
          <p>
            Máte právo na přístup ke svým údajům, jejich opravu, výmaz, omezení zpracování a přenositelnost. Souhlas se zpracováním osobních údajů můžete kdykoliv odvolat e-mailem na <a href="mailto:sprava@kodim.cz">sprava@kodim.cz</a>.
          </p>
        </Panel>
      </div>
    </MainLayout>
  );
};

export default GdprPage;
