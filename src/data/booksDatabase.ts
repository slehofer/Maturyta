export interface BookAnalysis {
  id: string;
  title: string;
  author: string;
  period: string;
  genre: string;
  summary: string;
  historicalContext: string;
  characters: { name: string; description: string }[];
  themes: string[];
  keyQuotes: string[];
}

export const BOOKS_DATABASE: BookAnalysis[] = [
  {
    id: 'b1',
    title: 'Máj',
    author: 'Karel Hynek Mácha',
    period: 'Český romantismus (1. pol. 19. století)',
    genre: 'Lyricko-epická báseň',
    summary: 'Příběh tragické lásky Viléma a Jarmily. Vilém zavraždí svůdce své milé, aniž by tušil, že jde o jeho vlastního otce. Je odsouzen k trestu smrti.',
    historicalContext: 'České národní obrození, vrchol českého romantismu.',
    characters: [
      { name: 'Vilém', description: 'Strašný lesů pán, romantický hrdina, utrápený a hloubavý.' },
      { name: 'Jarmila', description: 'Mladá, krásná, milující Viléma.' }
    ],
    themes: ['Tragická láska', 'Příroda a májová noc', 'Osudovost a pomíjivost'],
    keyQuotes: ['Byl pozdní večer – první máj – / večerní máj – byl lásky čas.']
  },
  {
    id: 'b2',
    title: 'R.U.R.',
    author: 'Karel Čapek',
    period: 'Česká meziválečná literatura',
    genre: 'Vědeckofantastické drama',
    summary: 'Na ostrově společnost Rossum’s Universal Robots vyrábí umělé dělníky – Roboty. Roboti se vzbouří a vyvraždivší lidstvo.',
    historicalContext: 'Meziválečné období, vzestup průmyslu a technologií.',
    characters: [
      { name: 'Harry Domin', description: 'Ředitel R.U.R., vizionář.' },
      { name: 'Helena Gloryová', description: 'Laskavá, empatičká.' }
    ],
    themes: ['Nebezpečí technického pokroku', 'Hrozba ztráty lidskosti'],
    keyQuotes: ['Člověk vytvořil Robota, aby nahradil pracujícího člověka.']
  },
  {
    id: 'b3',
    title: 'Spalovač mrtvol',
    author: 'Ladislav Fuks',
    period: 'Česká literatura 2. pol. 20. století',
    genre: 'Psychologická novela',
    summary: 'Karel Kopfrkingl je zaměstnanec krematoria. Pod vlivem nacistické ideologie se promění v bezohledného vrahouna.',
    historicalContext: '60. léta 20. století v ČSSR, sonda do manipulovatelnosti člověka.',
    characters: [
      { name: 'Karel Kopfrkingl', description: 'Podivínský zaměstnanec krematoria.' }
    ],
    themes: ['Fašismus a nacistická ideologie', 'Proměna člověka ve zrůdu'],
    keyQuotes: ['Co abych tě, drahoušku, oběsil?']
  },
  {
    id: 'b4',
    title: 'Bylo nás pět',
    author: 'Karel Poláček',
    period: 'Česká meziválečná literatura',
    genre: 'Humoristický román',
    summary: 'Vzpomínkové vyprávění malého chlapce Péti Bajzy o dobrodružstvích pětice kluků na malém městě.',
    historicalContext: 'Napsáno během okupace před deportací autora do Terezína.',
    characters: [
      { name: 'Péťa Bajza', description: 'Hlavní vypravěč, syn koloniálníka.' }
    ],
    themes: ['Dětství a přátelství', 'Kontrast světa dětí a dospělých'],
    keyQuotes: ['A pravil jsme mu, že jest prašivý drahokam.']
  }
];
