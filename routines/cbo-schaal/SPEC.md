# CBO schaal-routine

Dagafsluiting voor Meta CBO-campagnes van `smayip-je.myshopify.com`. Draait één keer per dag om
01:05 Nederlandse tijd (cron `5 23 * * *` in UTC) en werkt de sheets bij.

## Welke dag wordt gerapporteerd

01:05 NL is **00:05 in de adaccount-tijdzone**, dus net na de dagovergang van Meta. De routine sluit
daarmee de dag af die zojuist is afgelopen — niet de dag waarin ze draait.

| | |
|---|---|
| fire | 21 aug 23:05 UTC |
| London | 22 aug 00:05 |
| Nederland | 22 aug 01:05 |
| rapportagedag | **21 augustus** |

Dit is de reden dat het tijdstip niet op 23:00 NL staat: daar zou de laatste twee uur van de
advertentiedag buiten beeld vallen, en zouden orders tussen 23:00 en 01:00 in de verkeerde dag
belanden.

Let op de maandgrens: rapporteren over de 31e gebeurt op de 1e, en moet dan in de tab van de
**vorige** maand.

Deze routine **pauzeert nooit** — dat is van de kill-routine. Sinds 28 augustus 2026 zet ze wél
zelf het budget een trede hoger of lager volgens de ladder hieronder, binnen het dagplafond dat
Stan instelt. Alles boven dat plafond, en elke horizontale duplicatie, blijft een voorstel.

## Verschil met de kill-routine

| | Kill | Schaal |
|---|---|---|
| Ritme | elke 10 min, 's nachts | 1× per dag, 01:05 |
| Kijkt naar | cumulatieve spend vandaag | 48 uur |
| Doet | campagne pauzeren | vastleggen en adviseren |

## Winstformule per campagne

```
COG        = aantal sales × COG van dat product
Transactie = 5% van de omzet
Profit     = omzet − COG − spend − transactie
Marge %    = profit / omzet
ROAS       = omzet / spend
```

Team- en abonnementskosten tellen **niet** mee: dat is shop-overhead, geen campagnekosten. Op
shop-niveau (DAILY PROFIT SHEET) tellen ze wél mee, en daar rekent de sheet zelf.

`BER = Prijs / (Prijs − COG)`. Afgeleid uit de PRODUCT DATA SHEET en nagerekend op meerdere
producten. De sheet is de bron; nooit zelf berekenen als de kolom gevuld is.


## De schaalladder — No Sheeps-methode

Bron: `no-sheeps.thehuddle.nl` → Fase 3 → CBO campaign - Testen en Schalen → *Hoe schaal je een CBO
campaign?* Letterlijk uit de lesbeschrijving:

> - Begin met verticaal schalen (budget verhogen) 50 - 70 - 100 - 150 - 200 etc etc.
> - Wanneer de performance dropt, ga je horizontaal schalen (nieuwe campagnes dupliceren)

### Verticaal — vaste treden, geen percentages

```
50 → 70 → 100 → 150 → 200 → 300 → 400 → 500
```

Het zijn **treden**, geen vermenigvuldiging. Van 50 naar 70 is +40%, van 100 naar 150 is +50%. Reken
niet met een percentage: pak de volgende trede uit de rij. Staat een campagne op een bedrag dat niet
op de ladder staat, neem dan de eerstvolgende trede erboven.

### Wanneer een trede omhoog

| Voorwaarde | Waarom |
|---|---|
| ROAS over de laatste 48 uur ≥ BER van dat product | BER is de break-even-ROAS uit de PRODUCT DATA SHEET. Daaronder verlies je geld en schaal je verlies mee. |
| minstens 2 sales in die 48 uur | Op één sale is de ROAS een toevalstreffer. |
| hoogstens één trede per 48 uur | Meta weigert frequente budgetwijzigingen en de leerfase moet bij kunnen benen. |
| niet boven het door Stan ingestelde dagplafond | Boven het plafond wordt het een voorstel, geen actie. |

### Wanneer de performance dropt

"Performance dropt" = de ROAS over de laatste 48 uur zakt onder de BER, ná een trede omhoog.

1. **Eerst één trede terug.** Zakt hij op €100 onder break-even, ga terug naar €70. Niet naar €50 en
   niet meteen killen — de vorige trede werkte wel.
2. **Houdt het aan op de lagere trede, dan horizontaal.** Dupliceer de campagne en start de kopie
   opnieuw op €50. Een duplicaat krijgt een schone leerfase; doorduwen op een campagne die zijn
   plafond heeft gevonden kost alleen geld.

