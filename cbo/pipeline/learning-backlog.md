# Leerproces voor de eigen store — wat we nog kunnen uitzoeken

Vervolg op [`learning-loop-design.md`](./learning-loop-design.md) en
[`angle-library-v1.md`](./angle-library-v1.md).

Tot nu toe is alles **concurrentonderzoek** — van buiten naar binnen. Dit document gaat over de
andere kant: wat de eigen store ons kan leren, en in welke volgorde dat de moeite waard is.

---

## 0. De meting die de prioriteiten omgooit

Shopify-sessiedata, `smayip-je.myshopify.com`, laatste 60 dagen:

| Stap | Aantal | Conversie vanaf vorige stap |
|---|---|---|
| Sessies | 1.186 | — |
| Winkelwagen-toevoegingen | 48 | **4,0%** |
| Checkout bereikt | 32 | 67% |
| **Checkout voltooid** | **4** | **12,5%** |

Per week:

| Week | Sessies | ATC | Checkout | Voltooid |
|---|---|---|---|---|
| 2026-06-22 | 9 | 0 | 0 | 0 |
| 2026-06-29 | 28 | 2 | 1 | 0 |
| 2026-07-06 | 7 | 0 | 0 | 0 |
| 2026-07-13 | 35 | 0 | 0 | 0 |
| 2026-07-20 | 302 | 8 | 5 | 0 |
| 2026-07-27 | 278 | 8 | 9 | 0 |
| 2026-08-03 | 294 | 15 | 6 | 2 |
| 2026-08-10 | 34 | 1 | 1 | 0 |
| 2026-08-17 | 199 | 14 | 10 | 2 |

**32 mensen bereikten de checkout, 4 rondden af.** Dat is het grootste lek in de hele keten, en
het zit ná alles waar de CBO-pipeline over gaat. Een betere angle stuurt meer mensen naar
dezelfde lekkende emmer.

**Voorbehoud, eerlijk:** n=32 is klein. 4 van 32 kan met puur toeval ook 6 of 2 zijn geweest.
En in week 2026-07-27 staan méér checkouts (9) dan winkelwagen-toevoegingen (8), wat betekent
dat de sessie-attributie op dit volume rammelt. **De richting is desondanks te sterk om te
negeren** — zelfs de gunstigste lezing is slecht.

Wat verder opvalt: ATC 4,0% is laag maar niet dood. De trechter bloedt dus op twee plekken
(productpagina en checkout), maar het checkout-lek is veruit het ergste.

---

## 1. De eerste vraag: waarom sneuvelt de checkout

Kandidaten, in volgorde van waarschijnlijkheid gegeven het onderzoek:

1. **Verzendkosten-schok.** Als verzending pas in de checkout verschijnt is dat niet alleen de
   grootste bekende afbreekreden, het is sinds CMA209 (18 nov 2025) ook **drip pricing** —
   verboden. Dit oplossen is compliance én conversie in één.
2. **Betaalmethoden ontbreken.** Wallets zijn 40% van UK e-commerce en groeien naar 50%. Als
   Apple Pay/Google Pay/PayPal er niet staan, verlies je tot vier op de tien kopers bij de
   laatste stap.
3. **Legitimiteitstwijfel op het laatste moment.** Purchase scams zijn de #1 APP-fraudevorm in
   de UK. De checkout is precies waar iemand denkt: *"wacht, ken ik deze winkel eigenlijk?"*
4. **Levertijd of herkomst wordt pas hier zichtbaar.** Als er een niet-UK-afzender of een lange
   levertijd opduikt, is dat een afbreekmoment.
5. **Valuta of onverwachte toeslagen.**

**Hoe uit te zoeken, zonder te gokken:** zet Microsoft Clarity (gratis) op de store en kijk naar
sessieopnames van de mensen die de checkout bereikten en niet afrondden. Bij 28 afhakers heb je
28 opnames — dat is geen steekproefprobleem, dat is gewoon kijken.

---

## 2. Het kernprobleem van dit leerproces: je hebt geen aankopen om van te leren

**4 voltooide checkouts in 60 dagen.** Elke conclusie op basis van aankopen is ruis. Ook de
kill-routine draait hierop: *sales = 0* is bij dit volume bijna altijd waar, ongeacht of de
advertentie goed of slecht is.

**Dus moet de lus leren van signalen die eerder in de trechter zitten en veel sneller
statistisch bruikbaar worden.** Dat is de belangrijkste ontwerpwijziging die ik zou voorstellen.

