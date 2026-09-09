# Stap 2 — CPM en CPC omlaag: wat de eigen data zegt, en wat de markt zegt

Bron eigen data: Windsor.ai, Meta-adaccount `1142643668009994`, 5 augustus – 3 september 2026
(30 dagen, alleen UK, 81 CBO-campagnes + 1 engagement-campagne). Externe bronnen staan onderaan.
Datum: 2026-09-03.

**Reeds doorgevoerd door Stan:** geen AI-afbeeldingen meer. Dat is terecht (zie §5), maar het
raakt niet de grootste kostenpost. Die zit in *wie* Meta de ads laat zien en *hoe vaak het
account opnieuw begint*, niet in het beeld.

---

## 0. Het cijfer dat alles bepaalt

| | Eigen account (30d) | UK-benchmark e-commerce 2026 | Factor |
|---|---|---|---|
| CPM Facebook Feed | **€52** | £7,50 – £14 | **4–7×** |
| CPM Instagram Feed | €47 | £7,50 – £14 | 3–6× |
| CPM Reels (FB + IG) | €28 – €30 | £5,50 – £9 | 3–5× |
| CPC (alle kliks) | €1,32 | £0,45 – £1,10 | 1,2–3× |
| Link-CPC | €1,88 | — | |
| Link-CTR | 2,4% | 1,5 – 2,5% | **normaal** |
| Frequentie | 1,1 | — | **geen fatigue** |

De CTR is gezond en de frequentie is laag. Het creatieve werk trekt dus genoeg kliks per
duizend vertoningen. **Het probleem is de prijs per duizend vertoningen zelf.** Een CPC van
€1,32 bij 4,5% CTR betekent dat elke klik duur is omdat de impressie duur is, niet omdat te
weinig mensen klikken.

Wie de CPC wil halveren moet dus de CPM halveren. CTR-werk (betere hooks) levert hooguit
10–20% op en is al op niveau.

---

## 1. Waar de dure impressies vandaan komen — drie oorzaken, gemeten

### 1a. Meta koopt vrouwen 65+ voor je, tegen €84 CPM

| Segment | Spend | Aandeel | CPM | CPC | CTR |
|---|---|---|---|---|---|
| vrouw 65+ | €570 | **35%** | **€84** | €1,46 | 5,8% |
| vrouw 55–64 | €351 | 21% | €72 | €1,49 | 4,8% |
| vrouw 45–54 | €124 | 8% | €46 | €1,50 | 3,1% |
| vrouw 35–44 | €46 | 3% | €31 | €1,38 | 2,3% |
| vrouw 25–34 | €22 | 1% | €27 | €1,02 | 2,6% |
| man 65+ | €180 | 11% | €41 | €0,80 | 5,1% |
| man 55–64 | €94 | 6% | €29 | €0,75 | 3,8% |
| man 25–44 | €136 | 8% | €13 – €19 | €0,55 – €0,77 | 2,4% |

**56% van alle spend gaat naar vrouwen 55+, het duurste segment van het hele account.**
Targeting staat op 18–65+ breed. Meta kiest dit segment zelf, en de reden is meetbaar: vrouwen
65+ klikken het meest (5,8% CTR). Bij een campagne die op aankopen optimaliseert maar geen
aankoopdata heeft (4 orders in 60 dagen), valt Meta terug op het dichtstbijzijnde signaal:
kliks en engagement. Het stuurt dus naar de groep die het vaakst klikt, en dat is precies de
groep waar élke UK-adverteerder met hetzelfde probleem naartoe gestuurd wordt. Daarom is die
groep 3× zo duur als mannen 25–44.

Dit is geen argument om die doelgroep te verlaten: het is de doelgroep die koopt (YouGov,
`06-uk-buyer-research.md`). Het is een argument om Meta niet het *duurste deel ervan* te laten
kiezen op basis van klikgedrag.

### 1b. Damesjurken kosten €68 CPM, jassen €27

Alle 81 campagnes ingedeeld op productcategorie:

