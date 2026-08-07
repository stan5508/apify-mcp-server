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

- **Oefeningenbibliotheek met instructies** — coach kent de oefeningen zelf; relevant zodra
  anderen (mede-coach, klanten) meekijken.
- **Technieknotities per oefening** — zelfde reden.
- **Progressieregels** — automatisch gewichtsverhoging voorstellen bij alle reps gehaald.
- **Weekprogramma's / mesocycli** — relevant zodra klanten 2×/week komen.

## Backlog

### Tijdens de training — allemaal gebouwd (1 t/m 11)
Rusttimer, set-types, supersets, sessieduur, schijvenrekenmachine, notitie per set,
oefeningen herschikken, cardio-logging, lichaamsgewicht-oefeningen, per zijde loggen,
intervaltimer.

### Analyse & rapportage
12. Periodefilter op grafieken (3m/6m/jaar/alles)
13. Meerdere oefeningen in één grafiek vergelijken
14. Maandoverzicht (volume, sessies, PR's)
15. Aanwezigheid & streaks (kalender met stipjes)
16. Spiergroepverdeling (licht label per oefening, geen volledige bibliotheek)
17. PDF-/printrapport per klant
18. Export naar Excel/CSV
19. Duo-ranglijstje (PR's per maand)

### Klantbeheer
20. Intake & aandachtspunten (blessures, medisch, doelen)
21. Doelen met streefdatum + voortgangsbalk
22. Progressiefoto's
23. Archiveren van gestopte klanten
24. Zoekveld (vanaf ~30 klanten)
25. Contactgegevens (klikbaar)
26. Schema kopiëren tussen klanten

### Zakelijk
27. Sessietegoed / strippenkaart (aftellen, seintje bij bijna op)
28. Agenda (afspraken, dagoverzicht)
29. No-shows registreren
30. Facturatie / betaalstatus
31. Herinneringen

### Techniek & veiligheid
32. Pincode- of vingerafdrukslot (klantgegevens, AVG)
33. Automatische back-up
34. Klant-inzage (vereist sync)
35. Meerdere coaches
36. Handmatige licht/donker-schakelaar

### Later te verkennen
37. Voeding (maaltijden, macro's, dagtotalen, koppeling aan doelen)

## Aanbevolen volgorde (advies, niet vastgelegd)

Voor dagelijks gebruik: 1 (rusttimer), 27 (sessietegoed), 20 (intake), 12 (periodefilter),
32 (pincode). Voor indruk op klanten: 17 (PDF-rapport).