### De vier trechterstappen als aparte leersignalen

Splits een mislukking op in waar hij plaatsvond, dan wordt een kill een les in plaats van een
uitkomst:

| Stap | Metriek | Wat het meet | Wat je verandert als hij faalt |
|---|---|---|---|
| 1. Aandacht | hook rate (3-sec views ÷ impressies) | de eerste seconde van de creative | openingsbeeld, eerste zin |
| 2. Interesse | CTR / outbound CTR | of de belofte klopt | caption, angle |
| 3. Overtuiging | ATC ÷ klik | of de landingspagina de belofte waarmaakt | productpagina, bewijs, maatinfo |
| 4. Vertrouwen | aankoop ÷ ATC | of ze je durven te betalen | checkout, betaalmethoden, garanties |

Nu weet je alleen "gekilld op €20". Straks weet je "gekilld op €20 **omdat stap 3 faalde**" — en
dat betekent iets heel anders dan wanneer stap 1 faalde.

**Hook rate is binnen één dag bruikbaar.** Bij €50 budget krijg je duizenden impressies; een
verschil tussen 25% en 40% hook rate is dan al betekenisvol, terwijl je op aankopen maanden
moet wachten.

### Concreet voorstel voor de kill-regels
Voeg géén regel toe, maar leg per kill **vast in welke stap het misging**. Dat kost niets, breekt
niets, en levert binnen weken bruikbare patronen op. Pas als die patronen er zijn kun je
onderbouwd over de €10/€20/€30-drempels beslissen.

---

## 3. Onderzoek op de eigen store

Op volgorde van opbrengst gedeeld door moeite.

### 3.1 Sessieopnames en heatmaps — **begin hier**
Microsoft Clarity is gratis en ongelimiteerd. Kijk specifiek naar: waar stopt het scrollen op de
productpagina, wordt de maattabel geopend, worden reviews bekeken, en wat gebeurt er in de
checkout. Bij dit volume is dit geen analyse maar observatie.

### 3.2 Zoekopdrachten in de eigen site-search
Wat mensen intypen is een gratis vraagsignaal: welke gelegenheid, welke maat, welk product dat
je niet hebt. Bij lage volumes is dit rijker dan welke rapportage ook.

### 3.3 Post-purchase-enquête — één vraag
*"Wat had je bijna tegengehouden om te bestellen?"* Bij 4 kopers zijn dat 4 echte antwoorden, en
die zeggen oneindig veel meer dan 4 regels ROAS. Voeg toe: *"Hoe heb je ons gevonden?"* — dat is
meteen een attributiecheck naast Meta.

### 3.4 Afhakers-e-mail
Wie zijn e-mail achterliet en niet kocht: één vriendelijke mail met *"kunnen we iets
verduidelijken?"* Bezwaarwinning aan de bron.

### 3.5 Landingspagina-attributie in Shopify
`FROM sessions … GROUP BY landing_page` koppelt sessies aan de pagina waar de advertentie op
landt. Zo meet je stap 3 per angle zonder op aankopen te wachten.

### 3.6 Retouren en retourredenen registreren
Nu nog verwaarloosbaar, maar de UK-retourgraad in mode is ~30% met pasvorm als reden #1. Begin
nu met vastleggen, dan heb je de data als het volume er is. Retouren vreten de marge sneller op
dan een slechte CPA.

---

## 4. Onderzoek bij de concurrenten dat nog openstaat

### 4.1 Video-transcripties van de winnende ads — **hoogste waarde**
Olyndra's faux-documentaire en "Watch the feet, not faces" zijn video's. **De gesproken hook
staat niet in de copy die we hebben.** Via `get_ad_transcript` op de ad-ID's krijg je het
volledige script. Dat is de letterlijke tekst van ads waar tienduizenden euro's achter zitten.

### 4.2 Landingspagina-teardown
Geblokkeerd door de egress-policy. Nodig: een allowlist of aangeleverde HTML. Dit is de enige
manier om te zien wat er op hun product- en collectiepagina's aan vertrouwen en urgentie staat —
nu is dat afgeleid uit advertenties.

### 4.3 De 1-ster-reviews van de concurrenten uitlezen
Olyndra staat op Trustpilot **1,5** met 1.425 reviews, Chelsea Boutique op **1,0**. Die klachten
zijn een gratis lijst van precies de bezwaren die jij vooraf moet ontkrachten — en meteen een
lijst van wat je beter moet doen dan zij. Dit is het best benutbare onderzoek dat nog openstaat.

