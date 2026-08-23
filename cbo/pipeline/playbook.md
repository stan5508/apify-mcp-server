# Playbook — structurele kennis voor de CBO-pipeline

Dit bestand is het **leergeheugen** van `Dagelijkse CBO-pipeline`
(`trig_018QRfi1xAn8Y3pVVCqjspG1`). Het bevat structurele opzetkennis: budget, campagnestructuur,
targeting, testcadans, meetnormen.

**Dit is niet de angle-bibliotheek.** Die (`angle-library-v1.md`) gaat over *creatieve* eenheden —
avatar, caption, body-structuur, bewijs. Dit bestand gaat over *hoe de campagne gebouwd wordt*.
Twee schema's, bewust gescheiden, omdat een regel over ad-set-structuur geen avatar heeft en een
angle geen budgetladder.

---

## 0. Hoe de routine dit bestand leest

> **Alleen regels in §1 (`status: actief`) veranderen gedrag. §2 is een wachtkamer.**

Dat is geen formaliteit. `learning-loop-design.md` §7 stelt: *meten voordat we adviseren*. Kennis
uit een video is een **onbewezen claim van een derde**, vaak met een verkoopbelang. Dat is een
andere bewijsklasse dan concurrentieonderzoek met aantoonbare ad-spend, en weer een andere dan je
eigen gemeten uitkomst.

Een regel promoveert van §2 naar §1 alleen via een van deze twee routes:

| Route | Voorwaarde |
|---|---|
| **Eigen meting** | `cbo-leren` heeft ≥3 uitkomsten die de regel steunen binnen dezelfde productcategorie |
| **Expliciet besluit van Stan** | Stan zet hem handmatig om, met de reden erbij in het `notitie`-veld |

Nooit promoveren omdat meerdere video's hetzelfde zeggen. Tien marketeers die elkaar napraten
zijn één bron, geen tien.

---

## 1. Actieve regels

*Deze regels gelden nu. De routine past ze toe.*

Gepromoveerd op 2026-08-23 op expliciet verzoek van Stan, en dezelfde dag doorgevoerd in de
prompt van `trig_018QRfi1xAn8Y3pVVCqjspG1`. Ze zijn **niet** door eigen meting bevestigd — dit is
de tweede promotieroute uit §0 (besluit van Stan), en dat onderscheid blijft hier staan.

| Regel | Uit | Wat de routine nu doet |
|---|---|---|
| **A-01** | P-11 | Placements zijn `["facebook","instagram"]`. Messenger eruit, op dezelfde grond waarop Audience Network al buiten stond. |
| **A-02** | P-04 | Elke campagne krijgt een expliciet aanbod, en nooit een kortingspercentage of een verzonnen deadline. Toegestaan: gratis verzending boven een drempel, of een cadeau bij aankoop. |
| **A-03** | P-13 | De productbeschrijving noemt verzend- en retourbeleid met zoveel woorden, en gebruikt echte productfoto's. |
| **A-04** | P-01 + P-02 + P-09 + P-10 | Eén concept per campagne in plaats van vijf invalshoeken door elkaar. Alle creatives binnen een campagne hebben hetzelfde formaat en dezelfde stijl; alleen de inhoud verschilt. |
| **A-05** | campaign-naming.md | De angle-code staat als vijfde segment in de campagnenaam, achter de datum. Hierdoor is een uitkomst voor het eerst aan een invalshoek toe te wijzen. |

**A-05 is degene die de lus opent.** Zolang alle invalshoeken door elkaar in één ad set zaten was
niet te zien wélke won. Met A-04 en A-05 samen wordt dat voor het eerst meetbaar, en kan
`cbo-leren` gebouwd worden.

---

## 1b. Bewust niet doorgevoerd

*Kandidaten die Stan's opdracht "implementeer zoveel mogelijk" wel raakte, maar die ik heb laten
staan. Elk met de reden, zodat het een keuze is en geen vergeten punt.*

