# Guidepup

**Källa:** https://github.com/guidepup/guidepup, HEAD `1ed1d1102e8864136558aff8dd26341913b4c8ab` (2026-10-16), senaste release 0.36.3 (2026-10-15; samma på npm). Syskonrepon: [guidepup/setup](https://github.com/guidepup/setup) vid `e95d4606e9c39af2cd279565d948a0b39a38ab81` (0.29.3) och [guidepup/guidepup-playwright](https://github.com/guidepup/guidepup-playwright) vid `c257b305a514f8c6307022055ddb6a9c776046b8` (0.20.0). Lästa 2026-10-16: alla tre README, `package.json`, `manifest.json`, `src/macOS/VoiceOver/VoiceOver.ts` (start och stopp), setup-källan för macOS (`setup.ts`, `updateTccDb.ts` början, `enableAppleScriptControlSystemDefaults.ts`, `disableSplashScreenSystemDefaults.ts`, `disableDictationInputAutoEnable.ts`, `enableDoNotDisturb.ts`, `writeDatabaseFile.ts`, `checkVersion.ts`), releaserna 0.33.1–0.36.3, de 12 öppna ärendena (titlar) och [#177](https://github.com/guidepup/guidepup/issues/177), [#178](https://github.com/guidepup/guidepup/issues/178) och [#183](https://github.com/guidepup/guidepup/issues/183), samt [Manual VoiceOver setup](https://www.guidepup.dev/docs/guides/manual-voiceover-setup) (sidan saknar datum). Rapporter: `andra-varvet/skelett-struktur-jamforelse.md` och `andra-varvet/mcp-jamforelse.md`. ⚠️ Ingenting är installerat eller kört. Repot `guidepup/voiceover`, där VoiceOver-profilen byggs, är inte läst.
**Licens:** MIT för alla tre repona (`gh api`). Vi skriver egna prov med biblioteket som beroende och sprider inget.

## Vad det är
Ett Node-bibliotek som styr riktiga skärmläsare – VoiceOver på macOS, NVDA på Windows och Orca på Linux (förhandsversion) – och läser upp det de säger som text. Med `@guidepup/playwright` öppnar Playwright sidan och Guidepup går igenom den som en skärmläsaranvändare. Ingen MCP; den enda MCP-varianten har 0 stjärnor (`andra-varvet/mcp-jamforelse.md`).

