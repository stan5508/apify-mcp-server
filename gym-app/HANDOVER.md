# Coachlog — overdracht naar een nieuwe sessie

Lees dit eerst, dan [IDEAS.md](./IDEAS.md) (visie, backlog, wat af is) en zo nodig
[SUPABASE.md](./SUPABASE.md) (cloudopzet). Daarmee heb je de hele context.

## Wie en wat

Stan is personal trainer en traint klanten dagelijks in de sportschool, solo en in duo's.
Coachlog is zijn app: trainingsschema's maken, sessies loggen, progressie zien, klanten
beheren, agenda, betalingen, abonnementen en voeding. Hij gebruikt hem op een tablet naast
de toestellen. **Antwoord altijd in het Nederlands**, in gewone taal, zonder jargon.

Dit is geen onderdeel van de MCP-server in deze repo; het is een losstaande app in `gym-app/`.

## Werkwijze — houd je hieraan

1. **Elke wijziging**: `APP_VERSION` in `index.html` én `CACHE` in `sw.js` ophogen (nu **66**).
   De sporter-app toont het nummer onder Coach → Instellingen; pas dat mee aan.
   Zonder die twee ziet hij de wijziging niet op zijn tablet.
2. **Testen** met Playwright (`playwright-core`, `executablePath: '/opt/pw-browsers/chromium'`)
   tegen `python3 -m http.server` in `gym-app/`. Schrijf per functie een klein `.mjs`-scriptje
   dat `pageerror` verzamelt en JSON print; die scripts staan in de scratchpad, niet in de repo.
3. **Repo-checks**: `pnpm run format`, `format:check`, `lint`, `check:agents`. Allemaal groen
   voor je commit. `type-check` raakt `gym-app/` niet (tsconfig include is alleen `src`/`tests`).