| Kandidaat | Waarom niet |
|---|---|
| **P-03** leeftijd versmallen | De video zegt "versmal", jouw eigen onderzoek zegt iets anders: 65+ is de groeiende groep en de winnaars mikken op 55+. Welk getal het wordt is een commerciële keuze over wie je klant is, geen instelling die ik namens jou verzin. |
| **P-06** venster dag 5–7 | Het venster oprekken betekent langer doorbetalen op verliesgevende campagnes. De kill-regels bestaan juist om de cashflow te beschermen. Dit hoort een meting te zijn, geen aanname. |
| **P-07** Advantage+ | Het verbod erop staat er met zoveel woorden in de prompt. Een expliciete beveiliging omdraaien op gezag van één video, zonder te weten waarom hij er staat, is precies het soort wijziging dat later niemand kan verklaren. |
| **P-08** één product per campagne | Dit vervangt de grondgedachte van de pipeline: dagelijks breed zoeken tegenover diep gaan op één product. Een strategische ommezwaai hoort van jou te komen. |
| **P-12** niet om middernacht | **De bestaande keuze is beter onderbouwd dan de kandidaat.** De livegang-routine legt uit waarom 00:01: dan krijgt een campagne de volle 24 uur en lekt er geen spend naar de vorige dag. De video geeft alleen "ik zie 's nachts weinig aankopen". De meetvraag over de kill-drempel blijft wel staan. |
| **P-05** wekelijkse verversing | De pipeline zet dagelijks nieuwe producten klaar; creative-vermoeidheid op één campagne speelt dan nauwelijks. Mogelijk niet van toepassing op deze opzet. |

---

## 2. Kandidaten

*Vastgelegd, nog niet actief. Geen invloed op de routine tot promotie.*

### P-01 — Concepten horen aparte ad sets te zijn

| Veld | Waarde |
|---|---|
| `claim` | Eén ad set per concept, 3–4 creatives ván hetzelfde type binnen dat concept. Nooit verschillende invalshoeken in één ad set. |
| `raakt` | STAP 3 (g) — `create_adset` / `create_ad` |
| `nu in de routine` | 5 ads met 5 verschillende invalshoeken (emotioneel / urgentie / UBR / bezwaren / social proof) in **één** ad set, en 4 statics + 1 carousel door elkaar |
| `redenering van de bron` | Met CBO verdeelt Meta budget op ad-set-niveau. Zitten alle concepten in één ad set, dan optimaliseert Meta binnen dat concept en kun je nooit zien wélk concept won. |
| `bron` | **Twee onafhankelijke bronnen.** (1) BitBranding, "The NEW Proven Facebook Ads Strategy for Clothing Brands 2026", 10-06-2025, t=23:00–25:20. (2) Ecommerce Alley, "Best Meta Ads Campaign Structure For Ecommerce Brands In 2026", 28:02 — noemt ad sets "batches", elke batch één geïsoleerde variabele, minimaal 3–5 ads per ad set. |
| `bewijsklasse` | derde-claim (beide met verkoopbelang: coaching resp. Breezeway-software), maar wel twee losstaande partijen |
| `status` | onbeproefd — sterkst onderbouwde kandidaat |
| `notitie` | Dit is de zwaarste kandidaat: hij is een voorwaarde voor de hele lerende lus. Zolang alle angles in één ad set zitten, is een uitkomst niet aan een angle toe te wijzen — precies de blokkade uit `learning-loop-design.md` §2. |

### P-02 — Onder een bepaald dagbudget: één concept tegelijk

| Veld | Waarde |
|---|---|
| `claim` | Onder ~$100/dag levert testen van 3 concepten tegelijk te weinig data per concept. Test er dan één. |
| `raakt` | STAP 3 (g) — `daily_budget`, en het aantal ad sets uit P-01 |
| `nu in de routine` | `daily_budget 5077` (€50,77) hard-gecodeerd, één ad set |
| `bron` | BitBranding, t=12:00–12:30, plus het strategiedocument in beeld op t=09:45 met de gele markering: *"If you are not spending $100 per day, you can use this strategy but use only ONE CONCEPT at a time"* |
| `bewijsklasse` | derde-claim |
| `status` | onbeproefd |
| `notitie` | €50,77 ligt onder die drempel. Als P-01 wordt aangenomen, zegt P-02 dus: één ad set, niet drie — tenzij het budget omhoog gaat. De twee horen samen beoordeeld te worden. |

