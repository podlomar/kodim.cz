<%inherit file="/course-chapter.mako"/>

<%self:lesson>
  <p>Funkce jsou jednou z nejdůležitějších součástí programování. Všimněte si, jak moc vaše programy sestávají z volání různých funkcí. Nyní přichází ten správný čas k tomu, abychom začali vytvářet funkce vlastní.</p>
  
  <p>Před tím je dobré si osvěžit několik základních pojmů. Pokud chceme funkci použít, říkáme, že ji takzvaně <em>voláme</em>. Například takto v JavaScriptu voláme funkci, která umocní první zadané číslo na druhé zadané číslo.</p>

  <pre>Math.pow(2, 3)</pre>

  <p>Této funkci jsme do kulatých závorek předali dva <em>vstupy</em>. Vstupům funkce se říká <em>parametry</em>. Funkci <code>Math.pow</code> jsme tedy předali dva parametry. Jakmile funkci zavoláme, ona provede nějaký výpočet a takzvaně <em>vrátí</em> výsledek. Výsledku říkáme <em>výstup</em>. Řekneme tedy, že volání funkce <code>Math.pow</code> s parametry 2 a 3 vrátí výstup 8. </p>
  
  <h2>Jak upéct vlastní funkci</h2>

  <p>Ve všech programovacích jazycích je již od začátku k dispozici mnoho funkcí. Často ale potřebujeme funkci, která dělá něco specifického, důležitého pouze pro náš program. Představme si například, že vyměřujeme pozemek a chceme spočítat plochu pozemku, který má tvar pravoúhlého trojúhelníka o šířce <code>witdth</code> a výšce <code>height</code>. </p>

  <div class="text-center">
    <img src="/img/intro-to-js/triangle-area.png" alt="Pozemek" class="figure__img-600" />
  </div>
  
  <p>Naše funkce tedy bude mít dva vstupy - šířku a výšku. Ze školy si pamatujeme, že plochu spočítáme tak, že vynásobíme šířku výškou a vydělíme dvěma. Už tedy víme, co má funkce dělat a zbývá nám tento postup zapsat v JavaScritpu.</p>

  <pre>(width, height) => width * height / 2</pre>

  <p>Zápis funkce se dělí na definici vstupů (před šipkou) a tělo (za šipkou). Jako vstupy v kulatých závorkách vidíme dvě slova <code>width</code> a <code>height</code>. To jsou speciální proměnné, kterým říkáme <em>argumenty</em>. Pokud naší funkci zavoláme s nějakými parametry, například 6 a 3, JavaScript tyto hodnoty uloží do agrumentů. V těle funkce pak můžeme agrumenty použít jako normální proměnné pro náš výpočet. </p>

  <div class="text-center">
    <img src="/img/intro-to-js/js-function.png" alt="Funkce" class="figure__img-600" />
  </div>

  <p>Nyní se tedy ukážeme, jak naší funkci zavolat. Důležité je si uvědomit, že funkce je hodnota jako každá jiná. Můžeme ji tedy uložit do proměnné podobně jako to děláme s čísly, řetězci apod. </p>

<pre>const wage = 250;
const user = 'martin';
const area = (width, height) => width * height / 2;</pre>

  <p>Jakmile máme funkci uloženou v proměnné, můžeme jí zavolat známým způsobem.</p>

  <pre>area(6, 3);</pre>

  <h2>Složitější funkce</h2>
  <p>Ne každá funkce je tak přímočará, jako výpočet obsahu. Často se stane, že potřebujeme ve funkci provést nějaké rozhodování, cyklus apod. Mějme například funkci, která nám vrátí absolutní hodnotu čísla. V takové funkci potřebujeme použít podmínky. Tělo funkce tedy bude obsahuje více příkazů a nevejde se nám na jeden řádek. V takovém případě může tělo funkce být blok kódu podobně jako u podmínek.</p>