| Categorie | Campagnes | Spend | CPM | CPC | Link-CPC | CTR |
|---|---|---|---|---|---|---|
| Jassen, hoodies, jeans, jumpers, cardigans (uni/heren) | 27 | €557 | **€27** | €1,07 | €1,45 | 2,5% |
| Jurken, blouses, sandalen, sets, accessoires (dames) | 54 | €1.075 | **€68** | €1,50 | €2,22 | 4,6% |

Het verschil is 2,5× en zit volledig in wie de ad te zien krijgt. De Bellardi Fleece Jacket
(€129 spend, de enige campagne die schaalde) draaide op **€17 CPM en €0,67 CPC**, en op 23
augustus zelfs €12,80 CPM. Die dag was de laagste account-CPM van de maand (€19), puur omdat
één campagne met een uniseks product 51% van de dagspend pakte.

De goedkope dagen (22–23 en 27–28 augustus) zijn dus geen toeval en geen creatief succes: het
zijn de dagen waarop jassen het budget domineerden.

### 1c. Het account zit permanent in de leerfase

60 van de 81 campagnes stopten onder €20 spend. 18 tussen €20 en €40. Slechts 3 boven €40.
Elke campagne is een nieuwe ad set, elke ad set begint bij nul. Meta rekent in de eerste
dagen van een ad set een aantoonbare opslag: 20–50% hogere CPM tijdens de exploratie (bron:
AdStellar-audit van 47 e-commerce accounts, Q1 2026, mediane leerfase-CPA 41% boven de
baseline).

Het draaimodel (3–5 nieuwe producten per dag, kill bij €10/€20/€30) betekent dat **100% van de
spend in die opslagfase valt.** Er is geen enkele ad set die ooit uit de leerfase komt. Het
account bouwt geen geschiedenis op, en betaalt elke dag de nieuwkomersprijs.

Dit is een structureel gevolg van het testmodel, geen fout in de uitvoering. Maar het moet
meegewogen worden: de kill-drempels beoordelen een campagne op zijn duurste uren (playbook
§1c) *én* op zijn duurste fase.

### 1d. Wat níet het probleem is

- **Placements.** Feed = 65% van spend op €52; Reels 20% op €28–30. Reels is goedkoper maar
  de CTR daar is lager (2,4–3,2% tegen 4,8%), dus de CPC-winst is beperkt (€0,92–1,19 tegen
  €1,08). Stories (€53–100 CPM, €3,32 CPC op IG) en in-stream video (€85) zijn wel weg te
  halen: samen ~€52 spend, 3%.
- **Creative-kwaliteit.** Waar Meta een ranking geeft is die `AVERAGE`; twee campagnes staan
  `BELOW_AVERAGE_35` op kwaliteit (Luciano Windproof Jacket, Navy Tulle Evening Dress). Geen
  structureel signaal. De meeste campagnes halen niet eens de 500 impressies die nodig zijn
  voor een ranking.
- **Frequentie / fatigue.** 1,1. Irrelevant bij dagelijks nieuwe campagnes.
- **AI-afbeeldingen.** Al gestopt. Studies 2026: AI-beelden mét mensen scoren 30–40% lagere
  CTR dan echte fotografie; AI-beelden van alleen product halen 85–100%. Voor kleding, waar
  het beeld altijd een lichaam toont, was dit een terechte stap. Effect op CPM: indirect en
  klein.

---

## 2. Wat de CPM daadwerkelijk omlaag brengt — gerangschikt op verwacht effect