### P-03 — De leeftijdsrange 18-65 is te breed

| Veld | Waarde |
|---|---|
| `claim` | Een range van 18 tot 65 zet levensfasen bij elkaar die niets delen. Kies de fase die je product koopt. |
| `raakt` | STAP 3 (g) — `targeting.age_min` / `age_max` |
| `nu in de routine` | `age_min 18, age_max 65` |
| `bron` | BitBranding, t=19:00–20:10 |
| `bewijsklasse` | derde-claim |
| `status` | onbeproefd |
| `notitie` | **Spanning met eigen onderzoek.** `angle-library-v1.md` §0 vindt dat 65+ juist de groeiende groep is (+12,3% kledinguitgaven YoY tegen −6,2% bij 16-24) en dat de winnende merken op voetpijn bij 55+ mikken. Dat pleit voor *versmallen naar boven*, niet voor versmallen in het algemeen. Als deze regel ooit actief wordt, dan waarschijnlijk als `age_min 45` — niet als een generieke vernauwing. |

### P-04 — Een offer is geen korting

| Veld | Waarde |
|---|---|
| `claim` | Het aanbod is het meest over het hoofd geziene onderdeel. Alternatieven zonder marge-verlies: 2+1 / 3+1, spend-X-krijg-cadeau, gratis verzending boven een bedrag. |
| `raakt` | STAP 3 (d) productbeschrijving en (f) ad-copies — beide hebben nu **geen offer-concept** |
| `nu in de routine` | Niets. Het woord "offer" komt in de hele prompt niet voor. |
| `bron` | **Twee bronnen.** (1) BitBranding, t=05:30–07:40. (2) Sam Hopkins, "How to Make $1,000 In 7 Days With Clothing Brand Ads" — laat twee eigen creatives naast elkaar zien: die met *"Get a free beanie with your order"* werkte, die zonder aanbod niet (*"the offer was kind of weak"*). |
| `bewijsklasse` | derde-claim, maar **sterk gesteund door eigen onderzoek** en nu met een concreet fashion-voorbeeld van cadeau-boven-korting |
| `status` | onbeproefd |
| `notitie` | Dit is de kandidaat met de beste onderbouwing van buiten de video. `angle-library-v1.md` §1 documenteert dat kortingsmechanismen in de UK actief gehandhaafd worden (DMCCA, boetes tot 10% wereldwijde jaaromzet) en noemt gratis verzending als tijdelijke actie expliciet als het compliant alternatief. Video en compliance-onderzoek wijzen dezelfde kant op vanuit totaal verschillende overwegingen. |

### P-05 — Wekelijkse creative-verversing

| Veld | Waarde |
|---|---|
| `claim` | Elke week nieuwe creatives lanceren en uitgeputte uitzetten. Resultaten zakken structureel weg bij merken die dit 2–3 weken laten liggen. |
| `raakt` | Geen enkele bestaande routine — er is geen verversingscadans |
| `nu in de routine` | De pipeline zet dagelijks nieuwe *producten* klaar, maar ververst nooit de creatives van een lópende campagne |
| `bron` | **Twee onafhankelijke bronnen.** (1) BitBranding, t=11:00–11:40. (2) Ecommerce Alley — noemt wekelijks lanceren letterlijk "non-negotiable" en het is hun eerste diagnosevraag bij klanten die niet kunnen schalen. |
| `bewijsklasse` | derde-claim; bij BitBranding anekdotisch, bij Ecommerce Alley als patroon over 200+ merken |
| `status` | onbeproefd |
| `notitie` | **Opgewaardeerd na de tweede bron** — stond eerst als zwakste genoteerd. Kanttekening blijft: bij een pipeline die dagelijks nieuwe producten test, is creative-vermoeidheid op een enkele campagne veel minder relevant dan bij een merk dat één hero-product jaren draait. Mogelijk niet van toepassing op deze opzet. |

