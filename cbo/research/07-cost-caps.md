# Cost caps op Meta — wat het is, en of het bij deze CBO-campagnes past

Onderzoeksvraag van Stan (26-08-2026): *kan je onderzoek doen naar costcaps, met cbo campagnes.*

**Methodologische waarschuwing:** de egress-proxy blokkeerde `facebook.com` en
`developers.facebook.com`, dus Meta's eigen documentatie is niet gelezen. Alle mechaniek hieronder
komt uit zoekmachine-samenvattingen van vendor-blogs — bewijsklasse **[C]** in de indeling van
[`06-uk-buyer-research.md`](./06-uk-buyer-research.md). Wat wél eerstehands geverifieerd is: de
Windsor-actieschema's in §5 en de eigen cijfers in §3.

---

## 0. Het antwoord

Een cost cap is geen budgetrem maar een **CPA-plafond**: je zegt Meta wat een aankoop gemiddeld
maximaal mag kosten, en Meta biedt alleen nog in veilingen waar dat haalbaar lijkt.

Dat werkt alleen als het plafond boven de prijs ligt die de markt feitelijk rekent. Bij deze
account ligt de gemeten CPA rond **€420** en ligt het plafond dat winst oplevert rond **€19–31**.
Een cost cap op een winstgevend niveau zet de levering dus niet bij, maar uit. En het tweede
vereiste — ongeveer 50 optimalisatie-events per week per ad set — wordt met circa één aankoop per
week voor ongeveer 2% gehaald.

**Conclusie: niet doen, en niet als kandidaat in de wachtkamer zetten als een instelling die je
"nog moet testen".** Cost cap is gereedschap voor het schalen van iets wat al werkt. Er is hier nog
niets dat werkt om te schalen. Wat er wél uit dit onderzoek komt is een ánder plafond — `spend_cap`
in §5 — dat wel bij het huidige probleem past.

---

## 1. Wat het is, en hoe het zich verhoudt tot de rest

Meta heeft de namen hernoemd; de oude namen leven door in vrijwel alle marketingvideo's, dus beide
staan hier.

| Nieuwe naam | Oude naam | API-waarde | Wat je opgeeft | Wat Meta belooft |
|---|---|---|---|---|
| Highest volume | Lowest cost | `LOWEST_COST_WITHOUT_CAP` | niets | zoveel mogelijk resultaten voor het budget |
| Cost per result goal | **Cost cap** | `COST_CAP` | doel-CPA | *gemiddelde* CPA rond dat doel |
| Bid cap | Bid cap | `LOWEST_COST_WITH_BID_CAP` | max bod per veiling | nooit meer bieden dan dat bedrag |
| ROAS goal | Minimum ROAS | `LOWEST_COST_WITH_MIN_ROAS` | doel-ROAS | omzet/spend rond dat doel |

Twee dingen die vaak door elkaar lopen:

- **Cost cap is een gemiddelde, geen grens.** Losse aankopen mogen erboven uitkomen; het gemiddelde
  moet kloppen. Dat is precies waarom het bij lage aantallen niet werkt: een gemiddelde over vier
  aankopen is geen gemiddelde.
- **Cost cap is geen uitgavenrem.** Het beperkt niet wat je uitgeeft, alleen waarvoor. Wie een
  uitgavenplafond zoekt, zoekt `spend_cap` (§5), niet dit.

**De routine zet vandaag niets.** `bid_strategy` komt in de hele pipeline niet voor, dus alle
campagnes draaien op de standaard `LOWEST_COST_WITHOUT_CAP`. Dat is voor testcampagnes ook wat
elke bron aanraadt: eerst zonder beperking meten wat de markt rekent, daarna pas een plafond.

---

## 2. De twee voorwaarden die de bronnen noemen

Alle geraadpleegde bronnen komen op dezelfde twee neer.

**(a) Een gemeten CPA om het plafond op te baseren.** De aanbeveling is consistent: zet de cap
10–20% *boven* je voortschrijdende 7–14-daags gemiddelde. Een cap gelijk aan je doel gedraagt zich
als een bid cap: strak en onderleverend. Het terugkerende woord is *aspirational* — een cap zetten
op wat je zou willen betalen in plaats van op wat je betaalt.

**(b) Volume om op te optimaliseren.** Circa 50 optimalisatie-events per week per ad set. Onder die
drempel blijft de ad set in "Learning Limited" hangen; de cap knijpt dan een systeem af dat toch al
te weinig signaal heeft.