4. **Committen** op de branch van de open PR (nu `claude/coachlog-sporterslog-features-3azibr`,
   met PR #5 en #1 als voorgangers), Conventional Commits,
   Engelse commitberichten, en pushen met `git push -u origin <branch>`.
5. **Publiceren**: `bash gym-app/publish.sh` — kopieert naar de `gh-pages`-branch.
   Live op <https://stan5508.github.io/apify-mcp-server/>.
6. Werkt iets niet bij hem: eerst het **versienummer** onderaan Vandaag laten checken.
   Instellingen → Versie → **Nieuwe versie ophalen** forceert een update.

## Bestanden

| Bestand | Wat |
| --- | --- |
| `index.html` | de hele coach-app, ~6250 regels, één IIFE, geen build |
| `sporter.html` | app voor klanten (magic link, zelf loggen) |
| `klant.html` | alleen-lezen voortgangspagina via een verborgen gist |
| `sw.js` | service worker, network-first voor pagina's |
| `publish.sh` | publiceren naar `gh-pages` |
| `supabase/functions/send-contract/index.ts` | Edge Function die contracten mailt |
| `IDEAS.md` | visie, backlog, wat af is, wat geparkeerd staat |
| `SUPABASE.md` | cloudaccounts en mailkoppeling opzetten |

## Techniek

Vanilla JS, geen framework, geen build. Hash-routing (`render()` in `index.html`), state in
`localStorage` onder sleutel `coachlog-v1`, migraties in `normalizeDb()` met een `_needsSave`-vlag.
PWA met offline cache. Sync tussen apparaten via een privé GitHub Gist (token met gist-rechten);
boven ~900 kB weigert de sync met een melding. Cloudaccounts via Supabase REST **zonder SDK**
(module `cloud` met `select/insert/upsert/remove/rpc/invoke`).

Datamodel (`db`): `clients, schemas, workouts, duos, duoSchemas, templates, measurements,
exercises, clientNotes, appointments, packages, subTypes, subscriptions, nutritionPlans, meals,
foods, water, muscleGroups, settings`.

## Uiterlijk — vastgelegde keuzes

- **Donker is de standaard.** Licht/systeem blijft instelbaar; bestaande installaties zijn
  eenmalig omgezet.
- Accent **amber** `#F2A93B` met donkere tekst erop (`--on-accent`).
- **Schijfkleuren** als categoriepalet: rood 25 `#C8102E`, blauw 20 `#0057B8`, geel 15
  `#F2C200`, groen 10 `#009639` — voor spiergroepbalken, grafieklijnen en de
  schijvenrekenmachine. Grafieken gebruiken `--data` (schijfrood), niet het accent.
- Logo: turfstreepjes (drie witte streepjes, amber schuine streep) in `icon.svg`; de PNG's
  worden daaruit gerenderd. Woordmerk: **Coach**log.
- Onder 760 px een vaste tabbalk (Vandaag · Klanten · Agenda · Meer) met de zijbalk als lade.
- **Spiergroepen dragen Latijnse namen** (`MUSCLE_GROUPS`): Pectoralis major, Deltoideus,
  Triceps brachii, Latissimus dorsi, Trapezius, Biceps brachii, Erector spinae, Quadriceps,
  Hamstrings, Gluteus maximus, Triceps surae, Rectus abdominis, Cardio, Overig. De oude
  Nederlandse namen migreren automatisch via `LEGACY_GROUPS` — die staat bewust vóór
  `loadDb()`, want de migratie draait daarbinnen.
- Een schemakaart toont geen lijst oefeningnamen meer maar `schemaSummaryHtml()`: één stip per
  **kleur** (dus niet per spiergroep — trekwerk is één blauwe stip) plus het aantal oefeningen.
  Geldt in beide apps; de sporter-app krijgt de spiergroep mee in het gepubliceerde schema.
- **Spiergroepen worden automatisch herkend** (sinds versie 65): `ensureExercise()` en de
  migratie in `normalizeDb()` zetten de spier via `suggestGroup()` op elke (ook toekomstige)
  oefening, met `groupAuto: true` zolang de coach de gok niet bevestigde. Met de hand kiezen
  (bibliotheek, Nalopen, oefeninfo-import) loopt via `setGroup()` en wint blijvend van de gok.
  **Bibliotheek → Nalopen** (`#/spiergroepen`) toont onbevestigde gokken plus namen die een
  andere spier aanwijzen; afvinken bevestigt. `GROUP_HINTS`/`suggestGroup()` staan bewust vóór
  `loadDb()`, net als `LEGACY_GROUPS` — de migratie draait daarbinnen.
- **Kleur volgt de keten** (`GROUP_COLOURS`): duwen rood, trekken blauw, benen groen, core geel.
  Cardio en Overig blijven neutraal — geen vijfde kleur verzinnen.
- Boven 900 px staan gelijkvormige kaartenlijsten in twee kolommen (`.cards-2`).
- Beweging: schermen schuiven in, cijfers in tegels tellen omhoog, grafieken tekenen zichzelf,
  streak-ring rond de avatar. Alles uit bij `prefers-reduced-motion`.
- Contrast getoetst: gewone tekst ≥ 4,5:1, grafiekkleuren ≥ 3:1, in beide thema's.

## Wat er staat

**Trainen** — weekprogramma's (`db.programs`: één programma per klant, een geordende rij
schema's; `nextProgramDay()` kijkt welk schema het laatst gedraaid is en zet de volgende klaar,
zichtbaar op de klantpagina en op Vandaag), progressieregels (`progressSuggestion()`: alle werksets op of boven het schemadoel
gehaald → volgende keer een zwaarder gewicht klaargezet, met een groene hint; aan/uit en stap in
Instellingen, eigen stap per oefening in de bibliotheek), sets afvinken (groene regel, trilling, rusttimer start vanzelf), sessiebalk met
verstreken tijd en voortgang, afrondscherm met PR's en confetti, twee knoppen per oefening plus
een ⋯-menu, vorige sessie als spookinvoer in het veld,
schema's met per-set doelen, sjablonen (solo én duo), vrije trainingen, duo's
met kolommen naast elkaar, oefening vervangen tijdens de sessie, rusttimer, intervaltimer,
schijvenrekenmachine met echte schijfkleuren, RIR, set-types, supersets, per zijde loggen,
cardio, live PR-melding, vorige-prestatie-hints, korte trilling bij het invullen van reps,
raakvlakken ≥ 44 px, de regel waarin je typt licht op.

