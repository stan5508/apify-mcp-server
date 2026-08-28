# CBO kill-routine

Automatische kill-check voor Meta CBO-campagnes van de Shopify-store `smayip-je.myshopify.com`.
Draait elke 10 minuten tussen 23:00 en 09:00 Europe/London (de advertiser-tijdzone van het adaccount).

## Planning

**Eén Routine**, `2 23,0-7 * * *` (UTC; London = UTC+1 in de zomertijd). Elke fire draait **zes checks binnen
dat uur**, telkens 10 minuten uit elkaar: op :02, :12, :22, :32, :42 en :52.

Wachten tussen checks gaat met `sleep 600` als achtergrond-Bash, nooit op de voorgrond.

Waarom niet één cron van `*/10`: dat wordt geweigerd —
`cron expression "*/10 23,0-7 * * *" fires more frequently than once per hour; minimum interval is 1 hour`.
Zes losse uurschema's van 10 minuten uit elkaar zou ook werken, maar dat levert zes regels in de Routines-lijst
op die je zes keer moet instellen en onderhouden. Eén Routine met een interne lus geeft dezelfde dekking.

De prijs daarvan: valt een sessie halverwege om, dan mis je de rest van dat uur in plaats van één check.
Dat weegt niet op tegen zes keer configureren.

### Tijdzones — gemeten, niet aangenomen

Het adaccount staat op **Europe/London**, de eigenaar zit in **Nederland**. In de zomertijd is NL = UTC+2 en
London = UTC+1.

De livegang-routine (`trig_016uvyEs7cUJyCxuQdFMKnLH`, cron `1 23 * * *`) zet de campagnes aan op **00:01 in de
adaccount-tijdzone**, niet om 00:01 Nederlandse tijd.

| | NL | London (adaccount) | UTC |
|---|---|---|---|
| Meta-dag rolt om | 01:00 | 00:00 | 23:00 |
| campagnes gaan live | 01:01 | 00:01 | 23:01 |
| eerste kill-check | 01:02 | 00:02 | 23:02 |

Campagnes starten dus precies één minuut ná de dagovergang. Er lekt geen spend naar de vorige Meta-dag en er
is geen blind uur. Het venster begint om 23:02 UTC; een fire om 22:02 UTC zou een uur vóór de livegang draaien
en niets doen.

Gemeten op de nacht van 20 op 21 augustus: de eerste spend van de nieuwe batch valt in het uur
`01:00 - 01:59` London — ongeveer een uur na livegang. De eerste checks van een run zien dus normaal nog niets.
Dat is opstartgedrag van Meta, geen storing.

### Connectors

**Routines gevuurd via `create_trigger` krijgen geen MCP-connectors mee** — de `connectors`-parameter is voor
deze organisatie uitgeschakeld. De Routine moet daarom in de claude.ai Routines-UI handmatig gekoppeld worden
aan **Windsor.ai, Shopify en Google Drive**.

Zonder die koppeling faalt de check niet stilletjes: stap 0 meldt dat de connectors ontbreken en stopt.
Er wordt nooit iets gepauzeerd zonder data.

## Stap 0 — poortwachter

Eén lichte query: `campaign` + `campaign_status` + `spend` via Windsor, `date_preset: "last_1dT"`.

Een campagne telt als **levend** wanneer `campaign_status` op `ACTIVE` staat **of** ze vandaag spend heeft.
Die tweede voorwaarde is nodig omdat Windsor `campaign_status` als momentopname teruggeeft en die achterloopt:
in de data van 20 augustus staat élke rij op `PAUSED`, ook de uren waarin de campagne aantoonbaar spendde.

Is er geen levende campagne, stop dan de hele run. Geen verdere queries, geen document-update, geen melding.
Dit voorkomt dat een lege nacht ~50 volledige runs kost.

**Uitzondering in de 23-uursrun.** Die fire draait één minuut na de livegang. Dan staat de status bij Windsor
vaak nog op `PAUSED` en is de spend nog nul, terwijl de campagnes wel degelijk aan staan. Stoppen op dat moment
kost het hele eerste uur — precies het venster waarin de €10-grens valt. In die run wordt de poortwachter
daarom pas vanaf **check 3** (:22) toegepast.

## Stap 1 — data

