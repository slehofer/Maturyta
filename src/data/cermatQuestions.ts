export type QuestionCategory =
  | 'Pravopis a mluvnice'
  | 'Literární historie a teorie'
  | 'Práce s textem a porozumění'
  | 'Skladba a tvarosloví';

export interface CermatQuestion {
  id: string;
  category: QuestionCategory;
  yearSource: string;
  textExtract?: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  hint?: string;
}

export const CERMAT_QUESTIONS: CermatQuestion[] = [
  {
    id: 'q1',
    category: 'Pravopis a mluvnice',
    yearSource: 'CERMAT 2023 - Jarní termín',
    textExtract: 'Včerejší vyjížďka do okolních lesů se všem členům kroužku výjimečně vydařila, i když nás překvapilo sychravé počasí.',
    question: 'Která z následujících možností obsahuje výhradně slova vyjmenovaná nebo odvozená po Y/I?',
    options: [
      'vyjížďka, výjimečně, sychravé',
      'včerejší, vyjížďka, počasí',
      'členům, kroužku, vydařila',
      'okolních, lesů, překvapilo'
    ],
    correctAnswerIndex: 0,
    explanation: 'Slova "vyjížďka" (od vyjet/jet), "výjimečně" (od výjimka/jímat) a "sychravé" patří mezi vyjmenovaná slova po V a B (sychravý).',
    hint: 'Zaměř se na vyjmenovaná slova po B, L, M, P, S, V, Z.'
  },
  {
    id: 'q2',
    category: 'Pravopis a mluvnice',
    yearSource: 'CERMAT 2023 - Podzimní termín',
    question: 'Ve které z následujících věts je Pravopisně SPRÁVNĚ zapsána dvojice mě/mně?',
    options: [
      'Rozuměl mně velmi dobře, ale neřekl mě o tom ani slovo.',
      'Rozuměl mě velmi dobře, ale neřekl mně o tom ani slovo.',
      'Rozuměl mně velmi dobře, ale neřekl mně o tom ani slovo.',
      'Rozuměl mě velmi dobře, ale neřekl mě o tom ani slovo.'
    ],
    correctAnswerIndex: 2,
    explanation: 'Sloveso "rozumět" se pojí se 3. pádem (Rozuměl komu/čemu? -> mně), sloveso "říct" se pojí se 3. pádem (Neřekl komu/čemu? -> mně).',
    hint: 'Použij pomůcku se zájmenem TY (tobě = mně, tebe/tě = mě).'
  },
  {
    id: 'q3',
    category: 'Literární historie a teorie',
    yearSource: 'CERMAT 2022 - Jarní termín',
    textExtract: '„Hory a doly zapadly v tmavost, / hvězdy vytrvalé svítí na nebi, / duše má teskní, v srdci je žalost...“',
    question: 'Určete literární směr a charakteristický rys ukázky:',
    options: [
      'Realismus – objektivní popis sociální reality',
      'Romantismus – důraz na subjektivní pocity, tesknotu, noc a tajemno',
      'Renesance – oslava lidského rozumu',
      'Baroko – barokní gnosticismus'
    ],
    correctAnswerIndex: 1,
    explanation: 'Romantismus zdůrazňuje individualitu, citovost, melancholii, motivy noci a přírody.',
    hint: 'Všímej si emociálně podbarvených slov jako teskní, žalost, tmavost.'
  },
  {
    id: 'q4',
    category: 'Práce s textem a porozumění',
    yearSource: 'CERMAT 2024 - Ilustrační test',
    textExtract: 'Ačkoli moderní digitální techniky umožňují restaurátorům rekonstruovat historické památky s nevídanou přesností, mnozí odborníci varují před nadměrným spoléháním na virtuální modely. Fyzický kontakt s autentickým materiálem totiž odhaluje struktury, které žádný skener nedokáže věrně zachytit.',
    question: 'Které z následujících tvrzení VYPLÝVÁ z textu?',
    options: [
      'Virtuální modely zcela nahradily tradiční restaurátorské postupy.',
      'Digitalizace neposkytuje restaurátorům žádné užitečné informace.',
      'Skenery mají svá omezení při zachycování fyzické struktury materiálů.',
      'Odborníci doporučují zcela se vyhýbat používání moderních technologií.'
    ],
    correctAnswerIndex: 2,
    explanation: 'Text uvádí, že "fyzický kontakt odhaluje struktury, které žádný skener nedokáže věrně zachytit".',
    hint: 'Hledej odpověď, která přímo vychází z poslední věty ukázky.'
  }
];