Het faalgedrag is niet geleidelijk. De bronnen zijn opvallend eensluidend dat Meta niet langzaam
boven de cap uit drift, maar **stopt**: impressies richting nul, spend onder 70% van het budget.
Onderlevering is dus geen graduele prijs die je betaalt voor kostenbeheersing — het is de uitkomst.

---

## 3. Toets op de eigen cijfers

Beide voorwaarden falen, en niet nipt.

**Gemeten CPA.** Uit [`playbook.md §1c`](../pipeline/playbook.md#1c-a-06--het-starttijdstip-en-waarom-dit-de-enige-gemeten-regel-is)
(Windsor-uurdata, 30 dagen, account 1142643668009994): €282,92 + €712,67 + €506,34 + €186,66 =
**€1.688,59 spend**. Uit [`learning-backlog.md §0`](../pipeline/learning-backlog.md) (Shopify, 60
dagen): **4 voltooide checkouts**, alle vier in de weken van 03-08 en 17-08 en dus binnen datzelfde
venster.

> **CPA ≈ €1.689 / 4 ≈ €422**

**Winstgevend plafond.** AOV £34–70 volgens [`angle-library-v1.md`](../pipeline/angle-library-v1.md);
neem het midden, ~£50 ≈ €58. De schaalregel uit [`routines/cbo-schaal/SPEC.md`](../../routines/cbo-schaal/SPEC.md)
eist BER < 1,7, oftewel een brutomarge boven 1/1,7 = 58,8% → ~€34 per order. Daar gaat 5%
transactiekosten af (€2,90).

| | Max CPA |
|---|---|
| Breakeven | ~€31 |
| Marge ≥ 20% (de schaaldrempel) | ~€19 |

> De markt rekent **veertien tot tweeëntwintig keer** wat een winstgevende cap zou toestaan.

**Volume.** 4 aankopen per 30 dagen ≈ **1 per week**, tegen een drempel van 50 per week per ad set:
**2%**. Ook de goedkopere events halen het niet — 48 winkelwagen-toevoegingen in 60 dagen ≈ 5,6 per
week is 11% van de drempel. De uitwijk die de bronnen noemen (optimaliseer op een event hogerop in
de trechter tot je de dichtheid haalt) is hier dus geen uitwijk: er is geen enkel event met genoeg
volume.

**Wat dit getal eigenlijk zegt.** €422 CPA is geen biedprobleem. Het is dezelfde bevinding als
`learning-backlog.md §0`: 32 van de 36 mensen die de checkout bereikten, rondden niet af. Een cost
cap zou daar niets aan doen — hij zou de campagne alleen stilzetten en het lek onaangeroerd laten.

**Kanttekeningen, eerlijk.** Niet elke van die 4 orders hoeft advertentie-toegeschreven te zijn, en
het spend-venster en het funnel-venster lopen niet exact gelijk. Beide zouden de CPA hooguit een
kwart kunnen verschuiven. Bij een factor 14 verandert dat de conclusie niet.

---

## 4. Waarom het met CBO extra hard bijt

Bij CBO staat `bid_strategy` op campagneniveau en het cap-bedrag (`bid_amount`) per ad set. De
budgetverdeling van CBO is dan geen vrije verdeling meer: Meta mag budget alleen nog wegzetten waar
de cap haalbaar lijkt. Is dat nergens, dan gaat er niets weg.

Er zit een verleiding in die uitkomst die het benoemen waard is: **een te lage cost cap gedraagt
zich als een gratis kill-routine.** De campagne geeft vanzelf bijna niets uit. Bij een handmatig
kill-proces (de kill-routine staat uit, zie `playbook.md §1b`) klinkt dat aantrekkelijk.

Het is een slechte ruil. Een campagne die niet levert, levert ook geen oordeel op over de
invalshoek — en dat oordeel is precies waarvoor A-04 en A-05 zijn ingevoerd. Je betaalt met de
meting die de hele lerende lus moet voeden. Wie uitgaven wil begrenzen, moet uitgaven begrenzen
(§5), niet de veiling.

---

## 5. Wat er wél kan: `spend_cap`

Eerstehands geverifieerd via `list_actions("facebook")` op de Windsor-connector — dit is geen
[C]-claim maar een gelezen schema:

| Actie | Relevante velden |
|---|---|
| `create_campaign` | `bid_strategy` — maar géén cap-bedrag op campagneniveau |
| `create_adset` | `bid_amount` |
| `update_adset` | `bid_strategy` + `bid_amount`; het schema zegt met zoveel woorden dat omschakelen naar `COST_CAP` of `LOWEST_COST_WITH_BID_CAP` `bid_amount` in dezelfde aanroep vereist |
| `update_campaign` | **`spend_cap`** — een *lifetime* uitgavenplafond in centen |

Cost cap is met Windsor dus technisch wél te zetten (campagne + ad set samen). Dat het kan is geen
reden om het te doen; §3 is de reden om het niet te doen.

`spend_cap` is het interessante veld. Het is geen CPA-plafond maar een harde bovengrens op wat een
campagne over haar hele leven mag uitgeven, **afgedwongen door Meta zelf**. Dat raakt precies het
gat dat nu open ligt: de kill-routine draait niet, Stan killt met de hand, en een campagne die 's
nachts doorloopt is nu alleen begrensd door of iemand kijkt. Een testcampagne van €50/dag met
`spend_cap` op bijvoorbeeld €110 kan nooit meer dan twee testdagen kosten, ook niet als er niemand
kijkt en ook niet als een routine faalt.

Twee dingen moeten nagerekend worden voordat dit een regel wordt, en beide zijn onbekend:

1. Meta hanteert een **minimum** voor `spend_cap`, en het plafond kan niet onder het reeds
   uitgegeven bedrag worden gezet. Of €110 boven dat minimum ligt is niet geverifieerd.
2. Wat er gebeurt bij het raken van het plafond — pauzeert Meta de campagne, en is die daarna
   herbruikbaar door het plafond op te hogen, of is hij verbruikt.

Dit staat als kandidaat **P-14** in [`playbook.md §2`](../pipeline/playbook.md#2-kandidaten).

---

## 6. Wanneer cost cap wél aan de orde komt

Niet op een datum, maar op een drempel. Alle drie moeten waar zijn:

1. Eén campagne haalt **≥ 50 aankopen per week** (de bronnen noemen 50–100).
2. De gemeten CPA over 7–14 dagen ligt **onder de breakeven-CPA** van §3 — anders is er geen
   plafond dat tegelijk winstgevend en haalbaar is.
3. Er is een reden om te schalen: het doel van een cost cap is de CPA vasthouden terwijl het budget
   omhoog gaat, niet een verliesgevende campagne redden.

Bij het huidige volume ligt drempel 1 een factor 50 weg. De eerstvolgende zinvolle stap richting
cost cap is dus geen biedinstelling maar het checkout-lek uit `learning-backlog.md §1`.

---

## 7. Bronnen

Alle bronnen zijn vendor-blogs met een verkoopbelang (bidding-tools, agencies) — bewijsklasse
**[C]**. Ze zijn opvallend eensluidend over de twee voorwaarden in §2, maar dat is zwak bewijs:
ze schrijven grotendeels elkaar over, en tien marketeers die elkaar napraten zijn één bron.
Meta's eigen documentatie is niet bereikbaar geweest.

- [TheOptimizer — Meta Ads Bidding 2026: Cost Cap vs. Bid Cap](https://theoptimizer.io/blog/meta-ads-bidding-in-2026-cost-cap-vs-bid-cap-and-when-to-use-each)
- [Ad Library — Meta Bid Strategy Guide 2026: Lowest Cost vs Cost Cap vs Bid Cap](https://adlibrary.com/posts/meta-bid-strategy-guide)
- [Flighted — Cost Per Result Goal vs Bid Cap vs ROAS Goal vs Highest Volume](https://www.flighted.co/blog/meta-ads-bid-strategies-explained-cost-per-result-goal-vs-bid-cap-vs-roas-goal-vs-highest-volume)
- [Aden's Lab — Meta Cost Caps Explained: When to Raise Them and When to Hold](https://www.adenslab.com/blog/meta-cost-caps-explained-when-to-raise-or-hold)
- [LeadEnforce — Why Cost Cap Campaigns Suddenly Stop Spending](https://leadenforce.com/blog/why-cost-cap-campaigns-suddenly-stop-spending)
- [Ad Library — Meta Ads Learning Phase: 50 Events Per Week Explained](https://adlibrary.com/posts/meta-ads-learning-phase-50-events-guide)
- [Benly — Meta Ads Bidding Strategies: Cost Cap vs Bid Cap vs ROAS Target 2026](https://benly.ai/learn/meta-ads/bidding-strategies-guide)
- [KECG — Cost Cap Meta Ads Explained: Setup Guide 2026](https://kecg.co/cost-cap-meta-ads/)
