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

1. **Elke wijziging**: `APP_VERSION` in `index.html` én `CACHE` in `sw.js` ophogen (nu **43**).
   Zonder die twee ziet hij de wijziging niet op zijn tablet.
2. **Testen** met Playwright (`playwright-core`, `executablePath: '/opt/pw-browsers/chromium'`)
   tegen `python3 -m http.server` in `gym-app/`. Schrijf per functie een klein `.mjs`-scriptje
   dat `pageerror` verzamelt en JSON print; die scripts staan in de scratchpad, niet in de repo.
3. **Repo-checks**: `pnpm run format`, `format:check`, `lint`, `check:agents`. Allemaal groen
   voor je commit. `type-check` raakt `gym-app/` niet (tsconfig include is alleen `src`/`tests`).
4. **Committen** op branch `claude/gym-training-progress-app-mt7wwr`, Conventional Commits,
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
- Contrast getoetst: gewone tekst ≥ 4,5:1, grafiekkleuren ≥ 3:1, in beide thema's.

## Wat er staat

**Trainen** — schema's met per-set doelen, sjablonen (solo én duo), vrije trainingen, duo's
met kolommen naast elkaar, oefening vervangen tijdens de sessie, rusttimer, intervaltimer,
schijvenrekenmachine met echte schijfkleuren, RIR, set-types, supersets, per zijde loggen,
cardio, live PR-melding, vorige-prestatie-hints, korte trilling bij het invullen van reps,
raakvlakken ≥ 44 px, de regel waarin je typt licht op.

**Analyse** — progressie per oefening (lijn + staaf), periodefilter, vergelijken, maand-
overzicht, aanwezigheid en streaks, spiergroepverdeling, print-/PDF-rapport, CSV-export.

**Klanten** — profiel met contact en intake, doelen, progressiefoto's, archiveren, avatars
in de zijbalk (nieuwste progressiefoto, anders initialen), technieknotities per klant.

**Zakelijk** — agenda met statussen, strippenkaarten, openstaande betalingen, omzet per maand.

**Abonnementen** — eigen vormen (naam, prijs per maand, looptijd, sessies per week,
opzegtermijn, voorwaardentekst, eigen velden) en contracten per klant. Ondertekenen met de
vinger op de tablet (klant én coach), daarna vast; opzeggen rekent de opzegtermijn mee.
Contract als PDF — **zelfgeschreven PDF-schrijver in de app**, geen bibliotheek, werkt offline.
Versturen via het deelvenster, of automatisch mailen als de Edge Function is opgezet.
Elke verstreken maand van een getekend contract is een maandbedrag dat meetelt in de omzet
en apart afgetikt wordt.

**Voeding** — dagboek per maaltijdmoment, Open Food Facts met barcodescan, water,
weekgemiddelden, macroplan.

**Klantaccounts** — `sporter.html`, magic link, uitnodigingscode, klant logt zelf; komt bij
de coach binnen onder **Van klanten** en is met één tik over te nemen.

## Openstaand

- **Contracten automatisch mailen aanzetten** — code is klaar en getest, alleen het opzetwerk
  bij Resend en Supabase moet nog. Bewust uitgesteld tot er klanten voor online coaching
  tekenen. Stappen staan in SUPABASE.md stap 6.
- Geparkeerd: progressieregels, weekprogramma's/mesocycli, recepten en maaltijdsjablonen,
  offline productendatabase, klanten hun schema tonen in `sporter.html`, echte
  meerdere-coaches-rechten.

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
