# Coachlog benchmark 2026 — onderzoek en 56 suggesties

Datum: 4 september 2026. Peil: Coachlog versie 66. Onderzoek naar de succesvolste coachingplatformen,
programma's en apps (2025–2026) en wat Coachlog daarvan kan overnemen. Webpagina's van vendors waren
vanuit de onderzoeksomgeving niet direct leesbaar; feiten komen uit zoekresultaten van de genoemde
bronnen en prijzen zijn indicatief.

## Situatie

Coachlog staat op versie 66 (live op gh-pages, gelijk aan de repo). Op het loggen zelf zit de app op gelijke hoogte met Hevy en Strong en op het zakelijke deel (contracten met handtekening, eigen PDF, betaal-QR) vóór op TrueCoach en Hevy Coach. De sporter-app dekt wat een klant tussen sessies nodig heeft: schema's van de coach, zelf loggen, voeding, check-in, berichten.

Wat ontbreekt is niet nóg een logfunctie. Het zijn drie lussen die elk succesvol platform wél heeft: de **accountability-lus** (instelbare check-in, gewoontes, weekrapport, risicosignalen, automatische berichten), de **geldlus** (facturen, incasso, zelf boeken, herinneringen, pakketladder, verwijzingen) en de **juridische basis** (PAR-Q, toestemming voor gezondheidsdata, vrijwaring). Alle drie zijn in de code afwezig: geen gewoontes, geen factuur, geen iDEAL, geen verwijzing, geen PAR-Q, geen vervaldatum op strippenkaarten, geen "laatst gezien".

De branchecijfers laten zien waarom dat telt. Gemiddeld behoud in de fitnessbranche is 66% per jaar; minder dan 15% van PT-klanten haalt 50 sessies per jaar; de meeste relaties eindigen na drie tot zes maanden; de helft van de vertrekkers noemt "geen band met de trainer". Twee contactmomenten per maand leveren één extra bezoek op; een klant die een concrete volgende afspraak bevestigt zegt 45% minder vaak op. Dat zijn geen app-functies, dat zijn gedragslussen die een app kan afdwingen.

## Grootste probleem

**Er is nog geen online omzet, en de app is gebouwd voor de tablet in de zaal, niet voor de zeven dagen ertussen.** Contracten mailen en push staan bewust uit "tot er klanten voor online coaching tekenen". Maar die klanten komen niet zolang de app hun geen reden geeft om dagelijks terug te komen (gewoontes, weekrapport, reacties van de coach) en zolang er geen pakket is dat ze kunnen kopen (ladder, factuur, incasso).

Omzet van een personal trainer is begrensd door uren. De enige schaalbare route is een online of hybride trede die klanten langer vasthoudt en een onderhoudstarief dat na een traject doorloopt. Elke grote speler, van Personal Body Plan tot Renaissance Periodization, verdient zo. Coachlog heeft de bouwstenen (abonnementsvormen, sporter-app, Klaarzetten) maar zet ze niet in elkaar.

## Aanbevolen actie

Bouw eerst de drie lussen, in deze volgorde: risico en geld uit bestaande data (geen SQL, sprint 1), dan de accountability-lus (sprint 2), dan juridisch en facturen (sprint 3). Pas daarna zelf boeken, incasso en AI. Elk punt is een aparte kleine PR met versienummer, zoals HANDOVER.md voorschrijft, en Stan kiest per punt.

Niet doen: native watch-app, 3D-oefeningen, white-label, openbare feed. Dat is de strijd van Hevy en Virtuagym, niet die van een lokale PT met een hybride model.

## De top-tien

