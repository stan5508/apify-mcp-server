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

_Nog leeg._ Er is nog geen enkele meting en Stan heeft nog niets handmatig gepromoveerd.
Alles staat in §2.

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
| `bron` | BitBranding, "The NEW Proven Facebook Ads Strategy for Clothing Brands 2026", 10-06-2025, t=23:00–25:20 |
| `bewijsklasse` | derde-claim, verkoopbelang (verkoopt coaching) |
| `status` | onbeproefd |
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
| `bron` | BitBranding, t=05:30–07:40 |
| `bewijsklasse` | derde-claim, maar **sterk gesteund door eigen onderzoek** |
| `status` | onbeproefd |
| `notitie` | Dit is de kandidaat met de beste onderbouwing van buiten de video. `angle-library-v1.md` §1 documenteert dat kortingsmechanismen in de UK actief gehandhaafd worden (DMCCA, boetes tot 10% wereldwijde jaaromzet) en noemt gratis verzending als tijdelijke actie expliciet als het compliant alternatief. Video en compliance-onderzoek wijzen dezelfde kant op vanuit totaal verschillende overwegingen. |

### P-05 — Wekelijkse creative-verversing

| Veld | Waarde |
|---|---|
| `claim` | Elke week nieuwe creatives lanceren en uitgeputte uitzetten. Resultaten zakken structureel weg bij merken die dit 2–3 weken laten liggen. |
| `raakt` | Geen enkele bestaande routine — er is geen verversingscadans |
| `nu in de routine` | De pipeline zet dagelijks nieuwe *producten* klaar, maar ververst nooit de creatives van een lópende campagne |
| `bron` | BitBranding, t=11:00–11:40 |
| `bewijsklasse` | derde-claim, anekdotisch (één klantvoorbeeld) |
| `status` | onbeproefd |
| `notitie` | Zwakste onderbouwing van de vijf. Bovendien: bij een pipeline die dagelijks nieuwe producten test, is creative-vermoeidheid op een enkele campagne veel minder relevant dan bij een merk dat één hero-product jaren draait. Mogelijk niet van toepassing op deze opzet. |

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

---

## 3. Weerlegd

*Regels die het eigen cijfermateriaal niet overleefden. Blijven staan zodat ze niet opnieuw
worden voorgesteld.*

_Nog leeg._

---

## 4. Extractievorm — hoe een volgende video hier landt

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

## 5. Bronnen tot nu toe

| Datum verwerkt | Bron | Kandidaten |
|---|---|---|
| 2026-08-23 | BitBranding — *The NEW Proven Facebook Ads Strategy for Clothing Brands 2026* (26:03, 10-06-2025) | P-01 t/m P-06 |