| Signaal | Bron | Aanroep |
|---|---|---|
| spend, cpc, cpm, ctr, clicks, reach, impressions | Windsor `facebook` | `get_data`, `date_preset: "last_1dT"`, filter op vandaag + `ACTIVE` |
| spend gisteren en eergisteren (testdag bepalen) | Windsor `facebook` | `get_data`, `date_preset: "last_3dT"` |
| ATC en checkouts per campagne | Shopify ShopifyQL | `FROM sessions SHOW sessions, sessions_with_cart_additions, sessions_that_completed_checkout GROUP BY utm_campaign SINCE <vandaag> UNTIL <vandaag>` |
| orders en omzet | Shopify ShopifyQL | `FROM sales SHOW orders, gross_sales GROUP BY product_title SINCE <vandaag> UNTIL <vandaag>` |
| BER per product | Google Drive | `read_file_content` op fileId `1AgRCvIDrR6063lcoBMAtmcHvEkHcNY1u3lUUWJe3WTo` |

### BER

BER komt uit de **PRODUCT DATA SHEET** ("Kopie van NSA - PRODUCT DATA SHEET"), kolom `BER` naast
`PRIJS (EUR)`, `COG` en `MARGE`. Nooit zelf berekenen of aannemen.

Koppelen op productnaam: strip `ASH | ` van de campagnenaam en alles vanaf ` | CBO`, strip `Ashcroft | ` van
`PRODUCTNAAM`, en match wat overblijft. De namen zijn niet altijd identiek — de campagne "Colourful Vintage
Patchwork Print Midi Dress" heet in de sheet "Colourful Vintage Patchwork Print **V Neck** Midi Dress".

**Is er geen eenduidige match, laat BER dan leeg.** Nooit een BER van een ander product overnemen en nooit
een waarde gokken.

`utm_campaign` in Shopify is exact het Meta `campaign_id`. De koppeling is 1-op-1, geen naam-matching.

ATC en sales komen **altijd** uit Shopify, nooit uit Meta. Meta's `actions_add_to_cart` is gemodelleerd en
geattribueerd; Shopify registreert de werkelijke gebeurtenis, met ongeveer een minuut vertraging.

Ongeveer 40% van de sessies komt binnen zonder `utm_campaign`. Een order zonder tag wordt aan een campagne
toegekend als het `product_title` overeenkomt met het product in de campagnenaam.

## Stap 2 — het uitgangspunt: €50 per dag

Elke CBO start op **€50 per dag**. Dat is geen losse voorkeur maar de voorwaarde waaronder de
kill-drempels kloppen: €10, €20 en €30 zijn 20%, 40% en 60% van dat dagbudget. De drempels en het
startbudget horen bij elkaar en mogen niet los van elkaar veranderd worden.

**Waarom dit expliciet in de spec staat.** Op 27 augustus 2026 draaiden er 31 campagnes samen op
€94 per dag — €3,04 per campagne. Bij ongeveer €1 per klik is €30 dan tien dagen budget, dus de
€30-regel vuurde nooit binnen testdag 1 en de €20-regel zelden. Niet omdat de regels fout waren,
maar omdat het budget per campagne niet bij de drempels paste. Draai je meer campagnes dan
`totaalbudget ÷ 50` tegelijk, dan meet je niets.

### Testdag

| Situatie | Testdag |
|---|---|
| geen spend gisteren | 1 |
| spend gisteren, niet eergisteren | 2 |
| spend op beide voorgaande dagen | 3+ |

## Stap 3 — kill-regels

Spend is **cumulatief vandaag**. Een treffer pauzeert de **hele CBO**, nooit een losse ad set of ad.
ATC en sales komen altijd uit Shopify, nooit uit Meta.

### Testdag 1 — drie momenten

| Drempel | Voorwaarde | Actie |
|---|---|---|
| spend ≥ €10 | slechte data **EN** ATC = 0 **EN** sales = 0 | pauzeer |
| spend ≥ €20 | ATC = 0 **EN** sales = 0 | pauzeer |
| spend ≥ €30 | sales = 0 | pauzeer |

Alle voorwaarden binnen een regel moeten gelijktijdig waar zijn. Eén ATC laat het €10- en
€20-moment vervallen.

**"Slechte data" bij €10 is de kwaliteitspoort.** Concreet: CPC boven €1, of een klikratio onder
het accountgemiddelde. Dat gemiddelde staat niet vast — bereken het over de laatste 30 dagen en
noem het in het rapport. Op 27 augustus 2026 lag het op 3,5%.

### Testdag 2 — hangt af van gisteren

| Gisteren | Regels vandaag |
|---|---|
| 2 of meer sales | niet aanraken, hele dag laten lopen |
| precies 1 sale | alleen het €20- en €30-moment |
| 0 sales | zelfde als testdag 1 |

**Testdag 3 en verder** — tonen, nooit automatisch pauzeren.

## Stap 3b — wanneer de checks draaien

