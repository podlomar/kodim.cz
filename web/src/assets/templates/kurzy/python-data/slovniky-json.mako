<%inherit file="/course-chapter.mako"/>

<%self:lesson>
  <p>V našich programech budeme často potřebovat pracovat s různě strukturovanými daty, která obsahují mnoho druhů hodnot. Představme si například, že zpracováváme seznam absolventů nějakého kurzu. Každý absolvent má svoje jméno, příjmení (což jsou řetězce), rok absolvování kurzu (celé číslo), výslednou docházku v procentech (desetinné číslo) a informaci o tom, zda prospěl s vyznamenáním (pravdivostní hodnota).</p>

  <p>Jelikož už známe seznamy, mohli bychom zkusit reprezentovat absolventa třeba takto:</p>

<pre>absolvent = ['Petr', 'Roman', 2017, 0.95, True]</pre>

  <p>Hned ale vidíme, že z takového seznamu není úplně zřejmé, co která hodnota znamená. Musíme si pamatovat, že na indexu 0 je křestní jméno, na indexu 3 docházka apod. Mnohem pohodlnější by bylo, kdybychom mohli jednotlivé hodnoty místo indexování přímo pojmenovat. A přesně k tomuto účelu máme v Pythonu takzvané <em>slovníky</em>.</p>
  
  <h2>Slovníky</h2>
  
  <p>Slovník umožňuje pojmenovat hodnoty v nějaké datové struktuře tak, abychom pomocí těchto jmen mohli k hodnotám poté přistupovat. Našeho absolventa bychom pomocí slovníku reprezentovali takto</p>

<pre>absolvent = {
  'jmeno': 'Petr',
  'prijmeni': 'Roman',
  'rok': 2017,
  'dochazka': 0.95,
  'vyznamenani': True
}</pre>

  <p>Pokud pak chceme získat například jméno či docházku našeho absolventa, píšeme</p>

<pre>&gt;&gt;&gt; absolvent['jmeno']
'Petr'
&gt;&gt;&gt; absolvent['dochazka']
0.95</pre>

  <p>První důležitá věc ohledně slovníků je, že slovníky jsou opět hodnoty jako každé jiné. Mohou proto být součástí seznamů. Můžeme tedy snadno vyrobit seznam absolventů našeho kurzu:</p>

<pre>absolventi = [
  {'jmeno': 'Petr', 'prijmeni': 'Roman', 'rok': 2017, 'dochazka': 0.95, 'vyznamenani': True},
  {'jmeno': 'Jana', 'prijmeni': 'Kočanská', 'rok': 2015, 'dochazka': 0.92, 'vyznamenani': True},
  {'jmeno': 'Eva', 'prijmeni': 'Horká', 'rok': 2014, 'dochazka': 0.85, 'vyznamenani': False},
  {'jmeno': 'Ivo', 'prijmeni': 'Roubeník', 'rok': 2017, 'dochazka': 0.75, 'vyznamenani': False}
]</pre>

  <p>Kdybychom pak chtěli získat například příjmení absolventa na indexu 2, psali bychom </p>

  <div class="verbatim">
<pre>&gt;&gt;&gt; absolventi[2]['prijmeni']
'Horká'</pre>
  </div>

  <p>Nebo bychom mohli projít všechny absolventy a spočítat jejich průměrnou docházku na kurz.</p>

<pre>&gt;&gt;&gt; from statistics import mean
&gt;&gt;&gt; mean([ab['dochazka'] for ab in absolventi])
0.8765</pre>

  <h3>Složitější struktury</h3>
  <p>Stejně jako u proměnných a seznamů můžeme do slovníku uložit jakoukoliv hodnotu. Není tedy problém mít ve slovníku seznam nebo další slovník. Tím se otvírá prostor pro mnohem komplikovanější datové struktury. Takto bychom mohli reprezentovat například kurz Czechitas jménem Úvod do programování.</p>

<pre>kurz = {
  'nazev': 'Úvod do programování',
  'lektor': 'Martin Podloucký',
  'konani': [
    {
      'misto': 'T-Mobile', 
      'koucove': [
        'Dan Vrátil', 
        'Filip Kopecký', 
        'Martina Nemčoková'
      ], 
      'ucastnic': 30
    },
    {
      'misto': 'MSD IT', 
      'koucove': [
        'Dan Vrátil', 
        'Zuzana Tučková', 
        'Martina Nemčoková'
      ], 
      'ucastnic': 25
    },
    {
      'misto': 'Škoda DigiLab', 
      'koucove': [
        'Dan Vrátil', 
        'Filip Kopecký', 
        'Kateřina Kalášková'
      ], 
      'ucastnic': 41
    }
  ]
}</pre>
  <p>Všimněte si, jak slovník představující jeden kurz, obsahuje pod klíčem <code>konani</code> seznam dalších slovníků. Každý z nich reprezentuje jedno konání kurzu a dále obsahuje například seznam koučů atd. Kdybychom tedy například chtěli seznam všech koučů na druhém konání kurzu, napsali bychom </p>

