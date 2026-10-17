// Nortropics enkät: riktiga människor väljer mellan två eller tre sajter (BESLUT.md 2026-10-17, *Riktiga människor dömer sajten,
// med en enkel enkät*; kunskap/research/2026-10-17_granskningsrad-och-processen.md, F1 och F3).
//
// Skriptet körs som webbapp i Johnnys Google-konto, och bara han kommer åt den (appsscript.json: executeAs USER_DEPLOYING,
// access MYSELF). Claude lägger ett test i Drive-mappen MAPP: en undermapp med enkat.json och en bild per alternativ.
// Johnny öppnar webbappen och trycker Skapa. Skriptet skapar formuläret med Forms-API:t, med en bild per svarsalternativ
// i blandad ordning per person (ChoiceQuestion.shuffle), publicerar det för alla med länken, kopplar svaren till ett
// kalkylark i samma mapp och skriver skapad.json. Inga e-postadresser samlas in.
// Källor: Forms API, REST Resource: forms (ChoiceQuestion.shuffle, Option.image, publishSettings) och guiden
// Publish and manage responders (Drive permissions type anyone, view published), lästa 2026-10-17.
//
// enkat.json:
// { "titel": "Snabb fråga", "fraga": "Om du behövde en kiropraktor i Malmö: hos vilket företag skulle du hellre boka?",
//   "alternativ": [ { "etikett": "Sajt X", "bild": "x.jpg", "kalla": "vår sajt" }, { "etikett": "Sajt Y", "bild": "y.jpg", "kalla": "originalet" } ],
//   "notering": "Bilderna är privata: sprid dem inte." }
// "kalla" visas aldrig i formuläret; den finns bara för Claudes sammanställning.

const MAPP = 'Nortropic enkäter';
const FORMS = 'https://forms.googleapis.com/v1/forms';
const DRIVE = 'https://www.googleapis.com/drive/v3/files';