Dit is gecorrigeerd op 28 augustus 2026 en het is de enige wijziging aan de methode.

Bij €50 per dag wordt €30 spend pas rond 60% van de advertentiedag bereikt, dus in de late middag.
Het oude venster liep van 23:00 tot 09:00 Londen en sloot daar dus vóór. De €30-regel kon er nooit
vuren en de €20-regel zelden.

Daar komt bij: gemeten over 24 tot en met 27 augustus 2026 kwam **70 tot 75% van alle sessies ná
09:00 UTC** binnen, en tussen 19:00 en 04:00 UTC is er vrijwel geen verkeer. Beslissen in het oude
venster is beslissen voordat de klanten wakker zijn.

De checks lopen daarom door tot in de avond. De nachtelijke runs blijven bestaan: die vangen een
campagne die 's nachts doorspendt zonder enig signaal.

## Stap 3c — break-even als informatie, niet als drempel

```
BEC = MARGE − 0,05 × PRIJS (EUR)
```

Beide kolommen staan in de PRODUCT DATA SHEET. **BEC is geen kill-drempel** — de drempels zijn
€10, €20 en €30. Maar zet BEC wel in het rapport naast de spend, zodat zichtbaar is of een kill op
€30 bij dit product ruim of krap was. Bij een blouse met €11,82 marge is €30 al ruim twee keer het
maximum; bij een jas met €48,54 marge is het nog geen tweederde.

Is er geen eenduidige productmatch, dan blijft BEC leeg. Dat blokkeert de kill-regels niet — die
werken op vaste bedragen en hebben de sheet niet nodig.

## Stap 4 — pauzeren

`execute_action`, connector `facebook`, action `pause_campaign`, params `{"campaign_id": "<id>"}`.
Omkeerbaar met `enable_campaign`.

### RESULTAAT bijwerken in de PRODUCT DATA SHEET

Na elke pauzering schrijf je in de kolom RESULTAAT van de PRODUCT DATA SHEET:

- **`GEEN SIGNAAL`** wanneer de geen-interesse-toets raakte. Dat product mag later opnieuw getest
  worden — het gaf binnen dit budget geen signaal, dat is iets anders dan slecht zijn.
- **`KILLED <toets>`** bij elke andere toets, bijvoorbeeld `KILLED te dure interesse` of
  `KILLED CPA 2 dagen`. Zo is later terug te zien waaróm iets uitging.

| | |
|---|---|
| Spreadsheet | `1AgRCvIDrR6063lcoBMAtmcHvEkHcNY1u3lUUWJe3WTo` |
| Worksheet | `0` (tab DATA) |
| Kolom | `COL$T` = RESULTAAT |
| Rij | **productnummer + 3** — kolom C bevat PRODUCT NO., de kop staat op rij 3 |
| Actie | Zapier `update_row`, `force_all_fields` **false** |

Het productnummer komt uit kolom C van dezelfde sheet, gekoppeld op productnaam.

## Schrijven naar Google Sheets — geverifieerd

Gaat via Zapier (`GoogleSheetsV2CLIAPI`), niet via de Drive-connector: die kan alleen titel en map
wijzigen, geen celinhoud. Onderstaande is getest op de echte sheets, niet aangenomen.

- **Worksheets worden aangesproken op sheet-ID, niet op naam.** Resolve met
  `inspect_zapier_actions` + `enum_property: "worksheet"`, of lees ze uit `get_spreadsheet_by_id`.
- **`force_all_fields` moet false blijven.** Op true wordt elke niet-ingevulde kolom geleegd,
  inclusief formulekolommen.
- **Locale verschilt per sheet.** DAILY PROFIT en ROAS & PROFIT staan op `nl_NL` → decimaal met
  **komma** (`59,85`). PRODUCT DATA staat op `en_US` → decimaal met **punt**. Fout formaat maakt van
  €59,85 stilzwijgend 5985.
- **Percentages met een %-teken schrijven.** Een kale `0.0390` wordt in nl_NL gelezen als 390.
- **Rijnummers zijn rekenwerk, geen zoekactie:** dagelijkse P&L = dagnummer + 1, product data =
  productnummer + 3.
- **Samengevoegde cellen slikken je schrijfactie stilzwijgend op.** In de TEST DATA-tab is kolom A
  (DATUM) over meerdere rijen samengevoegd. Alleen de linkerbovencel van zo'n blok neemt een waarde
  aan; de rest negeert hem zonder foutmelding. De respons van `update_row` toont dan een lege cel
  terwijl de call slaagde — controleer die respons dus altijd, en ga niet af op een 200.
  Er is geen ontkoppel-actie in de Zapier-set. Wel werkt dit: verwijder de rijen waar de
  samenvoeging aan vastzit met `delete_spreadsheet_row` (niet `delete_row`, dat leegt alleen), en
  schrijf de regels daarna opnieuw weg. Kijk eerst wat er in die rijen staat.