## Hur det fungerar
- **API:t** följer skärmläsarens kommandon: `start`, `next`, `nextHeading`, `nextLandmark`, `act`, `perform(keyboardCommands…)`, `lastSpokenPhrase` och `spokenPhraseLog` (README). Med Playwright: `voiceOverTest`, `navigateToWebContent()` och `withGuidepup`, som kör proven i tur och ordning med synlig webbläsare (pw-README).
- **VoiceOver styrs med AppleScript.** `start()` stänger VoiceOver, monterar Guidepups egen VoiceOver-profil (en DMG per macOS-version i `manifest.json`; `guidepup-voiceover-preferences-macos-26.dmg` för macOS 26) och startar VoiceOver. `stop()` avmonterar profilen. Sedan 0.36.0 tas inga profiler bort som Guidepup inte skapat (#163 i releasen).
- **`npx @guidepup/setup install`** hämtar profilen från GitHubs releaser till `~/Library/Caches/guidepup/` (setup-README). Manifestet har en sha256 per fil, och setup har `verify-asset-checksum.ts` (inte läst ⚠️).
- **`npx @guidepup/setup setup`** ändrar systemet: `defaults write` för VoiceOvers AppleScript-styrning, VoiceOvers välkomstruta och diktering (`AppleDictationAutoEnable false`), och försöker skriva behörigheter i användarens och systemets TCC-databas för bland annat `sshd`, `bash`, `zsh`, `osascript` och Terminal (`setup.ts:28–46`, `updateTccDb.ts`). Med SIP påslaget misslyckas systemdelen, och verktyget väntar på att någon slår på AppleScript-styrningen för hand.

## Kvalitet och underhåll
- 576 stjärnor, 20 forkar, 9 bidragsgivare, senaste push 2026-10-16, 12 öppna ärenden (`gh api`, 2026-10-16). Före 1.0: fem releaser i oktober. Underhållaren skriver att han själv sitter på macOS 12 och bygger profilerna på GitHubs CI-maskiner (#178).
- **Kända problem:**
  - #177 (stängt 2026-10-16): på macOS med annat språk än engelska känns AppleEvent-tidsgränsen inte igen, så `voiceOver.start()` försöker inte igen och misslyckas. Rättat i `8650349f94e5` på main, men **inte i release 0.36.3**. Johnnys Mac har svenska först (`defaults read -g AppleLanguages`: `sv-SE`, `en-US`).
  - #178 (öppet): på macOS 27.0.1 ger Guidepups profil tomma fraser. Johnnys Mac har macOS 26.3, som har en egen profil.
  - #183 (öppet): tal som kommer utan ett metodanrop fångas inte, till exempel en levande region som svarar efter en fördröjning.

## Det bästa vi kan ta
1. **Prov med VoiceOver på övningssajten**, som skript och inspelad utdata: det `guide/2-4-skelett.md:103` (N2) och kontroll C41 (`bilaga-c`, "För hand") kräver men saknar verktyg för.
2. **Talloggen som belägg:** `spokenPhraseLog()` sparas som JSON per sida, bredvid skärmbilderna, så att Johnny kan läsa vad VoiceOver säger.

**Vad provet ska visa** (förväntat ur bibliotekets kod i `bibliotek/src/sektioner/`, inte prövat ⚠️):
- **Rubriker:** `nextHeading` från toppen läser h1 och sedan varje h2 i sidans ordning.
- **Landmärken:** `nextLandmark` når sidhuvudet, *Huvudmeny*, huvudinnehållet, kontaktlisten (*Boka eller ring*, `Kontaktlist.astro:23`) och sidfoten.
- **Menyn** (popover, `Sidhuvud.astro`): Meny läses som knapp. Efter `act()` står VoiceOver på stängknappen i panelen (`autofocus`), Escape stänger och markören är tillbaka på Meny.
- **Vanliga frågor** (`<details name>`, `Fragor.astro`): varje fråga läses med roll och läge, hopfälld eller utfälld. Efter `act()` läses svaret med `next()`, och när en annan fråga öppnas stängs den förra.
- **Samtycket:** kvittot med `role="status"` (`Samtycke.astro:40`) läses upp direkt efter valet. Läs talet direkt efter `act()` (#183).
- **Kontaktlistens länkar** har namn som säger vad som händer.

## Var det hamnar hos oss
**Beslut 2026-10-16 kl. 19.38: släpp.** Johnny: *"vi kör inte denna test metodik."* (`BESLUT.md`, *VoiceOver på Macen med Guidepup används inte*). Texten nedan står kvar som historik.

**Provet på Johnnys Mac 2026-10-16** (macOS 26.3, Node 24.22, Guidepup 0.36.3, svenskt språk):
- **Monteringen av Guidepups inställningar** skapar länkar i `~/Library/Group Containers/group.com.apple.VoiceOver/Library/Preferences/` och gav `EPERM`, också i Johnnys eget terminalfönster. Appgruppers behållare skyddas av SIP sedan Sequoia (Apple Developer Forums, tråd 756701). Med fullständig skivåtkomst för Terminal gick monteringen igenom. Guidepup har inget sätt att hoppa över steget; provet kopplade bort `mountGuidepupPreferences` och körde VoiceOver med användarens egna inställningar, som i ärende #178.
- **Starten:** VoiceOver kom igång på 0,5 s med `VoiceOverStarter` men svarade på AppleScript först efter cirka 1,6 s. Guidepup väntar 500 ms och aktiverar sedan; felet `-600` (appen är inte öppen) ger inget omförsök, bara en tidsgräns med engelsk text (ärende #177, rättat i `main` 2026-10-16, inte utgivet). Omförsök i provet löste det.
- **Svenska:** `@guidepup/playwright` letar efter orden *item chooser* och *web content* för att nå webbinnehållet, och fungerar därför inte på en svensk Mac. Provet tryckte Tab in på sidan i stället.
- **Utfallet:** startsidan lästes i rätt ordning med namngivna landmärken och rubriker, men tre av cirka 55 rader var mätfel (Safari svarade inte vid första Tab, två tomma fraser och en överhoppad rubrik). Inget nytt fynd jämfört med axe och kontrollskriptet.
- **Varför metoden valdes bort:** fel skärmläsare för sajternas besökare (på mobil använder 70,6 % VoiceOver på iPhone; på dator har VoiceOver på Mac 9,7 %, 📄 [WebAIM, Screen Reader User Survey #10](https://webaim.org/blog/screen-reader-user-survey-10-results/)), den mäter text och inte upplevelse (📄 [GOV.UK Service Manual, Testing with assistive technologies](https://www.gov.uk/service-manual/technology/testing-with-assistive-technologies)), och den är skör.

**Placeringen "senare: N2" är inaktuell.** Den står som beslut i fältet `beslut` ("Ja på alla", omkring 17.40), men samma minut beslutade Johnny *"BrowserStack och VoiceOver (Rekommenderas)"*: VoiceOver prövas med Guidepup när han själv har slagit på automationen (`BESLUT.md`, sista avsnittet). Förslag till huvudsessionen: **skill: kvalitet** (`tillganglighet.md`, *Hjälpmedel*), med en hänvisning från `skelett/interaktion.md` för menyn och frågorna, och C41 från "För hand" till "skript, rapport". Ett prov med skärmläsare blir aldrig grind: utfallet beror på VoiceOvers version och språk.

**Det Johnny slår på själv** (Guidepups manuella väg; Claude ändrar inga system- eller säkerhetsinställningar):
1. **VoiceOver-verktyget** (sök i Spotlight) → fliken *Allmänt* → kryssa i *"Allow VoiceOver to be controlled with AppleScript"* (den svenska etiketten är inte kontrollerad ⚠️).
2. **Systeminställningar → Integritet och säkerhet → Hjälpmedel:** lägg till terminalprogrammet som Claude Code körs i med +, ange administratörslösenordet och kryssa i det.
3. **Automatisering:** godkänn rutorna första gången terminalen vill styra VoiceOver eller System Events.

**Inte** `npx @guidepup/setup setup`: den försöker ge många program behörigheter och ändrar dikteringen, som ovan. **Aldrig** SIP av; Guidepup varnar själv för *"serious security implications"*. Efter Johnnys tre steg kan Claude installera `@guidepup/guidepup` och `@guidepup/playwright` som utvecklingsberoenden i en egen provmapp, inte i sajterna, och köra `npx @guidepup/setup install`.

## Passar vår stack?
Ja. Playwright finns redan, och Guidepups exempel för VoiceOver kör Playwrights WebKit (`Desktop Safari`). Men Playwrights WebKit är inte Safari, och VoiceOver på Macen är inte VoiceOver på iPhone. GOV.UK:s minsta uppsättning börjar med VoiceOver på iOS (`kvalitet/tillganglighet.md`, *Hjälpmedel*); den delen hör till BrowserStack eller Johnnys iPhone.

## Risker och flaggor
- **Hjälpmedelsbehörigheten gäller allt som körs i terminalen**, också Claude Codes kommandon: de kan då styra Macen med tangenttryck. Förslag: ett eget terminalprogram för proven, eller ta bort behörigheten efteråt. Johnny avgör.
- **Macen är upptagen** medan provet går: VoiceOver talar högt och tar tangentbordet, och webbläsaren syns.
- **Svenska systemspråket:** rättelsen #177 finns bara på main. Vänta på nästa release eller lås till commit `8650349f94e5` eller senare ⚠️. Talloggens ord (*rubrik*, *knapp*) följer VoiceOvers språk, så ögonblicksbilder jämförs bara på samma Mac och version.
- **Förhandsversion:** fem releaser på en månad; versionen låses.
- Ingen telemetri i det lästa (beroendena är `dbus-native`, `debug` och `plist`), ingen betalvägg.

## Inloggning
Inget konto. Administratörslösenordet på Macen för behörigheten i steg 2, och det skriver Johnny själv.