**Analyse** — progressie per oefening (lijn; staafgrafiek alleen bij cardio en
lichaamsgewicht). **Volume bestaat niet meer in de app** — op zijn verzoek overal vervangen
door sets (per maand, per spiergroep, in rapport, overzicht en duo-vergelijking), grafieken tekenen zichzelf in
(uit bij *prefers-reduced-motion*), periodefilter, vergelijken, maand-
overzicht, aanwezigheid en streaks, spiergroepverdeling, print-/PDF-rapport, CSV-export.

**Klanten** — metingen (gewicht, vet%, spiermassa, taille, borst, heup, arm, bovenbeen; BMI
rekent de app uit zodra de lengte op het profiel staat), profiel met contact en intake, doelen,
progressiefoto's, archiveren, avatars
in de zijbalk (nieuwste progressiefoto, anders initialen), technieknotities per klant.

**Zakelijk** — agenda met statussen (dag- én weekweergave, wekelijks terugkerende afspraken
met serie-verwijderen), strippenkaarten, openstaande betalingen met **betaal-QR** (EPC/SEPA,
eigen QR-encoder in de app, IBAN in de instellingen op de betalingenpagina), omzet per maand.

**Sinds versie 64** — warming-upvoorstel per oefening (⋯-menu, ~50/70/85% afgerond op
schijven), mesocycli op het weekprogramma (bloklengte + deloadweek, gewichten op
`deloadPercent`), **Anatomie & vlakken** (`#/anatomie`: per spiergroep origo/insertie,
functies met bewegingsvlak en as; compact blokje bij de oefening-info), doelen mee met
Klaarzetten (`client_goals`), berichten coach ↔ klant (`client_messages`, chat in Van
klanten en in het Coach-tabblad van de sporter-app), wekelijkse check-in van de klant
(`client_checkins`: gewicht, energie/slaap/motivatie, foto's; gewicht met één tik over te
nemen als meting), techniekvideo's (`client_videos` + storage-bucket `technique-videos`,
coach zet feedback terug), en pushmeldingen (code klaar; opzet in SUPABASE.md stap 8).

**Sinds versie 66** — coach-app: **Van klanten**-vak op Vandaag (`fillCloudInbox()`: ongelezen
berichten en check-ins van de laatste week), **Bericht aan iedereen** in Van klanten, de
**koppel-link** bij een nieuwe uitnodigingscode (`sporter.html?url=…&key=…&code=…&naam=…`, met
QR als hij past — een legacy JWT-anon-key is te lang voor versie 9, een `sb_publishable_…`-sleutel
niet), `publishSchemas()` stuurt per oefening een `info`-blok mee (uitleg, aandachtspunten,
video, technieknotitie), en Overzicht → Spiergroepen toont sets per trainingsweek tegen de
richtlijn 10–20. Sporter-app: begonnen training overleeft sluiten (`local.draft`), sessieklok,
leeg afvinken neemt de vorige keer over, cardio (min/km) en lichaamsgewicht als eigen soort,
ⓘ-uitleg van de coach, warming-upvoorstel, schijven per kant, records bij opslaan, geschat 1RM,
aanwezigheid + geschiedenis met **Herhaal**, training delen, en in Voeding: barcode (camera of
cijfers), basislijst zonder internet, vaak gebruikt, kopieer gisteren, **Mijn maaltijden**
(`local.recipes`, alleen op dat toestel), weekgemiddelde tegen het plan, waterdoel. Instellingen
(rust, geluid, licht/donker, waterdoel) staan onderaan het Coach-tabblad in `local.settings`.
Geen nieuwe tabellen: alles loopt over de bestaande kolommen.

**Abonnementen** — eigen vormen (naam, prijs per maand, looptijd, sessies per week,
opzegtermijn, voorwaardentekst, eigen velden) en contracten per klant. Ondertekenen met de
vinger op de tablet (klant én coach), daarna vast; opzeggen rekent de opzegtermijn mee.
Contract als PDF — **zelfgeschreven PDF-schrijver in de app**, geen bibliotheek, werkt offline.
Versturen via het deelvenster, of automatisch mailen als de Edge Function is opgezet.
Elke verstreken maand van een getekend contract is een maandbedrag dat meetelt in de omzet
en apart afgetikt wordt.