<pre>kurz['konani'][1]['koucove']</pre>

</%self:lesson>

<%self:exercises>
  <h2>Cvičení</h2>
  
  <%self:exrc title="Kurz">
    <p>Založte si program v Pythonu a zkopírujte si do něj datovou strukturu kurzu Úvod do programování z lekce výše.</p>

    <ol>
      <li>Vypište na výstup počet účastnic na posledním konání kurzu.</li>
      <li>Vypište na výstup jméno posledního kouče na prvním konání kurzu.</li>
      <li>Vypište na výstup celkový počet konání kurzu.</li>
      <li>Vypište na výstup všechna místa, na kterých se kurz konal. Použijte chroustání seznamů.</li>
    </ol>
  </%self:exrc>

  <%self:exrc title="Knihovna">
    <p>Uvažte, jak byste pomocí slovníku reprezentovali údaje o knize v knihovně. Jaké klíče a hodnoty ve slovníku budou? Zcela jistě bude každá kniha obsahovat například název. Chtěli bychom také, aby kniha umožňovala mít vícero autorů a vícero vydání. Ve vašem programu vytvořte proměnnou, který bude obsahovat jednu knihu s vámi vymyšlenou strukturou. </p>
  </%self:exrc>

  ${self.alert_done()}

  <h2>Bonusy</h2>
	<%self:exrc title="Recepty">
	<p>Prohlédněte na následujicí reprezentaci receptu:</p>
<pre>{
  'nazev': 'Batáty se šalvějí a pancettou',
  'narocnost': 'stredni',
  'doba': 30,
  'ingredience': [
    ['batát', '1', '15 kč'],
    ['olivový olej', '2 lžíce', '2 kč'],
    ['pancetta', '4-6 plátků', '21 kč'],
    ['přepuštěné máslo', '2 lžíce', '5 kč'],
    ['mletý černý pepř', '1/2 lžičky', '0.5 kč'],
    ['sůl', '1/2 lžičky', '0.1 kč'],
    ['muškátový oříšek', 'špetka', '1 kč'],
    ['česnek', '2 stroužky', '1 kč'],
    ['šalvějové lístky', '20-25', '12 kč']
  ]
}</pre>
		<p>Uložte si tuto strukturu do proměnné <var>recept</var> na začátek nového programu. Vypište pomocí funkce <code>print</code> kolik bude celé jídlo stát korun zaokrouhlené na celé koruny nahoru.</p>
  </%self:exrc>
</%self:exercises>

<%self:lesson>
  <h2>Formát JSON</h2>
	<p>JSON je formát pomocí kterého můžeme zapsat strukturovaná data jako čistý text. S jedním takovým datovým formátem jste se již potkali, jmenuje se CSV. </p>

	<p>JSON formát původně pochází z jazyka, který se jmenuje JavaScript. Ten se hodně používá pro tvorbu webových stránek a jelikož výměna dat nejčastěji probíhá po internetu, ujal se formát JSON všeobecně jako standard pro výměnu dat mezi programy. Výhoda pro nás je, že JSON vypadá téměř stejně jako Python slovníky. Liší se pouze tím, že vždy používá dvojité uvozovky a hodnoty <code>True</code> a <code>False</code> se píší s malým písmenem, tedy <code>true</code> a <code>false</code>. Náš absolvent kurzu z úvody lekce by tedy ve formátu JSON vypadal takto:</p>
  
  <pre>{"jmeno": "Petr", "prijmeni": "Roman", "rok": 2017, "dochazka": 0.95, "vyznamenani": true}</pre>

  <h3>Čtení JSON dat</h3>

  <p>V Pythonu je velice jednoduché převést JSON na obyčejný Python slovník. Stačí nám k tomu modul jménem <code>json</code>. Vyzkoušíme si to na našem seznamu absolventů. Nejdřív si tato data stáhneme jako soubor <a href="/download/python-data/absolventi.json" download>absolventi.json</a>. Ten pak můžeme v Pythonu otevřít a převést na JSON následujicím programem.</p>