| # | Ingreep | Verwacht CPM-effect | Bewijs | Kosten / risico |
|---|---|---|---|---|
| **1** | **Optimalisatiedoel van Purchase naar Add to Cart** (tijdelijk, tot ≥50 events/week) | −30 tot −50% | eigen data §1a: Meta stuurt nu op kliks bij gebrek aan koopsignaal; industrie-consensus voor low-signal accounts | Meta optimaliseert op een zwakker signaal; ATC-kwaliteit bewaken via Shopify |
| **2** | **Leeftijd 45–65+ i.p.v. 18–65+, of value rules** (bied 50% lager op 65+) | −20 tot −35% | eigen data §1a: 65+ is €84, 45–54 is €46 | Kleinere pool; 65+ is wel de kopende groep — daarom value rules boven uitsluiten |
| **3** | **Product-mix verschuiven naar jassen/uniseks in Q4** | −40% op die campagnes | eigen data §1b: €27 tegen €68, en de enige schaler zat hier | Strategische keuze over assortiment, niet mijn call |
| **4** | **Eén doorlopende ad set per productcategorie i.p.v. één per product** — nieuwe producten als nieuwe *ads* in een bestaande ad set | −20 tot −40% (leerfase-opslag weg) | AdStellar Q1 2026; Andromeda-onderzoek: 1 ad set met 25 diverse creatives gaf 16% lagere kosten dan 5 ad sets | Breekt met het CBO-per-product-model en met de kill-routine zoals die nu meet. Kill-regels moeten dan op ad-niveau |
| **5** | **Stories en in-stream video uit de placements** | −3 tot −5% account-breed | eigen data §1d | Geen |
| **6** | **Reels-native creatives (9:16, video) voor 30% van de mix** | −10% op dat deel | eigen data: Reels €28 vs Feed €52 | Productiewerk; CTR op Reels is lager |
| **7** | **Starttijd verder naar de ochtend of dagdeel-targeting** | onbekend, meten | playbook §1c: 59% spend vóór 08:00 tegen hoogste CPC | Al deels doorgevoerd (04:00); effect nog niet gemeten |

**Wat niet op de lijst staat en waarom:** cost cap / bid cap. Met 4 aankopen in 60 dagen heeft
Meta geen CPA-verdeling om een cap tegen te toetsen. Een cap onder de werkelijke kostprijs
levert nul delivery op, een cap erboven doet niets. Pas zinvol vanaf ~20 conversies per week.

---

## 3. De aanbevolen volgorde

Ingreep 1 en 2 samen eerst. Ze raken hetzelfde mechanisme (Meta kiest de klikkers) en kosten
niets aan structuur. Ingreep 5 tegelijk, want gratis.

Ingreep 4 is de grootste structurele winst, maar bótst met het draaimodel en de kill-routine.
Dat is een beslissing van Stan, niet van de routine. Het alternatief binnen het huidige
model: laat overlevers langer staan (P-06) zodat tenminste een deel van de spend uit de
leerfase komt.

Ingreep 3 is Q4-relevant: de jassen-CPM van €27 ligt 60% onder de jurken-CPM, en Q4 drijft UK
fashion-CPM's 35–60% op. Een assortiment dat in de winter goedkoop te adverteren is, is in
september klaar te zetten.

### Meting

Voor elke ingreep: vergelijk 7 dagen ervoor met 7 dagen erna op **account-CPM, CPM per
leeftijd × geslacht, link-CPC en ATC per €100 spend (Shopify, niet Meta).** Niet op sales; dat
volume is er niet. Eén variabele tegelijk, anders is de winst niet toe te wijzen.

Streefwaarden na ingreep 1 + 2 + 5, gemeten over 14 dagen:

| KPI | Nu | Doel |
|---|---|---|
| Account-CPM | €45 | < €30 |
| CPM vrouw 55+ | €72 – €84 | < €50 |
| Link-CPC | €1,88 | < €1,20 |
| Aandeel spend vrouw 65+ | 35% | < 20% |
| ATC per €100 spend (Shopify) | te meten bij start | ≥ gelijk |

Daalt de CPM maar daalt ATC/€100 mee, dan koopt Meta goedkopere maar slechtere mensen. Dan
terug naar Purchase-optimalisatie en alleen ingreep 2 houden.

---

## 4. Wat dit betekent voor de kill-routine

De drempels €10/€20/€30 zijn gebouwd op een CPC van ~€1. Bij €1,88 link-CPC koopt €10 vijf
bezoekers, en 0 ATC uit vijf bezoekers zegt niets (ATC-rate 4% → verwachting 0,2). Zolang de
CPM niet omlaag is, killt de routine op ruis.

Twee opties, allebei te meten:

1. Drempels in *bezoekers* i.p.v. euro's: kill bij 25 link-kliks zonder ATC (bij 4% ATC-rate is
   P(0 ATC | 25 bezoekers) ≈ 36%, nog steeds ruis maar 3× beter dan nu).
2. CPM eerst omlaag, drempels laten staan. Bij €25 CPM en 4,5% CTR is CPC €0,55 en koopt €10
   achttien bezoekers.

