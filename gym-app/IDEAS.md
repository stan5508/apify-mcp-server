# Coachlog — visie en backlog

## Waar dit heen gaat

Coachlog is nu een **admin-versie**: de coach (eigenaar van deze repo) beheert alles zelf op
een tablet in de sportschool. Klanten hebben geen eigen toegang.

Doel op termijn: samen met een online coach een **eigen, volwaardige trainingsapp** bouwen die
zich kan meten met de bekende apps (Strong, Hevy, Jefit voor logboek; Trainerize, TrueCoach,
Everfit, PTminder voor coaching). Alles wordt stap voor stap geoptimaliseerd.
**Voeding** is een serieuze kandidaat voor later (maaltijden, macro's, dagtotalen) — nog niet besproken qua vorm.

Bij elke nieuwe functie meewegen: nu single-user admin, later mogelijk meerdere coaches en
klant-inzage. Datamodel dus niet onnodig vastzetten op één gebruiker.

## Al gebouwd

Klanten, duo's, schema's met per-set doelen, sjablonen (koppelbaar aan solo én duo), vrije
trainingen, oefening vervangen tijdens de sessie, vorige-prestatie-hints, RIR, live PR-melding,
progressiepagina per oefening (lijn + staaf, PR's, totale progressie), lichaamsmetingen,
trainingen bewerken, kg/lbs-label, zijbalknavigatie (alfabetisch), duo-kolommen naast elkaar,
sync via privé GitHub Gist, offline PWA, publicatie via `gh-pages` (zie `publish.sh`).

## Geparkeerd — "misschien op een ander moment"

Niet afgewezen, alleen nu niet van toepassing:

- **Progressieregels** — automatisch gewichtsverhoging voorstellen bij alle reps gehaald.
- **Weekprogramma's / mesocycli** — relevant zodra klanten 2×/week komen.

## Backlog

### Tijdens de training — allemaal gebouwd (1 t/m 11)
Rusttimer, set-types, supersets, sessieduur, schijvenrekenmachine, notitie per set,
oefeningen herschikken, cardio-logging, lichaamsgewicht-oefeningen, per zijde loggen,
intervaltimer.

### Analyse & rapportage — allemaal gebouwd (12 t/m 19)
Periodefilter, oefeningen vergelijken, maandoverzicht, aanwezigheid & streaks,
spiergroepverdeling, print-/PDF-rapport, CSV-export, duo-maandvergelijking.
Bereikbaar via het submenu op de klantpagina (Training · Overzicht · Vergelijken ·
Metingen · Rapport).

### Bibliotheek — volledig gebouwd (stap 1 t/m 3)
Register met id's, bibliotheekpagina met zoeken/filteren/sorteren, per-oefening
instellingen (soort, spiergroep, materiaal, rusttijd, synoniemen), archiveren,
hernoemen met historie-herschrijving, dubbelen samenvoegen, gebruiksstatistieken,
en uitleg: uitvoering, aandachtspunten, video- en afbeeldingslink, plus
technieknotities per klant die tijdens de training zichtbaar zijn.

### Klantbeheer — allemaal gebouwd (20 t/m 26)
Profiel-tabblad met contactgegevens (bellen/sms/mail), intake (blessures, medisch,
notities) met waarschuwing op de klantpagina en tijdens de training, doelen met
streefdatum en voortgangsbalk (ook in het rapport), progressiefoto's (verkleind
opgeslagen), archiveren van klanten, zoekveld in de zijbalk en schema's kopiëren
naar een andere klant.

Let op: foto's tellen mee in de synchronisatie; boven ~900 kB weigert de sync met
een duidelijke melding in plaats van stil te falen.

### Zakelijk — allemaal gebouwd (27 t/m 31)
Sidebar-groep "Planning" met Agenda (dagweergave, afspraken voor klant of duo,
statussen gepland/geweest/no-show/geannuleerd) en Tegoeden & betalingen
(strippenkaarten per klant, restant met waarschuwing, openstaande betalingen,
omzet per maand). Tegoed telt één sessie per training plus no-shows (uit te
zetten). Dagoverzicht op de startpagina; herinneringen 15 minuten vooraf zolang
de app open staat (een gesloten PWA kan de browser hier niet wekken).

### Techniek & veiligheid — gebouwd (32 t/m 36)
Pincodeslot met automatische vergrendeling (schermslot: gegevens zelf blijven
leesbaar in browseropslag — geen encryptie), dagelijkse cloud-back-up in dezelfde
gist met terugzetten (laatste zeven), klant-inzage via `klant.html` op een
verborgen gist per klant, coachnaam die bij nieuwe trainingen wordt vastgelegd,
en een licht/donker/systeem-schakelaar.

Nog open op dit vlak: echte meerdere-coaches-rechten en vingerafdruk/gezicht
(WebAuthn) vragen een backend of aanzienlijk meer complexiteit. Nu deelt een
tweede coach hetzelfde sync-token, wat volledige toegang geeft.

### Voeding — gebouwd (37)
Voeding-tabblad per klant, opgezet naar het model van de grote voedingsapps:
"resterend" bovenaan (doel − gegeten + beweging), dagboek per maaltijdmoment,
productzoeken en barcode scannen via Open Food Facts (met eigen lijst als
terugval), snel toevoegen, vaak gebruikt, kopieer gisteren, water bijhouden,
weekgemiddelden, en een plan met macroverdeling (40/30/30 e.d.) of een voorstel
op basis van lichaamsgewicht. Verbranding uit trainingsduur is een schatting en
uit te zetten. Voeding verschijnt ook in het rapport en de klant-inzagepagina.

Nog open hier: recepten (meerdere producten als één item), maaltijdsjablonen,
en een offline productendatabase (nu vereist zoeken/scannen internet).

## Aanbevolen volgorde (advies, niet vastgelegd)

Voor dagelijks gebruik: 1 (rusttimer), 27 (sessietegoed), 20 (intake), 12 (periodefilter),
32 (pincode). Voor indruk op klanten: 17 (PDF-rapport).