**Voeding** — de coach stelt alléén het plan vast (calorieën, macro's, richtlijnen) en stuurt
dat met Klaarzetten naar de klant (tabel `client_nutrition_plans`); loggen doet de klant zelf in
`sporter.html` (dagboek per maaltijdmoment, Open Food Facts met barcodescan, water). Wat hij logt
zie je onder **Van klanten**. In de coach-app is het zelf loggen er in versie 63 uitgehaald;
oude regels blijven wel zichtbaar.

**Klantaccounts** — `sporter.html`, magic link, uitnodigingscode, klant logt zelf met dezelfde
hulpmiddelen als jij: vorige keer per oefening (uit `loadHistory()`), sets afvinken met trilling,
een rusttimer die vanzelf start op de rusttijd die met het schema meekomt, een tabblad
**Voortgang** met trainingen/reeks, per oefening een mini-grafiek met trend en record, en per
oefening een detailgrafiek met alle sessies; een melding zodra de coach iets nieuws klaarzet
(`updated_at` van `client_schemas` tegen wat lokaal als gezien staat); **Je afspraken** uit
de agenda van de coach (tabel `client_appointments`) en **Metingen** met het verschil sinds de
vorige meting plus een grafiek per meetwaarde (tabel `client_measurements`); alle drie gaan mee
met dezelfde Klaarzetten-knop; komt bij
de coach binnen onder **Van klanten** en is met één tik over te nemen. Daar staat ook een
voedingsoverzicht: gemiddelde macro's per dag over 7 en 30 dagen, naast het voedingsplan van
die klant met het verschil, en per dag de maaltijden gegroepeerd per moment. Koppeling cloudaccount ↔
lokale klant loopt via `client.cloudId`; matcht de naam niet, dan kies je de klant zelf uit een
lijst (naam-matching is alleen nog de eerste gok). Daar staat ook
**Schema's klaarzetten**: `publishSchemas()` schrijft de schema's van de klant (in
programmavolgorde) naar de tabel `client_schemas`, waarna de sporter-app ze toont onder
*Van je coach* en er een training mee kan starten. Bestaat die tabel nog niet, dan valt de
sporter-app stil terug op een losse training — zie SUPABASE.md.

## Openstaand

- **Contracten automatisch mailen aanzetten** — code is klaar en getest, alleen het opzetwerk
  bij Resend en Supabase moet nog. Bewust uitgesteld tot er klanten voor online coaching
  tekenen. Stappen staan in SUPABASE.md stap 6.
- **Pushmeldingen aanzetten** — code staat er (versie 64): SW-handler, abonneren in de
  sporter-app, Edge Function `send-push`. Alleen het opzetwerk ontbreekt nog
  (VAPID-sleutels + tabellen + functie deployen, SUPABASE.md stap 8).
- **Nieuwe tabellen draaien** — berichten, check-ins, video's, doelen en push vragen de SQL
  uit SUPABASE.md stap 7/7b/8; tot die tijd melden beide apps netjes "nog niet aangezet".
- Geparkeerd: echte meerdere-coaches-rechten. Maaltijdsjablonen en een basislijst zonder
  internet zitten sinds versie 66 in de sporter-app (alleen lokaal op het toestel van de klant);
  synchroniseren van "Mijn maaltijden" tussen toestellen vraagt een tabel en is niet gebouwd.

## Wat je niet moet doen

- **Geen oefeningfoto's uit een Engelse catalogus meer.** Dat is gebouwd en op 16 aug 2026 op
  zijn verzoek weer verwijderd: de catalogus kent tien varianten per beweging, koppelen bleef
  gedoe. Wil je het opnieuw proberen, verzin dan eerst iets beters; niet dezelfde aanpak.
- Geen functies toevoegen die hij niet gevraagd heeft.
- Niet aannemen dat hij de laatste versie draait.

## Valkuilen die geld hebben gekost

- Wijziging niet zichtbaar? Bijna altijd de cache of het versienummer, niet de code.
- Een formulier opnieuw renderen tijdens het typen wist zijn invoer — waarden eerst
  wegschrijven (zie `captureType` bij abonnementsvormen).
- In het donkere thema drukte de app ooit witte tekst op wit papier; de printstijl zet nu
  expliciet zwart op wit.
- Playwright: `addInitScript` draait bij **elke** navigatie, dus hij overschrijft wat je
  tussendoor in `localStorage` zet. Zaai met een `if (!localStorage.getItem(...))`.
