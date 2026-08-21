# CBO kill-routine

Automatische kill-check voor Meta CBO-campagnes van de Shopify-store `smayip-je.myshopify.com`.
Draait elke 10 minuten tussen 00:00 en 09:00 Europe/London (de advertiser-tijdzone van het adaccount).

## Planning — en waarom het nu nog niet duurzaam is

Draait op `CronCreate` met `*/10 23,0-7 * * *` (UTC; London = UTC+1 in de zomertijd).

Dit is **niet de bedoelde oplossing**. De bedoelde oplossing was een Routine via `create_trigger`, maar die
loopt op twee muren:

1. `create_trigger` staat geen interval korter dan een uur toe. Op te lossen met zes verschoven uurschema's
   (minuut 02/12/22/32/42/52), dus dat was geen blokkade.
2. **Routines gevuurd via `create_trigger` krijgen geen MCP-connectors mee.** De gevuurde sessies hebben dus
   geen Windsor en geen Shopify, en kunnen de check niet uitvoeren. De `connectors`-parameter is voor deze
   organisatie uitgeschakeld.

`CronCreate` vuurt in de huidige sessie, die de connectors wél heeft — daarom werkt het. Maar het is
sessie-gebonden, verdwijnt zodra de sessie eindigt, vuurt alleen als de sessie idle is, en verloopt na 7 dagen.

**Voor een duurzame opzet moeten de zes Routines vanuit de claude.ai Routines-UI aangemaakt worden**, waar
Windsor en Shopify handmatig als connector aan de Routine gekoppeld kunnen worden. De prompt hieronder is
daar één-op-één voor te gebruiken.

## Stap 0 — poortwachter

Eén lichte query: `campaign` + `campaign_status` + `spend` via Windsor, `date_preset: "last_1dT"`.
Staat er geen enkele campagne op `ACTIVE`, stop dan onmiddellijk. Geen verdere queries, geen document-update,
geen melding. Dit voorkomt dat een lege nacht ~50 volledige runs kost.

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

## Stap 2 — testdag bepalen

| Situatie | Testdag |
|---|---|
| geen spend gisteren | 1 |
| spend gisteren, niet eergisteren | 2 |
| spend op beide voorgaande dagen | 3+ |

## Stap 3 — kill-regels

Spend is **cumulatief vandaag**. Een treffer pauzeert de **hele CBO**, nooit een losse ad set of ad.

**Testdag 1** — drie kill-momenten:

| Drempel | Voorwaarde | Actie |
|---|---|---|
| spend ≥ €10 | CPC > €1 **EN** ATC = 0 **EN** sales = 0 | pauzeer |
| spend ≥ €20 | ATC = 0 **EN** sales = 0 | pauzeer |
| spend ≥ €30 | sales = 0 | pauzeer |

Alle voorwaarden binnen een regel moeten gelijktijdig waar zijn. Eén ATC is genoeg om het €10-moment te laten vervallen.

**Testdag 2** — hangt af van gisteren:

| Gisteren | Regels vandaag |
|---|---|
| 2 of meer sales | niet aanraken, hele dag laten lopen |
| precies 1 sale | alleen het €20- en €30-moment |
| 0 sales | zelfde als testdag 1 |

**Testdag 3 en verder** — geen regels gedefinieerd. Wel tonen, nooit automatisch pauzeren.

## Stap 4 — pauzeren

`execute_action`, connector `facebook`, action `pause_campaign`, params `{"campaign_id": "<id>"}`.
Omkeerbaar met `enable_campaign`.

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
  een uur en moeten de zes Routines bijgesteld worden.

## Routine-prompt (voor de claude.ai Routines-UI)

Zes Routines, cron in UTC: `2 23,0-7 * * *`, `12 23,0-7 * * *`, `22 …`, `32 …`, `42 …`, `52 …`.
Elk met Windsor.ai, Shopify en Google Drive als connector, "nieuwe sessie per fire", en push-notificaties aan.
Elke fire is onafhankelijk — valt er één om, dan mis je één check en niet een heel uur.

```
CBO kill-check. Handel dit volledig zelfstandig af. Stel geen vragen.

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
Testdag 1:
  spend >= 10 EN cpc > 1 EN atc == 0 EN sales == 0 -> KILL
  spend >= 20 EN atc == 0 EN sales == 0 -> KILL
  spend >= 30 EN sales == 0 -> KILL
Testdag 2: 2+ sales gisteren -> niet aanraken. 1 sale -> alleen de 20- en 30-euroregel.
0 sales -> zelfde als testdag 1.
Testdag 3+: nooit killen, wel tonen.
Alle voorwaarden binnen een regel moeten gelijktijdig waar zijn.

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
- Nooit een campagne pauzeren die al PAUSED is.
- Nooit ad sets of ads pauzeren, altijd de campagne.
- Nooit een regel versoepelen, aanscherpen of aanvullen op eigen oordeel.
- Bij twijfel niets doen en het in het document vermelden.
```