function doGet(e) {
  const p = (e && e.parameter) || {};
  let besked = '';
  try {
    if (p.skapa) besked = skapa(p.skapa);
    if (p.stang) besked = stang(p.stang);
  } catch (fel) {
    besked = '<p class="fel">Det gick inte: ' + esc(String(fel && fel.message || fel)) + '</p>';
  }
  return HtmlService.createHtmlOutput(sida(besked)).setTitle('Nortropics enkäter').addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function huvudmapp() {
  const it = DriveApp.getFoldersByName(MAPP);
  if (!it.hasNext()) throw new Error('Mappen "' + MAPP + '" finns inte i Drive.');
  return it.next();
}

function lasJson(mapp, namn) {
  const it = mapp.getFilesByName(namn);
  return it.hasNext() ? JSON.parse(it.next().getBlob().getDataAsString('UTF-8')) : null;
}

function anrop(metod, url, kropp) {
  const svar = UrlFetchApp.fetch(url, {
    method: metod, contentType: 'application/json', muteHttpExceptions: true,
    headers: { Authorization: 'Bearer ' + ScriptApp.getOAuthToken() },
    payload: kropp ? JSON.stringify(kropp) : undefined,
  });
  const kod = svar.getResponseCode(), text = svar.getContentText();
  if (kod >= 300) throw new Error(metod.toUpperCase() + ' ' + url.replace(/\?.*/, '') + ' gav ' + kod + ': ' + text.slice(0, 400));
  return text ? JSON.parse(text) : {};
}

function skapa(mappId) {
  const mapp = DriveApp.getFolderById(mappId);
  if (lasJson(mapp, 'skapad.json')) return '<p>Enkäten finns redan.</p>';
  const k = lasJson(mapp, 'enkat.json');
  if (!k) throw new Error('enkat.json saknas i ' + mapp.getName());

  // Bilderna delas med länk, så att Forms kan hämta dem när alternativen skapas (sourceUri).
  const bilder = k.alternativ.map(function (a) {
    const it = mapp.getFilesByName(a.bild);
    if (!it.hasNext()) throw new Error('Bilden ' + a.bild + ' saknas.');
    const f = it.next();
    f.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    return 'https://drive.google.com/uc?export=view&id=' + f.getId();
  });

  const form = anrop('post', FORMS, { info: { title: k.titel, documentTitle: 'Enkät: ' + mapp.getName() } });
  const id = form.formId;
  anrop('post', FORMS + '/' + id + ':batchUpdate', { requests: [
    { updateFormInfo: { info: { description: k.notering || '' }, updateMask: 'description' } },
    { createItem: { location: { index: 0 }, item: { title: k.fraga, questionItem: { question: { required: true, choiceQuestion: {
      type: 'RADIO', shuffle: true,
      options: k.alternativ.map(function (a, i) { return { value: a.etikett, image: { sourceUri: bilder[i], altText: a.etikett, properties: { alignment: 'CENTER', width: 360 } } }; }),
    } } } } } },
    { createItem: { location: { index: 1 }, item: { title: 'Varför? Ett par ord räcker.', questionItem: { question: { required: false, textQuestion: { paragraph: true } } } } } },
    { createItem: { location: { index: 2 }, item: { title: 'Har du sett någon av sajterna förut?', questionItem: { question: { required: false, choiceQuestion: {
      type: 'RADIO', options: k.alternativ.map(function (a) { return { value: 'Ja, ' + a.etikett }; }).concat([{ value: 'Nej' }, { value: 'Vet inte' }]),
    } } } } } },
  ] });
  // E-post samlas inte in. Inställningen prövas för sig, så att ett okänt fält inte stoppar resten.
  try { anrop('post', FORMS + '/' + id + ':batchUpdate', { requests: [{ updateSettings: { settings: { emailCollectionType: 'DO_NOT_COLLECT' }, updateMask: 'emailCollectionType' } }] }); } catch (fel) { /* standard är att inte samla in */ }

  anrop('post', FORMS + '/' + id + ':setPublishSettings', { publishSettings: { publishState: { isPublished: true, isAcceptingResponses: true } } });
  anrop('post', DRIVE + '/' + id + '/permissions', { type: 'anyone', role: 'reader', view: 'published' });

  const ark = SpreadsheetApp.create('Svar: ' + mapp.getName());
  DriveApp.getFileById(ark.getId()).moveTo(mapp);
  DriveApp.getFileById(id).moveTo(mapp);
  FormApp.openById(id).setDestination(FormApp.DestinationType.SPREADSHEET, ark.getId());

  const klar = anrop('get', FORMS + '/' + id);
  const lank = klar.responderUri;
  mapp.createFile('skapad.json', JSON.stringify({ formId: id, lank: lank, svarsark: ark.getId(), skapad: new Date().toISOString() }, null, 1), 'application/json');
  return '<p>Enkäten är skapad.</p>';
}

function stang(mappId) {
  const mapp = DriveApp.getFolderById(mappId);
  const s = lasJson(mapp, 'skapad.json');
  if (!s) throw new Error('Enkäten är inte skapad.');
  anrop('post', FORMS + '/' + s.formId + ':setPublishSettings', { publishSettings: { publishState: { isPublished: true, isAcceptingResponses: false } } });
  const k = lasJson(mapp, 'enkat.json');
  (k ? k.alternativ : []).forEach(function (a) { const it = mapp.getFilesByName(a.bild); if (it.hasNext()) it.next().setSharing(DriveApp.Access.PRIVATE, DriveApp.Permission.NONE); });
  mapp.createFile('stangd.json', JSON.stringify({ stangd: new Date().toISOString() }), 'application/json');
  return '<p>Enkäten är stängd, och bilderna delas inte längre.</p>';
}

function sida(besked) {
  const bas = ScriptApp.getService().getUrl();
  const rader = [];
  const it = huvudmapp().getFolders();
  while (it.hasNext()) {
    const m = it.next(), k = lasJson(m, 'enkat.json'); if (!k) continue;
    const s = lasJson(m, 'skapad.json'), stangd = m.getFilesByName('stangd.json').hasNext();
    let del = '<h2>' + esc(m.getName()) + '</h2>';
    if (!s) del += '<p><a class="knapp" href="' + bas + '?skapa=' + m.getId() + '" target="_top">Skapa enkäten</a></p>';
    else {
      const text = 'Hej! Har du en minut? Jag testar två hemsidor och vill veta vilken du gillar bäst. Svara här: ' + s.lank + ' (Bilderna är privata, så sprid dem gärna inte.)';
      del += '<p>Länk: <a href="' + s.lank + '" target="_blank">' + esc(s.lank) + '</a></p>'
        + '<p>Text att klistra in:</p><textarea readonly onclick="this.select()">' + esc(text) + '</textarea>'
        + (stangd ? '<p>Stängd.</p>' : '<p><a href="' + bas + '?stang=' + m.getId() + '" target="_top">Stäng enkäten</a></p>');
    }
    rader.push(del);
  }
  return '<style>body{font:16px/1.5 system-ui,sans-serif;margin:16px;max-width:40rem}textarea{width:100%;min-height:7rem;font:inherit}'
    + '.knapp{display:inline-block;padding:.6rem 1rem;background:#1f3d33;color:#fff;border-radius:8px;text-decoration:none}.fel{color:#a00}</style>'
    + '<h1>Nortropics enkäter</h1>' + besked + (rader.join('') || '<p>Inga test i mappen ännu.</p>');
}

function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
