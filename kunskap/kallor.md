# Källor

Källistan ur implementeringsguiden v0.74, flyttad hit vid konsolideringen 2026-10-15. Guiden v1.0 (`guide/`) hänvisar till källorna med korta namn (t.ex. *Shopify-videon*); här finns titel, datum och adress. Transkripten finns i `kunskap/raw/videor/` (används bara internt), researchen i `kunskap/research/`.

**Om källäget** (konsolideringsanalysen §4.1): 44 av 74 transkript kommer från AI LABS, 18 från Nate Herk, 10 från Jack Roberts och ett vardera från Tristen O'Brien och The Coding Sloth. Bänken räknas per primärkälla, inte per kanal (`guide/README.md`).

**Behandlade men inte införda:** Jack Roberts *Claude Just Solved Motion Design* (hNpC5clEbp4, videoredigering), *Fable 5.1 Just Solved AI Slop* (X2PARg8ErvY, modelljämförelse med en prompt), *I Gave AI 10,000 UI Screens* (BYQdA7kMmbA, sponsrad av Base44; upprepar tidigare video).

## Kortnamnen

Tabellen är nyckeln till guidens kortnamn: en rad per video, i bokstavsordning efter kortnamn. Varje kortnamn är spårat genom ändringsloggen (`historik/guide-andringslogg.md`, *"Utifrån X-videon"*), källistan och fallgroparna i `historik/IMPLEMENTERINGSGUIDE-v0.74.md` och transkripten (`kunskap/raw/videor/index.md`). Kanal, titel och datum är transkriptens. Vad varje video bidrog med, per avsnitt i v0.74, står kvar i källistan i `historik/IMPLEMENTERINGSGUIDE-v0.74.md` (rad 6–81).

- **Används i:** filerna i `guide/` utan ändelse: `2-5` = `2-5-yta.md`; 1, 4 och 5 = `1-kundens-vag.md`, `4-foretaget.md` och `5-byggplan.md`; A–F = bilagorna; n1 = `n1-forsta-sajten.md` (genererad). Läget 2026-10-15 kl. 14.40. Guidefilerna rättas samtidigt, så kolumnen kan halka efter. Varianter och kanalnamn (se *Byt kortnamn*) räknas till den video de avser.
- **Varianter** står efter kortnamnet. *Föreslaget* betyder att kortnamnet ersätter ett tvetydigt; bytet står under *Byt kortnamn*.
- **⚠️ efter titeln:** sponsring eller andrahandskälla, ur den tidigare källistan.
- **Jack Roberts-videon 2–4** är numrerade i den ordning de fördes in (v0.65–0.67). Den första (v0.45) heter nu *Jack Roberts Motion Design-videon*.

