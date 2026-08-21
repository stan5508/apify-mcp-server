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
progressiepagina per oefening (lijn, PR's, totale progressie), lichaamsmetingen,
trainingen bewerken, kg/lbs-label, zijbalknavigatie (alfabetisch), duo-kolommen naast elkaar,
sync via privé GitHub Gist, offline PWA, publicatie via `gh-pages` (zie `publish.sh`).

## Geparkeerd — "misschien op een ander moment"

Niet afgewezen, alleen nu niet van toepassing:

- ~~**Progressieregels**~~ — gebouwd in versie 53.
- ~~**Weekprogramma's**~~ — gebouwd in versie 54: één programma per klant, dag A/B/C op volgorde.

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
zetten). Dagoverzicht op Vandaag; herinneringen 15 minuten vooraf zolang
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

### Abonnementen — gebouwd

Zijbalk → Planning → **Abonnementen**. Twee lagen: **vormen** (je eigen sjablonen: naam,
prijs per maand, looptijd, sessies per week, opzegtermijn, voorwaardentekst en zelf toe te
voegen velden) en **contracten** per klant, die je vanuit een vorm opstelt en daarna nog
mag aanpassen — het origineel blijft ongewijzigd.

Ondertekenen gebeurt op de tablet: klant en coach zetten allebei met hun vinger een
handtekening, daarna staat het contract vast en is alleen nog opzeggen mogelijk (met de
opzegtermijn wordt de einddatum berekend). Het contract is te printen of als PDF te
bewaren; de printstijl is meteen rechtgetrokken, want in het donkere thema kwam er witte
tekst op wit papier uit.

Een getekend contract gaat als **PDF** naar de klant. De PDF wordt in de app zelf
opgebouwd — geen bibliotheek, geen internet nodig: een handgeschreven PDF-schrijver met
Helvetica in WinAnsi en de handtekeningen als JPEG (DCTDecode). Versturen loopt via het
deelvenster van het apparaat (`navigator.share` met het bestand), zodat Mail, WhatsApp of
Signal het als bijlage krijgen. Kan het apparaat dat niet, dan bewaart de app de PDF en
opent een vooringevulde mail waar je hem zelf aanhangt. De verstuurdatum wordt vastgelegd.

Automatisch mailen is er ook: de Edge Function `send-contract`
([bron](./supabase/functions/send-contract/index.ts)) stuurt de PDF via Resend. De app roept
hem aan met `cloud.invoke`; de API-sleutel blijft op de server. Alleen een ingelogd account
met de rol *coach* mag hem gebruiken, zodat klantaccounts er geen mail mee kunnen sturen.
Opzet in zes stappen staat in [SUPABASE.md](./SUPABASE.md); zonder die opzet valt de app
terug op het deelvenster.

Elke kalendermaand dat een getekend contract loopt levert één maandbedrag op. Die tellen
mee in **Omzet per maand** naast de strippenkaarten, verschijnen los in "Openstaande
betalingen" tot je ze aftikt, en staan ook onderaan het contract zelf. Maanden die nog
moeten komen tellen niet mee — omzet gaat over wat verstreken is.

Let op: handtekeningen worden verkleind opgeslagen (~11 kB per stuk, dus ~22 kB per
contract) en gaan mee in de synchronisatie, net als de progressiefoto's.

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

### Klantaccounts — gebouwd
`sporter.html` is de app voor klanten: inloggen met een magic link, koppelen aan de
coach met een uitnodigingscode, en zelf trainingen en voeding (incl. water en
productzoeken) loggen. De coach ziet het binnenkomen onder **Van klanten** en kan een
training met één tik overnemen in de eigen administratie (zonder dubbelen).

Vereist een gratis Supabase-project; opzet staat in [SUPABASE.md](./SUPABASE.md).
Toegang wordt afgedwongen met row level security: klanten zien alleen hun eigen
gegevens, de coach die van zijn eigen klanten.

Schema's van de coach zijn zichtbaar sinds versie 55: **Van klanten → Schema's klaarzetten**
schrijft ze naar `client_schemas`, de sporter-app toont ze onder *Van je coach* en start er
een training mee met de doelen al ingevuld.

Sinds versie 57/58 logt de klant met dezelfde hulpmiddelen als de coach (vorige keer,
afvinken, rusttimer) en ziet hij zijn eigen voortgang onder het tabblad **Voortgang**.

Sinds versie 59 ziet de klant een melding in de app zodra de coach iets nieuws klaarzet, en
staan de agenda-afspraken van de coach in zijn app.

Nog open: **echte pushmeldingen** naar een gesloten telefoon. Dat vraagt VAPID-sleutels, een
tabel met push-abonnementen, een `push`-handler in `sw.js`, registratie van de service worker
in `sporter.html` (die doet dat nu niet) en een Edge Function die de push verstuurt.