<pre>const abs = (x) => {
  if (x >= 0) {
    return x;
  } else {
    return -x;
  }
};</pre>

  <p>Všimněte si klíčového slova <code>return</code>, které ukončí běh funkce a vrátí zadaný výsledek.</p>

  <p>Všimněte si, že tělo funkce může obsahovat mnoho příkazů. Je to jakýsi malý program. Proto se funkcím někdy historicky říká <em>podprogramy</em>-</p>

</%self:lesson>

<%self:exercises>
  <h2>Cvičení</h2>
  <%self:exrc title="Obsah elipsy">
    <p>Tentokrát chceme spočítat plochu pozemku ve tvaru elipsy jako na obrázku. </p>

    <div class="text-center">
      <img src="/img/intro-to-js/elipse.png" alt="Elipsa" class="figure__img-600" />
    </div>

    <p>Z matematiky víme, že známe li šířku a výšku elipsy, její obsah je polovina šířky krát polovina výšky krát číslo pí. Napište funkci <code>elipseArea</code>, která spočítá plochu pozemku dle zadané šířky a výšky. Číslo pí najdete v JavaScriptu v proměnné <code>Math.PI</code>.</p>
  </%self:exrc>

  <%self:exrc title="Větší ze dvou čísel">
    <p>Napište funkci jménem <code>max2</code>, který vrátí větší ze dvou zadaných čísel.</p>
  </%self:exrc>

  <%self:exrc title="Python zaokrouhlování">
    <p>Jak si možná pamatujete, v Pythonu funkce <code>round</code> zaokrouhluje k nejbližšímu sudému číslu, pokud je desetinná část čísla přesně 0.5. JavaScriptová funkce <code>Math.round</code> naopak provádí zaokrouhlování způsobem, na který jste zvyklí, tedy pro 0.5 vždy nahoru. Někomu by se po po Pythonovském zaokrouhlování mohlo stýskat. Napište funkci <code>round</code>, která zaokrouhluje čísla na celé jednotky podle následujících pravidel.</p>

    <ol>
      <li>Pokud je desetinná část menší než 0.5, zaokrouhlujeme dolů.</li>
      <li>Pokud je desetinná část větší než 0.5, zaokrouhlujeme nahoru.</li>
      <li>Pokud je desetinná část přesně rovna 0.5, zaokrouhlujeme k sudému číslu. Tedy například 3.5 se zaokrouhlí na 4, naopak 2.5 se zaokrouhlí na 2.</li>
    </ol>

    <p>V tomto cvičení se vám mohou hodit funkce <code>Math.floor</code> nebo <code>Math.trunc</code>.</p>
  </%self:exrc>

  <h2>Bonusy</h2>  

  <%self:exrc title="Větší ze tří čísel">
    <p>Napište funkci jménem <code>max3</code>, který vrátí největší ze tří zadaných čísel.</p>
  </%self:exrc>

  <%self:exrc title="Vlastní randint">
    <p>V Pythonu jsme měli k dispozici krásnou funkci <code>randint</code>, která vygenerovala náhodné číslo v zadaném rozpětí. V JavaScriptu takovou funkci nemáme. Vytvořte tedy tuto funkci sami s použitím funkce <code>Math.random</code>. Pokud si věříte, napište funkci rovnou. Pokud tápete, následujte tyto kroky</p>

    <ol>
      <li>Nejdříve vyrobte funkci, která umí vygenerovat náhodné číslo mezi 0 a 5.</li>
      <li>Upravte vaší funkci tak, aby generovala náhodné číslo mezi 0 a zadaným vstupem.</li>
      <li>Upravte funkci dále tak, že obdrží dva vstupy <code>min</code> a <code>max</code> a číslo vygeneruje v těchto mezích.</li>
    </ol>
  </%self:exrc>

  ## <%self:exrc title="Bod uvnitř obdélníka">
  ##   <p>Mějme obdélník zadaný celočíselnými souřadnicemi <code>x</code>, <code>y</code>, <code>w</code>, <code>h</code>. </p>
  ## </%self:exrc>
</%self:exercises>