| Kortnamn | Kanal | Titel | Datum | URL | Används i |
|---|---|---|---|---|---|
| *1-person-videon* | Nate Herk | *Anthropic’s CEO: How to Build a 1 Person Business with Claude* ⚠️ Darios filter i Nates tolkning | 2026-09-18 | https://www.youtube.com/watch?v=QDsenEcAJIk | 3-1, 4, C |
| *4 Ways-videon* (variant: *"4 Ways"-videon*) | AI LABS | *4 Ways to Actually Build Stunning Websites with Claude Code* | 2026-06-13 | https://www.youtube.com/watch?v=HqD5a2Cae60 | 2-2, 2-4, 2-5, 2-7, 2-8, 3-3, 3-4, A, C, n1 |
| *5000-timmarsvideon* (i uppräkningar *5000-timmars-*) | Nate Herk | *5000 Hours of Building AI in Just 17 Minutes* | 2026-08-04 | https://www.youtube.com/watch?v=7WZ6XldxX0U | 2-1, 2-2, 2-9, 3-1, 4, C, n1 |
| *ADHD-videon* | AI LABS | *This New Skill Finally Solves Thinking For AI Agents* | 2026-07-22 | https://www.youtube.com/watch?v=m6IXL_YGqBQ | 2-4, 2-5, 3-2, A, C, D, n1 |
| *ADLC-videon* | AI LABS | *ADLC: Claude Code's New Lifecycle for AI Coding* | 2026-05-18 | https://www.youtube.com/watch?v=aMBQB_IJ0dQ | 3-2, 3-4, C |
| *advise-videon* | AI LABS | *This Claude Code Skill make Building 10x Faster* | 2026-08-10 | https://www.youtube.com/watch?v=b9k-AE4v5yI | 2-2, A, C |
| *Agit-videon* | AI LABS | *This New Open Source Tool Just Fixed Your Claude Code Workflow* | 2026-09-22 | https://www.youtube.com/watch?v=CHHEjuNBxoQ | 3-3, A, C |
| *Astra-videon* | Nate Herk | *GPT-6 Astra FINALLY Kills AI Website Slop* ⚠️ en persons smak | 2026-09-04 | https://www.youtube.com/watch?v=QhmhUgccaS0 | 2-5, 2-6, 3-3, A, C, n1 |
| *Astryx-videon* | AI LABS | *Facebook's Release Just Gave Claude Code A New Design System* | 2026-07-03 | https://www.youtube.com/watch?v=-HEdqzzYKco | 2-4, 2-5, 3-4, A, C, n1 |
| *Boris Cherny-videon* | AI LABS | *Claude Code Setup Guide By The Creator Himself* | 2026-07-31 | https://www.youtube.com/watch?v=pGro_uKt-_M | 2-5, 3-1, 3-4 |
| *Boris-skills-videon* | AI LABS | *The Claude Code Skill Boris Cherny Runs on Every Project* | 2026-04-03 | https://www.youtube.com/watch?v=AhXfI1rSUPc | 2-9, 3-4, B |
| *Buzz-videon* | AI LABS | *Buzz Just Fixed AI Agents... But It Has A Serious Flaw* | 2026-08-04 | https://www.youtube.com/watch?v=a8tLTd4q-fU | 3-2, A |
| *Claude Design-videon* | AI LABS | *How To Use Claude Design To Build Beautiful Sites* | 2026-08-12 | https://www.youtube.com/watch?v=bBlY5YOsKN8 | 2-4, 2-5, 3-2, A, C |
| *Claude Motion-videon* | Tristen O'Brien | *Claude Just Dropped MOTION. (Get Ahead of 95% in 11 Minutes.)* ⚠️ sponsrad av Higgsfield | 2026-10-14 | https://www.youtube.com/watch?v=yf2OwchM9nw | 2-6, A |
| *CLAUDE.md-videon* | AI LABS | *Knowing This Gives You An Unfair Advantage With AI Coding* | 2026-04-28 | https://www.youtube.com/watch?v=fMY5Sdj2DMk | 3-3, 3-4, C |
| *Clay-videon* | Nate Herk | *Claude Code + Clay Makes Lead Generation Actually Fun* ⚠️ sponsrad av Clay | 2026-07-12 | https://www.youtube.com/watch?v=zyvdl__Ywfk | 4, A |
| *Coding Sloth-videon* | The Coding Sloth | *I Have Spent 1000+ Hours With Claude Code. This Is What I Learned* | 2026-08-18 | https://www.youtube.com/watch?v=YAsxyoTWFDA | 2-3, 2-5, 3-1, 3-2, A, C, n1 |
| *context-videon* | Nate Herk | *Anthropic Engineers Just 10x'd Everyone's Claude Code* | 2026-10-08 | https://www.youtube.com/watch?v=oz2CwrPV2Rg | 3-3, 3-4, C, n1 |
| *designnivå-videon* | AI LABS | *3 Design Levels For a Free Claude Code Boost (People Stop At Level 1)* | 2026-05-24 | https://www.youtube.com/watch?v=5lycYTOYbPM | 2-5, 2-9, 3-3, A, C, n1 |
| *designskills-videon* | AI LABS | *Insane Claude Design Skills You Need To Actually Build Beautiful Sites* | 2026-08-24 | https://www.youtube.com/watch?v=Ysr7oNDajJI | 2-5, 2-6, A, C |
| *designskills-videon 2* | AI LABS | *Insane Claude Design Skills You Need To Build Beautiful Websites* | 2026-06-23 | https://www.youtube.com/watch?v=Ot582-E61ac | 2-4, 2-5, 2-7, A, n1 |
| *Ebbelaar-intervjun* | Nate Herk med Dave Ebbelaar | *How to Actually Build & Sell Software with AI as a Non-Techie* | 2026-10-02 | https://www.youtube.com/watch?v=l8ywUsEJ2XQ | 2-8, 2-9, 3-2, 3-3, 4, C, n1 |
| *Fable-videon* | AI LABS | *You Are Using Fable 5.1 Wrong (Do This Instead)* | 2026-09-05 | https://www.youtube.com/watch?v=7au4tWVG8a0 | 2-7, 3-1, 3-3, C, n1 |
| *Fable 5-videon* | AI LABS | *How To Use Claude Fable 5 Better Than 90% Of The People* | 2026-07-06 | https://www.youtube.com/watch?v=GM7-ei-4Xc8 | 2-8, 3-2, 3-3, A, C |
| *FDE-videon* | AI LABS | *This Is How Forward Deployed Engineering Is Actually Done* | 2026-08-07 | https://www.youtube.com/watch?v=AD-EmZ3v6-g | 2-1, 2-9, 3-2, B, C, n1 |
| *fleet-videon* | AI LABS | *Fleet Engineering Is Insane... The Next Evolution Of Vibe Coding* | 2026-07-20 | https://www.youtube.com/watch?v=qxjII6x2yPY | 3-1, 3-3, A |
| *funktionsvideon* | AI LABS | *The Top Claude Code Features We Use* | 2026-06-29 | https://www.youtube.com/watch?v=ECQA6oOyfIk | 3-2, 3-3, A, C |
| *gauntlet-videon* | AI LABS | *This Claude Skill Just Fixed Loop Engineering* | 2026-08-14 | https://www.youtube.com/watch?v=D_uojDHkbw4 | 2-1, 3-2, A, C, n1 |
| *Goal Buddy-videon* | AI LABS | *The Greatest AI Coding System I've Ever Used, Forget Codex Vs Claude Code* | 2026-05-31 | https://www.youtube.com/watch?v=q7Am0pV6FjQ | 3-1, 3-3, C |
| *Graft-videon* | AI LABS | *Github Top Trending Tool Just Fixed The AI Agent’s Biggest Problem* | 2026-09-08 | https://www.youtube.com/watch?v=cyIWQHYoUg8 | A |
| *Grok Bot-videon* | AI LABS | *Grok Bot Use Cases That Are Actually Insane* | 2026-09-03 | https://www.youtube.com/watch?v=90pwPVrydHg | 2-9, C |
| *harness-videon* | AI LABS | *Anthropic Just Revealed The Best Claude Code Setup* | 2026-05-21 | https://www.youtube.com/watch?v=lGalJmyI78w; bygger på https://claude.com/blog/how-claude-code-works-in-large-codebases-best-practices-and-where-to-start | 3-4 |
| *Hermes-loopvideon* | AI LABS | *Loop Engineering Totally 10x Hermes agents* | 2026-06-15 | https://www.youtube.com/watch?v=AQRDjI5owZI | 3-2, 3-4, C, n1 |
| *Hermes-videon* | AI LABS | *Hermes Agent Skills That Make It 10x More Powerful* | 2026-08-30 | https://www.youtube.com/watch?v=WJgxX0Eib6k | 2-8, 3-1, 3-4, A, B |
| *Inspo-videon* | AI LABS | *Github #1 Trending Skill's Author Just Fixed Claude's Design Problem* | 2026-09-18 | https://www.youtube.com/watch?v=Ow_z94c3wKk | 2-5, 2-6, A, C, n1 |
| *inställningsvideon* | AI LABS | *You Need To Add This In Your Claude Code Setup Right Now* | 2026-10-05 | https://www.youtube.com/watch?v=i6Q7bXnWGlM | 3-5, A |
| *Jack Roberts Claude Design 3.0-videon* | Jack Roberts | *Claude Design 3.0 Just Destroyed AI slop Forever* ⚠️ Higgsfield affiliate | 2026-08-06 | https://www.youtube.com/watch?v=wJWO91mi5o0 | 2-6, A |
| *Jack Roberts designgeni-videon* | Jack Roberts | *Turn Claude into a Design Genius... Just Watch* | 2026-08-12 | https://www.youtube.com/watch?v=NAumQObJEwM | 2-5, 2-8, 3-2, C, n1 |
| *Jack Roberts Motion Design-videon* (i v0.74 och på några ställen i guiden: *Jack Roberts-videon* utan nummer) | Jack Roberts | *Claude Motion Design Just Destroyed Website Builders ($10,000 Websites)* | 2026-10-08 | https://www.youtube.com/watch?v=fq3wx-AR6B0 | 2-3, 2-5, 2-6, 3-2, A, D, n1 |
| *Jack Roberts repo-video* (variant: *Jack Roberts repovideo*) | Jack Roberts | *10 New Github Repos to Make Money in 19 mins* | 2026-10-11 | https://www.youtube.com/watch?v=zwQmodmp1To | 2-2, 2-5, 2-8, A |
| *Jack Roberts-videon 2* | Jack Roberts | *How to Use Claude Design Better Than 99% of People* ⚠️ Linearity och Higgsfield sponsrade/affiliate | 2026-10-09 | https://www.youtube.com/watch?v=IYNAyRkUsjI | 2-3, 2-4, 2-5, 2-6, 2-7, 3-2, 4, A, C, n1 |
| *Jack Roberts-videon 3* | Jack Roberts | *Insane Claude Design Skills You Actually Need To Build Beautiful Sites* ⚠️ sponsrad av Relume och Higgsfield | 2026-08-31 | https://www.youtube.com/watch?v=pUu4G2lINnk | 2-3, 2-4, 2-7, 2-8, 4, A, C, n1 |
| *Jack Roberts-videon 4* (variant i bilaga C: *videon 4*) | Jack Roberts | *Every Level of Claude Design Explained* ⚠️ Supabase och Higgsfield med affiliatelänkar | 2026-08-22 | https://www.youtube.com/watch?v=Rm1UkGX-g3w | 2-5, 2-7, 2-8, 4, A, C |
| *Jev-uppföljningen* (namnet ur v0.74; i `3-2` och C står i dag *Jev-videon*, byts) | AI LABS | *Insane Jev Use Cases You Need To Use Right Now* | 2026-09-28 | https://www.youtube.com/watch?v=2nc_QMuNp18 | 3-2, 3-4, A, C |
| *Jev-videon* (*Jev-videorna* = båda Jev-videorna) | AI LABS | *This Just Fixed Your Claude Code Setup's Biggest Flaw* | 2026-10-07 | https://www.youtube.com/watch?v=jlEMo6Dsh9E | 3-3, A, C |
| *Karpathy-videon* | Nate Herk | *I Built Another Andrej Karpathy Using Claude* | 2026-10-05 | https://www.youtube.com/watch?v=bvGptCLDhyo | 3-3, 3-4, A |
| *konsult-videon* | Nate Herk | *How to Build a One Person AI Business (Using Claude Code)* ⚠️ statistiken i videon okontrollerad | 2026-08-11 | https://www.youtube.com/watch?v=LVAHYV4Xrto | 2-1, 4, n1 |
| *loop-nivåvideon* | AI LABS | *Every Level Of Claude Code Loop Engineering Explained* | 2026-08-18 | https://www.youtube.com/watch?v=PLyRe6Zk--8 | 2-3, 2-6, 2-9, 3-2, A, C |
| *loop-typvideon* | AI LABS | *All The Types Of Claude Loops Explained In 13 Minutes* | 2026-07-09 | https://www.youtube.com/watch?v=8wsM0euQOvc | 3-2, 3-4, C |
| *loop-videon* | AI LABS | *He Finally 10x Claude Code With This Method* | 2026-10-02 | https://www.youtube.com/watch?v=qLfSDQ5NGh0 | 2-3, 2-8, 3-1, 3-2, 3-4, C, n1 |
| *mods-videon* (i v0.74 *Mod-videon*) | AI LABS | *Claude Mods Are Insane... You Need To Try These Right Now* | 2026-10-09 | https://www.youtube.com/watch?v=ERNqRK6sMJY | 3-5, C, n1 |
| *mods-videon 2* (variant: *Mods-videon 2*) | Nate Herk | *Claude Code Mods Are Game Changers. Set Up These 5 NOW.* | 2026-10-02 | https://www.youtube.com/watch?v=9hetShMMp2s | 2-1, 3-5 |
| *Nate Herk 100-repon-videon* (varianter: *Nate Herk-videon*, *Nate Herks repovideo*) | Nate Herk | *I Tried 100+ Github Repos for Claude. These 6 Are the Best* | 2026-10-11 | https://www.youtube.com/watch?v=HhZdNYI4pJs | 2-2, 2-6, 2-7, 2-8, 3-4, A, C, n1 |
| *OKF-videon* | AI LABS | *Google Replaced The Karpathy's LLM Wiki* | 2026-06-26 | https://www.youtube.com/watch?v=k4sMSsMzX2g | 2-7, 2-9, 3-4, A |
| *Opus 5.5-videon* | AI LABS | *How To Use Claude Code To Build Amazing Sites With Opus 5.5* | 2026-09-30 | https://www.youtube.com/watch?v=DP7mgLUKN_U | 2-5, 2-6, 2-8, 3-3, A, n1 |
| *OS-videon* | AI LABS | *These Claude Workflows Turn Claude Code Into A Whole OS* | 2026-06-03 | https://www.youtube.com/watch?v=5LnwJyi1il4 | 2-1, 3-1, A |
| *radera-skills-videon* | Nate Herk | *I Deleted All My Claude Skills... And Claude Got Smarter* ⚠️ klipp ur Boris Chernys intervju hos Y Combinator | 2026-08-12 | https://www.youtube.com/watch?v=XNQBCRcwXV4 | 3-2, 3-4, C |
| *REA-videon* | Nate Herk | *I Tested the Viral Reverse Engineer Anything Skill. What You Need to Know.* | 2026-10-13 | https://www.youtube.com/watch?v=rL5tw6h78zo | 2-2, 2-6, A |
| *repo-videon* | AI LABS | *Insane GitHub Repos That 10x Your Codex And Claude Code Setup* | 2026-09-14 | https://www.youtube.com/watch?v=Ua0APTMVcb8 | 2-1, 2-6, 3-1, 3-2, A, C, n1 |
| *retainer-föredraget* | Nate Herk | *The 3-Step System Behind My $20K/Month AI Agency Retainers* | 2026-08-25 | https://www.youtube.com/watch?v=DoHPZf7jEQ4 | 2-1, 2-9, 4 |
| *sex-färdigheter-videon* | Nate Herk | *Learn These 6 AI Skills Now (Before Everyone Else Does)* | 2026-06-15 | https://www.youtube.com/watch?v=3XIGcM7VICc | 2-5, 2-7, 3-2, C, n1 |
| *Shopify-videon* | AI LABS | *Shopify Just Released The Greatest AI Coding Workflow Ever* | 2026-09-24 | https://www.youtube.com/watch?v=bBMp5tLxShQ; original: https://shopify.engineering/helix | 3-1, 3-2, 3-5, C, n1 |
| *Skill Spector-videon* | AI LABS | *They Finally Fixed Claude Code's Biggest Problem* | 2026-06-17 | https://www.youtube.com/watch?v=KiTmBtyaeXg | 3-3, A, C, n1 |
| *skill-ingenjörsvideon* (föreslaget; i dag *skills-videon*, byts) | Nate Herk | *Anthropic Engineer Explains: What to Build Instead of AI Agents* ⚠️ återger Barry Zhang och Mahesh Murag (Anthropic) i andra hand | 2026-09-13 | https://www.youtube.com/watch?v=HIRDzMtuWFk | 2-4, 3-4, A, B, n1 |
| *Stitch-skills-videon* | AI LABS | *How to Use Google Stitch to Make Sites 10X More Beautiful* | 2026-03-28 | https://www.youtube.com/watch?v=b0lwCDNOFUY | 2-5, A |
| *Stitch-videon* (v0.1:s underlag, "videon" i ändringsloggen) | AI LABS | *Google Just Fixed AI Design By Releasing This* | 2026-10-13 | https://www.youtube.com/watch?v=au2TI8sdq8E | 2-5, 2-6, C, n1 |
| *STORM-videon* | Nate Herk | *Stanford's Method Turns Claude Into a PHD Level Research Team* ⚠️ egen tolkning av STORM | 2026-06-29 | https://www.youtube.com/watch?v=Tj3018n5MVg | 2-1, 2-7, 3-2, C, n1 |
| *Unlazy-videon* | AI LABS | *GitHub's #1 Trending Author's New Claude Skill Is Insane* | 2026-08-20 | https://www.youtube.com/watch?v=c47uqR7XB_c; repo: https://github.com/Leonxlnx/unlazy | 3-1, 3-2, 3-5, A, C, n1 |
| *Variate-videon* (föreslaget; i dag *Skills-videon*, byts) | AI LABS | *These New Claude Skills Are Actually Insane* | 2026-09-01 | https://www.youtube.com/watch?v=jyLKRN36-Dc | 2-7, 3-3, 3-4, 3-5, A, n1 |
| *VAULT-videon* | Nate Herk | *Everything Goldman Sachs Taught Me About AI (In 10 minutes)* ⚠️ Goldmans CIO citeras i andra hand | 2026-08-24 | https://www.youtube.com/watch?v=ZzHsJW10iq4 | 2-9, 3-1, 3-2, 4, B, C, n1 |