## Nog te doen (opzetwerk, niet door de app)

### Contracten automatisch mailen — wachten tot er online-coachingklanten tekenen

Alle code staat klaar en is getest; wat ontbreekt is eenmalig opzetwerk bij twee externe
diensten. **Aanzetten zodra er daadwerkelijk klanten voor online coaching tekenen** — voor
losse contracten in de sportschool is Delen als PDF genoeg.

- Stap-voor-stap handleiding: <https://claude.ai/code/artifact/5de55d1f-30a6-4c16-8228-255ac9f082d1>
- Kort: [SUPABASE.md stap 6](./SUPABASE.md). Resend-account, domein verifiëren via DNS,
  de functie [`send-contract`](./supabase/functions/send-contract/index.ts) in Supabase
  plakken, de secrets `RESEND_API_KEY` en `MAIL_FROM` zetten, testmail sturen.
- Reken op 15–20 minuten plus wachttijd op de DNS. Gratis tot 3.000 mails per maand.

Zolang het niet is opgezet legt de knop **Mailen naar klant** zelf uit wat er ontbreekt en
werkt **Delen als PDF** gewoon door. Er gaat dus niets stuk door te wachten.

Besloten 16 aug 2026.

## Restyling — gekozen richting

Voorstel met alle varianten: <https://claude.ai/code/artifact/c23a1539-2e36-4f1a-84d4-b900b144d764>

Gekozen: **donker als standaard** (richting B) met de **schijfkleuren** als categoriepalet
(richting C) — rood 25 `#C8102E`, blauw 20 `#0057B8`, geel 15 `#F2C200`, groen 10 `#009639`
voor spiergroepen, grafieklijnen en de schijvenrekenmachine. Basis `#0B0D0F` / `#15181C`,
accent amber `#F2A93B`, tekst `#F5F7F8`.

Volgorde: pagina-indeling (gebouwd) → kleur (gebouwd) → oefeningplaatjes (gebouwd) →
tabbalk op de telefoon (gebouwd) → logo (gebouwd) → kleine dingen (gebouwd).
Oefeningplaatjes zijn gebouwd en later weer verwijderd; zie de bibliotheek-sectie hieronder.

Kleine dingen: raakvlakken van minstens 44 px tijdens een sessie, de regel waarin je typt
licht op, korte trilling zodra je herhalingen invult, avatars (nieuwste progressiefoto,
anders initialen) in de zijbalk, cijfers in de statistieken lijnen uit, en lege schermen
noemen de vervolgstap. Het PWA-startscherm ging al mee met het donkere thema.

Logo: de turfstreepjes uit het voorstel — drie witte streepjes met een amberkleurige
schuine streep erdoor, op `#15181C`. `icon.svg` is de bron; `icon-512.png` en `icon-180.png`
worden daaruit gerenderd (volvlak, zodat het als maskable icoon werkt; de inhoud blijft
binnen de veilige cirkel). Woordmerk: **Coach** vet, *log* licht grijs — in de zijbalk, op
het pincodescherm en in de sporter-app.

Onder 760 px staat een vaste tabbalk onderin (Vandaag · Klanten · Agenda · Meer) en wordt
de zijbalk een uitschuiflade. Klanten opent de lade met het zoekveld actief, Meer opent hem
onderaan. Tijdens duo-schermen blijft de lade op de telefoon bereikbaar; op tabletformaat
(760–999 px) verdwijnt de zijbalk daar nog steeds, want die kost breedte.

Oefeningfoto's zijn er **niet meer**. Ze kwamen uit Free Exercise DB (publiek domein), maar
de catalogus is Engels en kent tien varianten per beweging; koppelen bleef daardoor gedoe,
en op 16 aug 2026 is de hele functie er op verzoek uitgehaald — knoppen, catalogus, service
worker-cache en de al gekoppelde foto's (die worden bij het laden eenmalig gewist).
Terughalen kan met `git revert` van de commit "Remove exercise photos".

Wat wel bleef: **uitleg** en **aandachtspunten** per oefening, een handmatige
**afbeelding-link**, een **video-link**, en op elke oefening een YouTube-zoeklink op naam.
Via Instellingen → Oefeninfo kun je je oefeningenlijst exporteren (zonder klantgegevens) en
een ingevulde versie weer inlezen; die vult alleen uitleg, aandachtspunten en video aan.

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
zetten). Dagoverzicht op Vandaag; herinneringen 15 minuten vooraf zolang
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

### Abonnementen — gebouwd

Zijbalk → Planning → **Abonnementen**. Twee lagen: **vormen** (je eigen sjablonen: naam,
prijs per maand, looptijd, sessies per week, opzegtermijn, voorwaardentekst en zelf toe te
voegen velden) en **contracten** per klant, die je vanuit een vorm opstelt en daarna nog
mag aanpassen — het origineel blijft ongewijzigd.