### P-06 — Beoordelingsvenster dag 5–7 in plaats van 48 uur

| Veld | Waarde |
|---|---|
| `claim` | Launch dag 1, monitoren dag 2–4, beoordelen dag 5–7. |
| `raakt` | `cbo-schaal` (48-uursbesluit) en `cbo-kill` (killt al op dag 1 bij €10) |
| `nu in de routine` | Kill vanaf €10 op testdag 1; schaalbesluit na 48 uur |
| `bron` | BitBranding, t=11:00–11:20 en het strategiedocument op t=10:56 |
| `bewijsklasse` | derde-claim |
| `status` | onbeproefd — **niet naar actief promoveren zonder eigen meting** |
| `notitie` | Dit is de gevaarlijkste kandidaat om over te nemen. Het venster oprekken betekent langer doorbetalen op verliesgevende campagnes, en de kill-regels zijn juist gebouwd om de cashflow te beschermen. Maar `learning-loop-design.md` §6 signaleerde zelfstandig hetzelfde risico: de €10-regel selecteert tegen lange advertorials die hun rendement pas over meerdere sessies opbouwen. Twee onafhankelijke aanwijzingen dat het venster kort is. **Dat maakt het een meetvraag, geen wijziging.** De meting kan pas als P-01 en de angle-code live zijn. |


### P-07 — Advantage+ Shopping werkt juist goed voor fashion

| Veld | Waarde |
|---|---|
| `claim` | Voor product-aware fashion-merken presteren Advantage+ Shopping-campagnes goed. Een Advantage+ campagne *is* technisch een CBO — budget op campagneniveau, Meta verdeelt over de ads. |
| `raakt` | STAP 3 (g) — de hele campagne-opbouw |
| `nu in de routine` | Expliciet verboden: *"Accepteer nooit Meta AI- of Advantage+-suggesties."* |
| `bron` | Justin Lalonde (paidadvertising.com, claimt $20 mln/jaar beheerde spend), "Facebook Ads ABO vs CBO In 2026", 06:52, t=03:54–04:17 |
| `bewijsklasse` | derde-claim, verkoopbelang (inner circle + agency) |
| `status` | onbeproefd |
| `notitie` | **Directe botsing met een harde regel in de routine.** De bron noemt fashion expliciet als de categorie waar hij Advantage+ ziet werken, en ontkracht het idee dat het een afwijking van CBO zou zijn. Waarom het verbod er staat weet ik niet — als daar een reden voor was (bijv. controleverlies over creatives of placements), hoort die opgeschreven te worden, want anders is dit niet te beoordelen. Tot die reden bekend is: niet aanraken. |

### P-08 — Eén product per campagne, niet drie nieuwe per dag

| Veld | Waarde |
|---|---|
| `claim` | Onder $300/dag: één campagne, gericht op **één** kernproduct. *"Don't go try to advertise 50 different products within this."* Consolidatie boven complexiteit. |
| `raakt` | De hele opzet van de pipeline — STAP 2 (3 producten kiezen) en STAP 3 (g) |
| `nu in de routine` | Elke dag 3 nieuwe producten, elk met een eigen CBO van €50,77. Bij dagelijks draaien zijn dat ~21 nieuwe campagnes per week. |
| `bron` | Ecommerce Alley, t=~09:00–10:30 |
| `bewijsklasse` | derde-claim, verkoopbelang (coaching + Breezeway); wel gebaseerd op 200+ merken en 5 mln/maand spend door hun tool |
| `status` | onbeproefd |
| `notitie` | **Dit is de zwaarste bevinding tot nu toe, en de meest ongemakkelijke.** Het raakt niet een instelling maar de grondgedachte van de pipeline: breed zoeken door veel producten te testen, tegenover diep gaan op één product. Jouw eigen cijfers wijzen dezelfde kant op als de bron: op 22-08 stonden 3 van de 4 campagnes op KILLED en was het resultaat −€80,48. En `angle-library-v1.md` §0 kwam onafhankelijk tot dezelfde conclusie — *"Ashcrofts Anne Orthopedic Sandals is niet een product in het assortiment maar het product waarmee we beginnen"*. Drie losstaande signalen. **Toch niet promoveren zonder meting**: het is een strategische ommezwaai, geen instelling, en die hoort een bewuste keuze van Stan te zijn — niet iets wat een playbook-regel stilletjes doorvoert. |

