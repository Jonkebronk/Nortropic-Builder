// Startsidans innehåll. Sektionerna har ingen egen text (guide/2-4-skelett.md); allt kommer härifrån.
import type { ImageMetadata } from 'astro';

// delar: sidor som hör till länken, t.ex. behandlingssidorna under Behandlingar, så att menyn kan markera var besökaren är (aria-current).
export interface Lank { text: string; href: string; delar?: string[]; }
// En kartlänk går till Google Maps, och på Apple-enheter till Apple Kartor om apple är satt (Sida.astro).
export interface KartLank extends Lank { apple?: string; }
export interface Bild { src: ImageMetadata | string; alt: string; width?: number; height?: number; }

export interface StartInnehall {
  forst?: 'praktiskt' | 'tjanster'; // sektionen efter första vyn; branschen avgör (guide/2-4-skelett.md), standard 'praktiskt'
  // Samtyckesverktyget, bara när sajten har statistik eller annonser med kakor (BESLUT.md 2026-10-16, Kakor och samtycke vid behov).
  // logg: adressen dit valet skickas, t.ex. '/api/samtycke' (GDPR art. 7.1). googleSamtyckeslage: Consent Mode v2-signaler till Googles taggar.
  // version: höjs när rutans text ändras, så att alla tillfrågas igen; texterna per version arkiveras hos sajten. giltighetDagar: standard 182.
  // kvitto: bekräftelsen efter svaret (ja, nej eller egna val), med hur man ändrar sig och att sidan laddas om när ett ja tas tillbaka.
  samtycke?: { version: number; giltighetDagar?: number; rubrik: string; text: string; lank?: Lank; godkann: string; neka: string; valj: string; dolj: string; spara: string; installningar: string;
    kategorier: { id: 'statistik' | 'marknadsforing'; namn: string; text: string }[]; logg?: string; googleSamtyckeslage?: boolean;
    kvitto: { ja: string; nej: string; val: string; andra: string; stang: string; omladdning: string } };
  // Skript som kräver samtycke, till exempel Google Analytics eller Meta-pixeln. De laddas först när besökaren har sagt ja till kategorin.
  // verktyg: det som visas i kaklistan på sidan Integritet och kakor (PTS: namn, ändamål, tredjepart och lagringstid).
  taggar?: { kategori: 'statistik' | 'marknadsforing'; src?: string; kod?: string;
    // mottagare: vem som får uppgifterna, t.ex. "Uppgifterna skickas till Google." (PTS; kvalitetsgranskningen 2026-10-16, U4). doman: var en tredjepartskaka sätts.
    verktyg?: { namn: string; leverantor: string; mottagare?: string; policy?: Lank; kakor: { namn: string; doman?: string; andamal: string; lagringstid: string; tredjepart: boolean }[] } }[];
  nyFlikText?: string; // för skärmläsare när en länk öppnas i ny flik på datorn, t.ex. "(öppnas i ny flik)"
  titel: string;
  beskrivning: string;
  // form och orgnr: organisationsnumret visas i sidfoten för bolag men inte för en enskild firma, där det är ägarens personnummer (BESLUT.md 2026-10-16).
  // favikon 48 px och favikonStor 96 px (Google Search Central, Favicon in Search: en multipel av 48 px); delningsbildText är bildens alt-text vid delning.
  foretag: { namn: string; form?: 'bolag' | 'enskild'; orgnr?: string; logotyp?: Bild; favikon?: string; favikonStor?: string; hemskarmsikon?: string; delningsbild?: string; delningsbildText?: string };
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
    // idag: en rad under ingressen med dagens mottagning ur praktiskt.platser, t.ex. "I dag, tisdag: Lund 8.00–17.00".
    // stangt inleder raden en dag utan mottagning, följt av nästa dag med mottagning.
    // stangtNu: texten före nästa mottagning när dagens mottagning har stängt, t.ex. "Stängt för i dag. Nästa mottagning:".
    idag?: { text: string; stangt: string; stangtNu?: string };
    bild?: Bild;
  };
  praktiskt: {
    rubrik: string;
    // nr: 0 = söndag … 6 = lördag. sida: mottagningens egen sida, om sajten har en per ort.
    platser: { namn: string; adress: string; dagar: { dag: string; tid: string; nr?: number }[]; karta: KartLank; sida?: Lank }[];
    idagText?: string;
    pris: { rubrik: string; belopp: string; text: string };
    kontakt: { rubrik: string; text: string; epost?: Lank };
  };
  tjanster: { id: string; rubrik: string; ingress?: string; poster: { namn: string; text: string; lank: Lank; ikon: 'ryggrad' | 'nal' | 'vag' | 'foretag' }[] };
  person: { id: string; overrad: string; rubrik: string; citat: string; text: string[]; fakta: string[]; bild?: Bild; lank: Lank };
  fortroende: { id?: string; rubrik: string; betyg: { varde: string; skala: string; antal: string; kalla: string }; citat: { text: string; kalla: string }[]; lank?: Lank;
    kontroll?: string; // om och hur omdömena kontrolleras (12 c § marknadsföringslagen; guide/2-7-innehall.md)
  };
  process: { rubrik: string; steg: { rubrik: string; text: string }[]; not?: string };
  nastaSteg: { rubrik: string; text: string };
  // om: en kort rad under namnet, t.ex. vem som tar emot. dagar: när mottagningen har öppet, under adressen.
  sidfot: { om?: string; platser: { namn: string; adress: string; dagar?: string; karta?: KartLank }[]; epost?: Lank; sociala: Lank[]; rad: string;
    sidor?: Lank[]; rubriker?: { platser: string; kontakt: string; sidor: string };
    policy?: Lank[]; // Integritet och kakor, Tillgänglighet
  };
}