### 4.4 Angle-overlevingscurves
Track de concurrentieset maandelijks en registreer per angle wanneer hij verschijnt en verdwijnt.
**Hoe lang een angle blijft draaien is het eerlijkste successignaal dat er is** — niemand betaalt
twee jaar voor een verliezer (Anne Sylvie draait één creative sinds april 2024). Dit vraagt
alleen discipline, geen nieuwe tools.

### 4.5 Creative-vorm in plaats van copy
We hebben alleen tekst geanalyseerd. Nog niet: eerste frame, UGC versus studio, aspect ratio,
tekstoverlay, videolengte, gezicht in beeld of niet. Bij hook rate is het openingsbeeld
belangrijker dan de zin eronder.

### 4.6 De acht "nul-resultaat"-domeinen opnieuw proberen
Via paginanaam in plaats van landing-URL. Anne Sylvie gebruikt `t.ly`-linkverkorters en is zo
onvindbaar — die acht kunnen valse negatieven zijn.

### 4.7 Productniveau in plaats van merkniveau
Welke producten voegen concurrenten toe en welke laten ze vallen? Een product dat bij drie
concurrenten tegelijk opduikt is een signaal. Dit is inkoopinformatie, niet advertentie-informatie.

### 4.8 De seizoenskalender vullen met echte data
Wanneer schalen concurrenten op? Met maandelijkse metingen bouw je binnen een jaar een kalender
die zegt wanneer jij moet opschakelen — in plaats van te gokken op Mother's Day en Ascot.

---

## 5. Leren of je oordeel beter wordt, niet alleen je campagnes

Dit is het onderdeel dat de meeste mensen overslaan en dat het verschil maakt tussen een
dashboard en een leersysteem.

**Schrijf vóór elke launch op wat je verwacht.** Eén regel: welke angle wint, en waarom. Bij de
evaluatie vergelijk je niet alleen de uitkomst maar ook je voorspelling.

Na tien campagnes weet je iets veel waardevollers dan welke angle won: **of je vooraf kunt
inschatten welke angle gaat winnen.** Kun je dat niet, dan is meer testen het antwoord. Kun je
dat wel, dan kun je minder testen en harder inzetten — en dat is precies waar het geld zit.

Twee dingen die hierbij horen:
- **Registreer ook wat je níet hebt getest en waarom.** Anders leer je alleen over de opties die
  je toch al goed vond.
- **Houd één ongewijzigde referentiecampagne aan.** Zonder ijkpunt weet je niet of een verbetering
  van jou komt of van het seizoen.

---

## 6. Wat ik bewust afraad

- **Geen automatische creative-generatie.** Bij vier aankopen weet je nog niet wat werkt; dan
  automatiseer je het produceren van ruis.
- **Geen uitgebreid attributiemodel.** Met 1.186 sessies is Shopify's eigen data genoeg. Een
  multi-touch-model bouwen kost weken en verandert geen enkele beslissing.
- **Geen tweede markt erbij.** NL of DE toevoegen halveert de data per markt precies nu je
  concentratie nodig hebt.
- **Geen BNPL-integratie als prioriteit.** 8% van de UK-markt, piekt bij 25-34, buiten je avatars.
  Zet het erbij voor de legitimiteit, niet als project.

---

## 7. Voorgestelde volgorde

| | Wat | Waarom nu |
|---|---|---|
| 1 | **Checkout-lek diagnosticeren** (Clarity + de vijf kandidaten uit §1) | 28 van 32 afhakers; alles hierboven is verspild zolang dit lekt |
| 2 | **Angle-code in de campagnenaam** | kost niets, zonder dit leert de lus nooit iets |
| 3 | **Trechterstap vastleggen bij elke kill** | verandert een uitkomst in een les |
| 4 | Video-transcripties van de winnende concurrent-ads | letterlijke tekst van bewezen winnaars |
| 5 | 1-ster-reviews van de concurrenten uitlezen | gratis bezwarenlijst |
| 6 | Post-purchase-vraag + afhakers-mail | vier echte antwoorden verslaan vier ROAS-regels |
| 7 | Voorspelling vooraf opschrijven | meet of je oordeel beter wordt |
| 8 | Landingspagina-teardown | zodra de egress-blokkade is opgelost |

**Punt 1 hoort vóór punt 2.** Dat is de belangrijkste zin in dit document.