### P-09 — De ad testing ladder: angles → hooks → styles → formats

| Veld | Waarde |
|---|---|
| `claim` | Test in deze volgorde, één trede tegelijk. Eerst angles. Werkt een angle, test dan hooks bínnen die angle. Werkt een hook, test dan styles. Daarna formats. Elke ad set isoleert één trede; de rest blijft gelijk. |
| `raakt` | `cbo-brief` (nog niet gebouwd) en de ad-set-indeling uit P-01 |
| `nu in de routine` | Niets. De 5 copies variëren invalshoek, tekst én beeld tegelijk — dus als er één wint, is niet te zeggen wát won. |
| `bron` | Ecommerce Alley, t=~11:00–12:30. Hun angle-raamwerk heet FOCUS: Frustration, Outcome, Constraint, Unspoken cost, Skepticism. |
| `bewijsklasse` | derde-claim |
| `status` | onbeproefd |
| `notitie` | Dit is de kandidaat die het beste aansluit op wat je al hebt. `angle-library-v1.md` legt per angle apart `caption_patroon`, `body_structuur` en `bewijs` vast — dat zijn precies aparte treden van deze ladder. De FOCUS-indeling is bovendien te vergelijken met je eigen angle-families en zou kunnen laten zien welk type je nog niet dekt. Los van de vraag of de vólgorde klopt, is het isolatieprincipe waardevol: verander één ding per test. |

### P-10 — 5 tot 10 creatives per week onder $300/dag

| Veld | Waarde |
|---|---|
| `claim` | Bij $0–300/dag zijn 5 creatives het minimum en is 5–10 per week het optimum. Boven $1.000/dag wordt dat 10–15. |
| `raakt` | STAP 3 (e) — het aantal creatives |
| `nu in de routine` | 5 creatives per product × 3 producten = 15 per dag, dus ~105 per week |
| `bron` | Ecommerce Alley, t=~08:00, op basis van een analyse van 70.000 Meta-ads in hun eigen tool |
| `bewijsklasse` | derde-claim, maar met de breedste kwantitatieve basis van alle bronnen tot nu toe |
| `status` | onbeproefd |
| `notitie` | Je zit op ongeveer tienmaal het genoemde optimum voor jouw uitgavenniveau. Dat is alleen zinvol te beoordelen samen met P-08: de 105 zijn verdeeld over ~21 campagnes, dus per campagne zit je met 5 precies op het minimum. Het getal is dus niet los te lezen van de vraag hoeveel producten je tegelijk draait. |

### P-11 — Placements handmatig instellen, Messenger uit voor kleding

| Veld | Waarde |
|---|---|
| `claim` | Zet placements op handmatig. Voor kledingmerken: alleen feeds, stories en in-stream video. Messenger en Audience Network uit, en ook Instagram-zoekresultaten (de Explore-tegels) uit, want daar wordt wel voor betaald maar nauwelijks gekocht. |
| `raakt` | STAP 3 (g) — `targeting.publisher_platforms` |
| `nu in de routine` | `["facebook","instagram","messenger"]` — **Messenger staat aan.** Audience Network en Threads zijn wel bewust uitgesloten. |
| `bron` | Fred Sanders, "How To Run Facebook Ads For Clothing Brands in 2025", 21:54, t=~13:30–14:30 |
| `bewijsklasse` | derde-claim |
| `status` | onbeproefd |
| `notitie` | Kleinste en goedkoopste kandidaat van allemaal: één waarde uit een lijstje halen. De redenering is bovendien dezelfde als die waarmee Audience Network al uitgesloten wérd — je betaalt voor vertoningen op plekken met koopintentie bijna nul. Dat de routine Audience Network wel uitsluit en Messenger niet, oogt eerder als een omissie dan als een keuze. Het placement-detailniveau (feeds/stories/in-stream, Explore uit) is via de Windsor-API mogelijk niet zo fijnmazig te zetten als in Ads Manager; dat moet uitgezocht worden. |