Ondertekenen gebeurt op de tablet: klant en coach zetten allebei met hun vinger een
handtekening, daarna staat het contract vast en is alleen nog opzeggen mogelijk (met de
opzegtermijn wordt de einddatum berekend). Het contract is te printen of als PDF te
bewaren; de printstijl is meteen rechtgetrokken, want in het donkere thema kwam er witte
tekst op wit papier uit.

Een getekend contract gaat als **PDF** naar de klant. De PDF wordt in de app zelf
opgebouwd — geen bibliotheek, geen internet nodig: een handgeschreven PDF-schrijver met
Helvetica in WinAnsi en de handtekeningen als JPEG (DCTDecode). Versturen loopt via het
deelvenster van het apparaat (`navigator.share` met het bestand), zodat Mail, WhatsApp of
Signal het als bijlage krijgen. Kan het apparaat dat niet, dan bewaart de app de PDF en
opent een vooringevulde mail waar je hem zelf aanhangt. De verstuurdatum wordt vastgelegd.

Automatisch mailen is er ook: de Edge Function `send-contract`
([bron](./supabase/functions/send-contract/index.ts)) stuurt de PDF via Resend. De app roept
hem aan met `cloud.invoke`; de API-sleutel blijft op de server. Alleen een ingelogd account
met de rol *coach* mag hem gebruiken, zodat klantaccounts er geen mail mee kunnen sturen.
Opzet in zes stappen staat in [SUPABASE.md](./SUPABASE.md); zonder die opzet valt de app
terug op het deelvenster.

Elke kalendermaand dat een getekend contract loopt levert één maandbedrag op. Die tellen
mee in **Omzet per maand** naast de strippenkaarten, verschijnen los in "Openstaande
betalingen" tot je ze aftikt, en staan ook onderaan het contract zelf. Maanden die nog
moeten komen tellen niet mee — omzet gaat over wat verstreken is.

Let op: handtekeningen worden verkleind opgeslagen (~11 kB per stuk, dus ~22 kB per
contract) en gaan mee in de synchronisatie, net als de progressiefoto's.

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

### Klantaccounts — gebouwd
`sporter.html` is de app voor klanten: inloggen met een magic link, koppelen aan de
coach met een uitnodigingscode, en zelf trainingen en voeding (incl. water en
productzoeken) loggen. De coach ziet het binnenkomen onder **Van klanten** en kan een
training met één tik overnemen in de eigen administratie (zonder dubbelen).

Vereist een gratis Supabase-project; opzet staat in [SUPABASE.md](./SUPABASE.md).
Toegang wordt afgedwongen met row level security: klanten zien alleen hun eigen
gegevens, de coach die van zijn eigen klanten.

Schema's van de coach zijn zichtbaar sinds versie 55: **Van klanten → Schema's klaarzetten**
schrijft ze naar `client_schemas`, de sporter-app toont ze onder *Van je coach* en start er
een training mee met de doelen al ingevuld.

Sinds versie 57/58 logt de klant met dezelfde hulpmiddelen als de coach (vorige keer,
afvinken, rusttimer) en ziet hij zijn eigen voortgang onder het tabblad **Voortgang**.

Sinds versie 59 ziet de klant een melding in de app zodra de coach iets nieuws klaarzet, en
staan de agenda-afspraken van de coach in zijn app.

Nog open: **echte pushmeldingen** naar een gesloten telefoon. Dat vraagt VAPID-sleutels, een
tabel met push-abonnementen, een `push`-handler in `sw.js`, registratie van de service worker
in `sporter.html` (die doet dat nu niet) en een Edge Function die de push verstuurt.

## Nog te doen (opzetwerk, niet door de app)

### Contracten automatisch mailen — wachten tot er online-coachingklanten tekenen

Alle code staat klaar en is getest; wat ontbreekt is eenmalig opzetwerk bij twee externe
diensten. **Aanzetten zodra er daadwerkelijk klanten voor online coaching tekenen** — voor
losse contracten in de sportschool is Delen als PDF genoeg.

- Stap-voor-stap handleiding: <https://claude.ai/code/artifact/5de55d1f-30a6-4c16-8228-255ac9f082d1>
- Kort: [SUPABASE.md stap 6](./SUPABASE.md). Resend-account, domein verifiëren via DNS,
  de functie [`send-contract`](./supabase/functions/send-contract/index.ts) in Supabase
  plakken, de secrets `RESEND_API_KEY` en `MAIL_FROM` zetten, testmail sturen.
- Reken op 15–20 minuten plus wachttijd op de DNS. Gratis tot 3.000 mails per maand.

