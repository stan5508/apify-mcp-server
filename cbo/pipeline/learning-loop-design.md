# Van marktonderzoek naar betere CBO's — het ontwerp van de lerende lus

Doel: het onderzoek in [`cbo/research/`](../research/) moet niet één keer gelezen worden en
daarna verdampen. Het moet elke cyclus concreter advies opleveren over hoe een CBO opgezet
wordt, en elke cyclus moet scherper zijn dan de vorige.

Dit document beschrijft het ontwerp. Het verandert nog niets aan de bestaande routines.

---

## 1. Wat er nu is, en wat er ontbreekt

De bestaande pipeline (PR #2, `routines/`) dekt de achterkant volledig:

| Routine | Ritme | Beslist |
|---------|-------|---------|
| `cbo-kill` | elke 10 min, 's nachts | pauzeer een CBO bij €10/€20/€30 zonder ATC of sales |
| `cbo-schaal` | 1× per dag, 01:05 | schalen / laten lopen / killen / terugschalen na 48 uur |

Beide beantwoorden dezelfde vraag: **wat doen we met een CBO die al draait?**

Niemand beantwoordt de vraag ervóór: **wat zetten we erin?** Welk product, welke avatar, welke
angle, welke offer, welk vertrouwens- en urgentie-element op de landingspagina. Dat is nu
handwerk, en handwerk leert niet automatisch.

De lus die ontbreekt:

```
marktonderzoek ──► angle-bibliotheek ──► CBO-brief per product ──► campagne live
                          ▲                                              │
                          │                                              ▼
                   gewogen leerresultaat ◄── kill/schaal-uitkomst per angle
```

---

## 2. De blokkade die eerst opgelost moet worden

**Campagnenamen dragen geen angle.** Nu: `ASH | <productnaam> | CBO`.

Dat betekent dat een uitkomst — gekilld op €20, of geschaald naar €100 — alleen toe te wijzen
is aan een *product*. Niet aan een *angle*. En daarmee is de belangrijkste les onmeetbaar:
werkt de advertorial-hoek beter dan de gelegenheids-hoek, bij dit type product?

Zonder die dimensie is er geen lus. Wat we ook aan onderzoek doen, we kunnen nooit terugmeten
welk advies klopte.

### De oplossing die niets breekt

De kill-routine koppelt campagne aan product door `ASH | ` weg te strippen en **alles vanaf
` | CBO`** af te knippen. Een angle-code er vóór zetten breekt dat:

```
ASH | Bohemian Dress | A3 | CBO   →  strip geeft "Bohemian Dress | A3"  →  geen match  ❌
```

Zet de code er dus **achter**:

```
ASH | Bohemian Dress | CBO | A3   →  strip geeft "Bohemian Dress"  →  match blijft werken  ✅
```

De bestaande parser in `routines/cbo-kill/SPEC.md` hoeft niet aangepast te worden. De angle-code
is af te lezen door alles ná ` | CBO | ` te nemen.

Dit is de enige wijziging die nú nodig is. Alles hierna kan daarop voortbouwen.

---

## 3. De angle-bibliotheek

Eén machine-leesbaar bestand dat het onderzoek samenvat in testbare eenheden. Elke regel is
een angle die als CBO gedraaid kan worden.

Per angle leggen we vast:

| Veld | Wat het is | Voorbeeld uit het onderzoek |
|------|-----------|------------------------------|
| `code` | Korte, stabiele identifier voor de campagnenaam | `A1` |
| `familie` | Het hook-type | `advertorial-bekentenis` |
| `avatar` | Wie dit moet lezen, zo smal mogelijk | `vrouw 55+, brede voet, wil er niet orthopedisch uitzien` |
| `caption_patroon` | De caption filtert het publiek vóór de klik | `Women over 55 keep asking about these` |
| `body_structuur` | Hoe de copy is opgebouwd | verbazing → specifieke details → naam noemen → prijsanker → mechanisme → bezwaar ontmantelen |
| `offer` | Wat er aangeboden wordt | geen korting, prijsanker tegen merkalternatief |
| `urgentie` | Welk mechanisme, en of het waar is | geen |
| `bewijs` | Welk vertrouwenssignaal draagt | klantcitaat + reviewaantal |
| `bron` | Bij welke concurrent gezien, met spend | olyndralondon.com, €13.095 op één ad |
| `verwachte_cpc_band` | Hoog of laag, bepaalt de kill-drempel | hoog (lange copy) |
| `status` | `onbeproefd` / `in-test` / `winnaar` / `afgevallen` | |
| `score` | Gewogen resultaat uit de lus (§5) | |

De bibliotheek wordt gevuld uit het onderzoek in `cbo/research/` en bijgewerkt door de
scan-routine (§4).

---

## 4. Drie routines erbij

### 4.1 `cbo-research` — de marktscan (maandelijks)

Ververst de bibliotheek. Wat het doet:

1. Loop de NSA COMPETITOR SHEET af, per markt-tab. Werk per store de kolommen AANTAL
   PRODUCTEN, ACTIEVE ADS en LAATSTE UPDATE bij via WinningHunter.
2. Haal per store de best presterende ads op (`search_facebook_ads`, sorteer op `adspend`).
3. Signaleer **nieuwe** angles: copy die niet op een bestaande bibliotheek-regel te herleiden is.
4. Signaleer **verdwenen** angles: een angle die een concurrent drie scans achtereen niet meer
   draait is waarschijnlijk uitgewerkt.
5. Voeg nieuwe angles toe met status `onbeproefd` en een bronvermelding.

De sheet heeft hier al een regel voor die we overnemen: *"4wk op rij geen activiteit? Verwijder
de competitor uit de sheet."*

**Waarom maandelijks en niet vaker:** angles verslijten in weken, niet in dagen. Vaker scannen
levert ruis en kost credits.

### 4.2 `cbo-brief` — de opzetadviseur (op aanvraag, per nieuw product)

Input: een product uit de PRODUCT DATA SHEET (naam, prijs, COG, marge, BER).
Output: drie tot vijf kant-en-klare CBO-briefs.

Per brief:
- campagnenaam inclusief angle-code, in het formaat uit §2
- de avatar, letterlijk uitgeschreven
- caption, primary text en description
- welke landingspagina-elementen aanwezig moeten zijn vóór de campagne live mag (uit het
  vertrouwen/urgentie-onderzoek)
- het startbudget uit de ladder, en de kill-drempel die bij de `verwachte_cpc_band` hoort

**De briefs kiezen bewust verschillende angle-families.** Vijf varianten van dezelfde hoek geven
het algoritme niets te kiezen — dat is precies waar Chelsea Boutique op stukloopt (390 ads,
top-ad €2.054) en waar Olyndra het wint (521 ads over zes concepten, top-ad €13.095).

**De marge bepaalt welke angles mogen.** Bij een BER boven 1,7 is een kortingsoffer niet
haalbaar; dan blijven alleen de angles over die zonder korting werken.

### 4.3 `cbo-leren` — de terugkoppeling (wekelijks)

Leest de uitkomsten en werkt de scores bij.

1. Lees TEST DATA (ROAS 24H/48H/72H, STATUS) en SCHALEN (de 48-uursbeslissingen).
2. Haal per campagne de angle-code uit de naam.
3. Aggregeer per angle-familie: hoeveel keer gedraaid, hoeveel gekilld op welke drempel,
   hoeveel doorgeschaald, gemiddelde ROAS tegen de BER van het product.
4. Werk `status` en `score` in de bibliotheek bij.
5. Schrijf een korte notitie: welk advies uit de vorige cyclus klopte en welk niet.

**Punt 5 is het hele punt van de lus.** Zonder expliciete terugblik op het eigen advies wordt
het een dashboard in plaats van een leersysteem.

---

## 5. Hoe een angle een score krijgt

Ruwe ROAS is misleidend bij lage aantallen — acht orders in zestig dagen is geen steekproef.
Daarom een expliciet betrouwbaarheidsniveau naast de score:

| Aantal keer gedraaid | Wat we mogen concluderen |
|---------------------|--------------------------|
| 1–2 | niets; alleen registreren |
| 3–5 | richting; mag voorrang krijgen bij de volgende brief |
| 6+ | conclusie; mag een andere angle verdringen |

En de vergelijking moet **binnen een productcategorie** blijven. Een angle die werkt op
orthopedische sandalen zegt weinig over een boho-jurk: het ene is een pijnprobleem, het andere
een smaakaankoop.

---

## 6. Het openstaande conflict, opnieuw

De kill-regel *spend ≥ €10 EN CPC > €1 EN ATC = 0 → pauzeren* selecteert systematisch tegen
lange advertorials. Die bouwen hun rendement op via dwell time en een tweede sessie.

Zodra de angle-code in de campagnenaam staat, is dit **meetbaar** in plaats van een aanname:
we kunnen zien of advertorials structureel op het €10-moment sneuvelen terwijl korte
catalogus-ads dat moment halen. Dat is de eerste vraag die de lus zou moeten beantwoorden.

Tot die meting er is verandert er niets aan de kill-regels. Het `verwachte_cpc_band`-veld
bestaat om dit voor te bereiden, niet om er nu al naar te handelen.

---

## 7. Volgorde van bouwen

1. **Angle-code in de campagnenaam** (§2). Zonder dit is de rest zinloos. Kost niets.
2. **Angle-bibliotheek vullen** uit het huidige onderzoek. Handwerk, één keer.
3. **`cbo-leren`** eerst, niet `cbo-brief`. Meten voordat we adviseren — anders adviseren we
   op basis van niets en weten we een cyclus later nog steeds niets.
4. **`cbo-brief`** zodra er drie of meer uitkomsten per angle-familie zijn.
5. **`cbo-research`** als laatste; de bibliotheek is nu vers genoeg.

---

## 8. Wat dit ontwerp bewust niet doet

- **Geen automatische campagne-aanmaak.** De brief is tekst voor een mens. Het risico van een
  fout aangemaakte CBO is groter dan de tijdwinst.
- **Geen budgetbeslissingen.** Die liggen bij `cbo-schaal` en bij jou.
- **Geen creatives genereren.** De brief beschrijft wat er in moet; de uitvoering is apart.
