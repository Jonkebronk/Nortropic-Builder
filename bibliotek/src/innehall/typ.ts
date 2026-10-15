// Startsidans innehåll. Sektionerna har ingen egen text (guide/2-4-skelett.md); allt kommer härifrån.
import type { ImageMetadata } from 'astro';

export interface Lank { text: string; href: string; }
export interface Bild { src: ImageMetadata | string; alt: string; width?: number; height?: number; }

export interface StartInnehall {
  titel: string;
  beskrivning: string;
  foretag: { namn: string; logotyp?: Bild };
  boka: Lank & { kort?: string }; // kort: texten i sidhuvudet
  ring: Lank & { nummer: string };
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
    platser: { namn: string; adress: string; dagar: { dag: string; tid: string }[]; karta: Lank }[];
    pris: { rubrik: string; belopp: string; text: string };
    kontakt: { rubrik: string; text: string; epost?: Lank };
  };
  tjanster: { id: string; rubrik: string; ingress?: string; poster: { namn: string; text: string; lank: Lank; ikon: 'ryggrad' | 'nal' | 'vag' | 'foretag' }[] };
  person: { id: string; overrad: string; rubrik: string; citat: string; text: string[]; fakta: string[]; bild?: Bild; lank: Lank };
  fortroende: { rubrik: string; betyg: { varde: string; skala: string; antal: string; kalla: string }; citat: { text: string; kalla: string }[] };
  process: { rubrik: string; steg: { rubrik: string; text: string }[]; not?: string };
  nastaSteg: { rubrik: string; text: string };
  sidfot: { platser: { namn: string; adress: string }[]; epost?: Lank; sociala: Lank[]; rad: string };
}
