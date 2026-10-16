// Startsidans innehåll. Sektionerna har ingen egen text (guide/2-4-skelett.md); allt kommer härifrån.
import type { ImageMetadata } from 'astro';

export interface Lank { text: string; href: string; }
// En kartlänk går till Google Maps, och på Apple-enheter till Apple Kartor om apple är satt (Sida.astro).
export interface KartLank extends Lank { apple?: string; }
export interface Bild { src: ImageMetadata | string; alt: string; width?: number; height?: number; }

export interface StartInnehall {
  forst?: 'praktiskt' | 'tjanster'; // sektionen efter första vyn; branschen avgör (guide/2-4-skelett.md), standard 'praktiskt'
  // Samtyckesverktyget, bara när sajten har statistik eller annonser med kakor (BESLUT.md 2026-10-16, Kakor och samtycke vid behov).
  // logg: adressen dit valet skickas, t.ex. '/api/samtycke' (GDPR art. 7.1). googleSamtyckeslage: Consent Mode v2-signaler till Googles taggar.
  samtycke?: { version: number; rubrik: string; text: string; lank?: Lank; godkann: string; neka: string; valj: string; dolj: string; spara: string; installningar: string;
    kategorier: { id: 'statistik' | 'marknadsforing'; namn: string; text: string }[]; logg?: string; googleSamtyckeslage?: boolean };
  // Skript som kräver samtycke, till exempel Google Analytics eller Meta-pixeln. De laddas först när besökaren har sagt ja till kategorin.
  // verktyg: det som visas i kaklistan på sidan Integritet och kakor (PTS: namn, ändamål, tredjepart och lagringstid).
  taggar?: { kategori: 'statistik' | 'marknadsforing'; src?: string; kod?: string;
    verktyg?: { namn: string; leverantor: string; policy?: Lank; kakor: { namn: string; andamal: string; lagringstid: string; tredjepart: boolean }[] } }[];
  nyFlikText?: string; // för skärmläsare när en länk öppnas i ny flik på datorn, t.ex. "(öppnas i ny flik)"
  titel: string;
  beskrivning: string;
  // form och orgnr: organisationsnumret visas i sidfoten för bolag men inte för en enskild firma, där det är ägarens personnummer (BESLUT.md 2026-10-16).
  foretag: { namn: string; form?: 'bolag' | 'enskild'; orgnr?: string; logotyp?: Bild; favikon?: string; hemskarmsikon?: string; delningsbild?: string };
  boka: Lank & { kort?: string }; // kort: texten i sidhuvudet
  ring: Lank & { nummer: string; kort?: string }; // kort: texten i knapplisten
  // Mobilen: 'uppe' = kontaktvägen fast i sidhuvudet; 'nere' = smalt sidhuvud och knapplist i tumzonen.
  mobilLista?: 'uppe' | 'nere';
  meny?: { oppna: string; stang: string; lankar: Lank[] };
  nav: Lank[];
  forstavy: {
    overrad: string;
    rubrik: string;
    ingress: string;
    markering?: string;
    visaBetyg?: boolean; // en rad med betyget ur fortroende, under knapparna
    bild?: Bild;
  };
  praktiskt: {
    rubrik: string;
    platser: { namn: string; adress: string; dagar: { dag: string; tid: string; nr?: number }[]; karta: KartLank }[]; // nr: 0 = söndag … 6 = lördag
    idagText?: string;
    pris: { rubrik: string; belopp: string; text: string };
    kontakt: { rubrik: string; text: string; epost?: Lank };
  };
  tjanster: { id: string; rubrik: string; ingress?: string; poster: { namn: string; text: string; lank: Lank; ikon: 'ryggrad' | 'nal' | 'vag' | 'foretag' }[] };
  person: { id: string; overrad: string; rubrik: string; citat: string; text: string[]; fakta: string[]; bild?: Bild; lank: Lank };
  fortroende: { rubrik: string; betyg: { varde: string; skala: string; antal: string; kalla: string }; citat: { text: string; kalla: string }[]; lank?: Lank;
    kontroll?: string; // om och hur omdömena kontrolleras (12 c § marknadsföringslagen; guide/2-7-innehall.md)
  };
  process: { rubrik: string; steg: { rubrik: string; text: string }[]; not?: string };
  nastaSteg: { rubrik: string; text: string };
  sidfot: { platser: { namn: string; adress: string; karta?: KartLank }[]; epost?: Lank; sociala: Lank[]; rad: string;
    sidor?: Lank[]; rubriker?: { platser: string; kontakt: string; sidor: string };
    policy?: Lank[]; // Integritet och kakor, Tillgänglighet
  };
}