Zolang het niet is opgezet legt de knop **Mailen naar klant** zelf uit wat er ontbreekt en
werkt **Delen als PDF** gewoon door. Er gaat dus niets stuk door te wachten.

Besloten 16 aug 2026.

## Restyling — gekozen richting

Voorstel met alle varianten: <https://claude.ai/code/artifact/c23a1539-2e36-4f1a-84d4-b900b144d764>

Gekozen: **donker als standaard** (richting B) met de **schijfkleuren** als categoriepalet
(richting C) — rood 25 `#C8102E`, blauw 20 `#0057B8`, geel 15 `#F2C200`, groen 10 `#009639`
voor spiergroepen, grafieklijnen en de schijvenrekenmachine. Basis `#0B0D0F` / `#15181C`,
accent amber `#F2A93B`, tekst `#F5F7F8`.

Volgorde: pagina-indeling (gebouwd) → kleur (gebouwd) → oefeningplaatjes (gebouwd) →
tabbalk op de telefoon (gebouwd) → logo (gebouwd) → kleine dingen (gebouwd).
Oefeningplaatjes zijn gebouwd en later weer verwijderd; zie de bibliotheek-sectie hieronder.

Kleine dingen: raakvlakken van minstens 44 px tijdens een sessie, de regel waarin je typt
licht op, korte trilling zodra je herhalingen invult, avatars (nieuwste progressiefoto,
anders initialen) in de zijbalk, cijfers in de statistieken lijnen uit, en lege schermen
noemen de vervolgstap. Het PWA-startscherm ging al mee met het donkere thema.

Logo: de turfstreepjes uit het voorstel — drie witte streepjes met een amberkleurige
schuine streep erdoor, op `#15181C`. `icon.svg` is de bron; `icon-512.png` en `icon-180.png`
worden daaruit gerenderd (volvlak, zodat het als maskable icoon werkt; de inhoud blijft
binnen de veilige cirkel). Woordmerk: **Coach** vet, *log* licht grijs — in de zijbalk, op
het pincodescherm en in de sporter-app.

Onder 760 px staat een vaste tabbalk onderin (Vandaag · Klanten · Agenda · Meer) en wordt
de zijbalk een uitschuiflade. Klanten opent de lade met het zoekveld actief, Meer opent hem
onderaan. Tijdens duo-schermen blijft de lade op de telefoon bereikbaar; op tabletformaat
(760–999 px) verdwijnt de zijbalk daar nog steeds, want die kost breedte.

Oefeningplaatjes komen uit **Free Exercise DB** (publiek domein). `oefeningen.json` is de
uitgedunde catalogus (873 oefeningen, 106 kB) en wordt meegeleverd; de foto's zelf staan op
`raw.githubusercontent.com` en worden pas opgehaald als je ze bekijkt. De service worker
bewaart elke opgehaalde foto in een aparte cache (`coachlog-photos`), dus na één keer
bekijken werken ze offline. Koppelen gaat via de knop **Foto's** in de bibliotheek: voor elke oefening zonder foto
komen drie voorstellen naast elkaar, waarvan de beste gok voorgeselecteerd staat. Volledig
automatisch matchen kiest te vaak net de verkeerde variant (Box Squat in plaats van Barbell
Squat), dus de keuze blijft bij de coach — maar dan in één scherm in plaats van per
oefening. De rangschikking gebruikt de naam, plus het materiaal en de spiergroep die al bij
de oefening staan; gangbare Nederlandse termen worden vertaald. Per oefening bijstellen kan
nog steeds via Bewerken.

De knop **Fotolijst** zet in één keer alle 873 oefeningen uit de catalogus in de
bibliotheek, elk met foto. Dat maakt elke keuzelijst wel lang en de namen zijn Engels, dus
het is geen aanrader naast een eigen Nederlandse bibliotheek; wie het toch doet kan het
terugdraaien met "Ongebruikte verwijderen" (alles met `fromCatalog` en nul sessies).
Opslag groeit dan van enkele kB's naar ~235 kB, wat meetelt in de synchronisatiegrens.

**Video** zit niet in de catalogus — die heeft alleen foto's. Elke oefening krijgt daarom
een YouTube-zoeklink op naam; wil je een vaste video, plak dan een link bij Bewerken.
Kant-en-klare videobibliotheken per oefening (Gym Visual e.d.) zijn commercieel. ExerciseDB/GymVisual-GIF's zijn commercieel — niet gebruiken.
wger blijft de kandidaat voor Nederlandse uitleg.

## Aanbevolen volgorde (advies, niet vastgelegd)

Voor dagelijks gebruik: 1 (rusttimer), 27 (sessietegoed), 20 (intake), 12 (periodefilter),
32 (pincode). Voor indruk op klanten: 17 (PDF-rapport).
