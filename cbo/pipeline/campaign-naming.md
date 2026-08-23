# Campagnenaam-conventie — de angle-code inpassen

Lost het conflict op tussen `learning-loop-design.md` §2 en de naam die de live routine
`Dagelijkse CBO-pipeline` (`trig_018QRfi1xAn8Y3pVVCqjspG1`) vandaag bouwt.

---

## Het conflict

§2 van het ontwerp schrijft voor: zet de angle-code **achter** ` | CBO | `, want de kill-parser
knipt daar af en blijft dan werken.

Maar die plek is al bezet. De routine bouwt:

```
ASH | [Product] | CBO | [d-m-jjjj]
```

En dat zie je terug in de SCHALEN-sheet: `ASH | Casual Maxi Dress | CBO | 5-8-2026`.

§2 letterlijk uitvoeren zou de datum overschrijven. De datum is niet weg te gooien: hij is het
enige wat in de campagnenaam zelf vastlegt wanneer de CBO is klaargezet.

---

## Wat de parser werkelijk doet

Uit `routines/cbo-kill/SPEC.md`, geverifieerd:

> Koppelen op productnaam: strip `ASH | ` van de campagnenaam en alles vanaf ` | CBO`, strip
> `Ashcroft | ` van `PRODUCTNAAM`, en match wat overblijft.

**Alles vanaf ` | CBO` wordt weggegooid.** Wat daarachter staat is voor de parser onzichtbaar —
of dat nu één segment is of drie. Dat is de ruimte waarin we mogen werken.

---

## De conventie

```
ASH | [Product] | CBO | [d-m-jjjj] | [angle-code]
```

Voorbeeld:

```
ASH | Casual Maxi Dress | CBO | 5-8-2026 | A3
```

| Segment | Index na split op ` \| ` | Inhoud |
|---|---|---|
| 1 | 0 | `ASH` — vaste prefix |
| 2 | 1 | productnaam — waar de parser op matcht |
| 3 | 2 | `CBO` — knippunt |
| 4 | 3 | aanmaakdatum `d-m-jjjj` |
| 5 | 4 | **angle-code** uit `angle-library-v1.md` |

### Waarom achter de datum en niet ervoor

Bestaande campagnes hebben de datum op index 3. Zou de angle-code daar komen, dan verschuift de
datum en breekt elke lezer die op positie werkt. Achteraan toevoegen is **puur additief**: oude
namen blijven geldig, ze missen alleen segment 5.

### Uitlezen

```
segmenten = naam.split(" | ")
angle_code = segmenten[4] als len(segmenten) >= 5, anders None
```

`None` betekent **legacy, angle onbekend** — niet "geen angle". Die campagnes tellen niet mee in
de scores van `cbo-leren`; ze zijn niet toewijsbaar en dat moet zichtbaar blijven in plaats van
weggemiddeld.

### Meerdere angles in één campagne

Als de pipeline ooit concepten als aparte ad sets bouwt (zie `playbook.md`, kandidaat `P-01`),
dan hoort de angle-code op **ad set**-niveau, niet op campagne-niveau. De campagnenaam houdt dan
segment 5 leeg of noteert de familie; de ad set krijgt:

```
ASH | [Product] | [angle-code] | [avatar-kort]
```

Dit is nog niet aan de orde — de routine bouwt vandaag één ad set. Het staat hier zodat de
conventie niet opnieuw hoeft te botsen als dat verandert.

---

## Wat er moet wijzigen om dit live te krijgen

In de prompt van `trig_018QRfi1xAn8Y3pVVCqjspG1`, STAP 3 (g), staat nu:

> `create_campaign` met naam `ASH | [Product] | CBO | [d-m-jjjj]`

Dat wordt:

> `create_campaign` met naam `ASH | [Product] | CBO | [d-m-jjjj] | [angle-code]`, waarbij de
> angle-code komt uit de angle-bibliotheek voor de gekozen invalshoek.

Zolang de pipeline nog geen angles uit de bibliotheek kiest, is er niets zinnigs voor segment 5.
**Voer deze wijziging dus pas door samen met de angle-keuze** — een campagnenaam met een verzonnen
of altijd-gelijke code is erger dan geen code, want hij suggereert een meting die er niet is.