| # | Naam | Soort | Omvang | Prijs | Wat Coachlog ervan leert |
| --- | --- | --- | --- | --- | --- |
| 1 | [ABC Trainerize](https://www.trainerize.com/) | Coachplatform | 400.000+ trainers, Capterra 4,6 (693) | $35–139/mnd + add-ons (voeding $20–45, betalingen, eigen app); FitMetrics-AI $150+/mnd | Check-in-formulieren (2025), gewoontes met badge-ladder, automatische berichten, risico-tags, Master Programs op kalender |
| 2 | [Everfit](https://everfit.io/) | Coachplatform | 380.000+ coaches (claim), G2 4,8 | Gratis tot 5 klanten; Pro $19–290; Autoflow $29, betalingen $9, maaltijdplannen $39 | Autoflow (dripreeks op dag-nummer, triggers bij 3 gemiste trainingen), check-ins naast elkaar, onboarding-flow, foto-vergelijking |
| 3 | [TrueCoach (Xplor)](https://truecoach.co/) | Coachplatform | 20.000+ coaches, Capterra 4,8 (828) | $30–165/mnd; 5% fee op betalingen sinds jan 2026 | Snelste 1-op-1 programmering, videofeedback op sets, Garmin/WHOOP/Oura-sync; bewust géén AI, voeding of community |
| 4 | [My PT Hub](https://www.mypthub.net/) | Coachplatform | 200.000+ trainers (claim), 4,6 (3.204 reviews) | $40–329/mnd | Check-Ins AI: concept-antwoord uit check-in + trainingen + voeding, leert toon van je laatste 3 antwoorden (claim: 80% minder admin) |
| 5 | [PT Distinction](https://www.ptdistinction.com/) | Coachplatform | Capterra 4,9 (441) | $19,90–89,90/mnd, alle functies op elk niveau | Automatiseringsreeksen voor het hele klanttraject, gewoontecoaching op drip, assessments; goedkoopste volledige stack |
| 6 | [Kahunas](https://kahunas.io/) | Coachplatform | 14.000+ coaches, 750.000 eindgebruikers, Trustpilot 4,8 | $35–99/mnd, 0% commissie, eigen App Store-app op $99 | Foto-overlay voor vooruitgang, spraakberichten, HealthKit-data vult check-in vooraf in; klant-app scoort maar 3/5 (instabiel) |
| 7 | [Hevy + Hevy Coach](https://hevycoach.com/) | Logboek + coach | 15M+ gebruikers, ~$600k/mnd omzet, 4,9 (87k) | Consument $2,99/mnd; coach $25–160/mnd | Deelkaart direct na afronden, beste log-UX, Apple Watch/Wear OS; bewust géén voeding of betalingen |
| 8 | [Future](https://www.future.co/) | Coaching-dienst | 4,9 (9.400 reviews) | $199/mnd, 30 dagen geld terug | Elke week een nieuw plan, dagelijks coachbericht vóór en na de training, Apple Watch in bruikleen zodat de coach elke sessie ziet |
| 9 | [Caliber](https://caliberstrong.com/) | Coaching-dienst | $2,2M seed, sterke reviews (BarBend, GGR) | Gratis → $12 (Strength Score) → $19 (groep) → $200+ (1-op-1) | Pakketladder in één app, wekelijkse asynchrone videoreview, Strength Score en Strength Balance als één cijfer |
| 10 | [Personal Body Plan (NL)](https://personalbodyplan.com/prijzen/) | Online-coachingprogramma | Grootste NL-speler, gecertificeerde alumni-coaches | DIY ~€18/mnd, PRO/VIP ~€79/mnd; resultaatgarantie | DIY/PRO/VIP-ladder, één vaste coachdag (< 24 u antwoord), na het traject automatisch naar onderhoud i.p.v. opzeggen, rejoin-pagina |

### Ook onderzocht

- **Virtuagym (NL)** — Clubsoftware met coachmodule, $19–39/locatie/mnd, 4.000+ 3D-oefeningen, Google Agenda-sync; zwaar voor solo-coaches
- **CoachRx (OPEX)** — 8.000+ coaches, $29–149; RxBot AI trainbaar op je eigen toon, LifestyleRx, maandconsult + weekcheck-in; wekelijkse changelog
- **TrainHeroic** — Sinds jul 2026 van Garmin; marketplace voor programma's, team-ranglijsten, readiness-enquêtes
- **Fitr (UK)** — Gescoorde workouts met live ranglijst, klant verschuift programma met één tik; 5,99% fee
- **PTminder / Mindbody** — Planning, formulierbouwer voor PAR-Q en vrijwaringen, financiële rapporten; verouderde UI, commissie
- **Nudge Coach** — Gestopt 30 apr 2025; kaart- en reeksmodel voor gewoonteprogramma's blijft een goed ontwerpvoorbeeld
- **Strong** — 3M+ gebruikers; Apple Watch zonder telefoon, warming-up- en schijvenrekenaar, e1RM per oefening
- **Jefit** — 13M gebruikers; punten, ranglijst, jaaroverzicht, adaptieve AI-coach
- **Fitbod** — 15M downloads, $15,99/mnd; herstelpercentage per spier stuurt oefeningkeuze
- **Boostcamp** — 1,2M lifters, gratis; zondagrapport, Wrapped, RPE, e1RM-curves, programma's forken
- **JuggernautAI** — $34,99/mnd; dagelijkse readiness-check verlaagt de belasting van die ene sessie
- **RP Hypertrophy** — $34,99/mnd; pump/spierpijn/gewrichtspijn per sessie bepaalt sets binnen de mesocyclus, dan deload
- **MacroFactor** — $5,99–11,99/mnd; berekent verbruik uit inname vs gewichtstrend, wekelijkse herberekening, drie coachstijlen
- **Noom** — 50M+ downloads; dagelijkse gedragsles, verkeerslichtkleuren, streaks; hoogste engagement-kwartiel verliest 25% meer gewicht
- **Peloton** — 2,9M abonnees, verloop 1,2–1,8%/mnd; weekstreak, badges op 75/100/250 dagen, Club Peloton-punten voor consistentie
- **Freeletics** — 52M geregistreerd; "Perfecte week"-streak (vergeeft een gemiste dag), Mindset-audio (+7% behoud, claim)
- **Ladder** — 150k betalende leden, $29–39/mnd; teams met coach in de groepschat, "Cheers", max 2 teamwissels per maand
- **WHOOP** — 2,5M leden, ~$1,1 mrd boekingen; AI-coach met geheugen, Journal Trends, weekplan
- **MyFitnessPal** — 30M MAU; logstreak als kernmechanisme, "nog 2 dagen tot je 5-daagse streak"
- **Sweat (Kayla Itsines)** — >$100M omzet op piek; 12 weken in 3 fasen, community-challenge met prijsloten per training
- **Renaissance Periodization** — 1-op-1 vanaf $349,99/mnd, 3 maanden minimum, klant checkt 2× per week in, coach antwoordt < 24 u
- **Centr, Nike Training Club, Zwift, Google Health Coach** — Dagplanner (Centr), gratis content (NTC), clubs met eventsjablonen en ranglijsten (Zwift), weekdoelen die zichzelf aanpassen bij pijn (Google)
- **Fitchannel, Basic-Fit, WeightWatchers NL** — Fitchannel Pro: intake diëtist + 8 weken wekelijkse groepssessie; Basic-Fit Ultimate: gratis PT-intake als upsell; WW: 60% korting op rejoin-pagina

## Waar Coachlog al staat

| Coachlog heeft | Vergelijkbaar met | Stand |
| --- | --- | --- |
| Sets afvinken, rusttimer, intervaltimer, schijvenrekenaar, supersets, RIR, per zijde, cardio, warming-upvoorstel | Hevy, Strong, Boostcamp | Gelijk of beter |
| PR-melding live, e1RM (Epley), progressieregels, mesocycli met deload, weekprogramma | RP, Boostcamp, Everfit | Gelijk |
| Wekelijkse check-in (gewicht, energie, slaap, motivatie, foto's), berichten, techniekvideo met feedback | TrueCoach, Trainerize | Basis aanwezig, niet instelbaar |
| Aanwezigheid en streak-ring, sets per spiergroep tegen richtlijn 10–20 | Trainerize, Everfit | Gelijk |
| Agenda met terugkerende afspraken, strippenkaarten, no-show-telling, betaal-QR (EPC), omzet per maand | PTminder, Trainerize Business | Eenrichting: klant boekt niet zelf |
| Abonnementsvormen, contracten met vingerhandtekening, eigen PDF-schrijver, mailen via Edge Function | Geen platform heeft dit offline | Beter |
| Voedingsplan van de coach, klant logt zelf (Open Food Facts, barcode, water, Mijn maaltijden) | Trainerize, Everfit (add-on $39) | Gelijk, zonder AI-foto |
| Progressiefoto's, metingen, doelen met voortgangsbalk, intake met blessures | Alle platforms | Foto's niet naast elkaar |
| Anatomie-naslag per spiergroep, oefeningbibliotheek met uitleg en videolink | Virtuagym (3D) | Eigen, tekstueel |
| Offline PWA, pincode, dagelijkse back-up, donker thema, sporter-app met magic link en koppel-QR | Kahunas, Everfit | Gelijk; geen native app |

## 56 suggesties

Inspanning: klein (dagdeel tot dag), middel (dagen), groot (week of meer). Prio 1 = nu, 2 = daarna, 3 = later.
Telling: 18 nu, 26 daarna, 12 later.

### Retentie & accountability

#### 1. Eigen check-in-vragen (formulierbouwer)

- **Bron:** Trainerize Check-In Forms (2025), Everfit Forms, My PT Hub
- **Wat:** Vragen van het type schaal 1–10, meerkeuze en tekst, terugkerend op een vaste dag. De beste check-in is kort, elke week hetzelfde en meet drie dingen: naleving, obstakels, wat de klant zelf gaat veranderen.
- **In Coachlog:** Nu is de check-in vast (gewicht, energie, slaap, motivatie, foto's). Voeg een vragenset per klant toe die met Klaarzetten meegaat; antwoorden als extra kolom in `client_checkins`. Beheer in Instellingen.
- **Inspanning:** middel · **Impact:** hoog · **Prio:** 1 (nu)

#### 2. Vaste coachdag en antwoordafspraak

- **Bron:** Personal Body Plan PRO, RP (2× per week inchecken), B-Fit
- **Wat:** Eén vaste dag per klant waarop de check-in binnenkomt en een zichtbare belofte (antwoord binnen 24 u). Dat zet verwachtingen en begrenst jouw werklast.
- **In Coachlog:** Veld `checkinDay` per klant; sporter-app herinnert die dag; Vandaag toont "te beantwoorden" met de leeftijd van het bericht en een rode rand boven 24 u.
- **Inspanning:** klein · **Impact:** hoog · **Prio:** 1 (nu)

#### 3. Check-ins naast elkaar plus trendlijn

- **Bron:** Everfit Response Comparison (mrt 2026)
- **Wat:** Twee check-ins kiezen en de antwoorden naast elkaar zien; schaalvragen als lijn over de tijd.
- **In Coachlog:** Hergebruik de metingengrafiek voor energie/slaap/motivatie; kiezer met twee datums op de klantpagina.
- **Inspanning:** klein · **Impact:** middel · **Prio:** 2 (daarna)

#### 4. Automatisch weekrapport aan de klant

- **Bron:** Boostcamp zondagrapport, Peloton IQ weekly summary, Caliber weekreview, WHOOP Weekly Plan
- **Wat:** Elke zondag een kort overzicht: trainingen, sets, PR's, aanwezigheid, gewichtstrend, voeding tegenover het plan, en één zin van de coach. Een wekelijks ritme is bij alle grote apps de eenheid van commitment.
- **In Coachlog:** Functie `weekSummary(client)` uit bestaande data; versturen als bericht in `client_messages`. Eerst met een knop "Weekrapporten versturen" op Vandaag, later via pg_cron plus Edge Function.
- **Inspanning:** middel · **Impact:** hoog · **Prio:** 1 (nu)

#### 5. Risicovlag per klant

- **Bron:** Everfit-triggers (3 gemiste trainingen), Trainerize at-risk tags, HFA-onderzoek
- **Wat:** Verloop begint stil: minder berichten, gemiste check-in, weken zonder training. Wie dat ziet, kan ingrijpen vóór de opzegging.
- **In Coachlog:** Score uit: dagen sinds laatste training, gemiste check-in, geen bericht in 14 dagen, tegoed bijna op. Oranje/rode stip in de zijbalk en een blok "Aandacht nodig" op Vandaag. Geen nieuwe tabel.
- **Inspanning:** klein · **Impact:** hoog · **Prio:** 1 (nu)

#### 6. Commitment-knop bij een rode vlag

- **Bron:** HFA: een klant die een concrete volgende afspraak bevestigt zegt 45% minder vaak op
- **Wat:** Bij risico niet "hoe gaat het?" sturen, maar een afspraak voorstellen.
- **In Coachlog:** Knop "Plan volgende sessie" bij de vlag: maakt de afspraak en stuurt "Zie ik je [dag] om [tijd]?" naar de klant.
- **Inspanning:** klein · **Impact:** hoog · **Prio:** 1 (nu)

#### 7. Gewoontes met weekdoel en reeks

- **Bron:** Trainerize Habits, TrueCoach, Everfit, PT Distinction, Precision Nutrition
- **Wat:** Dagelijkse of wekelijkse gewoontes (10.000 stappen, 3× groente, 7 u slaap) die de klant afvinkt. Precision Nutrition: één gewoonte per twee weken houdt >80% vol; twee tegelijk mislukt bijna altijd.
- **In Coachlog:** Tabel `client_habits` (naam, doel per week, start); afvinken op Vandaag in de sporter-app; coach ziet % per week; maximaal twee actieve gewoontes afdwingen.
- **Inspanning:** middel · **Impact:** hoog · **Prio:** 1 (nu)

#### 8. Perfecte-week-reeks in plaats van dagreeks

- **Bron:** Freeletics Perfect Weeks, Peloton weekstreak, MyFitnessPal (streak-vermoeidheid)
- **Wat:** Een reeks per week (doel = sessies per week uit abonnement of programma) vergeeft een gemiste dag. MyFitnessPal-data: motivatie zakt hard als een lange dagreeks breekt.
- **In Coachlog:** Bestaande streak-ring rekent per week; badges bij 2, 4, 8, 12, 26 perfecte weken.
- **Inspanning:** klein · **Impact:** middel · **Prio:** 2 (daarna)

#### 9. Mijlpaalbadges

- **Bron:** Peloton (75/100/250 dagen), Trainerize badge-ladder, Jefit
- **Wat:** Vaste mijlpalen: 1e, 10e, 25e, 50e, 100e training; eerste PR; 12 weken aanwezig; 10 check-ins.
- **In Coachlog:** Berekend uit bestaande trainingen; melding plus confetti (bestaat) en een rij in Voortgang van de sporter-app.
- **Inspanning:** klein · **Impact:** middel · **Prio:** 2 (daarna)

#### 10. Deelkaart na de training

- **Bron:** Hevy Shareables (automatisch bij afronden), Boostcamp Wrapped
- **Wat:** Een afbeelding met duur, sets, PR's en spiergroepstippen, klaar voor Instagram Stories. Gratis zichtbaarheid met jouw naam erop.
- **In Coachlog:** Canvas → PNG met het Coachlog-woordmerk en de coachnaam; delen via `navigator.share` met bestand, zoals nu bij de contract-PDF.
- **Inspanning:** klein · **Impact:** middel · **Prio:** 2 (daarna)

#### 11. Jaaroverzicht per klant

- **Bron:** Boostcamp Wrapped, Jefit Year in Review
- **Wat:** In december een deelbaar overzicht: trainingen, sets, PR's, zwaarste lift, aanwezigheid.
- **In Coachlog:** Zelfde generator als de deelkaart; ook een coach-versie ("jouw jaar") voor eigen marketing.
- **Inspanning:** klein · **Impact:** laag · **Prio:** 3 (later)

#### 12. Reacties op binnengekomen trainingen

- **Bron:** Ladder "Cheers", CoachRx reactions; HFA: elke 2 contactmomenten per maand geven +1 bezoek
- **Wat:** Een duim of vlammetje op een gelogde training is een contactmoment van twee seconden.
- **In Coachlog:** Knoppen 👍 🔥 💬 in Van klanten; reactie wordt een bericht met verwijzing naar de training.
- **Inspanning:** klein · **Impact:** hoog · **Prio:** 1 (nu)

#### 13. Spraakberichten

- **Bron:** Kahunas voice notes, Future (spraak en video), Caliber asynchrone videoreview
- **Wat:** Inspreken kost de coach een derde van de tijd van typen en voelt voor de klant persoonlijker.
- **In Coachlog:** MediaRecorder → bucket `voice-notes` (zoals `technique-videos`); `client_messages` krijgt een audiopad.
- **Inspanning:** middel · **Impact:** middel · **Prio:** 2 (daarna)

#### 14. Standaardantwoorden

- **Bron:** Everfit saved responses
- **Wat:** Sjablonen voor terugkerende antwoorden (slaap, honger, gemiste training).
- **In Coachlog:** `settings.snippets`; invoegknop in de chat.
- **Inspanning:** klein · **Impact:** laag · **Prio:** 2 (daarna)

#### 15. AI-concept voor het check-in-antwoord

- **Bron:** My PT Hub Check-Ins AI, CoachRx RxBot V2, Trainerize FitMetrics ($150+/mnd)
- **Wat:** Een concept-antwoord op basis van de check-in, de laatste vier weken trainingen, voeding tegenover het plan en de doelen. De coach bewerkt altijd; de klant merkt alleen dat het antwoord sneller komt.
- **In Coachlog:** Edge Function `draft-reply` met de Claude-API (centen per concept); alleen voor de rol coach. Gezondheidsdata naar een derde vraagt expliciete toestemming (zie 51).
- **Inspanning:** middel · **Impact:** hoog · **Prio:** 2 (daarna)

#### 16. Onboarding-reeks voor nieuwe klanten

- **Bron:** Everfit Onboarding Flow, Trainerize automatische berichten, Nudge Sequences
- **Wat:** Dag 0, 1, 3, 7, 14: welkom, wat te verwachten, eerste check-in, "hoe bevalt het". Realistische verwachtingen in week 1 voorkomen afhaken in week 3.
- **In Coachlog:** Sjablonen in Instellingen; verzending door pg_cron, of door de coach-app bij het openen (achterstallige items inhalen).
- **Inspanning:** middel · **Impact:** hoog · **Prio:** 1 (nu)

#### 17. Trajectsjabloon van 8 of 12 weken

- **Bron:** Trainerize Master Programs, Sweat (12 weken in 3 fasen), Personal Body Plan-fasen
- **Wat:** Eén sjabloon = programma + mesocycli + check-in-schema + berichten + einddatum. Een traject met een einde is makkelijker te verkopen dan een open abonnement.
- **In Coachlog:** Bouwt op weekprogramma en mesocycli; einde toont een afrondscherm met rapport en vervolgaanbod (zie 18).
- **Inspanning:** groot · **Impact:** hoog · **Prio:** 2 (daarna)

#### 18. Onderhoudsfase in plaats van opzeggen

- **Bron:** Personal Body Plan (na het traject automatisch DIY), Basic-Fit (2× per jaar pauze)
- **Wat:** Wie stopt met coaching, houdt de app en de schema's tegen een laag tarief. Omzet blijft, upgrade blijft één tik weg.
- **In Coachlog:** Abonnementsvorm "Onderhoud"; bij opzeggen eerst "Zet om naar onderhoud" aanbieden; pauzeren maximaal 2× per jaar met verschuivende einddatum.
- **Inspanning:** klein · **Impact:** hoog · **Prio:** 1 (nu)

#### 19. Groepsuitdaging op consistentie

- **Bron:** Sweat Challenge, Club Peloton (punten voor consistentie, niet prestatie), Everfit-ranglijsten; HFA: groepsdeelname halveert opzegrisico
- **Wat:** Vier weken, één doel (bijv. 12 trainingen), ranglijst op percentage voltooid. Niet op kilo's: dat demotiveert beginners.
- **In Coachlog:** Uitdaging = periode + doel; opt-in met voornaam of bijnaam; zichtbaar in de sporter-app.
- **Inspanning:** middel · **Impact:** middel · **Prio:** 2 (daarna)

#### 20. Micro-lessen op drip

- **Bron:** Noom (dagelijkse gedragsles), Personal Body Plan-lessen, MacroFactor coaching modules
- **Wat:** Eén korte les per week (eiwit, slaap, eten buiten de deur) gekoppeld aan de check-in. Eenmalig schrijven, elke klant krijgt ze.
- **In Coachlog:** Tabel `lessons` (titel, tekst, videolink); week-nummer bepaalt welke les meegaat.
- **Inspanning:** middel · **Impact:** middel · **Prio:** 3 (later)

### Training & programmering

#### 21. Readiness-check vóór de training

- **Bron:** JuggernautAI (slaap, energie, spierpijn 1–5), RP, WHOOP
- **Wat:** Drie tikken bij Start; een lage score verlaagt alleen de belasting van vandaag, niet het hele blok.
- **In Coachlog:** Progressieregels krijgen een richting omlaag: onder de drempel −5 of −10% klaarzetten of een deload-dag voorstellen; score zichtbaar voor de coach.
- **Inspanning:** klein · **Impact:** middel · **Prio:** 2 (daarna)

#### 22. RPE naast RIR

- **Bron:** Hevy, Strong, Boostcamp (RPE-kolom instelbaar)
- **Wat:** Sommige klanten denken in RPE. Zelfde veld, andere schaal.
- **In Coachlog:** Instelling RIR of RPE; opslag blijft RIR (10 − RPE).
- **Inspanning:** klein · **Impact:** laag · **Prio:** 3 (later)

#### 23. Sessie-feedback per spiergroep

- **Bron:** RP Hypertrophy (pump, spierpijn, gewrichtspijn, prestatie), Freeletics moeilijkheidsscore
- **Wat:** Twee vragen per getrainde keten bij het afronden. Binnen de mesocyclus: goed hersteld en doelen gehaald → volgende week een set erbij; gewrichtspijn → vlag voor de coach.
- **In Coachlog:** Uitbreiding van het afrondscherm; regel naast de bestaande progressieregels.
- **Inspanning:** middel · **Impact:** middel · **Prio:** 2 (daarna)

#### 24. Machine-instellingen en pijn per oefening per klant

- **Bron:** Trainerize Exercise Notes (stoelhoogte, bandkleur, pijn)
- **Wat:** Stoelhoogte 4, pin op 7, "linkerknie voelt". Dagelijks nut in de zaal en de basis voor blessurepreventie.
- **In Coachlog:** Technieknotities per klant bestaan; voeg gestructureerde velden toe (instelling, pijn ja/nee + waar). Pijn geeft een vlag op de klantpagina en in Van klanten.
- **Inspanning:** klein · **Impact:** hoog · **Prio:** 1 (nu)

#### 25. Vaste alternatieven per oefening

- **Bron:** Everfit alternate exercises, CoachRx ruilen met behoud van bedoeling
- **Wat:** Toestel bezet? De klant ruilt zelf, maar alleen binnen wat jij vooraf goedkeurde.
- **In Coachlog:** `exercise.alternatives[]` in de bibliotheek; "Vervangen" toont die eerst; de sporter-app laat alleen die lijst zien.
- **Inspanning:** klein · **Impact:** middel · **Prio:** 2 (daarna)

#### 26. Doelen als percentage van e1RM

- **Bron:** Everfit %1RM en auto-fill, TrainHeroic
- **Wat:** Schema zegt 80%; de app rekent het gewicht uit het laatste e1RM en rondt af op schijven.
- **In Coachlog:** Per set een `pct`-veld; Epley en schijfafronding bestaan al.
- **Inspanning:** klein · **Impact:** middel · **Prio:** 2 (daarna)

#### 27. Krachtscore en balans

- **Bron:** Caliber Strength Score en Strength Balance
- **Wat:** Eén cijfer: e1RM van squat, bench, deadlift en row gedeeld door lichaamsgewicht tegen een normtabel, plus balans duw/trek/benen.
- **In Coachlog:** Berekening uit bestaande PR's; balans in de bestaande ketenkleuren.
- **Inspanning:** middel · **Impact:** middel · **Prio:** 3 (later)

#### 28. Circuits, AMRAP, EMOM en for-time

- **Bron:** TrainHeroic, Fitr gescoorde workouts, CoachRx conditioning
- **Wat:** Voor small-group en conditie: score = rondes + reps.
- **In Coachlog:** Set-type "ronde" gekoppeld aan de intervaltimer die er al is.
- **Inspanning:** middel · **Impact:** laag · **Prio:** 3 (later)

#### 29. Tempo-notatie per oefening

- **Bron:** TrueCoach- en Everfit-programmering, RP
- **Wat:** 3-1-1-0 in het schema, zichtbaar tijdens de set.
- **In Coachlog:** Veld `tempo` op de schema-oefening; tonen naast de rusttijd.
- **Inspanning:** klein · **Impact:** laag · **Prio:** 3 (later)

#### 30. Testbatterij elke 8–12 weken

- **Bron:** PT Distinction assessments, Fitr benchmarks
- **Wat:** Vaste tests (5RM, plank, 1,5 km, beweeglijkheid) met herhaalmeting; bewijs van vooruitgang los van de dagelijkse logs.
- **In Coachlog:** Test = oefening met vlag `benchmark`; aparte tabel in het rapport.
- **Inspanning:** middel · **Impact:** middel · **Prio:** 3 (later)

### Zakelijk & geld

#### 31. Facturen volgens de Nederlandse eisen

- **Bron:** Belastingdienst-factuureisen, PTminder financiële rapporten, Pay n Plan auto-factuur
- **Wat:** Doorlopend nummer, KVK, btw-id, 21% (9% alleen als je zelf de sportaccommodatie exploiteert; online coaching is altijd 21%), bedrag ex en incl. Zonder factuur geen zakelijke klanten en gedoe met de boekhouder.
- **In Coachlog:** `invoices` in de db; genereren uit strippenkaart, losse sessie of contractmaand; PDF via de eigen PDF-schrijver; jaaroverzicht als CSV.
- **Inspanning:** middel · **Impact:** hoog · **Prio:** 1 (nu)

#### 32. iDEAL-betaallink en SEPA-incasso via Mollie

- **Bron:** Mollie (eerste iDEAL-betaling = machtiging, ~€0,25 per incasso), Pay n Plan
- **Wat:** Contractmaanden automatisch incasseren; losse betalingen via een link. Vervangt het handmatig aftikken en verkort de betaaltermijn.
- **In Coachlog:** Edge Function `create-payment` plus webhook die de betaling op "betaald" zet; knop naast de bestaande EPC-QR. Vereist KVK en zakelijke rekening.
- **Inspanning:** groot · **Impact:** hoog · **Prio:** 2 (daarna)

#### 33. Vervaldatum, pauze en 24-uursregel

- **Bron:** NL-voorwaarden (24 u, geldigheid 3–12 maanden, pauze 2× per jaar), Basic-Fit
- **Wat:** Strippenkaarten verlopen nu niet in de app; de 24-uursregel staat alleen in de voorwaardentekst.
- **In Coachlog:** `package.validUntil` met waarschuwing; pauze op contract met verschuivende einddatum; annuleren binnen 24 u telt als sessie via de bestaande no-show-telling.
- **Inspanning:** klein · **Impact:** hoog · **Prio:** 1 (nu)

#### 34. Zelf boeken en verzetten in de sporter-app

- **Bron:** Trainerize Business, Virtuagym, PTminder, Mindbody
- **Wat:** De coach zet beschikbare blokken; de klant kiest binnen zijn tegoed, verzet tot 24 u vooraf, komt op een wachtlijst als het vol is. Scheelt de appjes heen en weer.
- **In Coachlog:** `client_appointments` bestaat en wordt tweerichting; beschikbaarheid uit de agenda; wachtlijst als kolom.
- **Inspanning:** groot · **Impact:** hoog · **Prio:** 2 (daarna)

#### 35. Herinnering 24 uur vooraf

- **Bron:** PTminder sms en mail; pushbenchmarks: 17–19 u werkt het best
- **Wat:** De goedkoopste no-show-preventie die er is.
- **In Coachlog:** Push-code staat er sinds versie 64 (SUPABASE.md stap 8); pg_cron elk uur → `send-push` voor afspraken binnen 24 u; mail als terugval. iOS vraagt "zet op beginscherm".
- **Inspanning:** middel · **Impact:** hoog · **Prio:** 1 (nu)

#### 36. Agenda-export als .ics

- **Bron:** Virtuagym Google Agenda-sync
- **Wat:** Afspraken in de eigen telefoonagenda van coach en klant.
- **In Coachlog:** .ics-bestand per klant; abonneer-URL via Edge Function.
- **Inspanning:** klein · **Impact:** laag · **Prio:** 2 (daarna)

#### 37. Pakketladder zichtbaar in de app

- **Bron:** Personal Body Plan DIY/PRO/VIP, RP, Caliber (gratis → $12 → $19 → $200), Noom
- **Wat:** Elke grote speler heeft minstens drie treden en een upgrade-knop in de app. Coachlog heeft abonnementsvormen, maar de klant ziet niet wat erin zit.
- **In Coachlog:** Abonnementsvorm krijgt "inbegrepen": check-in-frequentie, reactietijd, videogesprek per maand, sessies. Sporter-app toont de trede en een knop "Upgrade" die een bericht stuurt.
- **Inspanning:** klein · **Impact:** hoog · **Prio:** 1 (nu)

#### 38. Verwijzingscode

- **Bron:** Trainerize Business referrals, NL-norm "breng een vriend = gratis sessie", Sweat-uitnodigingspunten
- **Wat:** Acquisitie voor €0. Wie aanbrengt krijgt automatisch een strip.
- **In Coachlog:** Code per klant in de sporter-app; veld `referredBy` bij een nieuwe klant; beloning als strippenkaart-tegoed; aantal per klant in het dashboard.
- **Inspanning:** klein · **Impact:** hoog · **Prio:** 1 (nu)

#### 39. Reviewverzoek na een mijlpaal

- **Bron:** Retentie-onderzoek (vraag direct na een winst), Personal Body Plan "ervaringen"
- **Wat:** Na de 10e training, een behaald doel of een PR is de kans op een review het grootst.
- **In Coachlog:** Automatisch bericht met je Google-reviewlink; toestemming voor testimonial en foto vastleggen met de bestaande handtekening (AVG en portretrecht).
- **Inspanning:** klein · **Impact:** middel · **Prio:** 2 (daarna)

#### 40. Win-back-lijst

- **Bron:** Personal Body Plan rejoin-pagina, WeightWatchers recentcancel, e-mailreeksen (12–15% komt terug)
- **Wat:** Gestopte klanten zijn de goedkoopste nieuwe klanten. Eerst waarde, pas in het tweede bericht een aanbod.
- **In Coachlog:** Lijst van gearchiveerde en inactieve klanten met laatste contact; sjabloon "we missen je"; herstartcode; opvolging na 30, 60 en 90 dagen.
- **Inspanning:** klein · **Impact:** middel · **Prio:** 2 (daarna)

#### 41. Leadformulier en gratis intake

- **Bron:** TrueCoach storefront, Trainerize prospects, Personal Fitness Nederland ("intake t.w.v. €99")
- **Wat:** Een openbare pagina waar een geïnteresseerde zich aanmeldt; jij ziet nieuwe leads op Vandaag.
- **In Coachlog:** `intake.html` op gh-pages schrijft naar tabel `leads` (alleen invoegen); "Maak klant" neemt de gegevens over.
- **Inspanning:** middel · **Impact:** middel · **Prio:** 2 (daarna)

#### 42. Zakelijk dashboard

- **Bron:** Zwak punt van Trainerize en Hevy volgens reviews; PTminder-rapporten
- **Wat:** MRR, actieve klanten, verloop per maand, omzet per klant (LTV), openstaand, sessies per week tegenover capaciteit, no-show-percentage. Zonder deze cijfers stuur je op gevoel.
- **In Coachlog:** Alles staat al in de db (trainingen, strippenkaarten, contracten, afspraken); één pagina onder Zakelijk.
- **Inspanning:** middel · **Impact:** hoog · **Prio:** 1 (nu)

#### 43. Programma's als product

- **Bron:** TrainHeroic Marketplace, Jeff Nippard-PDF's ($30–50), Hybrid Strength (€17,95/mnd)
- **Wat:** Een 8-weken-schema verkopen zonder coaching: inkomsten zonder uren.
- **In Coachlog:** Sjabloon markeren als product; betaallink uit 32; na betaling automatisch klaarzetten in de sporter-app.
- **Inspanning:** middel · **Impact:** middel · **Prio:** 3 (later)

### Voeding, data & wearables

#### 44. Stappen en slaap in de check-in

- **Bron:** Trainerize, Everfit, My PT Hub; coaches gebruiken stappen en slaap als nalevingsmaat, HRV alleen om intensiteit te sturen
- **Wat:** Twee cijfers die elke smartwatch levert en die meer zeggen over gedrag dan de weegschaal.
- **In Coachlog:** Twee velden in de check-in (handmatig overtikken). Een PWA kan niet bij HealthKit; Garmin/Oura/Strava-API via een Edge Function is de volgende stap. Toestemming vastleggen (zie 52).
- **Inspanning:** klein · **Impact:** middel · **Prio:** 2 (daarna)

#### 45. Gewichtstrend in plaats van losse punten

- **Bron:** MacroFactor weight trend, Noom
- **Wat:** Een gewogen gemiddelde haalt de dagschommeling eruit; een waarschuwing boven 1% verlies per week beschermt spiermassa.
- **In Coachlog:** Exponentieel gewogen gemiddelde over check-in-gewichten; lijn in de bestaande grafiek.
- **Inspanning:** klein · **Impact:** middel · **Prio:** 2 (daarna)

#### 46. Adaptieve calorieën

- **Bron:** MacroFactor (verbruik uit inname tegenover trend, wekelijkse herberekening), RP Diet
- **Wat:** Wekelijks een voorstel: "inname 2.150 kcal, trend −0,2 kg per week → houden" of "+100 kcal".
- **In Coachlog:** Berekening in de coach-app uit `client_meals` en de gewichtstrend; de coach keurt goed, Klaarzetten stuurt het nieuwe plan.
- **Inspanning:** middel · **Impact:** middel · **Prio:** 2 (daarna)

#### 47. Maaltijdfoto met AI-schatting

- **Bron:** Trainerize, Everfit MacroSnap, Noom, Ladder Nutrition
- **Wat:** Foto in plaats van zoeken verlaagt de drempel om te loggen.
- **In Coachlog:** Edge Function met een vision-model; klant bevestigt; markeren als schatting.
- **Inspanning:** middel · **Impact:** middel · **Prio:** 3 (later)

#### 48. Recepten met grammen en sync van Mijn maaltijden

- **Bron:** Fitchannel (1.200 recepten), Trainerize meal planner; open punt in IDEAS.md
- **Wat:** Recepten met ingrediënten per gram, boodschappenlijst uit het weekplan, en Mijn maaltijden op elk toestel.
- **In Coachlog:** Tabel `client_recipes`; ingrediënten uit Open Food Facts.
- **Inspanning:** middel · **Impact:** middel · **Prio:** 2 (daarna)

#### 49. Verkeerslichtkleur op producten

- **Bron:** Noom (caloriedichtheid groen, geel, rood)
- **Wat:** Eén kleurstip zegt meer dan een macro-tabel.
- **In Coachlog:** Drempels op kcal per 100 g; stip in het dagboek.
- **Inspanning:** klein · **Impact:** laag · **Prio:** 3 (later)

#### 50. Hartslag via Bluetooth bij cardio

- **Bron:** Fitbod, Centr, Nike Training Club (Apple Watch-hartslag)
- **Wat:** Gemiddelde en maximale hartslag bij een cardio-set.
- **In Coachlog:** Web Bluetooth heart-rate-profiel; werkt in Chrome op Android, niet in Safari op iOS.
- **Inspanning:** middel · **Impact:** laag · **Prio:** 3 (later)

### Techniek & juridisch

#### 51. PAR-Q, gezondheidsverklaring, AVG-toestemming en vrijwaring als ondertekenbare formulieren

- **Bron:** PTminder Form Builder (enige met echte waivers), Autoriteit Persoonsgegevens (gezondheidsdata = bijzondere categorie, toestemming expliciet en los van de voorwaarden)
- **Wat:** Verplicht zodra je online coacht en gezondheidsdata in de cloud zet. Een "ja" op de PAR-Q vraagt om een huisartsverklaring en hoort als waarschuwing in de training.
- **In Coachlog:** Hergebruik de contractflow (vingerhandtekening plus PDF); formulieren per klant met datum en intrekken; waarschuwing tijdens de training zoals nu bij blessures.
- **Inspanning:** middel · **Impact:** hoog · **Prio:** 1 (nu)

#### 52. Toestemmingsregister en verwijderen op verzoek

- **Bron:** AVG artikel 9; platforms bieden een verwerkersovereenkomst en toestemmingsflow
- **Wat:** Per klant: waarvoor (gezondheid, foto's, wearable, testimonial), wanneer, ingetrokken. Plus één knop die alles van een klant exporteert of wist, ook in de cloudtabellen.
- **In Coachlog:** Kolom `consents` op de klant; verwijderfunctie loopt alle `client_*`-tabellen af.
- **Inspanning:** middel · **Impact:** middel · **Prio:** 2 (daarna)

#### 53. Autosave elke set en conflictveilige sync

- **Bron:** Grootste klacht bij álle platforms (Trainerize, PT Distinction, Kahunas, CoachRx, TrueCoach): data kwijt midden in de training
- **Wat:** Een verloren training is het snelste verlies van vertrouwen dat er is.
- **In Coachlog:** Concept-sleutel bestaat in de coach-app; controleren dat elke set direct wegschrijft. Sync per klantrecord met laatste wijziging in plaats van de hele db in één gist.
- **Inspanning:** middel · **Impact:** hoog · **Prio:** 2 (daarna)

#### 54. Videogesprek-link per afspraak

- **Bron:** Trainerize ingebouwde video, Personal Body Plan VIP-maandgesprek, Caliber Premium
- **Wat:** Het maandgesprek is de duurste trede van de ladder; hij moet in de agenda staan.
- **In Coachlog:** Afspraaktype "videogesprek" met automatisch gegenereerde Jitsi- of Meet-link; knop "Deelnemen" in de sporter-app.
- **Inspanning:** klein · **Impact:** middel · **Prio:** 2 (daarna)

#### 55. Meerdere coaches met rollen

- **Bron:** Hevy Coach teambeheer, Everfit Studio
- **Wat:** Geparkeerd in HANDOVER.md; nodig vóór je de app aan een tweede coach geeft.
- **In Coachlog:** Rol per profiel; klanten gekoppeld aan een coach; RLS per coach.
- **Inspanning:** groot · **Impact:** middel · **Prio:** 3 (later)

#### 56. index.html opsplitsen in modules

- **Bron:** Eigen risico: 8.170 regels en 455 kB in één bestand
- **Wat:** Randvoorwaarde voor alles hierboven. Elk platform noemt stabiliteit als klacht nummer één; één bestand van deze omvang maakt elke wijziging riskanter.
- **In Coachlog:** Browser-eigen ES-modules zonder build; service worker-cache aanpassen. Eerst dit, dan pas functies (CLAUDE.md: refactor apart).
- **Inspanning:** groot · **Impact:** hoog · **Prio:** 1 (nu)

## Uitvoering

### Sprint 0 · week 1–2 · fundament

- 56. index.html opsplitsen in modules
- 53. Autosave elke set en conflictveilige sync

Opsplitsen en autosave. Geen nieuwe functies. Zonder dit stapelt elk volgend punt risico.

### Sprint 1 · week 3–5 · geld en risico, zonder nieuwe tabellen

- 5. Risicovlag per klant
- 6. Commitment-knop bij een rode vlag
- 12. Reacties op binnengekomen trainingen
- 18. Onderhoudsfase in plaats van opzeggen
- 24. Machine-instellingen en pijn per oefening per klant
- 33. Vervaldatum, pauze en 24-uursregel
- 37. Pakketladder zichtbaar in de app
- 38. Verwijzingscode
- 42. Zakelijk dashboard

Alles uit bestaande data. Levert direct: minder no-shows, upgrade-pad, verwijzingen, zicht op MRR en verloop.

### Sprint 2 · week 6–9 · de accountability-lus

- 1. Eigen check-in-vragen (formulierbouwer)
- 2. Vaste coachdag en antwoordafspraak
- 4. Automatisch weekrapport aan de klant
- 7. Gewoontes met weekdoel en reeks
- 16. Onboarding-reeks voor nieuwe klanten
- 35. Herinnering 24 uur vooraf

Vraagt SUPABASE.md stap 7 en 8 (tabellen en push). Dit is wat online coaching verkoopbaar maakt.

### Sprint 3 · week 10–12 · juridisch en facturen

- 51. PAR-Q, gezondheidsverklaring, AVG-toestemming en vrijwaring als ondertekenbare formulieren
- 31. Facturen volgens de Nederlandse eisen
- 52. Toestemmingsregister en verwijderen op verzoek
- 39. Reviewverzoek na een mijlpaal
- 40. Win-back-lijst

Vóór de eerste online-coachingklant tekent.

### Sprint 4 · week 13–18 · schaal

- 34. Zelf boeken en verzetten in de sporter-app
- 32. iDEAL-betaallink en SEPA-incasso via Mollie
- 15. AI-concept voor het check-in-antwoord
- 17. Trajectsjabloon van 8 of 12 weken
- 44. Stappen en slaap in de check-in
- 45. Gewichtstrend in plaats van losse punten
- 46. Adaptieve calorieën

Zelf boeken, incasso, AI-concepten, trajecten. Pas als sprint 1–3 in gebruik zijn en de cijfers uit het dashboard erom vragen.

## KPI's

| KPI | Doel | Toelichting |
| --- | --- | --- |
| Klantbehoud na 3 en 6 maanden | ≥ 75% / ≥ 60% | Branche: 66% per jaar; minder dan 15% van PT-klanten haalt 50 sessies per jaar |
| Check-in-respons per week | ≥ 80% | Gemiste check-in is het eerste verloopsignaal |
| Naleving: gedraaide sessies ÷ afgesproken sessies | ≥ 85% | Uit trainingen tegenover sessies per week in het abonnement |
| No-show-percentage | < 5% | Nu al geteld; herinnering en 24-uursregel moeten dit halveren |
| MRR en omzet per klant per maand | MRR +20% per kwartaal | Aandeel online/onderhoud in de MRR apart volgen |
| Nieuwe klanten via verwijzing | ≥ 30% van instroom | Verwijzingscode maakt dit meetbaar |
| Adminuren per week van de coach | Halveren | Facturen, herinneringen, check-in-antwoorden |
| Openstaand ouder dan 14 dagen | < 5% van de maandomzet | Incasso en betaallink |

## Risico's

- **Functie-inflatie in één bestand.** Elk punt is een aparte kleine PR met versienummer; niets bouwen dat Stan niet expliciet kiest (HANDOVER.md).
- **Gezondheidsdata en AI.** Check-in, foto's en wearable-cijfers zijn bijzondere persoonsgegevens. Eerst 51 en 52, dan pas 15 en 47.
- **Supabase gratis laag en pg_cron.** Weekrapport, herinneringen en onboarding-reeks vragen geplande taken; controleer limieten voordat je erop leunt. Terugval: de coach-app haalt achterstallige taken in bij openen.
- **Push op iOS.** Werkt alleen als de sporter-app op het beginscherm staat (iOS 16.4+). Mail als terugval.
- **Mollie vereist KVK en zakelijke rekening.** Plus een webhook-endpoint; dus een Edge Function, geen client-side sleutel.
- **Gamification kan averechts werken.** MyFitnessPal-data: motivatie zakt hard na het breken van een lange dagreeks. Daarom weekreeksen en consistentie-ranglijsten, geen prestatieranglijsten.
- **Sync-limiet van de gist (~900 kB).** Spraakberichten en foto's horen in Supabase-storage, niet in de gist.
- **Eén ontwikkelaar, geen tests op gym-app.** Playwright-scripts per functie (HANDOVER.md) blijven de enige vangrail; sprint 0 maakt ze goedkoper.

## Niet doen

- **Native watch-app.** Niet haalbaar als PWA; Apple Watch en Wear OS blijven aan Hevy en Strong. De telefoonmodus tijdens de set is het alternatief.
- **Oefeningfoto-catalogus of 3D-animaties.** Op 16 aug 2026 bewust verwijderd; Virtuagym heeft 4.000 3D-oefeningen en dat is niet in te halen. Uitleg en videolink volstaan.
- **White-label of marketplace.** Pas relevant bij meer dan één coach (55).
- **Openbare social feed.** Vraagt moderatie en levert voor een lokale PT niets op. Kleine groepsuitdaging (19) volstaat.
- **Dagreeksen en prestatieranglijsten.** Zie risico's: demotiveert de klanten die je het meest nodig hebt.

## Bronnen

- [Trainerize check-in forms](https://help.trainerize.com/hc/en-us/articles/31369316335124-Sharing-Check-In-Forms-with-Clients)
- [Trainerize habit streaks and badges](https://help.trainerize.com/hc/en-us/articles/360042304131-Habit-Winning-Streaks-Milestones-and-Achievement-Badges)
- [Trainerize pricing 2026](https://help.trainerize.com/hc/en-us/articles/46147820202772-Pricing-Updates-2026-FAQ)
- [Everfit Autoflow](https://help.everfit.io/en/articles/3661707-autoflow-overview-how-to-automate-your-training-business)
- [Everfit onboarding flow](https://help.everfit.io/en/articles/8440572-introducing-onboarding-flow)
- [Everfit March 2026 (response comparison)](https://blog.everfit.io/march-2026-everfit-new-features)
- [TrueCoach wearables](https://truecoach.co/features/wearables/)
- [My PT Hub Check-Ins AI](https://www.mypthub.net/product-blog/check-ins-ai/)
- [PT Distinction comparison](https://www.ptdistinction.com/pt-distinction-trainerize-everfit-truecoach-comparison)
- [Kahunas roadmap](https://pipeline.kahunas.io/en/roadmap)
- [Hevy Coach pricing](https://hevycoach.com/pricing/)
- [Hevy shareables](https://www.hevyapp.com/features/shareable/)
- [CoachRx RxBot](https://www.coachrx.app/rxbot-ai-fitness-coaching-assistant)
- [Garmin acquires TrainHeroic (jul 2026)](https://www.garmin.com/en-US/newsroom/press-release/corporate/garmin-acquires-trainingpeaks-and-trainheroic-leading-endurance-and-strength-training-platforms-for-athletes-and-coaches/)
- [PTminder forms and waivers](https://help.ptminder.com/en/articles/2214480-client-sign-up-forms-waivers-questionnaires)
- [Future review (CNN)](https://www.cnn.com/cnn-underscored/reviews/future-app)
- [Caliber review (BarBend)](https://barbend.com/caliber-fitness-app-review/)
- [Freeletics perfect weeks](https://help.freeletics.com/hc/en-us/articles/10286298927122-Perfect-weeks-and-Perfect-week-streaks-explained)
- [Club Peloton](https://www.onepeloton.com/club-peloton)
- [Peloton IQ](https://www.onepeloton.com/peloton-iq)
- [MyFitnessPal gamification case study](https://trophy.so/blog/myfitnesspal-gamification-case-study)
- [Noom engagement report (feb 2026)](https://www.globenewswire.com/news-release/2026/02/04/3231984/0/en/the-noom-engagement-report-new-data-shows-that-the-glp-1-patients-who-use-noom-the-most-also-lose-the-most-weight-and-stay-on-medication-program-longest.html)
- [MacroFactor](https://macrofactor.com/macrofactor/)
- [JuggernautAI review](https://www.garagegymreviews.com/juggernautai-review)
- [Boostcamp features](https://www.boostcamp.app/features)
- [Ladder funding](https://www.businesswire.com/news/home/20241120017577/en/Ladder-Secures-Over-$100-Million-in-New-Funding-to-Scale-1-Strength-Training-App)
- [HFA: 5 reasons members quit](https://www.healthandfitness.org/5-reasons-health-club-members-quit-and-how-to-make-them-stay/)
- [HFA benchmarking 2025](https://www.healthandfitness.org/health-fitness-association-releases-2025-fitness-industry-benchmarking-report/)
- [Mindbody State of the Industry 2025](https://www.mindbodyonline.com/business/education/research-report/2025-state-industry-report)
- [RevenueCat State of Subscription Apps](https://www.revenuecat.com/state-of-subscription-apps-2025)
- [Precision Nutrition one habit](https://www.precisionnutrition.com/one-habit)
- [Everfit: retain PT clients](https://blog.everfit.io/how-to-retain-personal-training-clients)
- [Personal Body Plan prijzen](https://personalbodyplan.com/prijzen/)
- [Proven Performance: kosten online PT 2025](https://provenperformance.nl/wat-kost-een-online-personal-trainer-2025/)
- [Gymsearch: PT-kosten 2026](https://gymsearch.nl/blog/personal-trainer-kosten-in-nederland-wat-betaal-je-2026/index.html)
- [Belastingdienst: gelegenheid geven om te sporten (9%)](https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/zakelijk/btw/tarieven_en_vrijstellingen/diensten_9_btw/sportbeoefening_waaronder_zwembaden_en_sauna/gelegenheid_geven_om_te_sporten/)
- [Numbar: btw-tarief personal trainer](https://numbar.nl/welk-btw-tarief-dient-een-personal-trainer-te-hanteren/)
- [Mollie SEPA-incasso (FactuurSturen)](https://www.factuursturen.nl/help/127/mollie-sepa-incasso)
- [Pay n Plan](https://www.paynplan.com/betalingen-agenda-software-personal-trainer)
- [Autoriteit Persoonsgegevens: gezondheidsgegevens](https://www.autoriteitpersoonsgegevens.nl/en/themes/health/using-and-sharing-health-data/processing-of-health-data)
- [Virtuagym retentie](https://business.virtuagym.com/blog/effective-personal-training-client-retention-strategies/)
- [Virtuagym prijzen (GetApp)](https://www.getapp.com/recreation-wellness-software/a/virtuagym/)
- [Coachbox: HRV-gestuurd trainen](https://coachbox.app/en/blog/hrv-guided-training/)
- [Google Health Coach](https://blog.google/products-and-platforms/products/google-health/google-health-coach/)