- **Bulk schrijven kan** met `update_row_lines`: een `rows`-array met per regel een `row_number`.
  Scheelt tientallen losse calls. Let op: `add_row` plakt onder de laatste gevulde rij, en die kan
  ver naar beneden staan als er oude placeholderrijen in de tab staan. Gebruik dan `update_row_lines`
  met expliciete rijnummers.

Formulekolommen overleven een `update_row` en rekenen zichzelf door. Getest op 20-08-2026: alleen
omzet, COG en adspend geschreven, waarna Transactie, Profit, ROAS en Profit % correct uitkwamen op
€2,99 / −€103,31 / 0,44 / −172,62%.

## Stap 5 — document

Werk altijd dezelfde artifact bij:

```
https://claude.ai/code/artifact/5361745d-b1fd-40b6-838f-54e1b48e3c60
```

Gebruik `routines/cbo-kill/template.html` als basis. Vervang de blokken die met `<!-- SLOT: ... -->` gemarkeerd
zijn. Verander niets aan de CSS of de structuur — het document moet er bij elke check identiek uitzien.

Kolommen, in deze volgorde: campagne/product, spend, ATC, purchase, CPM, CPC, CTR, BER, ROAS, reach.
BER komt per product uit de PRODUCT DATA SHEET (zie stap 1). Kleur ROAS rood zodra hij onder de BER van
dat product ligt.

Is de template niet beschikbaar, bouw dan een eenvoudige ongestileerde tabelpagina en ga gewoon door.
**De opmaak mag degraderen, de kill-functie nooit.**

## Stap 6 — melden

`PushNotification` uitsluitend wanneer er daadwerkelijk gepauzeerd is, of wanneer een actieve CBO binnen €2
van een drempel zit. Nooit een melding voor een rustige check.

## Harde grenzen

- Bij een fout, lege respons of ontbrekende data: **niets pauzeren**. Document bijwerken met de storing.
- Nooit een campagne pauzeren die al `PAUSED` is.
- Nooit ad sets of ads pauzeren, altijd de campagne.
- Nooit een regel versoepelen, aanscherpen of aanvullen op basis van eigen oordeel.
- Bij twijfel: niets doen en het in het document vermelden.

## Open punten

- **Sync-vertraging van Windsor** is nog niet gemeten. Komt spend er trager in dan 10 minuten, dan schuiven
  alle kill-momenten naar achteren en is de 10-minuten-check schijnprecisie.
- **Zomertijd.** De cron staat in UTC en gaat uit van London = UTC+1. In de wintertijd verschuift het venster
  een uur en moet de cron bijgesteld worden.

## Routine-prompt (voor de claude.ai Routines-UI)

Eén Routine, cron in UTC `2 23,0-7 * * *`, met Windsor.ai, Shopify en Google Drive als connector,
"nieuwe sessie per fire" en push-notificaties aan. De prompt doet zelf zes checks binnen het uur.

