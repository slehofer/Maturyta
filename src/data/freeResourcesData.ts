export interface ResourceItem {
  id: string;
  title: string;
  author: string;
  type: 'ebook' | 'audiobook' | 'archive';
  sourceName: string;
  sourceBadgeClass: string;
  format: string;
  downloadOrStreamUrl: string;
  audioStreamUrl?: string;
  description: string;
}

export const FREE_RESOURCES: ResourceItem[] = [
  {
    id: 'res-1',
    title: 'Máj',
    author: 'Karel Hynek Mácha',
    type: 'ebook',
    sourceName: 'Městská knihovna v Praze',
    sourceBadgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    format: 'EPUB / PDF (Zdarma)',
    downloadOrStreamUrl: 'https://www.mlp.cz/cz/katalog-sluzeb/e-knihy/karel-hynek-macha-maj',
    description: 'Kompletní e-kniha zdarma ke stažení v oficiálním e-katalogu MKP.'
  },
  {
    id: 'res-2',
    title: 'R.U.R.',
    author: 'Karel Čapek',
    type: 'ebook',
    sourceName: 'Městská knihovna v Praze',
    sourceBadgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    format: 'EPUB / PDF (Zdarma)',
    downloadOrStreamUrl: 'https://www.mlp.cz/cz/katalog-sluzeb/e-knihy/karel-capek-rur',
    description: 'Oficiální bezplatné vydání dramatického díla Karla Čapka.'
  },
  {
    id: 'res-3',
    title: 'Kytice',
    author: 'Karel Jaromír Erben',
    type: 'audiobook',
    sourceName: 'Český rozhlas Čtenářský deník',
    sourceBadgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
    format: 'MP3 Stream / Audiokniha',
    downloadOrStreamUrl: 'https://vltava.rozhlas.cz/karel-jaromir-erben-kytice',
    audioStreamUrl: 'https://d233soaum1.ufs.sh/f/m7sCms1k89N5I9U8NqEwVjM9uOnJ5aE6cRZm8HkYfWLylvA1',
    description: 'Kompletní dramatizovaná audiokniha ze seriálu Čtenářský deník ČRo.'
  },
  {
    id: 'res-4',
    title: 'Bylo nás pět',
    author: 'Karel Poláček',
    type: 'audiobook',
    sourceName: 'Český rozhlas Čtenářský deník',
    sourceBadgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
    format: 'MP3 Stream / Audiokniha',
    downloadOrStreamUrl: 'https://dvojka.rozhlas.cz/karel-polacek-bylo-nas-pet',
    audioStreamUrl: 'https://d233soaum1.ufs.sh/f/m7sCms1k89N5I9U8NqEwVjM9uOnJ5aE6cRZm8HkYfWLylvA1',
    description: 'Nezapomenutelná rozhlasová četba na pokračování.'
  },
  {
    id: 'res-5',
    title: 'Romeo a Julie',
    author: 'William Shakespeare',
    type: 'ebook',
    sourceName: 'Kramerius NDK',
    sourceBadgeClass: 'bg-blue-100 text-blue-800 border-blue-300',
    format: 'PDF / E-knížka',
    downloadOrStreamUrl: 'https://www.mlp.cz/cz/katalog-sluzeb/e-knihy/william-shakespeare-romeo-a-julie',
    description: 'Klasický překlad Josefa Václava Sládka z digitalizovaného fondu.'
  },
  {
    id: 'res-6',
    title: 'Stařec a moře',
    author: 'Ernest Hemingway',
    type: 'archive',
    sourceName: 'OceansofPDF / Světový archiv',
    sourceBadgeClass: 'bg-purple-100 text-purple-800 border-purple-300',
    format: 'PDF / EPUB',
    downloadOrStreamUrl: 'https://oceansofpdf.com',
    description: 'Mezinárodní úložiště světové literatury a překladů.'
  }
];