<pre>import json
soubor = open('absolventi.json', encoding='utf-8')
text = file.read()
soubor.close()
absolventi = json.loads(text)
print(absolventi)</pre>

  <p>V tomto programu používáme metodu <code>read</code>, která umí celý soubor načíst se vším všudy do jednoho velkého řetězce. Tento řetězec pak můžeme předat funkci <code>loads</code> z modulu <code>json</code>, která tento řetězec přečte a pokud jsou v něm data ve formátu JSON, převede je na Python slovníky.</p>

  <p>Pokud bychom se nechtěli sami obtěžovat se čtením souboru, můžeme použít metodu <code>load</code>, která umí přečíst JSON přímo z otevřeného souboru.</p>

<pre>import json
soubor = open('absolventi.json', encoding='utf-8')
absolventi = json.load(soubor)
soubor.close()
print(absolventi)</pre>
  
  <p>Pokud se ptáte k čemu je nám vůbec funkce <code>loads</code>, když můžeme rovnou použít funkci <code>load</code>, vydržte do další části této lekce, kde budeme stahovat JSON z internetu. Ten nám totiž vždy přijde jako textový řetězec.</p>

  <h3>Zápis JSON dat</h3>

  <p>Zápis JSON dat do souboru je podobně jednoduché jako čtení. Stačí si osvojit funkci <code>dump</code>. Dejme tomu, že máme jednoduchý JSON, který obsahuje například odpracované hodiny pro každý den v týdnu. Ten chceme zapsat do textového souboru.</p>

<pre>import json
hodiny = {'po': 8, 'ut': 7, 'st': 6, 'ct': 7, 'pa': 8}
soubor = open('hodiny.json', 'w', encoding='utf-8')
json.dump(hodiny, soubor)
soubor.close()
</pre>

  <p>Pokud bychom z nějakého důvodu chtěli pouze vytvořit řetězec obsahující JSON ale nezapisovat jej do souboru, můžeme použít funkci <code>json.dumps</code>.</p>

<pre>&gt;&gt;&gt; hodiny = {'po': 8, 'ut': 7, 'st': 6, 'ct': 7, 'pa': 8}
&gt;&gt;&gt; import json
&gt;&gt;&gt; json.dumps(hodiny)
'{"po": 8, "ut": 7, "st": 6, "ct": 7, "pa": 8}'</pre>

  <h3>Stahování dat z internetu</h3>
  <p>V předchozím příkladu jsem naše data načetli ze soubrou na disku. Pokud však narazíte na vstřícného poskytovatele dat, je možné si data stáhnout z takzvaného API (Applicattion Programming Interface) přímo z internetu. Zkratka API se používá jako označení nějakého přípojného bodu na internetu, odkud si můžete stáhnout data v nějakém strojově čitelném formátu. Nejčastěji je tímto formátem právě JSON. </p>

  <p>Malá potíž je ovšem v tom, že Python sám o sobě neobsahuje modul pro stahování dat z internetu. Musíme proto do našeho Pythonu doinstalovat takzvaný externí balíček.</p>

  <h2>Externí moduly a balíčky</h2>
  <p>Python sám o sobě obsahuje mnoho užitečných modulů pro řešení různých typů úloh. Už jsme viděli modul <code>random</code> pro práci s náhodnými čísly, modul <code>statistics</code> pro základní statistické funkce nebo modul <code>sys</code> pro práci s operačním systémem. Všem modulům, které jsou součástí základní instalace Pythonu, se dohromady říká <em>standardní knihovna</em>. Přehled všech modulů, které standardní knihovna obsahuje můžete najít <a href="https://docs.python.org/3/library/">v Python dokumentaci</a>. </p>

  <p>Čas od času ale v Pythonu potřebujeme vykonat nějakou činnost, pro kterou není ve standardní knihovně dostupný žádný modul, například stáhnou data z internetu. V takovém případě budeme muset z internetu stáhnout a naistalovat takzvaný <em>balíček</em>. Balíčky obsahují moduly, které po instalaci balíčku můžeme importovat v našem programu.</p>
  
  <p>Ke stahování dat z intertnetu potřebujete balíček jménem <code>requests</code>. Nainstalujeme jej příkazem </p>

  <div class="verbatim">
<pre>$ pip3 install requests</pre>
  </div>

  <p>Pozor, že ve Windows tento příkaz vypadá takto.</p>

  <div class="verbatim">
<pre>$ pip install requests</pre>
  </div>

  <p>Může se stát, že výše uvedený příkaz nebude fungovat protože nemáte nainstalovaný správce balíčků <code>pip</code>- V takovém případě bude potřeba znova spustit instalaci Pythonu a během ní zaškrtnout, že chcete nainstalovat také <code>pip</code>.</p>

  <h2>Stahování dat z API</h2>
  <p>Jeden ze cvičných zdrojů dat najdeme na adrese <code>http://api.kodim.cz/python-data/people</code>. Naším jediným cílem je data získat jako text. Pak už jej převedeme na Python slovníky právě s využítím výše zmiňované funkce <code>loads</code>.</p>