```
CBO kill-check. Handel dit volledig zelfstandig af. Stel geen vragen. Houd het antwoord kort.

Deze run doet ZES checks binnen dit uur, telkens 10 minuten uit elkaar (op :02, :12, :22, :32, :42, :52).
Voer check 1 uit. Wacht daarna 10 minuten door met de Bash-tool `sleep 600` te draaien met
run_in_background=true; zodra die klaar is voer je de volgende check uit. Herhaal tot je zes checks
hebt gedaan, en beeindig dan de beurt. Gebruik nooit een sleep op de voorgrond.

VROEGTIJDIG STOPPEN
- Zijn er bij een check geen actieve campagnes meer? Stop dan de hele run, ook als je nog checks over
  hebt. Geen verdere tool-calls, geen document-update, geen melding.
- Dit spaart tokens op een lege nacht en dat is de bedoeling.

=== PER CHECK ===

STAP 0 - POORTWACHTER (altijd als eerste)
mcp__Windsor_ai__get_data: connector "facebook", fields ["date","campaign","campaign_id",
"campaign_status","spend"], date_preset "last_1dT".
Staat geen enkele campagne op campaign_status "ACTIVE"? Stop dan onmiddellijk. Geen verdere
tool-calls, geen document-update, geen melding.

STAP 1 - Lees routines/cbo-kill/SPEC.md en routines/cbo-kill/template.html en volg die.

STAP 2 - DATA (vandaag, advertiser-tijdzone Europe/London)
- Windsor "facebook" get_data, date_preset "last_3dT", fields ["date","campaign","campaign_id",
  "campaign_status","spend","impressions","reach","clicks","ctr","cpm","cpc"].
- Shopify: FROM sessions SHOW sessions, sessions_with_cart_additions,
  sessions_that_completed_checkout GROUP BY utm_campaign SINCE <vandaag> UNTIL <vandaag>
- Shopify: FROM sales SHOW orders, gross_sales GROUP BY product_title SINCE <vandaag> UNTIL <vandaag>
- BER per product: mcp__Google_Drive__read_file_content op fileId
  1AgRCvIDrR6063lcoBMAtmcHvEkHcNY1u3lUUWJe3WTo (PRODUCT DATA SHEET), kolom BER.
  Koppelen op productnaam; geen eenduidige match = BER leeg laten, nooit gokken.
utm_campaign is exact het Meta campaign_id. ATC en sales komen ALTIJD uit Shopify, nooit uit Meta.

STAP 3 - TESTDAG: geen spend gisteren = 1. Spend gisteren maar niet eergisteren = 2. Beide = 3+.

STAP 4 - KILL-REGELS (spend cumulatief vandaag, altijd de hele CBO)

UITGANGSPUNT: elke CBO draait op 50 euro per dag. De drempels 10/20/30 zijn 20%, 40% en 60% van
dat dagbudget. Draait een campagne op veel minder, dan vuren deze regels niet binnen testdag 1 --
meld dat, want dan is het budget het probleem en niet het product.

TESTDAG 1
  spend >= 10 EN slechte data EN atc == 0 EN sales == 0 -> KILL
  spend >= 20 EN atc == 0 EN sales == 0                 -> KILL
  spend >= 30 EN sales == 0                             -> KILL

"Slechte data" = CPC boven 1 euro OF klikratio onder het accountgemiddelde. Bereken dat gemiddelde
over de laatste 30 dagen en noem het in je melding. Op 27-8-2026 was het 3,5%.

TESTDAG 2
  2+ sales gisteren -> niet aanraken, hele dag laten lopen
  1 sale gisteren   -> alleen het 20- en 30-euromoment
  0 sales gisteren  -> zelfde als testdag 1
TESTDAG 3+: tonen, nooit automatisch pauzeren.

Alle voorwaarden binnen een regel moeten gelijktijdig waar zijn. Een ATC laat het 10- en
20-euromoment vervallen.

BREAK-EVEN IS INFORMATIE, GEEN DREMPEL
  BEC = MARGE - 0,05 * PRIJS (EUR), beide uit de PRODUCT DATA SHEET.
  Zet BEC naast de spend in je melding zodat zichtbaar is of een kill op 30 euro bij dit product
  ruim of krap was. Geen productmatch? BEC leeg laten -- dat blokkeert niets, de drempels staan vast.

RESULTAAT SCHRIJVEN
  Kill op het 10-euromoment -> schrijf GEEN SIGNAAL. Te weinig data om het product af te schrijven;
  hij mag later opnieuw.
  Kill op 20 of 30 euro -> schrijf KILLED OP 20 of KILLED OP 30.

STAP 5 - PAUZEREN: mcp__Windsor_ai__execute_action, connector "facebook",
action "pause_campaign", params {"campaign_id":"<id>"}.

STAP 6 - DOCUMENT: werk ALTIJD dezelfde artifact bij met de Artifact tool:
url: https://claude.ai/code/artifact/5361745d-b1fd-40b6-838f-54e1b48e3c60
favicon: (rode stip)
Kolommen: campagne/product, spend, ATC, purchase, CPM, CPC, CTR, BER, ROAS, reach.
BER per product uit de sheet. Kleur ROAS rood zodra hij onder de BER van dat product ligt.
Onder de tabel kort: waar je op let, en per pauzering welke regel is geraakt met de cijfers erbij.

STAP 7 - MELDEN: PushNotification alleen bij een daadwerkelijke pauzering, of als een actieve
CBO binnen 2 euro van een drempel zit.

HARDE GRENZEN
- Fout, lege respons of ontbrekende data: niets pauzeren, document bijwerken met de storing.
- Nooit twee keer dezelfde campagne pauzeren binnen een run. Ga af op wat je zelf al gepauzeerd hebt,
  niet op `campaign_status` — dat veld loopt achter.
- Nooit ad sets of ads pauzeren, altijd de campagne.
- Nooit een regel versoepelen, aanscherpen of aanvullen op eigen oordeel.
- Bij twijfel niets doen en het in het document vermelden.
```