### P-12 — Niet om middernacht live zetten

| Veld | Waarde |
|---|---|
| `claim` | Start campagnes midden op de dag, niet om 00:00. *"A lot of people do 12:00 a.m. I don't really see that many good purchases coming in at 12:00 a.m."* Je verbrandt de eerste uren van je dagbudget op een moment dat er nauwelijks gekocht wordt. |
| `raakt` | De routine **Nachtelijke CBO-livegang**, die om 00:01 accounttijd Londen live zet |
| `nu in de routine` | Campagnes gaan om 00:01 Londense tijd aan — precies het tijdstip dat de bron afraadt |
| `bron` | Fred Sanders, t=~11:00–11:30 |
| `bewijsklasse` | derde-claim, zonder cijfers onderbouwd |
| `status` | onbeproefd |
| `notitie` | **Raakt de kill-regels direct, en dat maakt hem interessanter dan hij lijkt.** `cbo-kill` killt op testdag 1 al bij €10 spend zonder ATC. Gaat een campagne om 00:01 live en wordt het eerste tientje 's nachts opgemaakt zonder verkopen, dan kan een campagne gekilld zijn nog vóór het koopvenster begint. Dat zou de €10-regel strenger maken dan bedoeld. Te toetsen zonder iets te wijzigen: kijk in de bestaande data hoe laat gekilde campagnes hun drempel raakten. Dat is meetwerk op wat er al ligt, geen experiment. |

### P-13 — De productpagina moet klaar zijn vóór de advertentie

| Veld | Waarde |
|---|---|
| `claim` | Zichtbare verzend- en retourinformatie bovenaan, echte foto's in plaats van mockups, en bewijs dat er daadwerkelijk verzonden wordt. *"If people wouldn't buy without you running ads, they're not going to buy when you start running ads."* |
| `raakt` | STAP 3 (d) — de Shopify-productbeschrijving |
| `nu in de routine` | Er wordt een beschrijving met USP-regel 🚚🔄🔒 gegenereerd, maar niets controleert of verzend- en retourbeleid vindbaar zijn of de foto's echt ogen |
| `bron` | Sam Hopkins, t=~03:00–06:30 |
| `bewijsklasse` | derde-claim, maar **derde onafhankelijke lijn naar dezelfde conclusie** |
| `status` | onbeproefd |
| `notitie` | Dit is geen advertentiekennis maar een randvoorwaarde, en juist daarom relevant. `learning-backlog.md` §0 meet 32 checkouts tegen 4 afgeronde aankopen; `angle-library-v1.md` §0 stelt dat legitimiteit de grootste conversieblokker is, niet prijs. Nu zegt een derde, losstaande bron hetzelfde. **Het deel over one-click checkout (Apple Pay, Shop Pay, Google Pay, PayPal) hoort hier niet thuis** — dat raakt geen routine en staat al als kandidaat 2 in `learning-backlog.md` §1. Daar laten staan; dit playbook gaat over campagne-opbouw. |

---

## 3. Bevestigd zonder wijziging

*Vragen die een bron beantwoordde zonder dat er iets hoeft te veranderen. Genoteerd zodat ze
niet opnieuw onderzocht worden.*

### B-01 — CBO is de juiste campagnesoort voor deze opzet

Justin Lalonde deelt in tweeën: **CBO** voor e-commerce en brede markten op landelijk niveau,
**ABO** voor kleine markten (dienstverlening, B2B, lokaal) waar je frequentie moet afknijpen.

Ashcroft is e-commerce en richt zich op heel Groot-Brittannië. Dat valt onmiskenbaar in het
CBO-vak. De pipeline doet dit al goed en er is geen reden tot wijziging.

Bevestigd door drie latere bronnen: Fred Sanders en Sam Hopkins bouwen allebei een CBO voor een
kledingmerk, en Ecommerce Alley schrijft campagneniveau-budget voor in tier 1. Sam Hopkins tekent
wel aan dat ABO ook werkt en dat het van je strategie afhangt — geen van beiden noemt een reden om
van CBO af te stappen.