<pre>import requests
import json
response = requests.get('http://api.kodim.cz/python-data/people')
data = json.loads(response.text)
print(data)
</pre>
</%self:lesson>

<%self:exercises>
  <h2>Cvičení</h2>
  
  <%self:exrc title="Seznam lidí">
    <p>Jak už jsme si ověřili v lekci, datové API na adrese <code>http://api.kodim.cz/python-data/people</code> obsahuje seznam lidí. Napište program, který tento seznam z API stáhne a převede z formátu JSON na Python slovníky. Proveďte následující úkoly.</p>

    <ol> 
      <li>Zjistěte kolik lidí celkem seznam obsahuje.</li>
      <li>Zjistěte jaké všechny informace máme o jednotlivých osobách.</li>
      <li>Zjistěte, kolik je v souboru mužů a žen.</li>
    </ol>
  </%self:exrc>

  <%self:exrc title="Svátky">
    <p>Na adrese <code>http://svatky.adresa.info/json</code> najdete API, které vám odpoví, kdo má dneska svátek. </p>
    
    <ol>
      <li>Využijte toto API k tomu, abyste napsali program, který po spuštění vypíše na obrazovku kdo má dneska svátek.</li>
      <li>Pokud použijete adresu <code>http://svatky.adresa.info/json?date=DDMM</code>, kde místo DDMM doplníte datum, dostanete jméno, které má svátek v zadaný den. Formát DDMM znamená že 6. ledna bude zapsáno jako 0601, 12. září jako 1209 apod. Napište program, který dostane na příkazové řádce číslo dne a číslo měsíce a vypíše na výstup kdo má v daný den svátek. Použijte váš program abyste zjistili, kdo má svátek 29. února.</li>
    </ol>
  </%self:exrc>
</%self:exercises>

<%self:lesson>
  <h2>Čtení na doma</h2>
  <p>Touto lekcí končí úvodní části kurzu o programování v Pythonu. Před tím, než se vrhneme do další části, si ukážeme poslední třešničku na dortu, která může občas hodně ulehčit práci.</p>

  <h3>Formátování řetězců</h3>
  <p>Často se nám v Pythonu může stát, že potřebujeme vytvořit řetězec, který obsahuje hodnoty z několika různých proměnných. Mějme například seznam útrat, který vypadá takto:</p>

<pre>
utraty = [
  ['Pavel', 'mléko', 54],
  ['Jana', 'prací prášek', 312],
  ['Robert', 'mouka', 32],
  ['Zuzana', 'vajíčka', 47],
]
</pre>

  <p>Představme si, že bychom chtěli každý řádek takové tabulky vypsat takto:</p>

<pre>
  Pavel utratil/a 54 kč za mléko.
</pre>

  <p>S našimi současnými znalostmi bychom mohli napsat takovýto program</p>

<pre>
for utrata in utraty:
  print(utrata[0] + ' utratila/a ' + str(utrata[2]) + ' kč za ' + utrata[1] + '.')  
</pre>

  <p>Takovýto zápis pomocí sčítání řetězců je dost nepohodlný. Pokud by navíc tabulka obsahovala o pár sloupečků více, snadno se nám výraz v metodě <code>print</code> vymkne z rukou.</p>

  <p>Od verze 3.6 jazyk Python obsahuje způsob, jak zápis výše zjednodušit. Pokud těsně před řetězec napíšete písmeno f (z anglického <em>format</em>), můžete do řetězce vložit jakoukoliv proměnnou, pokud ji uzavřete do složených závorek.</p>

  <p>Místo zápisu</p>
<pre>
vyplata = 500000
zprava = 'vaše výplata činí ' + str(vyplata) + ' kč'
</pre>

  <p>můžete psát</p>

<pre>
vyplata = 500000
zprava = f'vaše výplata činí {vyplata} kč'
</pre>

  <p>Takovýto zápis je mnohem čitelnější a přehlednější. Všimněte si, že dokonce ani nemusíme hodnotu v proměnné <var>vyplata</var> převádět na řetězec. Python to za nás udělá automaticky. Náš program s útratami by pak s použitím formátování řetězců vypadal takto:</p>

<pre>
for utrata in utraty:
  print(f'{utrata[0]} utratila/a {utrata[2]} kč za {utrata[1]}.')
</pre>
</%self:lesson>