### Videor utan kortnamn

- De tre under *Behandlade men inte införda* ovan, alla Jack Roberts: *Claude Just Solved Motion Design (Destroy AI Slop)* (2026-08-26), https://www.youtube.com/watch?v=hNpC5clEbp4 · *Fable 5.1 Just Solved AI Slop... I'm Done* (2026-09-02), https://www.youtube.com/watch?v=X2PARg8ErvY · *I Gave AI 10,000 UI Screens... Then This Happened* (2026-09-09), https://www.youtube.com/watch?v=BYQdA7kMmbA
- Nate Herk, *How Anthropic ACTUALLY Prompts Fable 5.1* (2026-09-02), https://www.youtube.com/watch?v=FBVNS1l5Vb8 – *Nate Herks prompting-video* i ändringsloggen (v0.54). Guiden citerar innehållet direkt ur Anthropics dokumentation (📄 *Prompting Claude Fable 5.1* m.fl., nedan) och har inget kortnamn för videon.

### Förväxlingsrisker

Kortnamnen nedan är olika men lätta att blanda ihop. De byts inte; tabellen skiljer dem åt.

- *Fable-videon* (Fable 5.1, 2026-09-05) och *Fable 5-videon* (Fable 5, 2026-07-06), båda AI LABS.
- *1-person-videon* och *konsult-videon*, båda Nate Herk. Titeln *How to Build a One Person AI Business* hör till *konsult-videon*.
- *designskills-videon*, *designskills-videon 2* och *Jack Roberts-videon 3* har nästan samma titel (*Insane Claude Design Skills …*).
- *Claude Design-videon* (AI LABS), *Jack Roberts Claude Design 3.0-videon* och *Jack Roberts-videon 4* (*Every Level of Claude Design Explained*).
- *Jack Roberts Motion Design-videon* (fq3wx-AR6B0) är varken *Claude Just Solved Motion Design* (hNpC5clEbp4, inte införd) eller *Claude Motion-videon* (Tristen O'Brien).
- *repo-videon* (AI LABS), *Jack Roberts repo-video* och *Nate Herk 100-repon-videon* är tre olika repogenomgångar.
- *loop-videon*, *loop-nivåvideon*, *loop-typvideon* och *Hermes-loopvideon*, alla AI LABS.
- *Boris Cherny-videon*, *Boris-skills-videon* (AI LABS) och *radera-skills-videon* (Nate Herk) återger alla Boris Cherny; bänken räknar dem som en primärkälla (`guide/README.md`).

## Byt kortnamn

**Genomfört 2026-10-15** i guidens filer (37 byten); bilaga C uppdateras separat. Listan står kvar som spårbarhet.

Förslag. Bytena görs inte här, eftersom guidefilerna rättas av andra just nu. Radnumren gäller läget kl. 14.40 och flyttar sig – sök på texten. `n1-forsta-sajten.md` är genererad: byt i källfilerna och kör `python konsolidering/bygg_n1.py` i stället för att rätta n1 för hand.

### 1. *Skills-videon* och *skills-videon* är två videor

Namnen skiljs bara av versalen. Båda byts, så att inget kortnamn skiljer sig från ett annat bara genom en versal och inget namn behöver en egen parentes inne i källparentesen:

- *Skills-videon* (AI LABS, jyLKRN36-Dc: Variate, Task Observer, Karpathys regler) → *Variate-videon*
- *skills-videon* (Nate Herk, HIRDzMtuWFk: Anthropics ingenjörer om skills) → *skill-ingenjörsvideon*

Sök skiftlägeskänsligt med `(?<![\w-])Skills-videon` och `(?<![\w-])skills-videon`, så att *designskills-*, *Stitch-skills-*, *Boris-skills-* och *radera-skills-videon* inte träffas.

| Fil | Var | Byt | Till |
|---|---|---|---|
| `2-7-innehall.md` | rad 32, *Variate tar fram kortare versioner* | Skills-videon | Variate-videon |
| `3-3-sakerhet-och-installningar.md` | rad 128, tabellraden *"Bygg inte mer än uppdraget kräver"* | Skills-videon | Variate-videon |
| `3-4-larande-och-underhall.md` | rad 11, *Ingen lärdom ändrar något av sig själv*; rad 22, *`arbetssatt.md`* | Skills-videon (2 st.) | Variate-videon |
| `3-5-live-visning.md` | rad 26, *I sin granskning väljer Johnny mellan versioner av en sektion* | Skills-videon | Variate-videon |
| `bilaga-a-verktyg.md` | rad 48, raden Variate; rad 206, raden Task Observer | Skills-videon (2 st.) | Variate-videon |
| `2-4-skelett.md` | rad 23, *Biblioteket består av egna marknadsföringssektioner* (kursiv) | skills-videon | skill-ingenjörsvideon |
| `3-4-larande-och-underhall.md` | rad 15, *Orsaken klassas före förslaget*; rad 57, *Kod som skrivs om i varje bygge lyfts till låsta skript* | skills-videon (2 st.) | skill-ingenjörsvideon |
| `bilaga-a-verktyg.md` | rad 26, *Ingen överlappning med en befintlig skill* | skills-videon | skill-ingenjörsvideon |
| `bilaga-b-skills.md` | rad 79, *Ett jobb per skill, och beskrivningen säger vad och när* | skills-videon | skill-ingenjörsvideon |

Sju byten till *Variate-videon* och fem till *skill-ingenjörsvideon*, plus n1 när den genereras om.

### 2. *Jev-videon* används för två videor

*Jev-videon* är jlEMo6Dsh9E (hooks som grundnivå, raderingsvakten, nya meddelanden mitt i arbetet; fallgrop 9–11). På fyra ställen avses i stället 2nc_QMuNp18 (utforskningstest, granskningsdjup; fallgrop 21–22), som v0.74 och `3-4` (*Billigast först*) kallar *Jev-uppföljningen*. Namnet följer ordningen videorna behandlades i; uppföljningen publicerades först.

| Fil | Var | Byt | Till |
|---|---|---|---|
| `3-2-granskning-och-kalibrering.md` | rad 21, *Utforskningstest*; rad 55, *Granskningsdjup efter ändringens storlek* | Jev-videon (2 st.) | Jev-uppföljningen |
| `bilaga-c-kontroller.md` | C142 och C149 | Jev-videon (2 st.) | Jev-uppföljningen |

Står kvar: *Jev-videon* i `3-3` (raderingsraden i skyddshookens tabell, inkorgen) och i C169; *Jev-videorna* i bilaga A, som avser båda.

### 3. *mods-videon* där *mods-videon 2* avses

| Fil | Var | Byt | Till |
|---|---|---|---|
| `3-5-live-visning.md` | rad 36, *Utgå från sessionsloggarna* | mods-videon | mods-videon 2 |

Idén att låta Claude läsa sessionsloggarna och föreslå de fem mods som hjälper mest kommer ur Nate Herks video (9hetShMMp2s), inte ur AI LABS. *Assumption Check* (`3-5` rad 11, C183) kommer ur AI LABS-videon och står kvar som *mods-videon*.

### 4. Stavningsvarianter av samma video

| Fil | Var | Byt | Till |
|---|---|---|---|
| `2-2-omfattning.md` | rad 50, *Innehåll blir förslag till faktabasen* | "4 Ways"-videon | 4 Ways-videon |
| `2-7-innehall.md` | rad 15, *Vid ombyggnad är den gamla sajtens innehåll förslag* | "4 Ways"-videon | 4 Ways-videon |
| `3-3-sakerhet-och-installningar.md` | rad 102, *Taket prövas, det antas inte* | "4 Ways"-videon | 4 Ways-videon |
| `3-4-larande-och-underhall.md` | rad 44, *En instruktion rensas bara när mätningen visar det*; rad 46, *Skriv om skills efter den nya modellens promptguide* | "4 Ways"-videon (2 st.) | 4 Ways-videon |
| `bilaga-a-verktyg.md` | rad 123, raden SingleFile CLI | "4 Ways"-videon | 4 Ways-videon |
| `2-1-strategi.md` | rad 30, *Visa bara den här kundens underlag* | Mods-videon 2 | mods-videon 2 |
| `2-5-yta.md` | rad 63, parvis turnering (Arena-skillen) | Jack Roberts repovideo | Jack Roberts repo-video |
| `2-6-rorelse.md` | rad 73, *Scrollcraft* | Nate Herks repovideo | Nate Herk 100-repon-videon |
| `2-7-innehall.md` | rad 38, AI-signaturer, *Granskningskriterium* | Nate Herk-videon | Nate Herk 100-repon-videon |
| `2-8-teknik-och-kvalitet.md` | rad 96, Claude Security (Anthropic) | Nate Herk-videon | Nate Herk 100-repon-videon |
| `3-4-larande-och-underhall.md` | rad 81, *Intagsregel* (RTK) | Nate Herk-videon | Nate Herk 100-repon-videon |
| `bilaga-c-kontroller.md` | C163 | Nate Herk-videon | Nate Herk 100-repon-videon |
| `2-3-struktur.md` | rad 74, lekfulla hinder (fallgrop 120) | Jack Roberts-videon | Jack Roberts Motion Design-videon |
| `3-2-granskning-och-kalibrering.md` | rad 31, *En granskare, en checklista, en referens* (fallgrop 120) | Jack Roberts-videon | Jack Roberts Motion Design-videon |
| `bilaga-d-fallgropar.md` | rad 250, *Inga lekfulla hinder före den primära handlingen* | Jack Roberts-videon | Jack Roberts Motion Design-videon |
| `bilaga-c-kontroller.md` | C87 | videon 4 | Jack Roberts-videon 4 |

*Nate Herk-videon* är tvetydigt, eftersom Nate Herk har 18 videor i underlaget. *Jack Roberts-videon* utan nummer är v0.74:s namn på fq3wx-AR6B0 (v0.74 rad 464 och 540, fallgrop 120).

### 5. Kanalnamn i stället för video

| Fil | Var | Byt | Till |
|---|---|---|---|
| `3-2-granskning-och-kalibrering.md` | rad 47, *Specialister* | Jack Roberts (fem granskande agenter) | Jack Roberts-videon 2 (fem granskande agenter) |
| `bilaga-c-kontroller.md` | C143 | 🎥 Jack Roberts (fem granskande agenter) | 🎥 Jack Roberts-videon 2 (fem granskande agenter) |
| `bilaga-c-kontroller.md` | C58 | 🎥 Jack Roberts, Nate Herk | 🎥 Jack Roberts-videon 2, Nate Herk 100-repon-videon |
| `bilaga-c-kontroller.md` | C67 | 🎥 Jack Roberts | 🎥 Jack Roberts-videon 3 |
| `bilaga-c-kontroller.md` | C56 | 🎥 Nate Herk | 🎥 sex-färdigheter-videon |

Grunden: *fem granskande agenter* står i den tidigare källistan för IYNAyRkUsjI. C58 följer källorna i `2-7` (*Konkret i stället för generiskt* → Jack Roberts-videon 2, *AI-signaturer* → Nate Herk 100-repon-videon). C67 följer konsolideringsanalysen §4.3 (*påhittat socialt bevis*, Jack Roberts-videon 3). C56 är tankstrecksregeln, som `2-7` grundar på sex-färdigheter-videon.

## Okända kortnamn

Inga. Alla kortnamn i `guide/` gick att knyta till en video. Kvar finns allmänna hänvisningar, som inte är kortnamn och inte behöver bytas:

- *Nate Herks kanal* (C6, nordstjärnan) avser kanalen som en källa, inte en enskild video.
- *Nate Herks återgivning av skill-creator* (`3-4`, *Triggningstest*; C177) är *skill-ingenjörsvideon*.
- *samma video* (bilaga A, raden Mobbin) är *Jack Roberts Motion Design-videon* på raden ovanför (Refero).
- *videon* och *videorna* i löptext syftar på närmaste kortnamn.

## Dokument och andra källor

Fas- och §-hänvisningarna avser v0.74.

- 📄 Supabase, *Advisors* (hämtad 2026-10-14), https://supabase.com/docs/guides/observability/advisors (fas 6c)
- 📄 Researchrapporter 2026-10-14 i `kunskap/research/` (primärkällor citerade i varje rapport): tillgänglighetslagen, dataöverföring och analys, AI-förordningen och rättigheter, Claude Code-verifiering, Cloudflare-stack, Stitch och verktyg (fas 0, 3, 7, §2, §5.2, §6.2, §8.8, §11.9, §11.10, §11.13, §14)
- Dokument: *"The $10K Website Kit: How Claude Builds an Agency-Quality Site for Your Business"* (Google Docs) – SEO-grunder, Emils animationsregler, bildkrav, Impeccable, förväxlingspaket (fas 1b, 5, 6c, §11.9, §12)
- Dokument: *"Websites for Normal People – genomgång av flödet"* (Google Docs; genomgång av Sebastian Konings guide) – hemligheter per kund, staging, formulär, samtycke, vägar A–D, människans klick (fas 0, 3, 6c, 7, 8b, §7.3, §11.10, §14)
- Märkningen 📄 = från ett av dessa dokument
- 📄 Kunskapsbladet, *Tankstreck* (hämtad 2026-10-14), https://kunskapsbladet.se/sprakfragor/tankstreck/ – med hänvisning till Språkrådets *Svenska skrivregler* (fas 6)
- 📄 Shao, Jiang, Kanell, Xu, Khattab & Lam, *"Assisting in Writing Wikipedia-like Articles From Scratch with Large Language Models"* (NAACL 2024), https://arxiv.org/abs/2402.14207 – STORM (§11.12)
- 📄 Anthropic, *Prompting Claude Fable 5.1*, *Prompting Claude Fable 5* och *Effort* (Claude Platform Docs, hämtade 2026-10-14): https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1 · https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5 · https://platform.claude.com/docs/en/build-with-claude/effort