Bron: "Facebook Ads ABO vs CBO In 2026", t=04:38–05:16. Nuance uit dezelfde bron: ABO wordt
interessant zodra je in een kleine markt veel geld moet wegzetten — niet aan de orde bij €50/dag
over een heel land.

---

## 4. Weerlegd

*Regels die het eigen cijfermateriaal niet overleefden. Blijven staan zodat ze niet opnieuw
worden voorgesteld.*

_Nog leeg._

---

## 5. Extractievorm — hoe een volgende video hier landt

Elke bron levert **nul of meer** kandidaten. Nul is een geldige uitkomst en de meest voorkomende:
de meeste marketingvideo's herhalen wat hier al staat.

Neem alleen op wat aan alle drie voldoet:

1. **Het raakt een concrete beslissing in een routine.** Is er geen veld, stap of getal aan te
   wijzen dat zou veranderen, dan is het geen kennis maar sfeer.
2. **Het is specifiek genoeg om fout te kunnen zijn.** "Maak betere creatives" kan niet weerlegd
   worden. "Binnen een concept alleen hetzelfde creative-type" wel.
3. **Het staat er nog niet in.** Anders alleen de bron toevoegen aan de bestaande regel — dat
   maakt hem niet waarder, maar wel beter traceerbaar.

Vaste velden: `claim`, `raakt`, `nu in de routine`, `bron` (kanaal, titel, datum, tijdstempel),
`bewijsklasse`, `status`, `notitie`.

Het veld **`nu in de routine` is het belangrijkste** en wordt het vaakst overgeslagen. Zonder dat
je opschrijft wat er vandaag staat, kun je later niet zien of een regel iets veranderde of alleen
beschreef wat er al gebeurde.

Het veld **`notitie` is waar het denkwerk hoort**: spanning met eigen onderzoek, twijfel over
toepasbaarheid, afhankelijkheid van een andere kandidaat. Een kandidaat zonder notitie is meestal
onvoldoende doordacht.

### Bewijsklassen

| Klasse | Wat het is |
|---|---|
| `eigen meting` | Uitkomst uit `cbo-leren` op eigen campagnes. Zwaarst. |
| `concurrentieonderzoek` | Waarneembaar gedrag van concurrenten met ad-spend erachter (`cbo/research/`). |
| `derde-claim` | Video, blog, cursus. Lichtst — zeker met een verkoopbelang. |

Staat er bij een claim een verkoopbelang, vermeld dat. Aaron van BitBranding verkoopt een
coachingprogramma; dat maakt zijn advies niet fout, maar wel gekleurd richting "je hebt een
systeem nodig".

---

## 6. Bronnen tot nu toe

| Datum verwerkt | Bron | Kandidaten |
|---|---|---|
| 2026-08-23 | BitBranding — *The NEW Proven Facebook Ads Strategy for Clothing Brands 2026* (26:03) | P-01 t/m P-06 |
| 2026-08-23 | Justin Lalonde — *Facebook Ads ABO vs CBO In 2026* (06:52) | P-07, B-01 |
| 2026-08-23 | Ecommerce Alley — *Best Meta Ads Campaign Structure For Ecommerce Brands In 2026* (28:02) | P-08, P-09, P-10; tweede bron onder P-01 en P-05 |
| 2026-08-23 | BitBranding — *Facebook Ads for Clothing Brands... PROVEN Strategy* (13:14) | **geen** — ouder materiaal van hetzelfde kanaal als bron 1, gaat over lookalike-stacks en catalog-ads die de routine bewust uitzet. Achterhaald door hun eigen nieuwere video. |
| 2026-08-23 | Fred Sanders — *How To Run Facebook Ads For Clothing Brands in 2025* (21:54) | P-11, P-12 |
| 2026-08-23 | Sam Hopkins — *How to Make $1,000 In 7 Days With Clothing Brand Ads* (22:20) | P-13; tweede bron onder P-04 |
