// Provinnehåll för provsidan. Verksamheten är påhittad och inga uppgifter kommer från en riktig firma,
// så att biblioteket kan ligga i det publika repot (guide/2-4-skelett.md, provsidan).
import type { StartInnehall } from './typ';

export const provinnehall: StartInnehall = {
  titel: 'Exempelkliniken – kiropraktor i Exempelstad (provinnehåll)',
  beskrivning: 'Provsida för bibliotekets sektioner med påhittat innehåll.',
  foretag: { namn: 'Exempelkliniken' },
  nyFlikText: '(öppnas i ny flik)',
  boka: { text: 'Boka tid online', kort: 'Boka tid', href: '#boka' },
  ring: { text: 'Ring 010-000 00 00', href: 'tel:+46100000000', nummer: '010-000 00 00' },
  nav: [
    { text: 'Behandlingar', href: '#behandlingar' },
    { text: 'Om oss', href: '#om' },
    { text: 'Priser och tider', href: '#praktiskt' },
    { text: 'Kontakt', href: '#praktiskt' },
  ],
  forstavy: {
    overrad: 'Legitimerad kiropraktor',
    rubrik: 'Kiropraktor i Exempelstad och Provby',
    ingress: 'Vi tar emot i Exempelstad på måndagar och onsdagar och i Provby resten av veckan.',
    markering: '500 kr per besök',
  },
  praktiskt: {
    rubrik: 'Var och när',
    platser: [
      { namn: 'Exempelstad', adress: 'Provgatan 1, 100 00 Exempelstad', dagar: [{ dag: 'Måndag', tid: '8.00–17.00' }, { dag: 'Onsdag', tid: '8.00–19.00' }], karta: { text: 'Vägbeskrivning', href: '#' } },
      { namn: 'Provby', adress: 'Testvägen 2, 200 00 Provby', dagar: [{ dag: 'Tisdag', tid: '8.00–17.00' }, { dag: 'Torsdag', tid: '8.00–17.00' }, { dag: 'Fredag', tid: '8.00–12.00' }], karta: { text: 'Vägbeskrivning', href: '#' } },
    ],
    pris: { rubrik: 'Pris', belopp: '500 kr', text: 'per besök. Första besöket kostar lika mycket.' },
    kontakt: { rubrik: 'Ring', text: 'Vi svarar mellan behandlingarna och ringer tillbaka samma dag.' },
  },
  tjanster: {
    id: 'behandlingar',
    rubrik: 'Behandlingar',
    poster: [
      { namn: 'Kiropraktik', text: 'Undersökning och behandling av leder och muskler.', lank: { text: 'Om kiropraktik', href: '#' }, ikon: 'ryggrad' },
      { namn: 'Akupunktur', text: 'Behandling med tunna nålar.', lank: { text: 'Om akupunktur', href: '#' }, ikon: 'nal' },
      { namn: 'Stötvåg', text: 'Tryckvågar mot långvarig värk i senor.', lank: { text: 'Om stötvåg', href: '#' }, ikon: 'vag' },
      { namn: 'För företag', text: 'Behandling för anställda.', lank: { text: 'För företag', href: '#' }, ikon: 'foretag' },
    ],
  },
  person: {
    id: 'om',
    overrad: 'Om oss',
    rubrik: 'Exempel Exempelsson, legitimerad kiropraktor',
    citat: 'Här står ett citat i ägarens egna ord.',
    text: ['Här står ett par meningar om personen bakom verksamheten.'],
    fakta: ['Legitimerad kiropraktor', 'Har drivit kliniken sedan 2000'],
    lank: { text: 'Mer om oss', href: '#' },
  },
  fortroende: {
    rubrik: 'Vad patienterna säger',
    betyg: { varde: '4,8', skala: 'av 5 på Exempelsajten', antal: '20 omdömen', kalla: 'Hämtat 1 januari 2026' },
    citat: [
      { text: 'Ett kort omdöme från en patient.', kalla: 'Omdöme på Exempelsajten, 2025' },
      { text: 'Ett andra omdöme, lite längre, för att pröva hur kortet växer när texten blir längre.', kalla: 'Omdöme på Exempelsajten, 2025' },
      { text: 'Ett tredje omdöme.', kalla: 'Omdöme på Exempelsajten, 2024' },
    ],
  },
  process: {
    rubrik: 'Så går första besöket till',
    steg: [
      { rubrik: 'Du berättar', text: 'Om dina besvär och hur de började.' },
      { rubrik: 'Undersökning', text: 'Rörlighet, reflexer och tester.' },
      { rubrik: 'Behandling', text: 'Om besvären går att behandla börjar vi direkt.' },
    ],
  },
  nastaSteg: { rubrik: 'Boka tid i Exempelstad eller Provby', text: 'Välj en tid som passar, eller ring så hjälper vi dig.' },
  sidfot: {
    platser: [{ namn: 'Exempelstad', adress: 'Provgatan 1' }, { namn: 'Provby', adress: 'Testvägen 2' }],
    sociala: [],
    rad: 'Provsida med påhittat innehåll.',
  },
};
