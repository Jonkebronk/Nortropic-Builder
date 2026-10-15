// Startsidans innehåll. Sektionerna har ingen egen text (guide/2-4-skelett.md); allt kommer härifrån.
import type { ImageMetadata } from 'astro';

export interface Lank { text: string; href: string; }
// En kartlänk går till Google Maps, och på Apple-enheter till Apple Kartor om apple är satt (Sida.astro).
export interface KartLank extends Lank { apple?: string; }
export interface Bild { src: ImageMetadata | string; alt: string; width?: number; height?: number; }

export interface StartInnehall {
  forst?: 'praktiskt' | 'tjanster'; // sektionen efter första vyn; branschen avgör (guide/2-4-skelett.md), standard 'praktiskt'
  nyFlikText?: string; // för skärmläsare när en länk öppnas i ny flik på datorn, t.ex. "(öppnas i ny flik)"
  titel: string;
  beskrivning: string;
  foretag: { namn: string; logotyp?: Bild; favikon?: string; hemskarmsikon?: string; delningsbild?: string };
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
  fortroende: { rubrik: string; betyg: { varde: string; skala: string; antal: string; kalla: string }; citat: { text: string; kalla: string }[]; lank?: Lank };
  process: { rubrik: string; steg: { rubrik: string; text: string }[]; not?: string };
  nastaSteg: { rubrik: string; text: string };
  sidfot: { platser: { namn: string; adress: string; karta?: KartLank }[]; epost?: Lank; sociala: Lank[]; rad: string;
    sidor?: Lank[]; rubriker?: { platser: string; kontakt: string; sidor: string } };
}
