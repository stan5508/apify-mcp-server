# CBO schaal-routine

Dagafsluiting voor Meta CBO-campagnes van `smayip-je.myshopify.com`. Draait één keer per dag om
23:00 Nederlandse tijd (cron `5 21 * * *` in UTC) en werkt de sheets bij.

Deze routine **wijzigt niets** aan campagnes of budgetten. Ze rekent, beslist en legt vast.
Pauzeren doet de kill-routine; budget aanpassen doet Stan met de hand.

## Verschil met de kill-routine

| | Kill | Schaal |
|---|---|---|
| Ritme | elke 10 min, 's nachts | 1× per dag, 23:00 |
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
- **23:00 NL is 22:00 in de adaccount-tijdzone.** De Meta-dag loopt door tot 00:00 London (01:00 NL),
  dus de laatste twee uur van de advertentiedag zitten er niet in. Bewuste keuze; om 01:05 NL zou de
  dag compleet zijn.