### Wat de routine zelf mag doen

| Handeling | Wie |
|---|---|
| Een trede omhoog binnen het dagplafond | de routine, via `set_campaign_budget` |
| Een trede terug bij een drop | de routine |
| Boven het dagplafond | voorstel aan Stan, niet uitvoeren |
| Dupliceren voor horizontaal schalen | voorstel aan Stan — een nieuwe campagne raakt creatives en naamgeving, dat is geen budgetknop |
| Pauzeren | nooit; dat is van de kill-routine |

`set_campaign_budget` is geverifieerd beschikbaar via Windsor. Let op twee dingen uit de
actiebeschrijving: het bedrag is in **centen** (5000 = €50,00), en Meta weigert frequente
budgetwijzigingen op dezelfde campagne — vandaar de grens van één trede per 48 uur.

### Vastleggen

Elke tredewijziging gaat als regel naar het tabblad SCHALEN, met de oude en de nieuwe trede, de ROAS
en BER waarop besloten is, en de reden. Zonder die regel is later niet na te gaan waarom een
campagne op €150 stond.

## Het 48-uursmoment

Een campagne wordt beoordeeld aan het eind van testdag 2, en daarna elke 48 uur opnieuw na een
budgetwijziging. Nooit eerder — "wacht altijd 48 uur met doorschalen".

| Situatie na 48 uur | Besluit | Nieuw budget |
|---|---|---|
| Marge ≥ 20% **en** BER < 1,7 | SCHALEN | volgende trede |
| Rond breakeven | LATEN LOPEN | ongewijzigd |
| Negatief, nog op startbudget | KILLEN | — |
| Negatief, al eerder geschaald | TERUGSCHALEN | vorige trede |

**Budgetladder:** €50 → €70 → €100 → €150 → nader te bepalen.

Bij breakeven niet schalen maar optimaliseren: offer en prijs logisch maken, productbeschrijving
nalopen, meer urgency op de pagina. Dat is handwerk; de routine noteert het alleen als reden.

### Twee gevallen waarin de routine het veld leeg laat

Liever een leeg vakje dan een verzonnen getal:

- **Campagne staat op €150 of hoger en zou moeten schalen** → Nieuw budget leeg, reden
  "percentage boven 150 nog niet vastgesteld".
- **Campagne staat al op de laagste trede en is negatief** → Besluit leeg, reden "al op laagste
  budget, regel niet gedefinieerd". Terugschalen kan niet lager, en killen van een campagne die al
  omzet heeft gedraaid is een te grote stap om zelf te nemen.

## Welke sheets, en hoe

Schrijven gaat via Zapier (`GoogleSheetsV2CLIAPI`). De mechanica en de valkuilen staan in
[../cbo-kill/SPEC.md](../cbo-kill/SPEC.md#schrijven-naar-google-sheets--geverifieerd) — lees die
eerst. Kort: worksheet op ID, `force_all_fields` uit, komma of punt afhankelijk van de locale.

| Sheet | Spreadsheet | Worksheet | Wat |
|---|---|---|---|
| DAILY PROFIT | `1kG7TkOpnjewSjAErvEDYnqnkRmynJ2P74MMIrV6-enE` | tab per maand, resolve op naam | omzet, COG, adspend in kolom B/C/D. Rij = dagnummer + 1 |
| TEST DATA | `1CIEwwtDGXjjQkOAaQtZFIR_jxoa0SOM3jZY4hsWGisw` | `1720507534` | nieuwe campagne toevoegen, ROAS 24H/48H/72H bijwerken op leeftijd, STATUS op KILLED |
| SCHALEN | `1CIEwwtDGXjjQkOAaQtZFIR_jxoa0SOM3jZY4hsWGisw` | `583439622` | één regel per 48-uursbeslissing |

De DAILY PROFIT SHEET heeft **een tab per maand**. Bestaat de tab van deze maand niet, meld dat en
sla de stap over — nooit zelf een tab aanmaken en er blind in schrijven.

De oude `SCHALEN`-tab met negen blokken naast elkaar heet nu `SCHALEN (oud)` en blijft ongemoeid.
Rij-gebaseerd schrijven werkt niet op een layout waar het derde product in kolom M begint.

## Open punten

- **Percentage boven €150** is nog niet vastgesteld. Tot die tijd laat de routine Nieuw budget leeg.
- **Campagne op de laagste trede die negatief blijft** heeft geen regel. Nu wordt het gemeld, niet
  besloten.