Optie 2 is de goede volgorde. Dit document gaat daarover.

---

## 5. AI-afbeeldingen — bevestiging van de stap

Drie bronnen uit 2026, onafhankelijk van elkaar:

- AI-beelden mét mensen: 30–40% lagere CTR dan echte modelfotografie. AI-beelden van alleen
  het product: 85–100% van foto-CTR. (Digital Applied, benchmark 2026)
- AI-creatives converteren 8% slechter bij AOV > $100. (Daily Intel Service, 2026)
- Meta's Andromeda-ranking straft "creative similarity" — AI-batches uit één prompt lijken
  sterk op elkaar en worden als herhaling gelezen. (Confect, Atria, 2026)

Voor kleding is het beeld altijd een lichaam. De stap is juist. Het effect zit in CTR en
conversie, niet primair in CPM.

---

## 6. Bronnen

Eigen data: Windsor.ai `facebook`, account 1142643668009994, `last_30dT`, breakdowns
campaign / ad / age×gender / placement / date / country. Verwerkt op 2026-09-03.

Extern (alle 2026, verkoopbelang aanwezig bij de meeste):

- UK-benchmarks: [adlibrary.com — Meta CPC/CPM UK e-commerce](https://adlibrary.com/posts/meta-ads-average-cpc-cpm-uk-ecommerce),
  [adamigo — CPM/CPC per land](https://www.adamigo.ai/blog/meta-ads-cpm-cpc-benchmarks-by-country-2026)
- Leerfase-opslag: [AdStellar — learning phase issues](https://www.adstellar.ai/blog/meta-advertising-learning-phase-issues),
  [Modern Marketing Institute — exit learning phase](https://www.modernmarketinginstitute.com/blog/how-to-exit-the-meta-ads-learning-phase-fast-and-start-scaling-profitably-in-2026)
- Low-signal accounts, micro-conversies: [PixelFlow — Meta checklist 2026](https://pixelflow.so/blog/meta-ads-checklist-2026),
  [adscrewph — event priority low volume](https://adscrewph.com/meta-ads/how-to-guide/event-priority-low-volume-acct/)
- Andromeda / creative diversity: [Confect — Andromeda 2026](https://confect.io/tactics/meta-andromeda-2026),
  [Atria — Andromeda creative strategy](https://www.tryatria.com/blog/andromeda-meta-ads),
  [TheOptimizer — testing after Andromeda](https://theoptimizer.io/blog/how-to-test-ad-creatives-on-meta-after-the-andromeda-update-2026-playbook)
- Auction / quality ranking: [benly — CPM too high](https://benly.ai/learn/meta-ads/meta-ads-cpm-too-high-fix),
  [MHI — CPC too high](https://mhigrowthengine.com/blog/meta-ads-cpc-too-high/)
- Leeftijd en value rules: [Jon Loomer — targeting 2026](https://www.jonloomer.com/meta-ads-targeting-2026/),
  [Jon Loomer — when to restrict](https://www.jonloomer.com/restrict-audience-meta-advertising/)
- Placements: [benly — Feed vs Stories vs Reels](https://benly.ai/learn/meta-ads/meta-ads-feed-vs-stories-vs-reels),
  [adamigo — placements e-commerce](https://www.adamigo.ai/blog/best-meta-ad-placements-for-ecommerce-brands)
- Q4-seizoen UK: [benly — seasonal campaigns](https://benly.ai/learn/meta-ads/meta-ads-seasonal-campaigns),
  [sbc-performance — UK cost](https://sbc-performance.com/blog/facebook-ads-cost/)
- AI-beelden: [Digital Applied — AI creative benchmarks](https://www.digitalapplied.com/blog/ai-ad-creative-benchmark-2026-ctr-roas-data),
  [Daily Intel Service — do AI ads convert](https://dailyintelservice.com/future/do-ai-generated-ads-convert-2026-performance-data),
  [Wevion — AI image generator review](https://wevion.ai/en/blog/ai-image-generator-for-meta-ads/)
- Bidding: [TheOptimizer — cost cap vs bid cap](https://theoptimizer.io/blog/meta-ads-bidding-in-2026-cost-cap-vs-bid-cap-and-when-to-use-each)
